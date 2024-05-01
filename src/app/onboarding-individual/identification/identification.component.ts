/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer, take } from 'rxjs';
import { Auth } from 'src/app/_models/data-models';
import { ApiService } from 'src/app/_services/api.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
})
export class IdentificationComponent  implements OnInit {
  @Input() auth: Auth = {};
  resend: boolean = false;

  countDown: Subscription;
  counter = 56;
  tick = 1000;
  smsCode: string = '';




  constructor(
    private fb: FormBuilder,
    public loader: LoadingService,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private modalCtrl: ModalController
  ) {


    this.countDown = timer(0, this.tick)
    .pipe(take(this.counter))
    .subscribe(() => {
      --this.counter;
      // console.log(this.counter);
      if (this.counter == 0) {
        this.countDown.unsubscribe();
        this.resend = true;
      }
    });
  }

  ngOnInit() {

  }


   toIdScan() {
    this.router.navigate(['/onboarding/id-scan']);
    }

  resendCode(){}

  back(){
    this.modalCtrl.dismiss();
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  onOtpChange(e: any){
    this.smsCode = e;
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };


}
