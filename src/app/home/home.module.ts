import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ViewStepsComponent } from './view-steps/view-steps.component';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { QRCodeModule } from 'angularx-qrcode';
import {NgxTypedJsModule} from 'ngx-typed-js';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    QRCodeModule,
    NgOptimizedImage,
    NgxTypedJsModule
  ],
  declarations: [HomePage,ViewStepsComponent,QrScanComponent]
})
export class HomePageModule {}
