import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private _contactsList: BehaviorSubject<Contact[]> = new BehaviorSubject([]);
  lastId = 0;

  constructor() {

  }

  getContactListObs(): Observable<Contact[]> {
    return this._contactsList.asObservable();
  }

  addContact(contact: Contact) {
    const list = this._contactsList.getValue();
    const newContact = {
      id: ++this.lastId,
      ...contact
    };
    list.push(newContact);
    this._contactsList.next(list);
  }

  getContact(id: number): Observable<Contact> {
    return of(this._contactsList.getValue().find(c => id === c.id));
  }

  editContact(contact: Contact) {
    const newContacts = this._contactsList.getValue().map(c => c.id === contact.id ? contact : c);
    this._contactsList.next(newContacts);
  }

  removeContact(index: number) {
    const list = this._contactsList.getValue().filter((contact) => contact.id !== index);
    this._contactsList.next(list);
  }

}
