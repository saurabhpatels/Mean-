import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor( private Db: AngularFireDatabase) {
    this.itemsRef = this.Db.list('photos');
    this.items = this.Db.list('photos').valueChanges();
    //Added ObjectId Into The List
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }))
      )
    );
  }

  getphoto(){

  }



}
