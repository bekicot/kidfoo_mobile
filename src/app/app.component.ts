import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ToasterService } from '../providers/toaster-service';
import { UserService } from '../providers/user-service';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html',
  providers: [ToasterService]
})

export class MyApp {
  rootPage = TabsPage
  isAuthenticated: boolean = false
  email = null
  password = null

  constructor(public platform: Platform,
              public config: Config,
              public toaster: ToasterService,
              public userService: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
