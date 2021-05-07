import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  user = {
    _id: '',
    name: ''
  }
  constructor(private router: Router, private accountService: AccountsService) { }

  ngOnInit(): void {
    // If not connected go home !
    this.accountService.getNews().subscribe(
      res =>{
        this.user._id = res._id;
        this.user.name = res.name;
        console.log(this.user);
        this.accountService.setLogState(true);
      },
      err =>{
        this.accountService.setLogState(false);
        this.router.navigate(['../home'])
      }
    )
  }

}
