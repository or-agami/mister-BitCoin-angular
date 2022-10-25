import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {

  constructor(
    private ContactService: ContactService,
    private router: Router,
  ) { }

  @Input() contact!: Contact;
  @Output() selectedContactId = new EventEmitter<string>()
  subscription!: Subscription
  contacts!: Contact[]

  ngOnInit(): void {
    this.ContactService.loadContacts()
    this.subscription = this.ContactService.contacts$.subscribe(contacts => {
      this.contacts = contacts
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onEditContact(ev: Event) {
    ev.stopPropagation()
  }

  onRemoveContact(contactId: string) {
    console.log('hello from preview');
    if (contactId) this.ContactService.deleteContact(contactId)
    if (window.location.hash.includes(contactId)) this.router.navigate(['contact', this.contacts[0]._id])
    // if (window.location.hash.includes(contactId)) this.router.navigate(['/contact'])
  }

}
