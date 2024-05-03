/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Item } from 'src/app/_models/types';
import { LoadingService } from 'src/app/_services/loading.service';
import { OtpFormComponent } from 'src/app/auth/otp-form/otp-form.component';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss'],
})
export class OccupationComponent  implements OnInit {


  authForm: FormGroup;
  termsAccepted: boolean = false;

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  selectedFruitsText: any = '0 Items';
  selectedFruits: string[] = [];

  fruits: Item[] = [
    { text: 'Apple', value: 'apple' },
    { text: 'Apricot', value: 'apricot' },
    { text: 'Banana', value: 'banana' },
    { text: 'Blackberry', value: 'blackberry' },
    { text: 'Blueberry', value: 'blueberry' },
    { text: 'Cherry', value: 'cherry' },
    { text: 'Cranberry', value: 'cranberry' },
    { text: 'Grape', value: 'grape' },
    { text: 'Grapefruit', value: 'grapefruit' },
    { text: 'Guava', value: 'guava' },
    { text: 'Jackfruit', value: 'jackfruit' },
    { text: 'Lime', value: 'lime' },
    { text: 'Mango', value: 'mango' },
    { text: 'Nectarine', value: 'nectarine' },
    { text: 'Orange', value: 'orange' },
    { text: 'Papaya', value: 'papaya' },
    { text: 'Passionfruit', value: 'passionfruit' },
    { text: 'Peach', value: 'peach' },
    { text: 'Pear', value: 'pear' },
    { text: 'Plantain', value: 'plantain' },
    { text: 'Plum', value: 'plum' },
    { text: 'Pineapple', value: 'pineapple' },
    { text: 'Pomegranate', value: 'pomegranate' },
    { text: 'Raspberry', value: 'raspberry' },
    { text: 'Strawberry', value: 'strawberry' },
  ];

  get f() {
    return this.authForm.controls;
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public loader: LoadingService,
    private  modalCtrl: ModalController
  ) {
    this.authForm = this.fb.group({
      phone: ['', Validators.required],
      branch: ['', Validators.required],
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
  private formatData(data: any) {
    // if (data.length === 1) {
    //   const fruit = this.fruits.find((fruit) => fruit.value === data[0]);
    //   return fruit?.text;
    // }

    return `${data.length} items`;
  }

  checkboxChanged(){}



  async validateOtp(){
    const modal = await this.modalCtrl.create({
      component: OtpFormComponent,
      componentProps:{ auth: '' },
    });
    await modal.present();
  }


  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

  }

  toSelfie(){
    this.router.navigate(['/onboarding/selfie']);
  }

}
