import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-support-service',
  templateUrl: './support-service.component.html',
  styleUrls: ['./support-service.component.scss'],
})
export class SupportServiceComponent implements OnInit {
  public form: FormGroup;
  public orderId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: new FormControl(null, [Validators.required]),
    });
    this.route.params.subscribe((params) => {
      this.orderId = +params.id;
    });
  }

  submit(): void {
    this.router.navigate(['/cabinet', 'orders', 'support-response']);
  }
}
