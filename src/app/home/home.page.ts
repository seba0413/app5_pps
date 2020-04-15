import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ChatComponent } from '../componentes/chat/chat.component';
import { AuthService } from '../servicios/auth.service';
import { ChatsService } from '../servicios/chat.service';

const sala4AId = 'hHhXXXF74VZ7X5R765VG';
const sala4BId = 'nczAgsrYSs96GlwWb15h';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  chatRooms: any[] = [];
  chatRoom;
  color;

  constructor(public authService: AuthService,
              private chatsService: ChatsService,
              private modal: ModalController,
              public actionSheetController: ActionSheetController) {}

  openChat( chatId ) {

    this.establecerChatYColor( chatId );

    this.modal.create({
      component: ChatComponent,
      componentProps: {
        chat: this.chatRoom,
        color: this.color
      }
    }).then( (modal) => modal.present());
  }

  onlogout() {
    this.authService.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Salir',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.onlogout();
        }
      }]
    });
    await actionSheet.present();
  }

  ngOnInit() {
    this.chatsService.getChatRooms().subscribe( chats => {
      this.chatRooms = chats;
    });
  }

  establecerChatYColor( chatId ) {
    for (const chat of this.chatRooms ) {
      if (chat.id === chatId ) {
        this.chatRoom = chat;
        break;
      }
    }

    switch ( chatId ) {
      case sala4AId :
        this.color = 'primary';
        break;
      case sala4BId :
        this.color = 'dark';
        break;
    }
  }
}
