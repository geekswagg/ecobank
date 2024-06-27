/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewMoreComponent } from './view-more/view-more.component';
import { Router } from '@angular/router';
import { ObjectMainAccountDetails } from '../_models/business-model';
import { LoadingService } from '../_services/loading.service';
import { ApiService } from '../_services/api.service';
import { DataStoreService } from '../_services/data-store.service';

@Component({
  selector: 'app-account-products',
  templateUrl: './account-products.page.html',
  styleUrls: ['./account-products.page.scss'],
})
export class AccountProductsPage implements OnInit {

  loading: boolean = false;
  intro_txt: string = '';

  products: any = [];

  constructor(
   private modalCtrl: ModalController,
   private router: Router,
   private loader: LoadingService,
   private apiService: ApiService,
   private dataStore: DataStoreService
  ) {
    this.products = [
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
        currency:{
          kes: false,
          usd: false,
          eur: false,
        }
      },
      {
        title: 'Advantage Current Account',
        productCode:'20',
        description: 'Get ahead with investments, insurance and a salary advance added to your banking.',
        logo:'assets/images/premium.png',
        currency:{
          kes: false,
          usd: false,
          eur: false,
        }
      },
      {
        title: 'Premier Current Account',
        productCode:'20',
        description: 'Take care of your wealth with the highest level of personal service.',
        logo:'assets/images/advantage.png',
        currency:{
          kes: false,
          usd: false,
          eur: false,
        }
      },
      {
        title: 'Diaspora Current Account',
        productCode:'20',
        description: 'Manage and move your money more easily while living and working away from home.',
        logo:'assets/images/diaspora.png',
        currency:{
          kes: false,
          usd: false,
          eur: false,
        }
      }
    ]
   }

  ngOnInit() {
    this.getAccountTypes();

  }


    // Get account Types
    getAccountTypes() {
      this.loader.loading = true;
      const accountToOpen : ObjectMainAccountDetails = JSON.parse(localStorage.getItem('account-to-open') as string);
      switch(accountToOpen.shortDescription) {
        case 'Joint Account':
          this.intro_txt  = 'this Joint Account';
          break;

          case 'Individual Account':
            this.intro_txt  = 'one type of Individual Account';
            break;
      }


        this.apiService.getAccountTypeBundleProduct(accountToOpen.id).subscribe({
          next: (res: any)=>{
            if (res.successful) {
              this.loader.loading = false;
              this.products = res.object;

              this.products.forEach((value: any) => {
                value.currency = {
                  kes: false,
                  usd: false,
                  eur: false,
                }

              });
            } else {
              this.products = [];
              this.loader.loading = false;
            }
          },
          error: (err: any) => {
            this.loader.loading = false;
        }
      });
    }

  async onViewMore(){
    const modal = await this.modalCtrl.create({
      component: ViewMoreComponent,
      componentProps:{},
    });
    await modal.present();
  }

   // Select the account type you wish to create
   async selectProduct(i: number) {
    const product = await this.products[i];

    this.dataStore.auth.accountType = product.bundleId;
    this.dataStore.preferences.accountBundle = product.bundleId;
    this.dataStore.occupation.accountProduct = product.bundleId;
    this.dataStore.auth.bundleCode = product.accountType;
    this.dataStore.auth.multipleAccountsAllowed =
      product.multipleAccountsAllowed;
    this.dataStore.auth.name = product.name
    this.dataStore.auth.userType = "NORMAL";
    this.dataStore.auth.currency = product.currency;
    localStorage.setItem("auth", JSON.stringify(this.dataStore.auth));
    localStorage.setItem(
      "preferences",
      JSON.stringify(this.dataStore.preferences)
    );
    localStorage.setItem(
      "nextofkin",
      JSON.stringify(this.dataStore.preferences)
    );
    localStorage.setItem(
      "occupation",
      JSON.stringify(this.dataStore.occupation)
    );
    this.modalCtrl.dismiss();
    this.router.navigate(['requirements']);
  }

  // viewRequirements(){
  //   this.modalCtrl.dismiss();
  //   this.router.navigate(['requirements']);
  // }
}
