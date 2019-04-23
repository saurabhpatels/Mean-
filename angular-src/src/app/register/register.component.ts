import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerfrom: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerfrom = this.fb.group({
      firstname: ['', Validators.required],
      lastname:  ['', Validators.required],
      password:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],

    });
  }
  onSubmit(form: FormGroup) {
   console.log(form);
  }
}
