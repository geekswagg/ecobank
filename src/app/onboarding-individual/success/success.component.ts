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
      ? 'https://twaa.io/'
      : 'https://staging.twaa.io/'
    let postURL = '';


    let validSocialImageURL = "https://twaa.s3.fr-par.scw.cloud/twaalogoemail.png";

    const post = stripOffHtmlTags("test");
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
