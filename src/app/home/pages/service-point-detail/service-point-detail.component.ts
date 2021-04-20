import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServicePointsService } from '../../services/service-points.service';
import { ServicePointInterface } from '../../types/service-point.interface';

@Component({
  selector: 'app-service-point-detail',
  templateUrl: './service-point-detail.component.html',
  styleUrls: ['./service-point-detail.component.scss'],
})
export class ServicePointDetailComponent implements OnInit {
  public point: ServicePointInterface = {} as ServicePointInterface;

  private pointSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private servicePoints: ServicePointsService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   console.log('params.id:', params.id);
    // });
    // this.pointSub = this.route.params.pipe(
    //   switchMap((params: Params) => this.servicePoints.getServicePoints(1))
    // ).subscribe(points => {
    //   this.point
    // });
  }
}
