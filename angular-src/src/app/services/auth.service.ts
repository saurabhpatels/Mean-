import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authToken: any;
  User: any;
  private _user_url = 'http://localhost:4000/users/';
  headers = {'Content-Type' : 'application/json'};


  constructor(private http: HttpClient) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  }

  registeruser(user){


    return this.http.post(this._user_url + '/register', user, { headers : this.headers });
  }

  authenticateUser(user){
    return this.http.post(this._user_url + '/authenticate', user, { headers : this.headers });
  }

  getprofile(user){

    let headers = new HttpHeaders();
    this.gettoken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get(this._user_url + '/profile', { headers : this.headers });
  }

  storeUserData(token, user){
  localStorage.setItem('id_token', token);
  localStorage.setItem('id_token', JSON.stringify(user));
  this.authToken = token;
  this.User = user;

  }

  gettoken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

  logout(){
    this.authToken = null;
    this.User = null;
    localStorage.clear();
  }

  get isLoggedIn(){
   const user = JSON.parse(localStorage.getItem('id_token'));
   return (user !== null ) ? true : false;
  }
}
