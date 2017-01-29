import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ReplaySubject} from 'rxjs/rx';
import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { SignedHttpClient } from './signed-http-client'
import 'rxjs/add/operator/map';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  baseUrl: string
  loginUrl: string
  token?: string
  users: User[]
  current: ReplaySubject<User> = new ReplaySubject<User>()

  constructor(public http: Http,
              public signed: SignedHttpClient,
              public config: Config,
              public storage: Storage) {
    this.baseUrl  = config.get('kidfooApiUrl') + '/user'
    this.loginUrl = this.baseUrl + '/sign_in'
    this.users    = []
    this.current.subscribe(
      (user) => this.setToken(user.token),
      (err) => this.unsetToken()
    )
    this.storage.get('token').then(
      (token) => {
        if(token){
          this.setToken(token)
        }
      }
    )
    this.storage.get('currentUser').then(
      (user) => {
        if(!!user){
          this._push(user)
          this.setCurrent(user.token)
        }
      }
    )
  }
  reloadCurrent(): Promise<User> {
    let response = this.signed.get(this.baseUrl).map(
      (res) => res.json().data as User
    )
    response.subscribe(
      (user) => {
        this._push(user)
        this.setCurrent(user.token)
      }
    )
    return response.toPromise()
  }
  setToken(token: string):string {
    this.signed.setAuthorizationHeaders(token)
    this.storage.set('token', token)
    return this.token = token
  }
  unsetToken():void{
    this.token = undefined
    this.signed.headers.delete(this.signed.authorizationHeader())
    this.storage.set('token', undefined)
  }
  signIn(email: string, password: string): Promise<User> {
    let signInObservable = this.http.post(this.loginUrl, { email: email,
                                                          password: password })
                           .map(res => res.json().data as User)
    signInObservable.subscribe(
      (user) => {
        this._push(user)
        this.setCurrent(user.token)
      }
    )
    return signInObservable.toPromise()
  }

  create(user: User): Promise<User> {
    let request = this.http.post(this.baseUrl, user).map(
      (response) => response.json().data as User
    ).toPromise()
    request.then((user)=> {
      this._push(user)
      this.setCurrent(user.token)
    })
    return request
  }

  findUser(userId: number): User|undefined {
    for(let user of this.users) {
      if(user.id == userId) {
        return user
      }
    }
    return undefined
  }

  findUserByToken(token: string): User|undefined {
    for(let user of this.users) {
      if(user.token == token) {
        return user
      }
    }
    return undefined
  }

  setCurrent(token: string): Promise<User> {
    let foundUser = this.findUserByToken(token)
    this.signed.setAuthorizationHeaders(token)
    if(foundUser) {
      this.current.next(foundUser)
      this.storage.set('currentUser', foundUser)
      return new Promise((resolve) => resolve(foundUser))
    } else {
      let response = this.signed.get(this.baseUrl).map(
        (res) => res.json().data,
        () => console.log('Something Went wrong, is the user authenticated?')
      )
      response.subscribe(
        (user) => this.current.next(user)
      )
      return response.toPromise()
    }
  }

  private _push(user: User): User {
    this.users.push(user)
    this.storage.set('users',this.users)
    return user;
  }
}
