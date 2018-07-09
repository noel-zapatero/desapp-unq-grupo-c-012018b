import { Injectable } from "../../../node_modules/@angular/core";
// import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 

export class Message {
    content:string;
    style:string;
    dismissed:boolean = false;

    constructor(content:string, style?:string) {
        this.content = content;
        this.style = style || 'info';
    }
}

@Injectable()
export class NotificationService {
    private db:Message[] = [];

    constructor(/*private db:AngularFireDatabase*/) {

    }

    getMessages():/*AngularFireList<Message[]>*/ Message[] {
        // this.db.list('/messages');
        return this.db;
    }

    sendMessage(content:string, style:string) {
        const msg = new Message(content, style);
        // this.db.list('/messages').push(msg);
        this.db.push(msg);
    }

    dismissMessage(messageKey) {
        // this.db.object(`messages/${messageKey}`).update({'dismissed': true});
        this.db.forEach(msg => {
            if (msg.content === messageKey) {
                msg.dismissed = true;
            }
        });
    }
}