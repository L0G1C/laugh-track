import { LaughTrack, setting, i18n } from "./main.js";

export class LaughTrackApplication extends Application {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions,
            {
                title: i18n("LAUGHTRACK.app.title"),
                id: "laughtrack-app",
                template: "modules/laugh-track/templates/laughtrack.html",
                width: 300,
                height: "auto",
                resizable: false,
            });
    }

    getData(){
        let choices = {
            crowd:  i18n("LAUGHTRACK.app.crowd"), 
            cartoon: i18n("LAUGHTRACK.app.cartoon"), 
            "evil-dwarf": i18n("LAUGHTRACK.app.evil-dwarf"), 
            "human-female": i18n("LAUGHTRACK.app.human-female"),
            "human-male": i18n("LAUGHTRACK.app.human-male"),
            hyena: i18n("LAUGHTRACK.app.hyena"),
            ghost: i18n("LAUGHTRACK.app.ghost")
        };
        let value = setting("defaultsound");

        return mergeObject(super.getData(), {
            choices: choices,
            value: value
        })
    }

    activateListeners(html){  
        super.activateListeners(html);       
        html.find("#send-laugh-btn").click(async () => {            
            let selectedLaugh = html.find("#laugh-select").val();    

            if (html.find("#defaultcb").is(":checked"))
                game.settings.set("laugh-track","defaultsound", selectedLaugh);

            LaughTrack.emit("sendSound", {sound: selectedLaugh});
            LaughTrack.playSound(selectedLaugh);
            await this.close();            
        });               
    }

    async close(options = {}) {
        super.close(options);        
    }
}