import { Component, OnInit } from '@angular/core';
import {PopoverModule} from 'ngx-popover';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number =  22.959642;
  lng: number = 73.341291;
  contactForm: FormGroup;
  constructor(private fb: FormBuilder ) {
    this.contactForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(8) ] ],
      contactNo:    ['', [Validators.required, Validators.minLength(8) ] ],
      message:    ['', [Validators.required, Validators.minLength(8) ] ]
    });
  }

  ngOnInit() {
  }

}
