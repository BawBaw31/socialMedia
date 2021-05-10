import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { ActualUser } from '../../interfaces/user';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  user :ActualUser= {
    id: 'noId',
    name: 'noName'
  }

  posts :Post[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountsService) { }

  ngOnInit(): void {
    // Check if connected
    this.accountService.getNews(this.route.snapshot.params.userId).subscribe(
      res =>{
        this.user.id = res._id;
        this.user.name = res.name;
        this.accountService.setLogState(true);

        // Request for latest friends posts
        this.posts.push({
          autor: "Baw",
          text: "Merci pour ça !"
        },
        {
          autor: "Brik",
          text: "Le temps des cerises !"
        },
        {
          autor: "Bok",
          text: "La pieds montaise !"
        },
        {
          autor: "Bik",
          text: "Garibaldi sur un cheval de Trois !"
        },
        {
          autor: "Binks",
          text: "Voilà comment expliquer bien !"
        },
        {
          autor: "Brak",
          text: "Jamais de la vie !"
        },
        {
          autor: "Blop",
          text: "Tous les jours !"
        });
      },
      err =>{
        // Not connected go home
        this.accountService.setLogState(false);
        this.router.navigate(['../home']);
      }
    )
  }
}
