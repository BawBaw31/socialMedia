import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccountsService } from '../../services/accounts.service';
import { PostCreatorComponent } from '../../tools/post-creator/post-creator.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private accountService :AccountsService,
    private router :Router,
    private newPostDialog :MatDialog) { }

  ngOnInit(): void {

  }

  // Log out
  logout() :void{
    this.accountService.logout().subscribe(
      res => {
        console.log(res[0]);
        this.accountService.setLogState(false);
        this.router.navigate(['../home']);
      }
    )
  }

  // Open dialog for new post creation
  openNewPostDialog() {
    let newPostDialogRef = this.newPostDialog.open(PostCreatorComponent, {
      width: '70vw',
      height: '50vh'
    });
  }

}
