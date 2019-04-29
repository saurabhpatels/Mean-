import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  LoginForm: FormGroup;
  title: string = 'My first AGM project';
  user:any;


  constructor(private fb: FormBuilder , private auth: AuthService, private toastr: ToastrService ) {
    this.LoginForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(5) ] ],
      number:    ['', [Validators.required, Validators.minLength(12) ] ],
      message:    ['', [Validators.required, Validators.minLength(25) ] ]
    });
  }
  get name() {
    return this.LoginForm.get('name');
  }
  get number() {
    return this.LoginForm.get('number');
  }
  get message() {
    return this.LoginForm.get('message');
  }
  clear(){
    this.LoginForm.reset();
  }

  SendContact(){
    const contact = this.LoginForm.value;
    this.auth.SendContact(contact).subscribe((data: any ) => {

      if (data.success){
        this.toastr.info(data.msg, 'We Will Get back To You Shortley');
      }else{
        this.toastr.error(data.msg, 'Failed');
      }
    });
  }

  ngOnInit() {
    this.user = this.auth.getuser;
    console.log(this.user);
  }

}
