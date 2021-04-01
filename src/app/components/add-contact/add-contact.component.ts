import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  addContact(contact: Contact) {
    this.contactsService.addContact(contact);
  }
}
