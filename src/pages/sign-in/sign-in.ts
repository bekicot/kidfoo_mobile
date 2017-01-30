import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserService
              ) {}

  ionViewDidLoad() {

  }

  signIn(user) {
    this.userService.signIn(user.value.email, user.value.password);
  }

}
