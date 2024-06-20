import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  async shareWithNavigator(post: string, username: string, url: string, title: string = 'Twaa.io') {
    if ((await Share.canShare())) {
      console.log('sharing in mobile');
      await Share.share({
        title,
        url,
        text: post.slice(0, 60),
        dialogTitle: `${username} on Twaa.io`,
      });
    } else {
      console.log('cannot share');
    }
  }

}
