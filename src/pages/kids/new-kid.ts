import { ToasterService } from '../../providers/toaster-service';
import { UserService } from '../../providers/user-service';
import { Kid } from '../../providers/kid';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  templateUrl: './new-kid.html',
  selector: 'page-new-kid'
})

export class NewKidPage {
  kid: Kid
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public userService: UserService,
      public toasterService: ToasterService
  ) {
    this.kid = this.navParams.get('kid')
  }
  createKid(form: NgForm){
    this.userService.createKid(form.value as Kid).then(
      (kids) => {
        this.navCtrl.pop()
      },
      (err) => this.toasterService.sendToast(err.json().data)
    )
  }
}