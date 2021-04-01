import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolver implements Resolve<Contact> {
    constructor(private contactsService: ContactsService, private router: Router) {

    }
    resolve(route: ActivatedRouteSnapshot ): Observable<Contact> {
        return this.contactsService.getContact(+route.params.id).pipe(
          map(contact => {
            if (contact) {
              return contact;
            } else {
              this.router.navigate(['/contacts']);
            }
          })
        );
    }
}
