import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequirementsPageRoutingModule } from './requirements-routing.module';

import { RequirementsPage } from './requirements.page';
import { TermsModalComponent } from './terms-modal/terms-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequirementsPageRoutingModule
  ],
  declarations: [RequirementsPage, TermsModalComponent]
})
export class RequirementsPageModule {}
