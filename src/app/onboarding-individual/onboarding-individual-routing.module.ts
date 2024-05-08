import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationComponent } from './identification/identification.component';
import { IdScanComponent } from './id-scan/id-scan.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { NextOfKinComponent } from './next-of-kin/next-of-kin.component';
import { OccupationComponent } from './occupation/occupation.component';
import { SelfieComponent } from './selfie/selfie.component';
import { SummaryComponent } from './summary/summary.component';
import { SuccessComponent } from './success/success.component';
import { SidesScanComponent } from './id-scan/sides-scan/sides-scan.component';

const routes: Routes = [
  {
    path: 'identification',
    component: IdentificationComponent
  },
  {
    path: 'id-scan',
    component: IdScanComponent
  },
  {
    path: 'id-sides',
    component: SidesScanComponent
  },
  {
    path: 'preferences',
    component: PreferencesComponent
  },
  {
    path: 'next-of-kin',
    component: NextOfKinComponent
  },
  {
    path: 'occupation',
    component: OccupationComponent
  },
  {
    path: 'selfie',
    component: SelfieComponent
  },
  {
    path: 'summary',
    component: SummaryComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingIndividualRoutingModule { }
