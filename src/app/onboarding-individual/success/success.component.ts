/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Observable, retry, catchError } from 'rxjs';
import { stripOffHtmlTags } from 'src/app/_helpers/stripoff-html-tags.function';
import { ShortLinkRequestBody, ShortLinkResponse } from 'src/app/_models/dynamic-links';
import { DynamicLinkService } from 'src/app/_services/dynamic-link.service';
import { ShareService } from 'src/app/_services/share.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent  implements OnInit {

  loading: boolean = false;

  constructor(
    private _share: ShareService,
    private _dymanicLinkSrv: DynamicLinkService
  ) { }

  ngOnInit() {}

  async share() {

    const urlPrefix = environment.production
      ? 'https://digitalonboard.ecobank.com/pwa'
      : 'https://digitalonboard.ecobank.com/pwa'
    let postURL = '';


    let validSocialImageURL = "https://www.techafricanews.com/wp-content/uploads/2020/04/ecobank.jpg";

    const post = stripOffHtmlTags("Open your Bank Account with us: ");
    this._dymanicLinkSrv.generateShortAndPreviewLinks(
      urlPrefix + postURL,
      (await validSocialImageURL),
      post,
      `Experience digital onboarding platform`,
    ).subscribe(resp => {
      this._share.shareWithNavigator(post, 'Ecobank', resp.shortLink);
    }
    );
  }



}
