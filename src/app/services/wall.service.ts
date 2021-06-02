import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  baseUrl: string = "http://localhost:3000/api/wall";

  constructor(private http :HttpClient) { }

  // get wall
  getWall(userName :String) :Observable<any>{
    const headers = {'content-type': 'application/json'};
    return this.http.get<any>(this.baseUrl+`/${userName}`, {'headers': headers, "withCredentials": true});
  }

  // check if is friend
  isFriend(friendName :String) :Observable<any>{
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({"friendName": friendName});
    return this.http.post<any>(this.baseUrl+'/is-friend', body, {'headers': headers, "withCredentials": true});
  }
}

