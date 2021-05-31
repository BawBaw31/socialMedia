import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { ActualUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user :ActualUser= {
    _id: 'no id',
    name: 'no name',
    email: 'no email',
    friends: ['no friends']
  };

  posts :Post[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() :void {
    // Check if connected
    this.userService.getProfile().subscribe(
      res =>{
        // Get actual user
        this.user._id = res[1]._id;
        this.user.name = res[1].name;
        this.user.email = res[1].email;
        this.user.friends = res[1].friends;

        // Get actual user posts
        this.posts = [];
        this.posts = res[0];

        this.authService.setLogState(true);
      },
      err =>{
        // Not connected go home
        this.authService.setLogState(false);
        this.router.navigate(['../home']);
      }
    );
  }

  unfollow(friendName :String) :void {
    this.userService.unfollow(friendName).subscribe(
      res => {
        res.forEach(
        (value:string) => this.messageService.add({type: 'success', text: value}));
        this.getProfile();
      },
      err => err.error.forEach(
        (value:string) => this.messageService.add({type: 'error', text: value}))
    );
  }

}
