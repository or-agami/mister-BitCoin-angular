import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private ContactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  contact!: Contact
  paramsSubscription!: Subscription
  isInEditMode: boolean = false

  async ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(async params => {
      this.isInEditMode = false
      this.loadContact(params['id'])
      if (params['edit'] || (params['id'] === 'edit')) this.isInEditMode = true
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe()
  }

  async onSaveContact() {
    const contact = await this.ContactService.saveContact(this.contact)
    this.isInEditMode = false
    this.router.navigate(['/contact', contact._id])
  }

  async loadContact(contactId: string) {
    const contact = await lastValueFrom(this.ContactService.getContactById(contactId));
    if (contact) this.contact = { ...contact }
  }

}
