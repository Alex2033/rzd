import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ServicesService } from 'src/app/shared/services/services.service';

import { LanguageService } from '../services/language.service';
import { ServicePointsService } from '../services/service-points.service';

@Injectable()
export class LanguagesResolver implements Resolve<any> {
  constructor(
    private language: LanguageService,
    private services: ServicesService,
    private points: ServicePointsService
  ) {}

  resolve(snapshot: ActivatedRouteSnapshot): any {
    this.language.getLangId().subscribe((res) => {
      this.services.langId = res;
      this.points.langId = res;
    });
  }
}
