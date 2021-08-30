import { LocationService } from './../services/location.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { QuestionnairesService } from 'src/app/shared/services/questionnaires.service';
import { ServicesService } from 'src/app/shared/services/services.service';

import { LanguageService } from '../services/language.service';
import { OrdersService } from '../services/orders.service';
import { ServicePointsService } from '../services/service-points.service';

@Injectable()
export class LanguagesResolver implements Resolve<any> {
  constructor(
    private language: LanguageService,
    private services: ServicesService,
    private points: ServicePointsService,
    private orders: OrdersService,
    private questionnaires: QuestionnairesService,
    private location: LocationService
  ) {}

  resolve(snapshot: ActivatedRouteSnapshot): any {
    this.language.getLangId().subscribe((res) => {
      this.services.langId = res;
      this.points.langId = res;
      this.orders.langId = res;
      this.questionnaires.langId = res;
      this.location.langId = res;
    });
  }
}
