import { Component } from '@angular/core';

import { UserService } from '../../providers/user-service';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { KidsPage } from '../kids/kids';
import { SignUpPage } from '../sign-up/sign-up';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab2Root: any = HomePage
  tab3Root: any = AboutPage
  tab4Root: any = KidsPage
  tab5Root: any = SignUpPage
  tab6Root: any = SignInPage
  isAuthenticated: boolean

  constructor(public userService: UserService) {
    userService.current.map((user) => !!user).subscribe(
        (val) => { this.isAuthenticated = val }
      )
  }
}
