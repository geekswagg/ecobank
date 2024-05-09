import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewStepsComponent } from './view-steps/view-steps.component';
import { ScrollDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loading: boolean = false;
  scrollTop: number = 0;
  isScrolling = false;

  constructor(
    private modalCtrl: ModalController
  ) {}

  handleScrollStart() {
    this.isScrolling = true;
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    this.scrollTop = ev.detail.scrollTop;
    // console.log('scroll', JSON.stringify(ev.detail));
  }

  handleScrollEnd() {
    this.isScrolling = false;
  }

  async viewSteps(){
    const modal = await this.modalCtrl.create({
      component: ViewStepsComponent,
      componentProps:{},
      // breakpoints:[0.8, 0.8],
      // initialBreakpoint:0.8
    });
    await modal.present();

  }

}
