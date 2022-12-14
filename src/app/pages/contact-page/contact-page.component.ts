import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(
    private ContactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  contacts!: Contact[]
  subscription!: Subscription
  selectedContactId: string = ''
  isContactListOpen: boolean = false // for mobile only

  prm = Promise.resolve(14)

  ngOnInit(): void {
    this.ContactService.loadContacts()
    this.subscription = this.ContactService.contacts$.subscribe(contacts => {
      this.contacts = contacts
    })
    if (this.contacts[0]._id && this.route.children.length === 0) this.router.navigate(['contact', this.contacts[0]._id])
  }

  onCloseContactList() {
    this.isContactListOpen = false
  }

  onToggleContactList() {
    this.isContactListOpen = !this.isContactListOpen
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
