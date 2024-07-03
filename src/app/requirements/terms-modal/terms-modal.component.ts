import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss'],
})
export class TermsModalComponent {


  termsAccepted: boolean = false;

  constructor(private modalController: ModalController) { }



  close() {
    this.modalController.dismiss(this.termsAccepted);
  }

  checkboxChanged() {
    // Enable checkbox only when the user scrolls to the end and agrees
    if(this.termsAccepted){
      setTimeout(() => {
        this.modalController.dismiss(this.termsAccepted);
      }, 200);
    }

  }

}
