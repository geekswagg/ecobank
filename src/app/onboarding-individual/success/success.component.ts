/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from 'src/app/_services/share.service';
import { ReviewComponent } from './review/review.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent  implements OnInit {

  loading: boolean = false;

  constructor(
    private _share: ShareService,
    private toastr: ToastrService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async share() {
    this.loading = true;
    if((await Share.canShare()).value){

      await Share.share({
        title: 'Ecobank Account Opening',
        text: 'Use this link link to create your account in just a few steps: ',
        url: "https://digitalonboard.ecobank.com/pwa",
        dialogTitle: 'Ecobank Account Opening',
      });
      this.loading = false;
    }
    else{
      this.loading = false;
      this.toastr.info("Sharing not available for this browser");
    }

  }

  async review(){
    const modal = await this.modalCtrl.create({
      component: ReviewComponent,
        cssClass: 'terms-modal',
        componentProps:{
          data:''
        },
        initialBreakpoint:0.6,
        breakpoints:[0.6,0.65]

      });

      modal.onWillDismiss().then((data: any) => {

      })

      return await modal.present();
  }



}
