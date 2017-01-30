import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, ReplaySubject } from 'rxjs/rx';
import { Toast } from 'ionic-native';

import { Config, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the ToasterService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

class Message {
  createdAt: Date
  payload: string
}

@Injectable()
export class ToasterService {
  private message   = new Subject<Message>()
  messages  = new ReplaySubject<Message>(20)

  constructor(public http: Http,
              public config: Config,
              public toast: ToastController) {
    this.message.subscribe(
      payload => this.messages.next(payload)
    )
  }

  sendToast(payload: string): Promise<any> {
    let toast: Promise<any>;
    if(window['cordova'].platformId != 'browser'){
      toast = Toast.show(payload, this.config.get('toasterDuration'), this.config.get('toasterPosition')).toPromise()
    } else {
      toast = new Promise((resolve, reject)=> {
        let t = this.toast.create({
          message: payload,
          duration: this.config.get('toasterDuration')
        })
        t.present().then(() => resolve(true) )
      })
    }
    return toast;
  }
}
