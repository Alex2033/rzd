import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ConfirmPushNotifyComponent } from '../../components/confirm-push-notify/confirm-push-notify.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {
  public status: string = 'missed-queue';
  public type: string = '';

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap((params: Params) => {
          this.type = params.type;
          this.setStatus();
        })
      )
      .subscribe();
  }

  setStatus(): void {
    switch (this.type) {
      case 'late-queue':
        this.status = 'Вы пропустили свою очередь, подойдите через 10 минут';
        break;
      case 'missed-queue':
        this.status =
          'Вы пропустили свою очередь, возьмите заново талон в терминале эл.очереди';
        break;
      default:
        this.status = '';
        break;
    }
  }

  openConfirmDialog(): void {
    this.dialog.open(ConfirmPushNotifyComponent, {
      panelClass: 'custom-dialog',
      backdropClass: 'custom-dialog-overlay',
      width: '28rem',
      autoFocus: false,
    });
  }
}
