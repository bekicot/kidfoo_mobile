import { Family } from '../../providers/family';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the FamilyDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-family-details',
  templateUrl: 'family-details.html'
})
export class FamilyDetailsPage {
  family: Family
  familyKeys: string[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.family = this.navParams.get('family')
    this.familyKeys = Object.keys(this.family)
  }

}
