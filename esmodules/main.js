const moduleName = "laugh-track";
let playingSound = false;

import { registerSettings } from "./settings.js";
import { LaughTrackApplication } from "./laughtrackapp.js"

// for CONFIG.debug.hooks = true
export let debug = (...args) => {
    if (debugEnabled > 1) console.log("DEBUG: laugh-track | ", ...args);
};
export let log = (...args) => console.log("laugh-track | ", ...args);
export let warn = (...args) => {
    if (debugEnabled > 0) console.warn("laugh-track | ", ...args);
};
export let error = (...args) => console.error("laugh-track | ", ...args);
export let i18n = key => {
    return game.i18n.localize(key);
};

export let setting = key => {
    return game.settings.get(moduleName, key);
};

export class LaughTrack {
    static app = null;

    static async init() {
        log("initializing");

        LaughTrack.SOCKET = "module.laugh-track";

        // init socket
        game.socket.on(LaughTrack.SOCKET, LaughTrack.onMessage);
        LaughTrack.registerHotKeys();
    }

    static async setup() {
        registerSettings();
    }

    static emit(action, args = {}) {
        args.action = action;
        args.senderId = game.user.id;
        game.socket.emit(LaughTrack.SOCKET, args, (resp) => { });
        LaughTrack.onMessage(args);
    }

    static onMessage(data) {
        if (data.senderId != game.user.id)
            LaughTrack[data.action].call(LaughTrack, data);
    }

    static registerHotKeys() {        
        game.keybindings.register(moduleName, "playLaugh", {
            name: "Play Laugh",
            hint: "Plays the default laugh sound",
            editable: [{ key: "KeyL", modifiers: []}],
            onDown: async () => {
                // throttle hotkey presses with setTimeout
                if (!playingSound){
                    let soundName = setting("defaultsound");
                    LaughTrack.playSound(soundName); 
                    playingSound = true;
                    await setTimeout(() => {
                        playingSound = false;
                    },3000);                    
                }
            },
            onUp: () => {},
            restricted: false, 
            reservedModifiers: [],
            precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
          });
    }

    static playSound(laugh){   
        log("Playing Sound: " + laugh);      
        const soundVolume = setting("laughsoundvolume");
        const mySound = `modules/laugh-track/sounds/${laugh}.mp3`;
        AudioHelper.play({
            src: mySound,
            volume: soundVolume,
            autoplay: true,
            loop: false
        }, true);
          
    }

    static async sendSound(data){        
        this.playSound(data.sound);
    }
}

Hooks.once("init", LaughTrack.init);
Hooks.once("setup", LaughTrack.setup);

Hooks.on("getSceneControlButtons", function(controls) {
    let tileControls = controls.find(x => x.name === "token");
    tileControls.tools.push({
      icon: "fa-solid fa-face-laugh-squint",
      name: "send-a-laugh",
      title: "Laugh Track",
      button: true,
      onClick: () => {
        if (window.game.laughTrackApp == null)
            window.game.laughTrackApp = new LaughTrackApplication().render(true);
        else
            window.game.laughTrackApp.render(true);
      }
    });
    
});

