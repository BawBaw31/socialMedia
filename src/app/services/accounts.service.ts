import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NewUser, LogUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl: string = "http://localhost:3000/api/";
  logedIn: boolean = false;

  constructor(private http :HttpClient) { }

  setLogState(state: boolean) :void{
    console.log('setting state');
    this.logedIn = state;
  }

  getLogState() :boolean{
    console.log('getting state');
    return this.logedIn;
  }

  getNews() :Observable<any>{
    const headers = {'content-type': 'application/json'};
    return this.http.get<any>(this.baseUrl + 'posts', {'headers': headers, "withCredentials": true});
  }

  addUser(user :NewUser) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<any>(this.baseUrl + 'user/register', body, {'headers': headers});
  }

  login(user :LogUser) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(user);
    return this.http.post<any>(this.baseUrl + 'user/login', body, {'headers': headers, "withCredentials": true});
  }

  forgotPassword(email: string) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({'email': email});
    return this.http.post<any>(this.baseUrl + 'user/forgot-password', body, {'headers': headers});
  }
}
