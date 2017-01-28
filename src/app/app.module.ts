import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

// Services
import { CurrentUserService } from '../providers/current-user-service';
import { User, UserService } from '../providers/user-service';

// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { KidsPage } from '../pages/kids/kids';
import { TabsPage } from '../pages/tabs/tabs';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    KidsPage,
    SignUpPage,
    SignInPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      kidfooApiUrl: 'http://localhost:3000/api/v1',
      toasterDuration: '100000',
      toasterPosition: 'center'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    KidsPage,
    SignUpPage,
    SignInPage
  ],
  providers: [Storage, CurrentUserService, UserService, User, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
