import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
@Component({
  selector: 'app-imageinfo',
  templateUrl: './imageinfo.component.html',
  styleUrls: ['./imageinfo.component.scss']
})
export class ImageinfoComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private bottomSheetRef: MatBottomSheetRef<ImageinfoComponent>) {}
  ngOnInit() {

  }

  dismiss(){
    this.bottomSheetRef.dismiss();
  }




}
