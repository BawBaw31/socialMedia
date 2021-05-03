import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl: string = "http://localhost:3000/api/";

  constructor(private http :HttpClient) { }

  addUser(user :NewUser) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post(this.baseUrl + 'user/register', body, {'headers': headers});
  }
}
