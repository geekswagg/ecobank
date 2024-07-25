import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import {WebcamImage, WebcamInitError, WebcamModule, WebcamUtil} from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    IonicModule,
    WebcamModule
  ],
  providers:[
    DataStoreService
  ]
})
export class CameraComponent  implements OnInit {


  @Input() side: string  = '';
   // toggle webcam on/off
   public showWebcam = true;
   public allowCameraSwitch = false;
   public multipleWebcamsAvailable = false;
   public deviceId: string = '';
   base64File: string = '';

   public errors: WebcamInitError[] = [];

   // latest snapshot
   public webcamImage: WebcamImage | undefined;

   // webcam snapshot trigger
   private trigger: Subject<void> = new Subject<void>();
   // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
   private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();



   constructor(
    private dataStore: DataStoreService,
    private modalCtrl: ModalController
   ){}

   public ngOnInit(): void {
       WebcamUtil.getAvailableVideoInputs()
       .then((mediaDevices: MediaDeviceInfo[]) => {
         this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
       });
   }

   public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {
    };
    if (this.side === 'selfie') {
        result.facingMode = { ideal: 'user' };
    }
    else{
      result.facingMode = { ideal: "environment"};
    }
    return result;
}

   public triggerSnapshot(): void {
     this.trigger.next();
   }

   public toggleWebcam(): void {
     this.showWebcam = !this.showWebcam;
   }

   public handleInitError(error: WebcamInitError): void {
     this.errors.push(error);
   }

   public showNextWebcam(directionOrDeviceId: boolean|string): void {
     // true => move forward through devices
     // false => move backwards through devices
     // string => move to device with given deviceId
     this.nextWebcam.next(directionOrDeviceId);
   }

   public async handleImage(webcamImage: WebcamImage): Promise<void> {
     this.webcamImage = webcamImage;
      this.base64File = webcamImage.imageAsDataUrl.split('base64,')[1];
      switch (this.side) {
        case 'id_front':
          this.dataStore.identification.frontId.frontIdBase64 = await this.base64File;
          this.dataStore.identification.frontId.frontIdCaptured = await webcamImage.imageAsDataUrl;
          this.dataStore.identification.frontId.frontIdFile = await this.dataUrlToFileEncrypted(
            this.dataStore.identification.frontId.frontIdBase64
          );

          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification,
          });
          break;
        case 'id_back':
          this.dataStore.identification.backId.backIdBase64 = this.base64File
          this.dataStore.identification.backId.backIdCaptured = webcamImage.imageAsDataUrl;
          this.dataStore.identification.backId.backIdFile = await this.dataUrlToFileEncrypted(
            this.dataStore.identification.backId.backIdBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification
          });
          break;

        case 'passport':
          this.dataStore.identification.passportBase64 = this.base64File
          this.dataStore.scanningPassport = true;
          this.dataStore.identification.passportCaptured = webcamImage.imageAsDataUrl;
          this.dataStore.identification.passportFile = await this.dataUrlToFileEncrypted(
            this.dataStore.identification.passportBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification,
          });
          break;
        case 'signature':
          this.dataStore.identification.signatureBase64 = this.base64File;
          this.dataStore.identification.signCaptured = webcamImage.imageAsDataUrl;
          this.dataStore.identification.signatureFile = await this.dataUrlToFile(
            this.dataStore.identification.signatureBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification,
          });
          break;

        case 'exemption':
          this.dataStore.identification.taxBase64 = this.base64File;
          this.dataStore.identification.taxFile = await this.dataUrlToFile(
            this.dataStore.identification.taxBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification,
          });
          break;
        case 'selfie':
          this.dataStore.selfie.selfieBase64 = this.base64File
          this.dataStore.selfie.selfieFile = await this.dataUrlToFile(
            this.dataStore.selfie.selfieBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.selfie,
          });
          break;

        default:
          break;
      }
   }

   public cameraWasSwitched(deviceId: string): void {
     this.deviceId = deviceId;
   }

   public get triggerObservable(): Observable<void> {
     return this.trigger.asObservable();
   }

   public get nextWebcamObservable(): Observable<boolean|string> {
     return this.nextWebcam.asObservable();
   }

   async dataUrlToFile(base64: string) {
    const res: Response = await fetch(`data:image/jpeg;base64,${base64}`);
    const blob: Blob = await res.blob();
    return new File([blob], 'dala.jpeg', { type: 'image/jpeg' });
  }

  async dataUrlToFileEncrypted(base64: string) {

    const base64Encrypted = this.dataStore.enkript(base64);

    const blob = new Blob([base64Encrypted], { type: 'text/plain' });
    return new File([blob], 'kj', { type: 'text/plain' });

  }

}
