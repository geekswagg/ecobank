/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/_models/data-models';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss'],
})
export class OtpModalComponent  implements OnInit {

  otpForm: FormGroup;
  inviter: any;
  auth: Auth = {};
  @Input() token: string = '';

  get f() {
    return this.otpForm.controls;
  }

  constructor(
    public loader: LoadingService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private dataStore: DataStoreService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      smsCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.inviter = JSON.parse(localStorage.getItem('inviter') as string);
  }


  resendCode() {
    this.loader.loading = true;

    localStorage.setItem("access-token", `Bearer ${this.token}`);

    setTimeout(() =>{

      this.apiService.getJointAccountInviter().subscribe(
        {
          next: () => {
            this.loader.loading = false;
          },
          error: () => {
            this.loader.loading = false;
          }
        });

    }, 300)
  }

  verifyOtp() {
    this.loader.loading = true;
    this.auth.phoneNumber = this.inviter.principalMemberDetails.phoneNumber;
    this.auth.userType = "NORMAL";
    this.auth.accountType = "15";
    this.auth.bundleCode = "1002";
    this.auth.customerCategory = "Invited";
    this.auth.multipleAccountsAllowed = "N";
    this.dataStore.preferences.accountBundle = "15";

    // Save Payload to service
    this.dataStore.auth = this.auth;

    // Set cookies
    localStorage.setItem("auth", JSON.stringify(this.auth));

      this.apiService
        .verifyOTP({
          phoneNumber: this.inviter?.principalMemberDetails?.phoneNumber,
          smsCode: this.f['smsCode'].value,
        })
        .subscribe({
          next: (res) => {
            if (res.successful) {
              // this.toastr.success(res.message);
              this.loader.loading = false;
              localStorage.setItem(
                "preferences",
                JSON.stringify(this.dataStore.preferences)
              );
              localStorage.setItem(
                "nextofkin",
                JSON.stringify(this.dataStore.preferences)
              );
              localStorage.setItem(
                "occupation",
                JSON.stringify(this.dataStore.occupation)
              );
              switch (res.stepCode) {
                case 100:
                  this.router.navigate(["/onboarding/identification"]);
                  break;
                case 102:
                  this.router.navigate(["/onboarding/identification"]);
                  break;
                case 103:
                  this.router.navigate(["/onboarding/identification"]);
                  break;
                case 104:
                  this.router.navigate(["/onboarding/identification"]);
                  break;
                case 105:
                  this.router.navigate(["/onboarding/preferences"]);
                  break;
                case 106:
                  this.router.navigate(["/onboarding/occupation"]);
                  break;
                case 107:
                  this.router.navigate(["/liveliness/new-selfie"]);
                  break;
                case 108:
                  this.router.navigate(["/onboarding/summary"]);
                  break;
                default:
                  break;
              }
            } else {
              this.loader.loading = false;
              this.toastr.error(res.message);
            }
          },
          error: (error) => {
            this.loader.loading = false;
            this.toastr.error("Request error try again");
          }
    }); // end api call

  }

}
