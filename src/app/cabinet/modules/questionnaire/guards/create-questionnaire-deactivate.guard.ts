import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
    if (!component.createForm.get('basicData').get('name').value) {
      this.questionnairesService
        .delete(route.params.id)
        .pipe(
          finalize(() => {
            return true;
          })
        )
        .subscribe();
    }
    return true;
  }
}
