import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, ReplaySubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';
import { DocumentsOrderInterface } from 'src/app/shared/types/documents-order.interface';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit, OnDestroy {
  @ViewChild('stickyHeader') stickyHeader: ElementRef;

  public docs: DocumentsOrderInterface[] = [];
  public questionnaireNum: number = 1;
  public docIndex: number = 1;
  public loading: boolean = false;
  public fixed: boolean = false;
  public disableButton: boolean = true;
  public html;

  private headerHeight: number = 0;
  private routeId: number;
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    public servicesRegistration: ServicesRegistrationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDocs();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getDocs(): void {
    combineLatest([
      this.route.params.pipe(
        switchMap((res) => {
          this.routeId = +res.id;
          return this.ordersService.getDocuments(+res.id);
        })
      ),
      this.route.queryParams,
    ]).subscribe(([docs, params]) => {
      this.docs = docs;
      this.questionnaireNum = +params.questionnaireNum;
      this.docIndex = +params.docIndex;
      this.changeDocumentNumber();
    });
  }

  changeDocumentNumber(): void {
    this.disableButton = true;

    this.docs.forEach((item, itemIndex) => {
      if (this.questionnaireNum === itemIndex + 1) {
        for (let docIndex = 0; docIndex < item.documents.length; docIndex++) {
          if (this.docIndex === docIndex + 1) {
            this.getHTML(item.id_anketa, item.documents[docIndex].id);
          }
        }
      }

      if (this.questionnaireNum > this.docs.length) {
        this.router.navigate([
          '/cabinet',
          'services-registration',
          'confirm',
          this.routeId,
        ]);
      }
    });
  }

  getHTML(anketaId: number, documentId: number): void {
    this.loading = true;
    this.ordersService
      .getHTML(this.routeId, anketaId, documentId)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.loading = false;
        this.html = res;
      });
  }

  next(): void {
    let abort: boolean = false;

    this.docs.forEach((item, itemIndex) => {
      if (this.questionnaireNum === itemIndex + 1) {
        for (let docIndex = 0; docIndex < item.documents.length; docIndex++) {
          if (this.docIndex === item.documents.length) {
            abort = true;
            this.router.navigate(
              ['/cabinet', 'services-registration', 'signature', this.routeId],
              {
                queryParams: {
                  anketaId: item.id_anketa,
                  questionnaireNum: this.questionnaireNum,
                  docIndex: this.docIndex + 1,
                },
              }
            );
          }
        }
      }
    });

    if (!abort) {
      this.docIndex += 1;
      this.router.navigate([], {
        queryParams: {
          questionnaireNum: this.questionnaireNum,
          docIndex: this.docIndex,
        },
      });
    }
  }

  back(): void {
    if (this.docIndex === 1 && this.questionnaireNum === 1) {
      this.router.navigate([
        '/cabinet',
        'services-registration',
        'select-services',
        this.routeId,
      ]);
      return;
    }

    if (this.docIndex >= 1) {
      this.docIndex -= 1;
      this.location.back();

      return;
    }
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    this.headerHeight =
      this.stickyHeader.nativeElement.getBoundingClientRect().top;

    const windowScroll =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScroll > 0) {
      this.disableButton = false;
    }

    if (windowScroll > this.headerHeight / 1.5) {
      this.fixed = true;
    } else {
      this.fixed = false;
    }
  }
}
