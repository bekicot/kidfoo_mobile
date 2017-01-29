import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers/user';
import { UserService } from '../../providers/user-service';
import { ToasterService } from '../../providers/toaster-service';
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  newUser: User = new User();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public userService: UserService,
              public toaster: ToasterService
              ) {
    this.newUser['first_name'] = 'Yana Agun Siswanto'
    this.newUser['email'] = 'yana.developer@gmail.com'
    this.newUser['password'] = '123456'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(user: NgForm): void {
    this.userService.create(user.value as User)
  }

}
