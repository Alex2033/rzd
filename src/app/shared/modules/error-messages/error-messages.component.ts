import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessageInterface } from '../../types/error-message.interface';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessagesComponent implements OnInit {
  @Input() errors: ValidationErrors | null;
  @Input() errorMessages: ErrorMessageInterface | null;

  constructor() {}

  ngOnInit(): void {}
}
