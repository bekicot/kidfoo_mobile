import { ToasterService } from './toaster-service';
import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular'
@Injectable()
export class LoaderService {
  loader: Loading
  loadings: string[]
  constructor(public loadingController: LoadingController,
              public toaster: ToasterService) {
    this.loadings = []
  }

  public presentLoader(description: string): void {
    if(this.loadings.length <= 0){
      this.loader = this.loadingController.create({
        content: 'Retrieving Kids...',
        dismissOnPageChange: true
      })
      this.loader.present()
    }
    this.loadings.push(description)
  }
  public dismissLoader(description?): void {
    let finished
    if(!!description){
      for(let loading of this.loadings){
        if(loading == description) {
          finished = loading
          this.loadings.splice(this.loadings.indexOf(loading), 1)
          break
        }
      }
    } else {
      finished = this.loadings.shift()
    }
    if(this.loadings.length > 0) {
      this.toaster.sendToast(finished + ' is finished')
    } else {
      this.loader.dismiss()
    }
  }

}
