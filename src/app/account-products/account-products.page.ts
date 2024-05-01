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
    },1000)
  }

  products = [
    {
      title: 'Classic Current Account',
      productCode:'29',
      description: 'Keep track of your finances with 24/7 access to you money including electronic banking.',
      logo:'assets/images/classic.png',
    },
    {
      title: 'Student Current Account',
      productCode:'20',
      description: "If you're studying, go direct with easy and free digital banking.",
      logo:'assets/images/student.png',
    },
    {
      title: 'Advantage Current Account',
      productCode:'20',
      description: 'Get ahead with investments, insurance and a salary advance added to your banking.',
      logo:'assets/images/premium.png',
    },
    {
      title: 'Premier Current Account',
      productCode:'20',
      description: 'Take care of your wealth with the highest level of personal service.',
      logo:'assets/images/advantage.png',
    },
    {
      title: 'Diaspora Current Account',
      productCode:'20',
      description: 'Manage and move your money more easily while living and working away from home.',
      logo:'assets/images/diaspora.png',
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
