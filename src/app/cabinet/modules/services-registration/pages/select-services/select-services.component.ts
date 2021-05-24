import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';
import { ServicesService } from 'src/app/shared/services/services.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { QuestionnairesService } from '../../../questionnaire/services/questionnaires.service';
import { QuestionnaireInterface } from '../../../questionnaire/types/questionnaire.interface';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.component.html',
  styleUrls: ['./select-services.component.scss'],
})
export class SelectServicesComponent implements OnInit {
  public questionnaires$: Observable<QuestionnaireInterface[]>;
  public services$: Observable<ServiceInterface[]>;
  public selectedService: ServiceInterface;
  public selectEach: boolean = false;
  public order: OrderInterface = {} as OrderInterface;

  constructor(
    public servicesRegistration: ServicesRegistrationService,
    private questionnairesService: QuestionnairesService,
    private services: ServicesService,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.order = this.servicesRegistration.order;
    this.questionnaires$ = this.questionnairesService.getQuestionnaires();
    this.services$ = this.services.getServices();
  }

  selectService(): void {
    this.servicesRegistration.setOrder(this.order);
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
      (err) => alert('Ошибка')
    );
  }

  selectionChange(event: ServiceInterface): void {
    if (this.selectEach) {
    } else {
      this.order.items.map((o) => {
        o.services = [event.id];
      });
    }
  }

  changeSelectionMode(): void {
    this.selectEach = !this.selectEach;
  }
}
