import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {NgxMasonryOptions} from 'ngx-masonry';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 20,
    resize: true,
    initLayout: true,
    fitWidth: true
  };
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor( private Db: AngularFireDatabase) {
    this.itemsRef = this.Db.list('photos');
    this.items = this.Db.list('photos').valueChanges();
  }

  ngOnInit() {
  }



}
