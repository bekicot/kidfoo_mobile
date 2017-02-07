import { NewKidPage } from '../pages/kids/new-kid';
import { LoaderService } from '../providers/loader-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

// ErrorHandler
import { KidfoErrorHandler } from './kidfo-error-handler';

// Services
import { User } from '../providers/user';
import { UserService } from '../providers/user-service';
import { ToasterService } from '../providers/toaster-service';
import { SignedHttpClient } from '../providers/signed-http-client';

// Pages
import { NetworkPage } from '../pages/network/network';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { KidsPage } from '../pages/kids/kids';
import { TabsPage } from '../pages/tabs/tabs';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { FamilyDetailsPage } from '../pages/family-details/family-details';


@NgModule({
  declarations: [
    MyApp,
    NetworkPage,
    ContactPage,
    HomePage,
    TabsPage,
    KidsPage,
    SignUpPage,
    SignInPage,
    FamilyDetailsPage,
    NewKidPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      kidfooApiUrl: 'http://localhost:3000/api/v1',
      // kidfooApiUrl: 'http://192.168.1.2:3000/api/v1',
      toasterDuration: '5000',
      toasterPosition: 'center',
      default_avatar: 'assets/images/default-avatar.png'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NetworkPage,
    ContactPage,
    HomePage,
    TabsPage,
    KidsPage,
    SignUpPage,
    SignInPage,
    FamilyDetailsPage,
    NewKidPage
  ],
  providers: [Storage, User, UserService, ToasterService, LoaderService,SignedHttpClient, { provide: ErrorHandler, useClass: KidfoErrorHandler }]
})
export class AppModule {}
