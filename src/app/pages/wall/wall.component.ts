import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { ActualUser } from 'src/app/interfaces/user';
import { WallService } from 'src/app/services/wall.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  user :ActualUser= {
    _id: 'no id',
    name: 'no name',
    email: 'no email',
    friends: ['no friends']
  }

  wallName :String = this.route.snapshot.params['name'];

  wallPosts :Post[] = [];

  isFriend :boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private wallService: WallService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.messageService.clear();
    this.getWall();
    this.checkIfFriend();
  }

  checkIfFriend() :void{
    this.wallService.isFriend(this.wallName).subscribe(
      res => {this.isFriend = res[0]}
    );
  }

  getWall() :void{
    this.wallService.getWall(this.wallName).subscribe(
      res =>{
        // Get actual user
        this.user._id = res[1]._id;
        this.user.name = res[1].name;
        this.user.email = res[1].email;
        this.user.friends = res[1].friends;

        // Get actual wall posts
        this.wallPosts = [];
        this.wallPosts = res[0];

        this.authService.setLogState(true);
      },
      err =>{
        // Not connected go home
        this.authService.setLogState(false);
        this.router.navigate(['../news']);
      }
    );
  }

  follow() :void {
    this.userService.follow(this.wallName).subscribe(
      res => {
        res.forEach(
        (value:string) => this.messageService.add({type: 'success', text: value}));
        this.checkIfFriend();
      },
      err => err.error.forEach(
        (value:string) => this.messageService.add({type: 'error', text: value}))
    )
  }

  unfollow() :void {
    this.userService.unfollow(this.wallName).subscribe(
      res => {
        res.forEach(
        (value:string) => this.messageService.add({type: 'success', text: value}));
        this.checkIfFriend();
      },
      err => err.error.forEach(
        (value:string) => this.messageService.add({type: 'error', text: value}))
    )
  }



}
