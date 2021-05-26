import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ActualUser } from '../../interfaces/user';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  user :ActualUser= {
    _id: 'no id',
    name: 'no name',
    email: 'no email',
    friends: ['no friends']
  }

  posts :Post[] = []

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() :void {
    // Check if connected
    this.userService.getNews().subscribe(
      res =>{
        // Get actual user
        this.user._id = res[1]._id;
        this.user.name = res[1].name;
        this.user.email = res[1].email;
        this.user.friends = res[1].friends;

        // Get actual user news
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

  readableDate(date :string) :string {
    const day = date.split('T')[0].split('-');
    const hours = date.split('T')[1].split(':');
    return day[2]+'/'+day[1]+'/'+day[0]+' '+hours[0]+':'+hours[1];
  }


}
