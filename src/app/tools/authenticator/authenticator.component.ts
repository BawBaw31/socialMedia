import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { NewUser } from '../../interfaces/user';

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

  constructor(private accountsService: AccountsService) { }

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
  addUser(name: string, email: string, password: string, verifPassword: string) :void{
    // Set newUser
    this.newUser.name = name;
    this.newUser.email = email;
    this.newUser.password = password;
    this.newUser.verifPassword = verifPassword;

    // Call api service
    this.accountsService.addUser(this.newUser)
    .subscribe(message => alert(message));
  }

}


export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
