import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { OnboardingJointRoutingModule } from './onboarding-joint-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { JointMembersComponent } from './joint-members/joint-members.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { MandateComponent } from './mandate/mandate.component';
import { NewJointMemberComponent } from './joint-members/new-joint-member/new-joint-member.component';
import { InviteeWelcomeComponent } from './invitee-welcome/invitee-welcome.component';
import { OtpModalComponent } from './invitee-welcome/otp-modal/otp-modal.component';


@NgModule({
  declarations: [
    InviteeWelcomeComponent,
    OtpModalComponent,
    JointMembersComponent,PreferencesComponent,MandateComponent,NewJointMemberComponent
  ],
  imports: [
    CommonModule,
    OnboardingJointRoutingModule,
    IonicModule,
    FormsModule,

    NgOptimizedImage,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    IonicSelectableComponent,
  ]
})
export class OnboardingJointModule { }
