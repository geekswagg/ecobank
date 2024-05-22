import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { QrScanComponent } from './qr-scan/qr-scan.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'qr-scan',
    component: QrScanComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
