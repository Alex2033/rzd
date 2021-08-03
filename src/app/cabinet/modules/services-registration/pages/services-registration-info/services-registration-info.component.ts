import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnairesService } from 'src/app/shared/services/questionnaires.service';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';

@Component({
  selector: 'app-services-registration-info',
  templateUrl: './services-registration-info.component.html',
  styleUrls: ['./services-registration-info.component.scss'],
})
export class ServicesRegistrationInfoComponent implements OnInit {
  public sendResults: boolean = false;
  public hasCorpQuestionnaires: boolean = false;

  constructor(
    private router: Router,
    private servicesRegistration: ServicesRegistrationService,
    private questionnaires: QuestionnairesService
  ) {}

  ngOnInit(): void {
    this.hasCorpQuestionnaires = this.servicesRegistration.order.items.some(
      (q) => q.is_corp_client
    );
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
}
