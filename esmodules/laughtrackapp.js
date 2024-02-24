import { LaughTrack, setting, i18n } from "./main.js";

export class LaughTrackApplication extends Application {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions,
            {
                title: i18n("LAUGHTRACK.app.title"),
                id: "laughtrack-app",
                template: "modules/laugh-track/templates/laughtrack.html",
                width: 300,
                height: 'auto',
                resizable: false,
            });
    }

    // sendLaughToEveryone(laugh){
    //     new Audio(`./sounds/${laugh}.mp3`).play();
    // }

    activeListeners(html){
        super.activeListeners(html);
        let selectedLaugh = this.element.find("#laugh-select").value;
        //this.element.find("#send-laugh-btn").click(this.socket.executeForEveryone(this.sendLaughToEveryone, selectedLaugh));
    }

    // play(){
    //     // Figure out default and send Laugh to Everyone
    //     this.sendLaughToEveryone("cartoon");
    // }

    async close(options = {}) {
        super.close(options);        
    }
}