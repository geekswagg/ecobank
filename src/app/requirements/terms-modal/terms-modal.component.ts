import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, ScrollDetail } from '@ionic/angular';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss'],
})
export class TermsModalComponent {


  termsAccepted: boolean = false;
  scrollTop: number = 0;
  isScrolling = false;

  @ViewChild('scrollTarget', { static: false }) private scrollTarget: ElementRef | undefined;


  constructor(private modalController: ModalController) { }



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

  scrollToBottom() {
    console.log('scroll to bottom',this.scrollTarget);
    if (this.scrollTarget) {
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }

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
