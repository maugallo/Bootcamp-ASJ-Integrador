import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedProductCategoryService {

  private renderTrigger = new Subject<void>;
  public renderTriggerObservable = this.renderTrigger.asObservable(); //We make this variable an Observable, so neither component can access to the Subject and change or emit a value. Only the service can.

  triggerProductCrud(){
    this.renderTrigger.next();
  }

}
