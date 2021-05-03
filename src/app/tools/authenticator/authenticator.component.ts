import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { MessageService } from '../../services/message.service';
import { NewUser, LogUser} from '../../interfaces/user';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  state = AuthenticatorCompState.LOGIN;
  newUser: NewUser = {
    name: '',
    email: '',
    password: '',
    verifPassword: ''
  }
  logUser: LogUser = {
    email: '',
    password: ''
  }

  constructor(private accountsService: AccountsService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  // On click switching forms
  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }

  // Switching variable state
  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  // Switching h1 text
  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return 'Login';
      case AuthenticatorCompState.REGISTER:
        return 'Register';
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return 'Reset Password';
    }
  }

  // Connecting with api service
  addUser() :void{
    this.accountsService.addUser(this.newUser)
    .subscribe(
      res => this.messageService.add({type: 'success', text: res.message}),
      err => this.messageService.add({type: 'error', text: err.error})
    );
  }

  login() :void{
    this.accountsService.login(this.logUser)
    .subscribe(
      res => this.messageService.add({type: 'success', text: res.token}),
      err => this.messageService.add({type: 'error', text: err.error})
    )
  }

}


export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
