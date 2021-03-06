import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private auth: AuthService,
               private toastr: ToastrService,
               private router: Router) { }

  ngOnInit() {}
  logout(){
  this.auth.logout();
  this.toastr.success('You Are Logged Out', 'ThankYou');
  this.router.navigate(['login']);
  return false;
  }

}
