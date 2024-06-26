/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/_models/types';
import { ApiService } from 'src/app/_services/api.service';
import { LoadingService } from 'src/app/_services/loading.service';
import { OtpFormComponent } from 'src/app/auth/otp-form/otp-form.component';

@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.component.html',
  styleUrls: ['./next-of-kin.component.scss'],
})
export class NextOfKinComponent  implements OnInit {


  @ViewChild('modal', { static: true }) modal!: IonModal;

  authForm: FormGroup;
  termsAccepted: boolean = false;

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  selectedFruitsText: any = '0 Items';
  selectedFruits: string[] = [];

  relationships = [];
  preferencePayload: any = {};

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
    private  modalCtrl: ModalController,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.authForm = this.fb.group({
      phone: ['', Validators.required],
      relationship: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],

    });
    this.preferencePayload = JSON.parse(sessionStorage.getItem('preference') as string);
    this.relationships = JSON.parse(localStorage.getItem("relationships") as string);

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

  relationshipChange(event: {
    component: IonicSelectableComponent,
    value: any
  }){

  }

  savePreference(){
    this.loader.loading = true;
    const {phone, relationship, firstName, lastName,emailAddress} = this.authForm.value;
    const payload = {
      ...this.preferencePayload,
      nameOfNextofKin: firstName+' '+lastName,
      relationshipWithNextOfKin:relationship,
      phoneNumberOfnextOfKin: phone.e164Number.replace("+", ""),
    }

    this.apiService.savePreferences(payload).subscribe({
      next: (res) => {
        if (res.successful) {
          this.loader.loading = false;
          this.router.navigate(['/onboarding/occupation']);
          localStorage.removeItem('invited');
        } else {
          this.loader.loading = false;
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.loader.loading = false;
        this.toastr.error("Error saving preferences details try again");
      }
    }
    ); // end api call
  }

}
