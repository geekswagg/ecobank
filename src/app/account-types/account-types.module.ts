import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountTypesPageRoutingModule } from './account-types-routing.module';

import { AccountTypesPage } from './account-types.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountTypesPageRoutingModule
  ],
  providers:[],
  declarations: [AccountTypesPage]
})
export class AccountTypesPageModule {}
