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
  @Input() contactId!: string
  contact!: Contact
  paramsSubscription!: Subscription

  async ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(async params => {
      console.log('params[id]:', params['id'])
      const contact = await lastValueFrom(this.ContactService.getContactById(params['id']))
      if (contact) this.contact = contact
    })
  }
  //   ngOnChanges(changes: SimpleChanges): void {
  //     const { previousValue: prevId, currentValue: currId } = changes['contactId']
  //   if(currId && (prevId !== currId)) this.loadContact()
  // }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe()
  }

  async loadContact() {
    const contact = await lastValueFrom(this.ContactService.getContactById(this.contactId));
    if (contact) this.contact = contact
  }

}
