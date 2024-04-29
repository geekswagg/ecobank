/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewMoreComponent } from './view-more/view-more.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-products',
  templateUrl: './account-products.page.html',
  styleUrls: ['./account-products.page.scss'],
})
export class AccountProductsPage implements OnInit {

  loading: boolean = false;

  constructor(
   private modalCtrl: ModalController,
   private router: Router,
  ) { }

  ngOnInit() {
    this.fetchAccountProducts();

  }

  fetchAccountProducts(){
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000)
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
      description: 'Keep track of your finances with 24/7 access to you money including electronic banking.',
      logo:'assets/images/product-img.jpg',
    }
  ]

  selectProduct(i: number,product: any){

  }

  async onViewMore(){
    const modal = await this.modalCtrl.create({
      component: ViewMoreComponent,
      componentProps:{},
    });
    await modal.present();
  }

  viewRequirements(){
    this.modalCtrl.dismiss();
    this.router.navigate(['requirements']);
  }
}
