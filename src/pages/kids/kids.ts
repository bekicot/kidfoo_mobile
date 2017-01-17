import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user.provider'

/*
  Generated class for the Kids page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-kids',
  templateUrl: 'kids.html',
  providers: [UserProvider]
})
export class KidsPage {
  kids = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider) {

  }

  ionViewDidLoad() {
    this.user.getKids().then(
      data => {
        console.log(data)
        this.kids = data['data']
      }
    )
  }

}
