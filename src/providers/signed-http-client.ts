import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SignedHttpClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SignedHttpClient {
  headers: Headers = new Headers()
  constructor(public http: Http) {

  }
  setAuthorizationHeaders(access_token: string):void {
    this.headers.append('Authorization', 'Bearer ' + access_token)
  }
  authorizationHeader() {
    return this.headers.get('Authorization')
  }
  checkHeaders(): void {
    if(!this.authorizationHeader() || this.authorizationHeader() == '' ){
      throw('undefined Authorization')
    }
  }
  get(url) {
    this.checkHeaders()
    return this.http.get(url, {
      headers: this.headers
    });
  }

  post(url, data) {
    this.checkHeaders()
    return this.http.post(url, data, {
      headers: this.headers
    });
  }

}
