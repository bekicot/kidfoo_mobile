import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from 'ionic-angular'
import { Observable, BehaviorSubject } from 'rxjs/rx'
import 'rxjs/add/operator/map';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class User {
  id: number
  role: string
  name: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  avatar: string
  token: string | false
}

@Injectable()
export class UserService extends User {
  baseUrl: string
  constructor(public http: Http, config: Config) {
    super()    
    this.baseUrl = config.get('kidfooApiUrl') + '/user'
  }

  create(user: User): Promise<User> {
    return this.http.post(this.baseUrl, user).toPromise().then(
      (user) => {  }
    )
  }

}
