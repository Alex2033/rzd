import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { ReplaySubject } from 'rxjs';
import { switchMap, takeUntil, finalize } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { DocumentsOrderInterface } from 'src/app/shared/types/documents-order.interface';
import { SignInterface } from 'src/app/shared/types/sign.interface';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit, OnDestroy {
  @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;

  public isEmpty: boolean = true;
  public doc: DocumentsOrderInterface = {} as DocumentsOrderInterface;
  public anketaId: number;
  public docIndex: number;
  public docsLength: number;
  public questionnaireNum: number;
  public orderId: number;
  public isLoading: boolean = false;
  public signaturePadOptions: Object = {
    penColor: '#0066a2',
  };

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((res) => {
          this.anketaId = +res.anketaId;
          this.docIndex = +res.docIndex;
          this.docsLength = +res.docsLength;
          this.questionnaireNum = +res.questionnaireNum;
          return this.route.params;
        }),
        switchMap((res: Params) => {
          this.orderId = +res.id;
          return this.ordersService.getDocuments(+res.id);
        })
      )
      .subscribe((res) => {
        this.doc = res.find((d) => d.id_anketa === this.anketaId);
      });
  }

  clearSignature(): void {
    this.signaturePad.clear();
    this.isEmpty = this.signaturePad.isEmpty();
  }

  drawComplete() {
    this.isEmpty = this.signaturePad.isEmpty();
  }

  back(): void {
    this.location.back();
  }

  submit(): void {
    this.isLoading = true;

    const signData: SignInterface = {
      id_order: this.orderId,
      id_anketa: this.anketaId,
      signage: this.signaturePad.toDataURL(),
      autoStatus: true,
    };

    this.ordersService
      .sign(signData)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy)
      )
      .subscribe(
        () => this.successfullySigned(),
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.errorHandler(err);
          }
        }
      );
  }

  successfullySigned(): void {
    if (this.questionnaireNum >= this.docsLength) {
      this.router.navigate([
        '/cabinet',
        'services-registration',
        'confirm',
        this.orderId,
      ]);
      return;
    }

    this.router.navigate(
      ['/cabinet', 'services-registration', 'document', this.orderId],
      {
        queryParams: {
          questionnaireNum: this.questionnaireNum + 1,
          docIndex: 1,
        },
      }
    );
  }

  errorHandler(err: HttpErrorResponse): void {
    if (err.error.error === 'ANKETA_QR_EMPTY_FIELDS') {
      this.router.navigate(
        ['/cabinet', 'services-registration', 'empty-questionnaires'],
        {
          queryParams: {
            value: err.error.value,
          },
        }
      );
      return;
    }
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
