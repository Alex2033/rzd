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
import { ReplaySubject } from 'rxjs';
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
    this.getQueryParams();
    this.getDocs();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getQueryParams(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy)).subscribe((res) => {
      this.questionnaireNum = +res.questionnaireNum;
      this.docIndex = +res.docIndex;
    });
  }

  getDocs(): void {
    this.route.params
      .pipe(
        switchMap((res) => {
          this.routeId = +res.id;
          return this.ordersService.getDocuments(+res.id);
        }),
        takeUntil(this.destroy)
      )
      .subscribe(
        (res) => {
          this.docs = res;
          this.changeDocumentNumber();
        },
        () => alert('Ошибка')
      );
  }

  changeDocumentNumber(): void {
    let abort: boolean = false;

    this.docs.forEach((item, itemIndex) => {
      if (this.questionnaireNum === itemIndex + 1) {
        for (
          let docIndex = 0;
          docIndex < item.documents.length && !abort;
          docIndex++
        ) {
          if (this.docIndex > item.documents.length) {
            this.questionnaireNum += 1;
            this.docIndex = 1;
            this.router.navigate(
              [
                '/cabinet',
                'services-registration',
                'signature',
                item.documents[docIndex].id,
              ],
              {
                queryParams: {
                  questionnaireNum: this.questionnaireNum,
                  docIndex: this.docIndex,
                },
              }
            );
            abort = true;
          }

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
          this.servicesRegistration.order.id,
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
    this.docIndex += 1;
    this.router.navigate([], {
      queryParams: {
        questionnaireNum: this.questionnaireNum,
        docIndex: this.docIndex,
      },
    });

    this.changeDocumentNumber();
  }

  back(): void {
    if (this.questionnaireNum >= 1 && this.docIndex >= 1) {
      this.location.back();
      this.changeDocumentNumber();

      return;
    }

    this.router.navigate([
      '/cabinet',
      'services-registration',
      'select-services',
      this.servicesRegistration.order.id,
    ]);
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
    } else {
      this.disableButton = true;
    }

    if (windowScroll >= this.headerHeight / 2) {
      this.fixed = true;
    } else {
      this.fixed = false;
    }
  }
}
