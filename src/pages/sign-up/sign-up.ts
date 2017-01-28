import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { User, UserService } from '../../providers/user-service'

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [User, UserService]
})
export class SignUpPage {

  newUser: User

  constructor(public navCtrl: NavController, public navParams: NavParams, user: User, userProvider: UserService) {
    this.newUser = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(user: NgForm) {
    console.log(user.value as User)
  }

}
