import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { CurrentUserService } from '../providers/current-user-service';
import { ToasterService } from '../providers/toaster-service';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html',
  providers: [CurrentUserService, ToasterService]
})

export class MyApp {
  rootPage = TabsPage
  isAuthenticated: boolean = false
  email = null
  password = null

  constructor(platform: Platform, config: Config, private currentUserService: CurrentUserService, public toaster: ToasterService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.currentUserService.isAuthenticated.subscribe(
      (value) => this.isAuthenticated = value
    )
  }

  login(){
    this.currentUserService.signIn(this.email, this.password)
  }
}
