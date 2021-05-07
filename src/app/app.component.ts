import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'socialMedia';

  constructor(private loginSheet: MatBottomSheet, private accountService: AccountsService){}

  ngOnInit() :void {
  }

  onLoginClick(): void{
    const bottomSheetRef: MatBottomSheetRef= this.loginSheet.open(AuthenticatorComponent);
  }

  isNotLogedIn(){
    return !this.accountService.getLogState();
  }
}
