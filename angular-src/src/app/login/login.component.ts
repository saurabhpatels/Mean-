import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(private fb: FormBuilder ,
              private auth: AuthService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {

    this.LoginForm = this.fb.group({
      username:    ['', [Validators.required, Validators.minLength(8) ] ],
      password:    ['', [Validators.required, Validators.minLength(8) ] ],
    });
  }
  get username() {
    return this.LoginForm.get('username');
  }
  get password() {
    return this.LoginForm.get('password');
  }
  clear(){
    this.LoginForm.reset();
  }
  login(){
    const login = this.LoginForm.value;
  }

  authenticateUser(){

    const user = this.LoginForm.value;
    this.auth.authenticateUser(user).subscribe((data: any ) => {
      console.log(data.token);
      if (data.success){
        this.toastr.success(data.user.name , 'Welcome');
        this.auth.storeUserData(data.token, data.user);
        this.router.navigate(['dashboard']);
       }else{
        this.toastr.error(data.msg, 'Failed');
        this.router.navigate(['login']);
       }
    });
  }
}
