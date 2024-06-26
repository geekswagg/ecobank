import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountProductsPageRoutingModule } from './account-products-routing.module';

import { AccountProductsPage } from './account-products.page';
import { ApiService } from '../_services/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountProductsPageRoutingModule
  ],
  declarations: [AccountProductsPage],
  providers: [ApiService]
})
export class AccountProductsPageModule {}
