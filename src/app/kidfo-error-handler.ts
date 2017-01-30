import { ToasterService } from '../providers/toaster-service';
import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class KidfoErrorHandler implements ErrorHandler {
  constructor(public toast: ToasterService) {
  }

  handleError(err: any): void {
    if(err.message.match(/Uncaught \(in promise\)/)) {
      console.log(err.message)
      return
    }
    this.toast.sendToast(err.message)
  }
}