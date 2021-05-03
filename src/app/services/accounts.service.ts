import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser, LogUser } from '../interfaces/user';

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
    return this.http.post<any>(this.baseUrl + 'user/register', body, {'headers': headers});
  }

  login(user :LogUser) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<any>(this.baseUrl + 'user/login', body, {'headers': headers});
  }
}
