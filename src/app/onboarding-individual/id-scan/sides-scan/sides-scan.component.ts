/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { CameraComponent } from 'src/app/_components/camera/camera.component';
import { Identification } from 'src/app/_models/data-models';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-sides-scan',
  templateUrl: './sides-scan.component.html',
  styleUrls: ['./sides-scan.component.scss'],
})
export class SidesScanComponent  implements OnInit {


  identification: Identification = {};
  side: string = '';
  frontImage: any = '';
  backImage: any = '';
  signImage: any = '';
  idNumber: string = '';

  constructor(
    public loader: LoadingService,
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private router: Router,
    private toastr: ToastrService,
    private dataStore: DataStoreService

  ) {}

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
        this.identification = await data.data.data;
        if(this.side === 'id_front'){
          this.loader.frontCaptured = true;
          localStorage.setItem("FRONT",this.identification.frontIdCaptured);
          setTimeout(()=>{
            this.frontImage = localStorage.getItem("FRONT")
          },200)
        }
        if(this.side === 'id_back'){
          this.loader.backCaptured = true;
          this.loader.frontCaptured = true;
          localStorage.setItem("BACK",this.identification.backIdCaptured);
          setTimeout(()=>{
            this.backImage = localStorage.getItem("BACK");
          },200)
        }

        if(this.side === 'signature'){
          this.loader.frontCaptured = true;
          this.loader.backCaptured = true;
          this.loader.signCaptured = true;
          localStorage.setItem("SIGN",this.identification.signCaptured);
          setTimeout(()=>{
            this.signImage = localStorage.getItem("SIGN");
          },200)
        }
        await this.scanImages();

      }
    });
    return await modal.present();
  }


  scanImages() {
    switch (this.side) {
      case "id_front":
        this.loader.scanningFront = true;
        this.apiService
          .scanFrontID({
            national_id: this.identification.frontIdBase64,
          })
          .subscribe({
            next: (res) => {
              if (res.success) {
                this.loader.scanningFront = false;
                this.loader.scannedFront = true;
                this.loader.frontIdScanSuccess = true;
                this.identification.frontIdOcrText = res.data;
                this.toastr.success("Front ID scanned successfully");
              } else {
                this.loader.scanningFront = false;
                this.loader.frontIdScanSuccess = false;
                this.loader.scannedFront = false;
                this.scanningSolutions();
              }
            },
            error: (err) => {
              this.loader.scanningFront = false;
              this.loader.scannedFront = false;
              this.loader.frontIdScanSuccess = false;
              this.scanningSolutions();
            }
          }); // end api call
        break;
      case "id_back":
        if (this.loader.scannedFront) {
          this.loader.scanningBack = true;
            this.apiService
              .scanBackID({
                national_id: this.identification.backIdBase64,
                document_type: "ID",
              })
              .subscribe({
                next: (res) =>{
                  if (res.success) {
                    this.loader.scanningBack = false;
                    const id = res.id.split(" ").join("");
                    // this.identification.nationalId = parseInt(id).toString(); //Looks like its truncating leading zero
                    this.identification.nationalId = id;
                    this.identification.ocrKey = res.key;
                    this.idNumber = id;
                    this.verifyID(this.identification.nationalId);

                  } else {
                    this.loader.scannedBack = false;
                    this.loader.scanningBack = false;
                    this.loader.backIdScanSuccess = false;
                    this.scanningSolutions();
                  }
                },
                error: (err) =>{
                  this.loader.scannedBack = false;
                  this.loader.scanningBack = false;
                  this.loader.backIdScanSuccess = false;
                  this.scanningSolutions();
                }
              }); // end api call

        } else {
          this.toastr.error(
            "Please scan Front Of ID First",
            "Scanning Failed!"
          );
        }
        break;
      default:
        break;
    }
  }



  // Verify that the ID scanned is for the user onboarding
  async verifyID(nationalId: any) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      mode: 'md',
      cssClass: "my-custom-class",
      header: "CONFIRM",
      message: `<h5>Please confirm that this is your National ID Number? \n
                </h5> \n
                <h1>${nationalId}<h1>
                `,
      htmlAttributes: {},
      buttons: [
        {
          text: "NO",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.loader.scanningBack = false;
          },
        },
        {
          text: "YES",

          handler: () => {
            this.loader.backIdScanSuccess = true;
            this.loader.scannedBack = true;

            setTimeout(() =>{
              this.saveNationalId();
            },500)

          },
        },
      ],
    });
    await alert.present();
  }



  async scanningSolutions() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      cssClass: "my-custom-class",
      mode: 'md',
      header: "SCANNING FAILED",
      message: `<h6>Take note of the following concerns as your make another scanning attempt
                </h6> \n \n
                <ol>
                  <li>Ensure you are scanning the correct side of the ID.</li>
                  <li>Ensure your ID fits into the box guideline of the camera.</li>
                  <li>Ensure you are scanning in a well lit room. i.e Avoid dark areas.</li>
                </ol>
                `,
      buttons: [
        {
          text: "OK",
          handler: () => {
            // Save the front id
          },
        },
      ],
    });
    await alert.present();
  }


  // Save image
  async saveFrontImage(payload: any) {
    this.loader.savingFront = true;
    this.loader.scannedFront = false;

    this.apiService.saveImage(payload).subscribe({
      next: (res) => {
        if (res.successful) {
          this.loader.savingFront = false;
          this.loader.savedFront = true;
          this.dataStore.identification.frontSaved = true;
          this.router.navigate(['/onboarding/id-scan']);
        } else {
          this.toastr.error(res.message);
          this.loader.savingFront = false;
          this.loader.savedFront = false;

          this.loader.savingBack = false;
          this.loader.savedBack = false;
        }
      },
      error: (err) => {
        this.toastr.error("Error saving image try again");
        this.loader.savingFront = false;
        this.loader.savedFront = false;

        this.loader.savingBack = false;
        this.loader.savedBack = false;
      }
    });
  }

  async saveBackImage(payload: any) {
    this.loader.savingBack = true;

      this.apiService.saveImage(payload).subscribe({
        next:(res) =>{
          if (res.successful) {
            this.loader.savingBack = false;
            this.loader.savedBack = true;
            this.dataStore.identification.backSaved = true;
            this.saveFrontImage({
              file: this.identification.frontIdFile,
              idType: "NATIONAL_ID",
              imageType: "ID_FRONT",
              match: this.identification.frontIdOcrText,
              nationalId: "",
            });
          } else {
            this.loader.savingBack = false;
            this.loader.savedBack = false;
            this.toastr.error(res.message);
          }
        },
        error:(err) =>{
          this.loader.savingBack = false;
          this.loader.savedBack = false;
          this.toastr.error("Unable to save your document. Try again");
        }
      }); // end api call
  }

  saveNationalId(){
    const payload = {
      file: this.identification.backIdFile,
      idType: "NATIONAL_ID",
      imageType: "ID_BACK",
      match: "",
      nationalId: this.identification.nationalId,
      key: this.identification.ocrKey
    }
    this.saveBackImage(payload)
  }


}
