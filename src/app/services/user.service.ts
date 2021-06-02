import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:3000/api/user";

  constructor(private http :HttpClient) { }

  getNews() :Observable<any>{
    const headers = {'content-type': 'application/json'};
    return this.http.get<any>(this.baseUrl+'/news', {'headers': headers, "withCredentials": true});
  }

  getAllNames() :Observable<any>{
    const headers = {'content-type': 'application/json'};
    return this.http.get<any>(this.baseUrl+'/all-names', {'headers': headers, "withCredentials": true});
  }

  getProfile() :Observable<any>{
    const headers = {'content-type': 'application/json'};
    return this.http.get<any>(this.baseUrl+'/profile', {'headers': headers, "withCredentials": true});
  }

  createPost(post :String) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({"text": post});
    return this.http.post<any>(this.baseUrl + '/create', body, {'headers': headers, "withCredentials": true});
  }

  deletePost(postId :number) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({"postId": postId});
    return this.http.post<any>(this.baseUrl + '/delete', body, {'headers': headers, "withCredentials": true});
  }

  unfollow(friendName :String) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({"friend": friendName});
    return this.http.post<any>(this.baseUrl + '/delete-friend', body, {'headers': headers, "withCredentials": true});
  }

  follow(friendName :String) :Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({"friend": friendName});
    return this.http.post<any>(this.baseUrl + '/add-friend', body, {'headers': headers, "withCredentials": true});
  }

}
