import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private ContactService: ContactService,
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  loggedinUser!: User | null
  contact!: Contact
  paramsSubscription!: Subscription
  userSubscription!: Subscription
  isInEditMode: boolean = false
  transferAmount!: number

  async ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(async params => {
      this.isInEditMode = false
      this.loadContact(params['id'])
      if (params['edit'] || (params['id'] === 'edit')) this.isInEditMode = true
    })
    this.userSubscription = this.UserService.user$.subscribe(user => {
      this.loggedinUser = user
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
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

  onSubmitTransfer() {
    if (!this.loggedinUser) return
    if (this.loggedinUser?.coins > this.transferAmount) {
      this.UserService.makeTransaction(this.transferAmount, this.contact.name)
    }
  }

}
