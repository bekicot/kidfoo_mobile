import { Family } from './family';
import { Kid } from './kid';
import { ToasterService } from './toaster-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ReplaySubject } from 'rxjs/rx';
import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { SignedHttpClient } from './signed-http-client'
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  baseUrl: string
  loginUrl: string
  access_token?: string
  users: User[]
  current: ReplaySubject<User|undefined>

  constructor(public http: Http,
              public signed: SignedHttpClient,
              public config: Config,
              public storage: Storage,
              public toaster: ToasterService) {
    this.baseUrl  = config.get('kidfooApiUrl') + '/user'
    this.loginUrl = this.baseUrl + '/sign_in'
    this.users    = []
    this.storage.get('currentUser').then(
      (user) => {
        if(!!user){
          this._push(user)
          this.setCurrent(user.access_token).then(
            // Check User Status, is it still logged in
            // Do nothing when offline
            () => {
              this.reloadCurrent()
            }
          )
        }
      }
    )
    this.current = new ReplaySubject<User|undefined>()
  }

  reloadCurrent(): Promise<User> {
    let response = this.signed.get(this.baseUrl).map(
      (res) => res.json().data as User
    ).toPromise()
    response.then(
      (user) => {
        this._push(user)
        this.setCurrent(user.access_token)
      },
      (err) => {
        if(err.status == 401) {
          this.destroySession()
        }
       }
    )
    return response
  }
  destroySession(): void {
    this.current.next(undefined)
  }

  setToken(access_token: string):string {
    this.signed.setAuthorizationHeaders(access_token)
    this.storage.set('access_token', access_token)
    return this.access_token = access_token
  }

  unsetToken():void{
    this.access_token = undefined
    this.signed.headers.delete(this.signed.authorizationHeader())
    this.storage.set('access_token', undefined)
  }

  signIn(email: string, password: string): Promise<User> {
    let signInPromise = this.http.post(this.loginUrl, { email: email,
                                                          password: password })
                           .map(res => res.json().data as User).toPromise()
    signInPromise.then(
      (user) => {
        this._push(user)
        this.setCurrent(user.access_token)
      },
      (err) => this.toaster.sendToast(err.json().data )
    )
    return signInPromise
  }

  create(user: User): Promise<User> {
    let request = this.http.post(this.baseUrl, user).map(
      (response) => response.json().data as User
    ).toPromise()
    request.then((user)=> {
      this._push(user)
      this.setCurrent(user.access_token)
    },
    (err) => {
      this.toaster.sendToast(err.json().data)
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

  findUserByToken(access_token: string): User|undefined {
    for(let user of this.users) {
      if(user.access_token === access_token) {
        return user
      }
    }
    return undefined
  }

  setCurrent(access_token: string|undefined ): Promise<User> {
    if(access_token === undefined){
      this.destroySession()
      return new Promise((resolve, reject) => reject(undefined))
    }
    let foundUser = this.findUserByToken(access_token)
    this.signed.setAuthorizationHeaders(access_token)
    if(foundUser) {
      this.current.next(foundUser)
      this.storeCurrentUser(foundUser)
      return new Promise((resolve) => resolve(foundUser))
    } else {
      let response = this.signed.get(this.baseUrl).map(
        (res) => res.json().data,
        () => console.log('Something Went wrong, is the user authenticated?')
      )
      response.subscribe(
        (user) => {
          this.current.next(user)
          this.storeCurrentUser(user)
        }
      )
      return response.toPromise()
    }
  }

  getKids(): Promise<Kid[]> {
    return this.signed.get(this.baseUrl + '/kids')
      .map((kids)=> kids.json().data as Kid[] )
      .toPromise()
  }

  createKid(kid: Kid): Promise<Kid> {
    let kidProm = this.signed.post(this.baseUrl + '/kids', kid).map((kid) => kid.json().data as Kid).toPromise()
    return kidProm
  }

  getFamily(): Promise<Family> {
    const familyObs = this.signed.get(this.baseUrl + '/family')
                  .map((fam) => fam.json().data as Family).toPromise()
    familyObs.catch(this._generic_error_handler)
    return familyObs
  }

  getFamilies(): Promise<Family[]>{
    let familyObs = this.signed.get(this.baseUrl + '/families')
                  .map((fam) => fam.json().data as Family[]).toPromise()
    familyObs.catch(this._generic_error_handler)
    return familyObs
  }

  private _push(user: User): User {
    this.users.unshift(user)
    this.storage.set('users',this.users)
    return user;
  }

  private storeCurrentUser(user: User): Promise<User> {
    return this.storage.set('currentUser', user)
  }

  private _generic_error_handler(error):void {
    this.toaster.sendToast(error.json().data.values)
  }
}
