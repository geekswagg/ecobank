import { ModalController } from '@ionic/angular';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/_models/data-models';
import { OtpModalComponent } from './otp-modal/otp-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { LoadingService } from 'src/app/_services/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invitee-welcome',
  templateUrl: './invitee-welcome.component.html',
  styleUrls: ['./invitee-welcome.component.scss'],
})
export class InviteeWelcomeComponent  implements OnInit {

  token: string = '';
  inviter: any;
  showOtp = false;
  auth: Auth = {};

  otpForm: FormGroup;

  get of() {
    return this.otpForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public loader: LoadingService,
    private toastr: ToastrService
  ) {
    this.token = this.route.snapshot.queryParamMap.get("token") ?? '';
    localStorage.setItem("access-token", `Bearer ${this.token}`);
    localStorage.setItem("invited", `1`);

    this.otpForm = this.fb.group({
      smsCode: ["", [Validators.required]],
    });
   }

  ngOnInit() {}

  getInviterDetails() {
    this.loader.loading = true;

      this.apiService.getJointAccountInviter().subscribe({
        next: (res) => {
          if (res.successful) {
            this.loader.loading = false;
            this.inviter = res.object;
          } else {
            this.loader.loading = false;
            this.toastr.error(res.message);
          }
        },
        error:(error) => {
            this.loader.loading = false;
            this.toastr.error(
              "Error fetching your joint account members try the link again"
            );
          }
      }); // end api call

  }

  async acceptInvitation() {
    const modal = await this.modalCtrl.create({
      component: OtpModalComponent,
      componentProps: { auth: '',token: this.token },
      initialBreakpoint: 0.65,
      breakpoints: [0.65, 0.8],
      cssClass: 'message-modal',
    });
    await modal.present();
  }

    /**  Decline invitation  -> take user to home page */
    declineInvitation() {
      this.router.navigate(["/"]);
    }


}
