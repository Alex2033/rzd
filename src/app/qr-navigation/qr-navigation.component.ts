import { switchMap, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicePointsService } from '../shared/services/service-points.service';
import { ServicePointInterface } from '../shared/types/service-point.interface';

@Component({
  selector: 'app-qr-navigation',
  templateUrl: './qr-navigation.component.html',
  styleUrls: ['./qr-navigation.component.scss'],
})
export class QrNavigationComponent implements OnInit, OnDestroy {
  public order: ServicePointInterface;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private route: ActivatedRoute,
    private points: ServicePointsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.points.getServicePoint(+params.id)),
        takeUntil(this.destroy)
      )
      .subscribe((order) => {
        if (!order || !order.webNavigation) {
          this.router.navigate(['/']);
        }

        this.order = order;
      });
  }

  iframeLoad(): void {
    const iframe = document.getElementById('qr-map-id');
    (<HTMLIFrameElement>iframe).contentWindow.postMessage(this.order.name, '*');
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
