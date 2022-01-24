import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-error',
  templateUrl: './register-error.component.html',
  styleUrls: ['./register-error.component.scss'],
})
export class RegisterErrorComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}
}
