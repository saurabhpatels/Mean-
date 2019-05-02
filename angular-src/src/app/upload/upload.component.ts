import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  items: Object;
  filesToUpload: Array<File> = [];
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.5s',
    gutter: 20,
    resize: true,
    initLayout: true,
    fitWidth: true
  };
  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.auth.getPhotos().subscribe((res) => {
      this.items = res;
      console.log(res);
    });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files as Array<File>;
  }
  upload() {


    const formData: any = new FormData();

    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < files.length; i++){

      formData.append('uploads[]', files[i], files[i].name );

    }
    this.auth.uploadimage(formData).subscribe((res) => {
      if (res){
        this.auth.getPhotos().subscribe((res) => {
          this.items = res;
        });
      }

    });



}

  DeletePhoto(data){
    const id = {id : data};
    return this.auth.DeletePhoto(id).subscribe((res: any) => {
      console.log(res);
      if (res.success){
        this.auth.getPhotos().subscribe((res) => {
          this.items = res;
          console.log(res);
        });
      }
    });

  }


}
