import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { KidsPage } from '../kids/kids';
import { SignUpPage } from '../sign-up/sign-up';
import { SignInPage } from '../sign-in/sign-in';
import { CurrentUserService } from '../../providers/current-user-service'
import { Observable } from 'rxjs/rx'

@Component({
  templateUrl: 'tabs.html',
  providers: [CurrentUserService]
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab2Root: any = HomePage
  tab3Root: any = AboutPage
  tab4Root: any = KidsPage
  tab5Root: any = SignInPage
  tab6Root: any = SignUpPage
  isAuthenticated: boolean
  constructor(currentUserService: CurrentUserService) {
    currentUserService.isAuthenticated.subscribe(
      (val) => this.isAuthenticated = val
    )
  }
}
