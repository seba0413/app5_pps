import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';
import { firestore } from 'firebase';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})

export class ChatsService {

  constructor(private db: AngularFirestore ) { }

  getChatRooms() {
    return this.db.collection('chatRooms').snapshotChanges().pipe( map( rooms => {
      return rooms.map( a => {
        const data = a.payload.doc.data() as Chat;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getChatRoom( chatId: string ) {
    return this.db.collection('chatRooms').doc(chatId).valueChanges();
  }

  sendMsgToFirebase( message: Message, chatId: string) {
    this.db.collection('chatRooms').doc(chatId).update({
      messages: firestore.FieldValue.arrayUnion( message )
    });
  }
}
