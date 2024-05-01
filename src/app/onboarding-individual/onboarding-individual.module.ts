import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingIndividualRoutingModule } from './onboarding-individual-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentificationComponent } from './identification/identification.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../_services/api.service';
import { IdScanComponent } from './id-scan/id-scan.component';
import { DataStoreService } from '../_services/data-store.service';


@NgModule({
  declarations: [
    IdentificationComponent,
    IdScanComponent
  ],
  imports: [
    CommonModule,
    OnboardingIndividualRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[ApiService,DataStoreService]
})
export class OnboardingIndividualModule { }
