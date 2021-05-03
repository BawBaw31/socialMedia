import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages :Message[] = [];

  constructor() { }

  add(message :Message) :void{
    this.messages.push(message);
    console.log(message.text);
  }

  clear() :void {
    this.messages = [];
  }
}
