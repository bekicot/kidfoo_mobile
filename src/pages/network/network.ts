import { LoaderService } from '../../providers/loader-service';
import { UserService } from '../../providers/user-service';
import { Family } from '../../providers/family';
import { Component } from '@angular/core';
import { FamilyDetailsPage } from '../../pages/family-details/family-details';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-network',
  templateUrl: 'network.html'
})
export class NetworkPage {
  family: Family
  families: Family[]

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public loader: LoaderService) {
    this.families = []
    this.family   = new Family
  }
  ionViewWillEnter() {
    this.reloadVariables()
  }
  reloadVariables() {
    this.loader.presentLoader('Loading Family')
    this.userService.getFamily().then(
      (family) => {
        this.family = family
        this.loader.dismissLoader('Loading Family')
      },
      (error) => {
        this.loader.dismissLoader('Loading Family')
      }
    )
    this.loader.presentLoader('Loading Famililies')
    this.userService.getFamilies().then(
      (families) => {
        this.families = families
        this.loader.dismissLoader('Loading Famililies')
      },
      (errors) => {
        this.loader.dismissLoader('Loading Famililies')
      }
    )
  }
  familyDetails(family: Family): void {
    this.navCtrl.push(FamilyDetailsPage, {family: family})
  }
}
