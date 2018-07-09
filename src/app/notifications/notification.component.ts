import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  messages: any;

  constructor(private toast: NotificationService) { }

  ngOnInit() {
    this.messages = this.toast.getMessages();
  }

  dismiss(itemKey) {
    this.toast.dismissMessage(itemKey);
  }

}