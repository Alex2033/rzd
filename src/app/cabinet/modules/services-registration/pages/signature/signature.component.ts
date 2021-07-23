import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { switchMap } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { DocumentsOrderInterface } from 'src/app/shared/types/documents-order.interface';
import { SignInterface } from 'src/app/shared/types/sign.interface';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
  @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;

  public isEmpty: boolean = true;
  public doc: DocumentsOrderInterface = {} as DocumentsOrderInterface;
  public anketaId: number;
  public docIndex: number;
  public questionnaireNum: number;
  public orderId: number;
  public isLoading: boolean = false;
  public signaturePadOptions: Object = {
    penColor: '#0066a2',
  };

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

    this.ordersService.sign(signData).subscribe(
      () => {
        this.isLoading = false;

        this.router.navigate(
          ['/cabinet', 'services-registration', 'document', this.orderId],
          {
            queryParams: {
              questionnaireNum: this.questionnaireNum + 1,
              docIndex: 1,
            },
          }
        );
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error.error === 'ANKETA_OMS_EMPTY') {
            this.router.navigate(
              ['/cabinet', 'services-registration', 'empty-oms-questionnaires'],
              {
                queryParams: {
                  value: err.error.value,
                },
              }
            );
            return;
          }
        }
      }
    );
  }
}
