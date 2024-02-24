import { i18n } from "./main.js";

export const registerSettings = function(){
    // Register any custom module settings here
	let modulename = "laugh-track";

    game.settings.register(modulename, "defaultsound", {
        scope: "world",
        config: false,
        default: "cartoon",
        type: String
    });

    game.settings.register(modulename, "laughsoundvolume", {
        name: i18n("LAUGHTRACK.settings.laughsoundvolume.name"), // "Warning Sound Volume"
        hint: i18n("LAUGHTRACK.settings.laughsoundvolume.hint"), // "You can set the volume for the warning sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume."
        scope: 'world',
        config: true,
        default: 0.6,
        range: {
          min: 0.2,
          max: 1,
          step: 0.1
        },     
        type: Number
    });

}