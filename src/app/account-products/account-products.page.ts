/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-products',
  templateUrl: './account-products.page.html',
  styleUrls: ['./account-products.page.scss'],
})
export class AccountProductsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  products = [
    {
      title: 'Student Account',
      productCode:'29',
      description: 'Keep track of your finances with 24/7 access to you money including electronic banking.',
      logo:'assets/images/product-img.jpg',
    },
    {
      title: 'Savings Account',
      productCode:'20',
      description: 'This best account for all student needs',
      logo:'assets/images/product-img.jpg',
    }
  ]

  selectProduct(i: number,product: any){

  }
}
