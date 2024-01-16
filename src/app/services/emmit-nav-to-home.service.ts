import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmmitNavToHomeService {
  
  private clickSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  emitir() {
    this.clickSubject.next(true);
  }

  getClickEvent(): Observable<boolean> {
    return this.clickSubject.asObservable();
  }
}
