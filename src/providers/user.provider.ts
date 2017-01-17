import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Storage } from '@ionic/Storage'
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Sql } from "./sql.provider.ts";
import { Observable }     from 'rxjs/Rx';

@Injectable()
export class UserProvider {
  baseUrl: string = 'http://localhost:3000/api/v1'
  application_id: string = '463bec7374e9f064699413c111b69680f3a5a13a76ec9fe73d6679d54e4318c9'
  options = {  }
  token: string

  constructor(public http: Http, public storage: Storage) {
    this.getAuthenticationToken().then((token) => {
      this.token = token
    })
  }

  isAuthenticated() {
    return new Promise( resolve => {
      this.getAuthenticationToken().then( data => {
        if(data) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }

  setAuthenticationToken(token) {
    this.token = token
    return this.storage.set('token', token).then(data=> console.log(data))
  }

  getAuthenticationToken() {
    return this.storage.get('token')
  }

  login(email: string, password: string) {
    return new Promise( (resolve) => {
      this.http.post(this.baseUrl + '/user/sign_in',
                    {
                      email: email,
                      password: password,
                      application_id: this.application_id
                    }
                  ).subscribe(data => {
                              this.handleLogin(data.json())
                              resolve()},
                              this.handleError
                  )
    })
  }

  handleLogin(response) {
    let user = response.data
    this.setAuthenticationToken(user.access_token)
    return null
  }

  handleError() {
    return null
  }

  getKids() {
    return new Promise( (resolve, reject) => {
      this.getAuthenticationToken().then(token => {
        let headers = new Headers({ 'Content-Type': 'application/json',
                                     'Authorization': 'Bearer ' + token })
        let options = new RequestOptions({ headers: headers })
        this.http.get(this.baseUrl + '/user/kids', { headers: headers }).subscribe(
            data => { resolve(data.json()) }
          )
        }
      )
    })
  }

}

