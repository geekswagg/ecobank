/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { CameraComponent } from 'src/app/_components/camera/camera.component';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.scss'],
})
export class SelfieComponent  implements OnInit {


  side: string = 'selfie';
  loading: boolean = false;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private toastr: ToastrService
  ) { }

  ngOnInit() {}



  async openCamera(side: string) {
    this.side = side;
    const modal = await this.modalCtrl.create({
      component: CameraComponent,
      cssClass: "my-custom-class",
      componentProps: { side },
    });

    modal.onWillDismiss().then(async (data: any) => {
      if (data.data.cancelled) {
      } else {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.toastr.success('Live selfie verified successfully');
          this.router.navigate(['/onboarding/summary']);
        },3000);
      }
    });

    return await modal.present();
}

}
