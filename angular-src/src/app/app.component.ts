import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private slimLoadingBarService: SlimLoadingBarService,
              private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  title = 'angular-src';

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.slimLoadingBarService.start();
    }
    if (event instanceof NavigationEnd) {
      this.slimLoadingBarService.complete();
    }
    if (event instanceof NavigationCancel) {
      this.slimLoadingBarService.stop();
    }
    if (event instanceof NavigationError) {
      this.slimLoadingBarService.stop();
    }
  }

}
