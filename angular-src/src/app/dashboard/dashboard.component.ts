import { Component, OnInit } from '@angular/core';
import {NgxMasonryOptions} from 'ngx-masonry';
import {FirebaseService} from '../services/firebase.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {ImageinfoComponent} from './imageinfo/imageinfo.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  animal: "string";
  name: "string";
  constructor(private fire: FirebaseService,
              private bottomSheet: MatBottomSheet
             ) {
  }
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.5s',
    gutter: 20,
    resize: true,
    initLayout: true,
    fitWidth: true
  };
  openBottomSheet(): void {
    this.bottomSheet.open(ImageinfoComponent, {
      data: { names: ['Frodo', 'Bilbo'] }
    });

  }
  ngOnInit() {
    this.fire.items.subscribe((res)=>{

    });
}





}






