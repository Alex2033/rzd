import { takeUntil, finalize } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnairesService } from 'src/app/shared/services/questionnaires.service';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';
import { CheckCorpResponseInterface } from 'src/app/shared/types/check-corp-response.interface';

@Component({
  selector: 'app-services-registration-info',
  templateUrl: './services-registration-info.component.html',
  styleUrls: ['./services-registration-info.component.scss'],
})
export class ServicesRegistrationInfoComponent implements OnInit, OnDestroy {
  public sendResults: boolean = false;
  public isOnlyQuestionnaire: boolean = false;
  public hasCorpQuestionnaires: boolean = false;
  public corpQuestionnaire: boolean = false;
  public pageLoaded: boolean = true;
  public areAvailableQuestionnaires: boolean;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private router: Router,
    private servicesRegistration: ServicesRegistrationService,
    private questionnaires: QuestionnairesService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    if (this.isOnlyQuestionnaire) {
      this.checkCorp();
    }
  }

  initializeValues(): void {
    this.isOnlyQuestionnaire =
      this.servicesRegistration.order.items.length <= 1;

    this.hasCorpQuestionnaires = this.servicesRegistration.order.items.some(
      (q) => q.is_corp_client
    );
  }

  checkCorp(): void {
    this.pageLoaded = false;
    this.questionnaires
      .checkCorp(this.servicesRegistration.order.items[0].id_anketa)
      .pipe(
        finalize(() => (this.pageLoaded = true)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.corpQuestionnaire = res.is_corporate;
        this.areAvailableQuestionnaires = res.available_services.length > 0;
      });
  }

  goToCreation(): void {
    this.servicesRegistration.setOrder({
      qr_send: this.sendResults,
    });
    this.router.navigate([
      '/cabinet',
      'services-registration',
      'questions',
      this.servicesRegistration.order.id,
    ]);
  }

  makeCorporateOrder(): void {
    this.servicesRegistration.setOrder({
      payment: 'CORPORATE',
    });
    if (this.areAvailableQuestionnaires) {
      this.router.navigate([
        '/cabinet',
        'services-registration',
        'questions',
        this.servicesRegistration.order.id,
      ]);
      return;
    }

    this.router.navigate(['/server-error', 'LIMIT_EXCEEDED']);
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
