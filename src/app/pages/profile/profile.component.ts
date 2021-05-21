import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { ActualUser } from 'src/app/interfaces/user';

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
  }

  posts :Post[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
