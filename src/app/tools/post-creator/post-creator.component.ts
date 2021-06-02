import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent implements OnInit {
  post :HTMLElement | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
