import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrdersService } from '../../services/orders.service';
import { OrderInterface } from '../../types/order.interface';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  public order$: Observable<OrderInterface>;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.order$ = this.route.params.pipe(
      switchMap((params: Params) => this.ordersService.getOrder(+params.id))
    );
  }
}
