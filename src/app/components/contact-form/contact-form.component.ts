import { Location } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  contactForm: FormGroup;
  today = new Date();
  @ViewChild('fileInput') fileInput: ElementRef;
  btnLabel = 'Dodaj kontakt';
  private _contact: Contact;

  @Input() set contact(contact: Contact) {
    this._contact = contact;
    this.btnLabel = 'Edytuj kontakt';
    this.contactForm.patchValue(contact);
  }

  get contact() {
    return this._contact;
  }

  @Output() triggerSubmit = new EventEmitter();

  constructor(private fb: FormBuilder, private location: Location) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      photoUrl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  get photoUrl() {
    return this.contactForm.get('photoUrl').value;
  }

  onSubmit() {
    if ( this.contactForm.valid ) {
      this.triggerSubmit.emit(this.contactForm.value);
      this.formDirective.resetForm();
    }
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.contactForm.get('photoUrl').setValue(imgBase64Path);
          this.contactForm.get('photoUrl').markAsDirty();
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      this.fileInput.nativeElement.value = '';
    }
  }

  back(): void {
    this.location.back();
  }

}
