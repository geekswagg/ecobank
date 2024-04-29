import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequirementsPageRoutingModule } from './requirements-routing.module';

import { RequirementsPage } from './requirements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequirementsPageRoutingModule
  ],
  declarations: [RequirementsPage]
})
export class RequirementsPageModule {}
