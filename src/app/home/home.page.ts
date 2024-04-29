import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewStepsComponent } from './view-steps/view-steps.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loading: boolean = false;

  constructor(
    private modalCtrl: ModalController
  ) {}

  async viewSteps(){
    const modal = await this.modalCtrl.create({
      component: ViewStepsComponent,
      componentProps:{},
      breakpoints:[0.8, 0.8],
      initialBreakpoint:0.8
    });
    await modal.present();

  }

}
