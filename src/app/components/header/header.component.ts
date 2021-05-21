import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { PostCreatorComponent } from '../../tools/post-creator/post-creator.component';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  _userName :string = '';

  @Output() onNewPost = new EventEmitter();

  @Input('user')
  set userName(userName: string) {
    this._userName = userName || '<User name not found>';
  }

  constructor(
    private router :Router,
    private authService :AuthService,
    private userService :UserService,
    private messageService :MessageService,
    private newPostDialog :MatDialog) { }


  ngOnInit(): void {
  }

  // Log out
  logout() :void{
    this.authService.logout().subscribe(
      res => {
        console.log(res[0]);
        this.authService.setLogState(false);
        this.router.navigate(['../home']);
      }
    )
  }

  // Go to my profile page
  profilePage() :void{
    this.router.navigate(['../profile']);
  }

  // Go to news page
  newsPage() :void{
    this.router.navigate(['../news']);
  }

  // Open dialog for new post creation
  openNewPostDialog() {
    this.messageService.clear();
    let postDialogRef = this.newPostDialog.open(PostCreatorComponent, {
      width: '70vw',
      height: '50vh'
    });

    // Make post request when dialog closes
    postDialogRef.afterClosed().subscribe(
      res => {
        console.log(res);

        this.userService.createPost(res)
        .subscribe(
          res => {
            res.forEach(
            (value:string) => this.messageService.add({type: 'success', text: value}));
            this.onNewPost.emit();
          },
          err => err.error.forEach(
            (value:string) => this.messageService.add({type: 'error', text: value}))
        );
      });
  }

}
