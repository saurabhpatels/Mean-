import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _user_url = 'http://localhost:3000/users/';
  authToken: any;
  User: any;


  constructor(private http: HttpClient ) {}

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  registeruser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._user_url + '/register', user, { headers });
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._user_url + '/authenticate', user, { headers });
  }

  uploadimage(formData){
    this.loadToken();
    let headers = new HttpHeaders();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._user_url + 'upload-photo', formData  , {headers} );
  }

  getPhotos(){
    this.loadToken();
    let headers = new HttpHeaders();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._user_url + 'getphotos', {headers} );
  }

  DeletePhoto(data){
    this.loadToken();
    let headers = new HttpHeaders();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._user_url + 'delete-photo', data, { headers });
  }

  SendContact(contact){
    this.loadToken();
    let headers = new HttpHeaders();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._user_url + '/addcontact', contact, { headers });
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.User = user;
  }

  logout(){
    this.authToken = null;
    this.User = null;
    localStorage.clear();
  }

  get isLoggedIn(){
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null ) ? true : false;
  }

  get getuser(){
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
}
