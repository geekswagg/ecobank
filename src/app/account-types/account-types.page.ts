/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccountType } from '../_models/types';

@Component({
  selector: 'app-account-types',
  templateUrl: './account-types.page.html',
  styleUrls: ['./account-types.page.scss'],
})
export class AccountTypesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelectAccoutType(accoutType: any) {
    this.router.navigate(['account-products']);
  }

  getGreeting(): string {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
        return "Good morning";
    } else if (hours >= 12 && hours < 17) {
        return "Good afternoon";
    } else if (hours >= 17 && hours < 21) {
        return "Good evening";
    } else {
        return "Hello";
    }
}

}
