import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = '/main/users';
  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<object> {
    return this.http.get('main/users/' + id);
  }

  createUser(user: object): Observable<object> {
    return this.http.post('main/users', user);
  }

  updateUser(id: number, value: any): Observable<object> {
    return this.http.put('main/users/' + id, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete('main/users/' + id , {responseType: 'text'});
  }

  getUserList(): Observable<any> {
    return this.http.get('main/users/all');
  }

}
