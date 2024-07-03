/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { CameraComponent } from 'src/app/_components/camera/camera.component';
import { Selfie } from 'src/app/_models/data-models';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.scss'],
})
export class SelfieComponent  implements OnInit {

  selfie: Selfie = {};
  side: string = 'selfie';
  loading: boolean = false;

  url = "https://wanpas.ai/mikayi/check_liveness";

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private toastr: ToastrService,
    public loader: LoadingService,
    private apiService: ApiService,
    private httpClient: HttpClient,
    private dataStore: DataStoreService
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
        this.selfie.selfieFile = data.data.data.selfieFile;
        this.uploadToRecognition(data.data.data.selfieFile);
      }
    });

    return await modal.present();
  }

    // Save Selfie
    saveSelfie(payload: any) {
      this.loader.loading = true;
      this.loader.savingSelfie = true;

      if (localStorage.getItem("business-selfie")) {
        // save selfie for business

        if (localStorage.getItem('foreign-data')) {

          this.foreignDirectorSelfie();

        } else {

          this.localDirectorSelfie();

        }


      } else {
          this.apiService.saveSelfie(payload).subscribe({
            next: (res) => {
               if (res.successful) {
                this.loader.loading = false;
                this.loader.savingSelfie = false;
                this.toastr.success(res.message);
                setTimeout(() =>{
                  this.router.navigate(["/onboarding/summary"]);
                },500);
              }
              else{
                this.loader.loading = false;
                this.loader.savingSelfie = false;
                this.toastr.warning("Error saving selfie try again");
              }
            },
            error: (err) => {
              // this.router.navigate(["/onboarding/summary"]);
              this.loader.loading = false;
              this.loader.savingSelfie = false;
              this.toastr.warning("Error saving selfie try again");
            }
          }
         );
      }
    }

    uploadToRecognition(file: File) {
      this.loader.detectingFace = true;
      this.loader.loading = true;
      const formData = new FormData();
      formData.append("key", file);  // giktek server
        this.httpClient
          .post<any>(this.url, formData)
          .subscribe({
            next:(res) => {
              if (res.error) {
                this.loader.detectingFace = false;
                this.loader.loading = false;

                let error_message = "";
                switch (res.error_code) {
                  case "FACE_IS_OCCLUDED":
                    error_message =
                      "It's difficult to see your face. Be in a well lit room with no background lighting and your face  uncovered";
                    break;
                  case "FACE_NOT_FOUND":
                    error_message =
                      "Please move closer to the camera. Ensure you are in a well-lit room with no background lighting";
                    break;
                  case "FACE_TOO_SMALL":
                    error_message =
                      "Please move closer to the camera. Ensure you are in a well-lit room with no background lighting";
                    break;
                  case "FACE_ANGLE_TOO_LARGE":
                    error_message =
                      "Please move closer to the camera. Ensure you are in a well-lit room with no background lighting";
                    break;
                  case "INVALID_FUSE_MODE":
                    error_message = "System error try again later";
                    break;
                  case "LICENSE_ERROR":
                    error_message = "System error try again later";
                    break;

                  default:
                    // error_message = res.error;
                    error_message = "Kindly take a better selfie";
                }

                this.toastr.error(error_message);
              }

              if (res.probability > 0.49) {
                this.toastr.success("This is a live photo");
                this.loader.detectingFace = false;

                this.saveSelfie({ file: this.selfie.selfieFile });
              }

              if (res.probability < 0.5) {
                this.toastr.error("This is not a live photo");
                this.loader.detectingFace = false;
                this.loader.loading = false;
              }
            },
            error: (err) => {
              this.toastr.error("Error processing image try again");
              this.loader.detectingFace = false;
              this.loader.loading = false;
            }
          }); // end of API call
    }

    /** Save selfie of the local director */
  localDirectorSelfie() {
    const payload = {
      file: this.selfie.selfieFile,
      idType: "NATIONAL_ID",
      imageType: "SELFIE",
      match: "",
      nationalId: this.dataStore.identification.nationalId,
    };

    try {
      this.apiService.saveImageBIZ(payload).subscribe(
        (response: any) => {

          this.loader.loading = false;

          if (response.successful) {

            this.loader.loading = false;
            this.loader.savingSelfie = false;
            this.toastr.success(response.message);
            this.router.navigate(["/invitee-business/finish"]);

            localStorage.removeItem('business-selfie');

          }

        },

        (error: any) => {
          this.loader.loading = false;
          this.loader.savingSelfie = false;
          this.toastr.warning("Error saving selfie try again");
        }
      );
    } catch (error) {
      this.loader.loading = false;
      this.loader.savingSelfie = false;
      this.toastr.warning("Error saving selfie try again");
    }

  }


  /** Save selfie of foreign director */
  foreignDirectorSelfie() {

    let foreignPayload = JSON.parse(localStorage.getItem('foreign-data') as string);

    const payload = {
      file: this.selfie.selfieFile,
      idType: "NATIONAL_ID",
      imageType: "SELFIE",
      match: "",
      nationalId: this.dataStore.identification.nationalId,
      firstName : foreignPayload.firstName,
      surname : foreignPayload.surname,
      otherName : foreignPayload.otherName,
      gender : foreignPayload.gender.genderCode,
      dateOfBirth : foreignPayload.dateOfBirth,
      documentDateOfExpiry : foreignPayload.documentDateOfExpiry
    };

    try {
      this.apiService.saveImageForeignBIZ(payload).subscribe(
        (response: any) => {

          this.loader.loading = false;

          if (response.successful) {

            this.loader.loading = false;
            this.loader.savingSelfie = false;
            this.toastr.success(response.message);
            this.router.navigate(["/invitee-business/finish"]);

            localStorage.removeItem('business-selfie');
            localStorage.removeItem('foreign-data')

          }

        },

        (error: any) => {
          this.loader.loading = false;
          this.loader.savingSelfie = false;
          this.toastr.warning("Error saving selfie try again");
        }
      );
    } catch (error) {
      this.loader.loading = false;
      this.loader.savingSelfie = false;
      this.toastr.warning("Error saving selfie try again");
    }

  }

}
