/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { CameraComponent } from 'src/app/_components/camera/camera.component';
import { Identification } from 'src/app/_models/data-models';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import { LoadingService } from 'src/app/_services/loading.service';
const signatureUrl = "https://ai.giktek.io/signature";

@Component({
  selector: 'app-id-scan',
  templateUrl: './id-scan.component.html',
  styleUrls: ['./id-scan.component.scss'],
})
export class IdScanComponent  implements OnInit {

  identification: Identification = {};
  side: string = '';
  frontImage: any = '';
  backImage: any = '';
  signImage: any = '';
  passportImage: any = '';
  selectedDocument: any = 'ID';
  docType: string = '';

  constructor(
    public loader: LoadingService,
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private dataStore: DataStoreService

  ) { }

  ngOnInit() {
    this.selectedDocument = this.dataStore.identification.documentType;
    if(this.selectedDocument === 'ID'){
      this.docType = "National ID";
    }
    else{
      this.docType = "Passport";
    }
  }

  selectDocToScan(type: string): void {
    switch (type) {
      case "ID":
        this.router.navigate(["/onboarding/id-sides"]);
        break;
      case "PASSPORT":
        this.openCamera("passport");
        break;
      case "SIGNATURE":
        this.openCamera("signature");
        break;
        case "SELFIE":
          this.openCamera("selfie");
          break;
      default:
        break;
    }
  }

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
          const formData =  new FormData();
          formData.append("file",this.identification.signatureFile);
          this.loader.frontCaptured = true;
          this.loader.backCaptured = true;
          this.loader.signCaptured = true;
          localStorage.setItem("SIGN",this.identification.signCaptured);
          setTimeout(()=>{
            this.signImage = localStorage.getItem("SIGN");
          },200)
          this.verifySignature(formData);
        }

        if(this.side === 'passport'){
          this.loader.passportCaptured = true;
          localStorage.setItem("PASSPORT",this.identification.passportCaptured);
          setTimeout(()=>{
            this.passportImage = localStorage.getItem("PASSPORT");
          },200)
          this.scanPassport();
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

        try {
          this.apiService
            .scanFrontID({
              national_id: this.identification.frontIdBase64,
            })
            .subscribe(
              (res) => {
                if (res.success) {
                  this.loader.scanningFront = false;
                  this.loader.scannedFront = true;
                  this.identification.frontIdOcrText = res.data;
                  this.router.navigate(["/onboarding/new/id-scan"], {
                    replaceUrl: true,
                  });
                } else {
                  this.loader.scanningFront = false;
                  this.loader.scannedFront = false;
                  this.scanningSolutions();
                }
              },
              (error) => {
                this.loader.scanningFront = false;
                this.loader.scannedFront = false;
                this.scanningSolutions();
              }
            ); // end api call
        } catch (error) {
          this.loader.scanningFront = false;
          this.loader.scannedFront = false;
          this.scanningSolutions();
        }

        break;
      case "id_back":
        if (this.loader.scannedFront) {
          this.loader.scanningBack = true;
          try {

            this.apiService
              .scanBackID({
                national_id: this.identification.backIdBase64,
                document_type: "ID",
              })
              .subscribe(
                (res) => {
                  if (res.success) {
                    this.loader.scanningBack = false;
                    const id = res.id.split(" ").join("");
                    // this.identification.nationalId = parseInt(id).toString(); //TODO looks like its truncating leading zero
                    this.identification.nationalId = id;
                    this.identification.ocrKey = res.key;
                    // Verify ID
                    this.verifyID(this.identification.nationalId);

                  } else {
                    this.loader.scanningBack = false;
                    this.scanningSolutions();
                  }
                },
                (error) => {
                  this.loader.scanningBack = false;
                  this.scanningSolutions();
                }
              ); // end api call
          } catch (error) {
            this.loader.scanningBack = false;
            this.scanningSolutions();
          }
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
      mode:'md',
      cssClass: "my-custom-class",
      header: "CONFIRM",
      message: `<h5>Please confirm that this is your National ID Number? \n
                Note: This number will be used to automatically fetch your KRA PIN
                </h5> \n \n
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
          cssClass: "primary",
          handler: () => {
            // Save the front id
            this.saveBackImage({
              file: this.identification.backIdFile,
              idType: "NATIONAL_ID",
              imageType: "ID_BACK",
              match: "",
              nationalId: this.identification.nationalId,
              key: this.identification.ocrKey,
            });
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

    //Verify signature image before saving it
    verifySignature(payload: any){
      this.loader.scanningSignature = true;

      this.httpClient.post(signatureUrl, payload).subscribe({
        next: (resp: any) => {
          this.loader.scanningSignature = false;
          if(resp.is_signed){
            this.saveImage("signature", {
              file: this.identification.signatureFile,
              idType: "",
              imageType: "SIGNATURE",
              match: "",
              nationalId: "",
            });
          }
          else{
            this.toastr.error("Ensure your signature is signed on a plain white paper");
          }
        },
        error: (err: any) => {
          this.loader.scanningSignature = false;
          this.toastr.error("An error while verifying your signature. Please try again");
        }
      })
    }


  // Save image
  async saveFrontImage(payload: any) {
    this.loader.savingFront = true;
    this.loader.scannedFront = false;

    try {
      this.apiService.saveImage(payload).subscribe({
        next: (res) => {
          if (res.successful) {
            this.loader.savingFront = false;
            this.loader.savedFront = true;
            this.dataStore.identification.frontSaved = true;
            this.router.navigate(["/onboarding/new/identification"], {
              replaceUrl: true,
            });
          } else {
            this.toastr.error(res.message);
            this.loader.savingFront = false;
            this.loader.savedFront = false;

            this.loader.savingBack = false;
            this.loader.savedBack = false;
          }
        },
        error:(err)=>{
          this.toastr.error("Error saving image try again");
          this.loader.savingFront = false;
          this.loader.savedFront = false;

          this.loader.savingBack = false;
          this.loader.savedBack = false;
        }
      }

      ); // end api call
    } catch (error) {
      this.toastr.error("Error saving image try again");
      this.loader.savingFront = false;
      this.loader.savedFront = false;

      this.loader.savingBack = false;
      this.loader.savedBack = false;
    }
  }

  async saveBackImage(payload: any) {
    this.loader.savingBack = true;

    try {
      this.apiService.saveImage(payload).subscribe(
        (res) => {
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
        (error) => {
          this.loader.savingBack = false;
          this.loader.savedBack = false;
          this.toastr.error("Unable to save your document again");
        }
      ); // end api call
    } catch (error) {
      this.loader.savingBack = false;
      this.loader.savedBack = false;
      this.toastr.error("Unable to save your document again");
    }
  }

  toPreference(){
    this.router.navigate(['/onboarding/preferences']);
  }


  scanPassport() {
    this.loader.scanningPassport = true;

    try {
      this.apiService
        .scanBackID({
          national_id: this.identification.passportBase64,
          document_type: "PASSPORT",
        })
        .subscribe({
          next: (res) => {
              if (res.success) {
                this.loader.scanningPassport = false;
                const id = res.id.split(" ").join("");
                this.identification.nationalId = id;
                this.identification.ocrKey = res.key;
                // Verify that the passport is correct
                this.verifyPassport(this.identification.nationalId);
              } else {
                this.loader.scanningPassport = false;
                this.scanningSolutions();
              }
            },
          error: (err) => {
            this.toastr.error("Error scanning passport try again.");
            this.loader.passportScanSuccess = false;
          }

    }); // end api call
    } catch (error) {
      this.loader.scanningPassport = false;
      this.scanningSolutions();
    }
  }

  async verifyPassport(passportNumber: any) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      cssClass: "my-custom-class",
      header: "CONFIRM",
      message: `<h5>Please confirm that this is your Passport Number? \n
                </h5> \n \n
                <h1>${passportNumber}<h1>
                `,
      buttons: [
        {
          text: "NO",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.loader.scanningPassport = false;
          },
        },
        {
          text: "YES",
          handler: () => {
            // Save the front id
            this.saveImage("passport", {
              file: this.identification.passportFile,
              idType: "PASSPORT_ID",
              imageType: "PASSPORT",
              match: "",
              nationalId: this.identification.nationalId,
              key: this.identification.ocrKey,
            });
          },
        },
      ],
    });
    await alert.present();
  }

    // Save image
    async saveImage(side: any, payload:any) {
      switch (side) {
        case "passport":
          this.loader.savingPassport = true;
            this.apiService.saveImage(payload).subscribe({
              next:(res) => {
                if (res.successful) {
                  this.loader.passportScanSuccess = true;

                  this.loader.savingPassport = false;
                  this.loader.savedPassport = true;
                } else {
                  this.loader.savingPassport = false;
                  this.toastr.error(res.message);
                }
              },
              error: (err) => {
                this.loader.savingPassport = false;
                this.toastr.error("Error saving passport try again.");
              }
            }); // end api call
          break;

        case "signature":
          this.loader.savingSignature = true;
          try {
            this.apiService.saveImage(payload).subscribe({
              next: (res) => {
                  if (res.successful) {
                    this.loader.savingSignature = false;
                    this.loader.savedSignature = true;
                    this.dataStore.identification.backSaved = true;
                  } else {
                    this.loader.savingSignature = false;
                    this.toastr.error(res.message);
                  }
              },
              error: (err) => {
                this.loader.savingSignature = false;
                this.toastr.error("Error saving signature try again.");
              }
            }); // end api call
          } catch (error) {
            this.loader.savingSignature = false;
            this.toastr.error("Error saving signature try again.");
          }
          break;
        default:
          break;
      }
    }


}
