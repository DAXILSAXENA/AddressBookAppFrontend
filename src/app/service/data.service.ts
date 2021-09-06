import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Addressbook } from '../model/addressbook';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private addressbookSource = new BehaviorSubject(new Addressbook);
  currentAddressbook = this.addressbookSource.asObservable();

  constructor() { }

  changeAddressbook(addressbook: Addressbook) {
    console.log(addressbook);
    this.addressbookSource.next(addressbook);
  }
}
