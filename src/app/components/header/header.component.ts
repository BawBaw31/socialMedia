import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
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

  myControl = new FormControl('');
  allUsers :string[] = [];
  filteredNames: Observable<string[]> | undefined;

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
    // getting all users names
    this.userService.getAllNames().subscribe(
      res => this.allUsers = res[0],
      err => console.log(err.error)
    );

    //  filtering options
    this.filteredNames = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // filter search
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(userName => userName.toLowerCase().includes(filterValue));
  }

  // on seach submit
  onSearchSubmit() :void{
    // go to user's wall
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(()=>this.router.navigate([`../wall/${this.myControl.value}`]));
  }

  // Log out
  logout() :void{
    this.authService.logout().subscribe(
      res => {
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
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(()=>this.router.navigate([`../news`]));
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
