import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AccountsService } from '../../services/accounts.service';
import { MessageService } from '../../services/message.service';
import { NewUser, LogUser} from '../../interfaces/user';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  @Output() public sendLogedIn: EventEmitter<boolean> = new EventEmitter();
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

  constructor(
    private bottomSheet: MatBottomSheetRef<AuthenticatorComponent>,
    private accountsService: AccountsService,
    private messageService: MessageService,
    private router: Router) { }

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

  // Checking state
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
    this.messageService.clear();
    this.accountsService.addUser(this.newUser)
    .subscribe(
      res => res.forEach(
        (value:string) => this.messageService.add({type: 'success', text: value})),
      err => err.error.forEach(
        (value:string) => this.messageService.add({type: 'error', text: value}))
    );
  }

  login() :void{
    this.messageService.clear();
    this.accountsService.login(this.logUser)
    .subscribe(
      res => {
        this.bottomSheet.dismiss();
        this.accountsService.setLogState(true);
        this.router.navigate(['../news', res[0]]);
      },
      err => err.error.forEach(
        (value:string) => this.messageService.add({type: 'error', text: value}))
    )
  }

  forgotPassword(email :string) :void{
    this.messageService.clear();
    this.accountsService.forgotPassword(email)
    .subscribe(
      res =>res.forEach(
        (value:string) => this.messageService.add({type: 'success', text: value})),
      err => err.error.forEach(
        (value:string) => this.messageService.add({type: 'error', text: value}))
    )
  }

}


export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
