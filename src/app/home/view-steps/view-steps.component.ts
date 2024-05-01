/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-steps',
  templateUrl: './view-steps.component.html',
  styleUrls: ['./view-steps.component.scss'],
})
export class ViewStepsComponent  implements OnInit {

  timestampArray = [
    { date: '3rd May 2020', time: '7:00 PM', title: 'Chris Serrano posted a photo on your wall.' },
    { date: '19th May 2020', time: '3:00 PM', title: 'Mia Redwood commented on your last post.' },
    { date: '17th June 2020', time: '7:00 PM', title: 'Lucas McAlister just sent you a message.' }
    // Add more timestamp elements as needed
  ];

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

}
