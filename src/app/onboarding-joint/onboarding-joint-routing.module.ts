import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JointMembersComponent } from './joint-members/joint-members.component';
import { MandateComponent } from './mandate/mandate.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { InviteeWelcomeComponent } from './invitee-welcome/invitee-welcome.component';

const routes: Routes = [
  {
    path: 'invitee-welcome',
    component: InviteeWelcomeComponent
  },
  {
    path: 'members',
    component: JointMembersComponent
  },

  {
    path: 'mandates',
    component: MandateComponent
  },
  {
    path: 'preferences',
    component: PreferencesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingJointRoutingModule { }
