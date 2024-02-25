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

    activateListeners(html){  
        super.activateListeners(html);       
        html.find("#send-laugh-btn").click(function(){            
            let selectedLaugh = html.find("#laugh-select").val();    
                    
            if (html.find("#defaultcb").is(":checked"))
                game.settings.set("laugh-track","defaultsound", selectedLaugh);

            LaughTrack.emit("sendSound", {sound: selectedLaugh});
        });         
    }

    async close(options = {}) {
        super.close(options);        
    }
}