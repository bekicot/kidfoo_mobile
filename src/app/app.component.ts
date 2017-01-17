import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserProvider } from '../providers/user.provider'
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'


@Component({
  templateUrl: 'app.html',
  providers: [UserProvider]
})

export class MyApp {
  rootPage = TabsPage
  isAuthenticated: any
  email = null
  password = null

  constructor(platform: Platform, private user: UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.user.isAuthenticated().then(status => {
      this.isAuthenticated = status
    })
  }

  login(){
    this.user.login(this.email, this.password).then(
      () => this.isAuthenticated = true
    )
  }
}
