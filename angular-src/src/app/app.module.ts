import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatBottomSheetModule, MatIconModule, MatSelectModule} from '@angular/material';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {environment} from '../environments/environment.prod';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgxMasonryModule} from 'ngx-masonry';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { AdminComponent } from './admin/admin.component';
import { ImageinfoComponent } from './dashboard/imageinfo/imageinfo.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    AdminComponent,
    ImageinfoComponent,
    UploadComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    SlimLoadingBarModule,
    HttpClientModule,
    NgxMasonryModule,
    NgxContentLoadingModule,

    MatBottomSheetModule,



    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut : 3000
    }),
    MatIconModule


  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ImageinfoComponent]
})
export class AppModule { }
