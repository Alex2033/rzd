import { CheckCorpResponseInterface } from './../../../../../shared/types/check-corp-response.interface';
import { ConfirmRemoveSelectionsComponent } from './../../components/confirm-remove-selections/confirm-remove-selections.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';
import { ServicesService } from 'src/app/shared/services/services.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { QuestionnaireOrderInterface } from 'src/app/shared/types/questionnaire-order.interface';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { QuestionnairesService } from '../../../../../shared/services/questionnaires.service';
import { QuestionnaireInterface } from '../../../questionnaire/types/questionnaire.interface';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.component.html',
  styleUrls: ['./select-services.component.scss'],
})
export class SelectServicesComponent implements OnInit, OnDestroy {
  public questionnaires$: Observable<QuestionnaireInterface[]>;
  public services: ServiceInterface[] = [];
  public selectedService: number;
  public separateSelected: number[] = [];
  public selectEach: boolean = false;
  public order: OrderInterface = {} as OrderInterface;
  public sum: number = 0;
  public selectedServices: number[] = [];
  public isLoading: boolean = false;
  public servicesLoaded: boolean = true;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    public servicesRegistration: ServicesRegistrationService,
    public questionnairesService: QuestionnairesService,
    private servicesService: ServicesService,
    private router: Router,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getOrder(): void {
    this.order = this.servicesRegistration.order;
    this.servicesLoaded = false;
    this.route.params
      .pipe(
        switchMap((params) => this.ordersService.getOrder(+params.id)),
        switchMap((order) => {
          if (order) {
            // преобразование услуг из объекта в число
            this.convertServiceObjToNum(order);
          }

          this.mapQuestionnaires();
          return this.servicesService.getServices(this.order.id_point);
        }),
        switchMap((res) => {
          this.services = res;
          if (this.order.items.length <= 1) {
            return this.questionnairesService.checkCorp(
              this.servicesRegistration.order.items[0].id_anketa
            );
          }
          return of('');
        }),
        takeUntil(this.destroy)
      )
      .subscribe(
        (res: CheckCorpResponseInterface | null) => {
          if (
            res.is_corporate &&
            res.available_services.length &&
            this.order.payment === 'CORPORATE'
          ) {
            this.services = this.services.filter((s) =>
              res.available_services.includes(s.id)
            );
          }
          this.servicesLoaded = true;
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.router.navigate(['/server-error', err.error.error]);
          }
        }
      );
  }

  mapQuestionnaires(): void {
    this.questionnaires$ = this.questionnairesService.getQuestionnaires();
    this.setOrderValues();

    this.sum = this.order.sum;
  }

  convertServiceObjToNum(order: OrderInterface): void {
    order.items.forEach((item, itemIndex) => {
      item.services.forEach((service: any) => {
        this.order.items[itemIndex].services = [service.id_service];
      });
    });
  }

  setOrderValues(): void {
    this.order.items.forEach((item) => {
      item.services.forEach((service: any) => {
        this.separateSelected.push(service);
      });
    });
    this.checkEqualSelections();
    this.servicesRegistration.setOrder(this.order);
  }

  checkEqualSelections(): void {
    const servicesEqual = this.separateSelected.every(
      (v) => v === this.separateSelected[0]
    );
    if (!servicesEqual) {
      this.selectEach = true;
    } else {
      this.selectedService = this.separateSelected[0];
    }
  }

  selectService(): void {
    this.isLoading = true;
    this.servicesRegistration.setOrder(this.order);
    if (this.servicesRegistration.order.id) {
      this.updateOrder();
      return;
    }

    this.createOrder();
  }

  updateOrder(): void {
    this.ordersService
      .updateOrder(this.order)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        () => {
          this.router.navigate(
            [
              '/cabinet',
              'services-registration',
              'document',
              this.servicesRegistration.order.id,
            ],
            {
              queryParams: {
                questionnaireNum: 1,
                docIndex: 1,
              },
            }
          );
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err);
          }
        }
      );
  }

  createOrder(): void {
    this.ordersService
      .createOrder(this.order)
      .pipe(takeUntil(this.destroy))
      .subscribe(
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
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err);
          }
        }
      );
  }

  handleError(err: HttpErrorResponse): void | null {
    if (err.error.error === 'ANKETA_QR_EMPTY_FIELDS') {
      this.router.navigate(
        ['/cabinet', 'services-registration', 'empty-questionnaires'],
        {
          queryParams: {
            value: err.error.value,
          },
        }
      );
      return;
    }

    this.router.navigate(['server-error', err.error.error]);
  }

  selectionChange(event: number, item: QuestionnaireOrderInterface): void {
    this.sum = 0;
    this.selectedServices = [];

    if (this.selectEach) {
      item.services = [event];
    } else {
      this.order.items.map((o) => {
        o.services = [event];
      });
    }

    this.order.items.forEach((item) => {
      item.services.forEach((s: any) => {
        const service: ServiceInterface = this.services.find(
          (service) => service.id === (typeof s === 'number' ? s : s.id_service)
        );
        this.sum += service.price;
        this.selectedServices.push(s);
      });
    });

    this.order.sum = this.sum;
    this.servicesRegistration.setOrder(this.order);
  }

  changeSelectionMode(): void {
    if (this.selectedService || this.separateSelected.length) {
      const dialogRef = this.dialog.open(ConfirmRemoveSelectionsComponent, {
        panelClass: 'custom-dialog',
        backdropClass: 'custom-dialog-overlay',
        width: '28rem',
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((res: boolean) => {
        if (res) {
          this.selectEach = !this.selectEach;
          this.selectedService = null;
          this.separateSelected = [];
          this.sum = 0;
        }
      });
    } else {
      this.selectEach = !this.selectEach;
    }
  }
}
