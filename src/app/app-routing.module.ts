import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressBookComponent } from './components/address-book/address-book.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ContactResolver } from './services/contact-resolver.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    children: [
      {
        path: '',
        component: AddressBookComponent
      },
      {
        path: ':id',
        component: EditContactComponent,
        resolve: { contact: ContactResolver }
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
