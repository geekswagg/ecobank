import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationComponent } from './identification/identification.component';
import { IdScanComponent } from './id-scan/id-scan.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { NextOfKinComponent } from './next-of-kin/next-of-kin.component';
import { OccupationComponent } from './occupation/occupation.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingIndividualRoutingModule { }
