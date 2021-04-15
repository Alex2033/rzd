import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FaqService } from 'src/app/shared/services/faq.service';
import { FaqInterface } from 'src/app/shared/types/faq.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public faq$: Observable<FaqInterface[]>;

  constructor(private faq: FaqService) {}

  ngOnInit(): void {
    this.faq$ = this.faq.getFaq();
  }
}
