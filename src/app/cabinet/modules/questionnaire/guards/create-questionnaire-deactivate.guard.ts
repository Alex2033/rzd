import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AdultCreateComponent } from '../pages/adult-create/adult-create.component';
import { QuestionnairesService } from '../services/questionnaires.service';

@Injectable({
  providedIn: 'root',
})
export class CreateQuestionnaireDeactivateGuard
  implements CanDeactivate<unknown>
{
  constructor(private questionnairesService: QuestionnairesService) {}

  canDeactivate(
    component: AdultCreateComponent,
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isFormEmpty(component.createForm.value)) {
      return this.questionnairesService
        .delete(route.params.id)
        .pipe(map(() => true));
    }
    return true;
  }

  isFormEmpty(object) {
    return Object.values(object).every((v) =>
      v && typeof v === 'object' ? this.isFormEmpty(v) : v === 0 || v === null
    );
  }
}
