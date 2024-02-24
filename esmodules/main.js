const moduleName = 'laugh-track';
import { LaughTrack } from "./laughtrack.js"

// export let i18n = key => {
//     return game.i18n.localize(key);
// };

// export let setting = key => {
//     return game.settings.get("breaktime", key);
// };

Hooks.on("init", function() {
    // Keybinding
    game.keybindings.register(moduleName, "playLaugh", {
        name: 'Play Laugh',
        hint: 'Plays the default laugh sound',
        editable: [{ key: "KeyL", modifiers: []}],
        onDown: () => {
          window.game.laughTrack.play();
        },
        onUp: () => {},
        restricted: false,  // Restrict this Keybinding to gamemaster only?
        reservedModifiers: [],
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
      });

      let laughTrack = new LaughTrack();
      window.game.laughTrack = laughTrack;
});

Hooks.on("getSceneControlButtons", function(controls) {
    let tileControls = controls.find(x => x.name === "token");
    tileControls.tools.push({
      icon: "fa-solid fa-face-laugh-squint",
      name: "send-a-laugh",
      title: "Laugh Track",
      button: true,
      onClick: () => window.game.laughTrack.render(true)
    });
    
  });