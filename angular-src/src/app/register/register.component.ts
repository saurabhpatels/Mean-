import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder ,
              private auth: AuthService,
              private toastr: ToastrService,
              private router: Router
              ) { }

  ngOnInit() {this.myForm = this.fb.group({
  firstname:   ['', [Validators.required ] ],
  lastname:    ['', [Validators.required ] ],
  email:       ['', [Validators.required, Validators.email ] ],
  username:    ['', [Validators.required, Validators.minLength(8) ] ],
  password:    ['', [Validators.required, Validators.minLength(8) ] ],

}); }

  get firstname() {
     return this.myForm.get('firstname');
  }
  get lastname() {
    return this.myForm.get('lastname');
  }
  get email() {
    return this.myForm.get('email');
  }
  get username() {
    return this.myForm.get('username');
  }
  get password() {
    return this.myForm.get('password');
  }
  clear(){
    this.myForm.reset();
  }

  registeruser(){
    const user = this.myForm.value;
    this.auth.registeruser(user).subscribe((data: any ) => {

      if (data.success){
        this.toastr.success(data.msg, 'Success');
        this.router.navigate(['login']);
      }else{
        this.toastr.error(data.msg, 'Failed');
      }
    });
  }


}
