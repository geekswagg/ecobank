import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShortLinkRequestBody, ShortLinkResponse } from '../_models/dynamic-links';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DynamicLinkService {

  private _http: HttpClient;
  constructor(
    private handler: HttpBackend,
  ) {
    this._http = new HttpClient(handler);
  }


  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  generateShortAndPreviewLinks(
    validShareURL: string,
    validSocialImageURL: string,
    shareTitle: string,
    shareDescription: string
  ) {
    return this.createLink({
      dynamicLinkInfo: {
        domainUriPrefix: 'https://twaa.page.link',
        link: validShareURL,
        socialMetaTagInfo: {
          socialTitle: shareTitle,
          socialDescription: shareDescription,
          socialImageLink: `${validSocialImageURL}`,
        },
        androidInfo: {
          androidPackageName: "com.twaa",
        },
        iosInfo: {
          iosBundleId: "com.twaa",
        },
      },
    });
  }


  private createLink(body: ShortLinkRequestBody): Observable<ShortLinkResponse> {
    const path = `/v1/shortLinks?key=${environment.firebaseConfig.apiKey}`;
    return this.post(path, body);

  }

  private post(path: string, body: ShortLinkRequestBody): Observable<ShortLinkResponse> {
    return this._http.post<ShortLinkResponse>(
      `https://firebasedynamiclinks.googleapis.com${path}`,
      JSON.stringify(body),
      {
        headers: this.headers,
      }
    ).pipe(
      retry(3),
      catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
