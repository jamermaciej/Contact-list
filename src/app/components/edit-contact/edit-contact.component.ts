import { Contact } from 'src/app/models/contact.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contact: Contact;

  constructor(private route: ActivatedRoute, private router: Router, private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.contact = this.route.snapshot.data.contact;
  }

  editContact(contact: Contact) {
    const contactData = {
      id: this.contact.id,
      ...contact
    };
    this.contactsService.editContact(contactData);
    this.router.navigate(['/']);
  }

}
