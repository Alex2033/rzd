import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueRoutingModule } from './queue-routing.module';
import { QueueComponent } from './pages/queue/queue.component';
import { ConfirmPushNotifyComponent } from './components/confirm-push-notify/confirm-push-notify.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [QueueComponent, ConfirmPushNotifyComponent],
  imports: [CommonModule, QueueRoutingModule, MatDialogModule, MatButtonModule],
})
export class QueueModule {}
