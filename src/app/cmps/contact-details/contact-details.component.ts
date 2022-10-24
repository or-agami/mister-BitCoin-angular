import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnChanges {

  constructor(private ContactService: ContactService) { }

  @Input() contactId!: string
  contact!: Contact


  ngOnChanges(changes: SimpleChanges): void {
    const { previousValue: prevId, currentValue: currId } = changes['contactId']
    if (currId && (prevId !== currId)) this.loadContact()
  }

  async loadContact() {
    const contact = await lastValueFrom(this.ContactService.getContactById(this.contactId));
    if (contact) this.contact = contact
  }

}
