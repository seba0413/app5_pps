import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ChatsService } from '../../servicios/chat.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat: any;
  public color: string;
  public mensajes: any[] = [];
  public msg: string;
  public room: any;
  private usuarioActual: string;

  constructor(  private navParams: NavParams,
                private modal: ModalController,
                private chatService: ChatsService) { }

  ngOnInit() {

    this.chat = this.navParams.get('chat');
    this.color = this.navParams.get('color');
    this.usuarioActual = localStorage.getItem('chatUser');

    this.chatService.getChatRoom( this.chat.id).subscribe( room => {
      this.room = room;
      this.convertirTimeStampToDate( this.room );
    });
  }

  closeModal() {
    this.modal.dismiss();
  }

  sendMessage() {

    const mensaje: Message = {
      content: this.msg,
      type: 'text',
      date: new Date(),
      user: this.usuarioActual
    };

    this.chatService.sendMsgToFirebase( mensaje, this.chat.id );
    this.msg = '';
  }

  convertirTimeStampToDate( room ) {
    let fecha;
    for (const message of room.messages ) {
      fecha  = new Date(message.date.seconds * 1000).toISOString();
      const fechaArray = fecha.split('T');
      message.date = fechaArray[0];
    }
  }
}
