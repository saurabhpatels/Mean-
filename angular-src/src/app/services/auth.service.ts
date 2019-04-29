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


  constructor(private http: HttpClient ) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  }
  get isLoggedIn(){
    const user = JSON.parse(localStorage.getItem('id_token'));
    return (user !== null ) ? true : false;
  }
  get getuser(){
    const user = JSON.parse(localStorage.getItem('id_token'));
    return user;
  }
  gettoken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

  authenticateUser(user){
    return this.http.post(this._user_url + '/authenticate', user, { headers : this.headers });
  }
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('id_token', JSON.stringify(user));
    this.authToken = token;
    this.User = user;

  }


  getPhotos(){
    return this.http.get(this._user_url + 'getphotos',  );
  }
  uploadimage(formData){
    return this.http.post(this._user_url + 'uploadImg', formData  );
  }
  registeruser(user){
    return this.http.post(this._user_url + '/register', user, { headers : this.headers });
  }
  SendContact(contact){
    return this.http.post(this._user_url + '/addcontact', contact, { headers : this.headers });
  }
  getprofile(user){

    let headers = new HttpHeaders();
    this.gettoken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get(this._user_url + '/profile', { headers : this.headers });
  }


  logout(){
    this.authToken = null;
    this.User = null;
    localStorage.clear();
  }


}
