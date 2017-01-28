import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { ToasterService } from './toaster-service';
import { Storage } from '@ionic/storage';
import { UserService, User } from './user-service';

@Injectable()
export class CurrentUserService extends User {
  isAuthenticated = new BehaviorSubject<boolean>(false)
  loginUrl: string;
  constructor(public http: Http, config: Config, private toasterService: ToasterService, public storage: Storage, public userService: UserService, user: User) {
    super();
    this.loginUrl = config.get('kidfooApiUrl') + '/user/sign_in'
    this.storage.get('token').then(
      (token) => this.token = token
    )
  }

  signIn(email: string, password: string): Observable<boolean> {
    let signInStatus = this.isAuthenticated
    signInStatus.subscribe(
      (authenticated) => {
        if(!authenticated) {
          this._signIn(email, password)
        }
      }
    ).unsubscribe()
    return signInStatus
  }

  signInWithToken(token: string): Observable<boolean> {
    let signInStatus = this.isAuthenticated
    signInStatus.subscribe(
      (authenticated) => {
        if(!authenticated) {
          this.http.get(this.userService.baseUrl).subscribe(
            (response) => {
              this._updateSelf(response.json().data as User)
              this._setIsAuthenticated(true)
              this._setToken(token)
            }
          )
        }
      }
    ).unsubscribe()
    return signInStatus;
  }

  private _signIn(email, password): Observable<boolean> {
    let status = new Observable<boolean>()
    this.http.post(this.loginUrl, { email: email, password: password })
      .map( (res) => { return res.json() } )
      .subscribe(
        (res) => {
          if(res.status == 'success'){
            this._setIsAuthenticated(true)
            this._setToken(res.data.token)
          } else {
            this._unsetToken()
            this._setIsAuthenticated(false)
            this.toasterService.sendToast(res.data)
          }
        },
        (res) => {
          this._unsetToken()
          this._setIsAuthenticated(false)
          this.toasterService.sendToast(res.json().data)          
        }
      )
    return status
  }

  _setIsAuthenticated(status: boolean): void {
    this.isAuthenticated.next(status)
  }

  private _setToken(token: string): void {
    this.token = token
    this.storage.set('token', token)
  }

  private _unsetToken(): void {
    this.token = false
  }

  private _updateSelf(user: User): User {
    this.id         = user.id
    this.first_name = user.first_name
    this.last_name  = user.last_name
    this.first_name = user.first_name
    return this;
  }
}
