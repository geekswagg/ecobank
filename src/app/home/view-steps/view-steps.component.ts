/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-steps',
  templateUrl: './view-steps.component.html',
  styleUrls: ['./view-steps.component.scss'],
})
export class ViewStepsComponent  implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

}
