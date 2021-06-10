import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user$: Observable<AuthResponseInterface>;

  constructor(private account: AccountService) {}

  ngOnInit(): void {
    this.user$ = this.account.getUser();
  }
}
