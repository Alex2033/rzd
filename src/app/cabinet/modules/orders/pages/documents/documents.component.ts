import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { DocumentsOrderInterface } from 'src/app/shared/types/documents-order.interface';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit, OnDestroy {
  public orderId: number;
  public questionnaireId: number;
  public document: DocumentsOrderInterface = {} as DocumentsOrderInterface;
  public documents: DocumentsOrderInterface[] = [];

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.params.pipe(
        switchMap((params) => {
          this.orderId = +params.id;
          return this.ordersService.getDocuments(+params.id);
        })
      ),
      this.route.queryParams,
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe(([documents, query]) => {
        this.documents = documents;
        this.questionnaireId = +query.questionnaireId;
        this.getQuestionnaire();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getQuestionnaire(): void {
    this.document = this.documents.find(
      (doc) => doc.id_anketa === this.questionnaireId
    );
    console.log('this.document:', this.document);
  }

  back(): void {
    this.location.back();
  }

  goToDoc(docId: number): void {
    let tab = window.open();
    this.ordersService
      .getDocument(this.orderId, this.questionnaireId, docId)
      .subscribe((res) => {
        const fileUrl = URL.createObjectURL(res);
        tab.location.href = fileUrl;
      });
  }
}
