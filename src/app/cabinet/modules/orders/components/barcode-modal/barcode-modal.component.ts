import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { CreateSheetComponent } from '../../../questionnaire/components/create-sheet/create-sheet.component';

@Component({
  selector: 'app-barcode-modal',
  templateUrl: './barcode-modal.component.html',
  styleUrls: ['./barcode-modal.component.scss'],
})
export class BarcodeModalComponent implements OnInit {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CreateSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { extId: string }
  ) {}

  ngOnInit(): void {}

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
