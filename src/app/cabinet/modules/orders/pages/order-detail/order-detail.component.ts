import { BarcodeModalComponent } from './../../components/barcode-modal/barcode-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServicesService } from 'src/app/shared/services/services.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';
import { ServiceInterface } from 'src/app/shared/types/service.interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  public order: OrderInterface = {} as OrderInterface;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private services: ServicesService,
    private points: ServicePointsService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.services.getServices(),
      this.points.getServicePoints(),
      this.route.params.pipe(
        switchMap((params: Params) => this.ordersService.getOrder(+params.id))
      ),
    ]).subscribe(
      ([services, points, order]) => {
        this.order = order;
        console.log('this.order:', this.order);
        this.addAddressToOrder(points);
        this.addServicesToOrder(services);
      },
      (err) => console.error(err)
    );
  }

  addAddressToOrder(points: ServicePointInterface[]): void {
    this.order['address'] = points.find(
      (point) => point.id === this.order.id_point
    )['address'];
  }

  addServicesToOrder(services: ServiceInterface[]): void {
    this.order.items.forEach((questionnaire) => {
      questionnaire['services'].forEach((service: any) => {
        service['name'] = services.find((serv) => {
          return serv.id === service.id_service;
        })['name'];
        service['priceType'] = services.find((serv) => {
          return serv.id === service.id_service;
        })['priceType'];
      });
    });
  }

  openBottomSheet(extId: string): void {
    const bottomSheet = this._bottomSheet.open(BarcodeModalComponent, {
      panelClass: 'custom-bottom-sheet',
      data: {
        extId,
      },
    });
  }
}
