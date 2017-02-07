import { NewKidPage } from './new-kid';
import { ToasterService } from '../../providers/toaster-service';
import { UserService } from '../../providers/user-service';
import { Kid } from '../../providers/kid';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the Kids page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-kids',
  templateUrl: 'kids.html',
  providers: []
})
export class KidsPage {
  kids: Kid[]
  loader: Loading

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserService,
              public loadingController: LoadingController,
              public toast: ToasterService) {
    this.kids = []
  }

  ionViewWillEnter() {
    this.presentLoader()
    this.userService.getKids().then(
      (kids) => {
        this.kids = kids
        this.dismissLoader()
      },
      (error) => {
        this._processError(error)
        this.dismissLoader()
      }
    )
  }

  public presentLoader(): void {
    this.loader = this.loadingController.create({
      content: 'Retrieving Kids...',
      dismissOnPageChange: true
    })
    this.loader.present()
  }

  public dismissLoader(): void {
    this.loader.dismiss()
  }

  public newKid(): void {
    this.navCtrl.push(NewKidPage, { kid: new Kid })
  }
  private _processError(error):void {
    switch (error.status) {
      case 0:
        this.toast.sendToast('No Internet Connection')
        break;
      case 500:
        this.toast.sendToast('Server Error!')
      case 401:
        this.toast.sendToast('You are logged out')
      default:
        break;
    }
  }
}
