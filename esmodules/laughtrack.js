export class LaughTrack extends Application {
    constructor(){
        this.moduleName = "laugh-track";

        // socketlib
        this.socket = socketlib.registerModule(this.moduleName);     
        this.socket.register("sendLaughToEveryone", this.sendLaughToEveryone);   
    }

    sendLaughToEveryone(laugh){
        new Audio(`./sounds/${laugh}.mp3`).play();
    }

    activeListeners(html){
        super.activeListeners(html);
        let selectedLaugh = this.element.find("#laugh-select").value;
        this.element.find("#send-laugh-btn").click(this.socket.executeForEveryone(this.sendLaughToEveryone, selectedLaugh));
    }
}