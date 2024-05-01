/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { LoadingService } from '../_services/loading.service';
import { ModalController } from '@ionic/angular';
import { OtpFormComponent } from './otp-form/otp-form.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  authForm: FormGroup;
  termsAccepted: boolean = false;

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  get f() {
    return this.authForm.controls;
  }


  constructor(
    private fb: FormBuilder,
    public loader: LoadingService,
    private  modalCtrl: ModalController
  ) {
    this.authForm = this.fb.group({
      phone: ['', Validators.required],
      recaptcha: ['', Validators.required],
      idNumber: ["", [Validators.required]],
      emailAddress: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
    });
  }

  ngOnInit() {
  }

  verifyUser(){
    this.validateOtp();
  }

  checkboxChanged(){}


  async validateOtp(){
    const modal = await this.modalCtrl.create({
      component: OtpFormComponent,
      componentProps:{ auth: '' },
    });
    await modal.present();
  }

}
