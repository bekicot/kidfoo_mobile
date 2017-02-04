import { UserService } from '../../providers/user-service';
import { ToasterService } from '../../providers/toaster-service';
import { Component } from '@angular/core';
import { NavController, Config } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser
  default_avatar
  constructor(public navCtrl: NavController,
              public toast: ToasterService,
              public userService: UserService,
              public config: Config) {
    this.userService.current.filter((user) => !!user ).subscribe(
      (user) => {
        this.currentUser = user
        this.set_default_avatar_url()
      },
      () => {}
    )
  }
  ionViewDidLoad() {

  }

  set_default_avatar_url(): void{
    if(this.currentUser.avatar_url && this.currentUser.avatar_url != ''){
      this.default_avatar =  this.currentUser.avatar_url
    } else {
      this.default_avatar = this.config.get('default_avatar')
    }
  }

  signOut() {
    this.userService.destroySession()
  }
}



// WEBPACK FOOTER //
// ./src/pages/home/home.ts