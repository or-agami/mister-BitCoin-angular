import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(private ContactService: ContactService) { }

  contacts!: Contact[]
  subscription!: Subscription
  selectedContactId: string = ''

  prm = Promise.resolve(14)

  ngOnInit(): void {
    this.ContactService.loadContacts()
    this.subscription = this.ContactService.contacts$.subscribe(contacts => {
      this.contacts = contacts
    })
    if (this.contacts[0]._id) this.selectedContactId = this.contacts[0]._id
  }

  onSelectContact(contactId: string) {
    console.log('contactId:', contactId)
    this.selectedContactId = contactId
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
