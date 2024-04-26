import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountTypesPage } from './account-types.page';

const routes: Routes = [
  {
    path: '',
    component: AccountTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountTypesPageRoutingModule {}
