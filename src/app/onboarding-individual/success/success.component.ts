/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Observable, retry, catchError } from 'rxjs';
import { stripOffHtmlTags } from 'src/app/_helpers/stripoff-html-tags.function';
import { ShortLinkRequestBody, ShortLinkResponse } from 'src/app/_models/dynamic-links';
import { DynamicLinkService } from 'src/app/_services/dynamic-link.service';
import { ShareService } from 'src/app/_services/share.service';
import { environment } from 'src/environments/environment';
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
    private _dymanicLinkSrv: DynamicLinkService,
    private toastr: ToastrService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async share() {

    // const urlPrefix = environment.production
    //   ? 'https://digitalonboard.ecobank.com/pwa'
    //   : 'https://digitalonboard.ecobank.com/pwa'
    // let postURL = '';


    // let validSocialImageURL = "https://www.techafricanews.com/wp-content/uploads/2020/04/ecobank.jpg";

    // const post = stripOffHtmlTags("Open your Bank Account with us: ");
    // this._dymanicLinkSrv.generateShortAndPreviewLinks(
    //   urlPrefix + postURL,
    //   (await validSocialImageURL),
    //   post,
    //   `Experience digital onboarding platform`,
    // ).subscribe(resp => {
    //   this._share.shareWithNavigator(post, 'Ecobank', resp.shortLink);
    // }
    // );
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
