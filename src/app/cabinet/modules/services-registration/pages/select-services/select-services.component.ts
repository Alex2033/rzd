import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';
import { ServicesService } from 'src/app/shared/services/services.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { QuestionnaireOrderInterface } from 'src/app/shared/types/questionnaire-order.interface';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { QuestionnairesService } from '../../../questionnaire/services/questionnaires.service';
import { QuestionnaireInterface } from '../../../questionnaire/types/questionnaire.interface';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.component.html',
  styleUrls: ['./select-services.component.scss'],
})
export class SelectServicesComponent implements OnInit, OnDestroy {
  public questionnaires$: Observable<QuestionnaireInterface[]>;
  public services$: Observable<ServiceInterface[]>;
  public selectedService: ServiceInterface;
  public separateSelected: ServiceInterface[] = [];
  public selectEach: boolean = false;
  public order: OrderInterface = {} as OrderInterface;

  private orderId: number;
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    public servicesRegistration: ServicesRegistrationService,
    public questionnairesService: QuestionnairesService,
    private services: ServicesService,
    private router: Router,
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.getOrder();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getOrder(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.orderId = +params.id;
          return this.ordersService.getOrder(+params.id);
        })
      )
      .subscribe((res) => {
        if (res) {
          res.items.forEach((item) => {
            item.services.forEach((service: any) => {
              this.separateSelected.push(service.id_service);
            });
          });
          this.servicesRegistration.setOrder(res);
        }
      });
  }

  initializeValues(): void {
    this.order = this.servicesRegistration.order;
    this.questionnaires$ = this.questionnairesService.getQuestionnaires();
    this.services$ = this.services.getServices().pipe(shareReplay());
  }

  selectService(): void {
    this.servicesRegistration.setOrder(this.order);
    if (this.orderId) {
      this.router.navigate(
        ['/cabinet', 'services-registration', 'document', this.orderId],
        {
          queryParams: {
            questionnaireNum: 1,
            docIndex: 1,
          },
        }
      );
      return;
    }

    this.ordersService.createOrder(this.order).subscribe(
      (res) => {
        this.servicesRegistration.setOrder(res);
        this.router.navigate(
          ['/cabinet', 'services-registration', 'document', res.id],
          {
            queryParams: {
              questionnaireNum: 1,
              docIndex: 1,
            },
          }
        );
      },
      () => alert('Ошибка')
    );
  }

  selectionChange(event: number, item: QuestionnaireOrderInterface): void {
    if (this.selectEach) {
      item.services = [event];
    } else {
      this.order.items.map((o) => {
        o.services = [event];
      });
    }

    this.servicesRegistration.setOrder(this.order);
  }

  changeSelectionMode(): void {
    this.selectEach = !this.selectEach;
  }
}