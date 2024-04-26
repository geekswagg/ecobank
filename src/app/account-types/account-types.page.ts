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

}
