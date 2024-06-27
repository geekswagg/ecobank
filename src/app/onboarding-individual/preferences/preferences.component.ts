/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Item } from 'src/app/_models/types';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import { LoadingService } from 'src/app/_services/loading.service';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent  implements OnInit {

  @ViewChild('modal', { static: true }) modal!: IonModal;

  dataForm: FormGroup;
  termsAccepted: boolean = false;

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  selectedFruitsText: any = '0 Items';
  selectedFruits: string[] = [];
  showDebitCard: boolean = false;
  fatca: boolean = false;

  branches = [];
  countries = [];
  relationships = [];
  auth: any = {};

  //Instruments
  enableDebitCard: boolean = false;
  enableChequebook: boolean = false;
  enableOnlineBanking: boolean = false;

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
    return this.dataForm.controls;
  }


  constructor(
    private fb: FormBuilder,
    public loader: LoadingService,
    private router: Router,
    private  modalCtrl: ModalController,
    private dataStore: DataStoreService,

    private apiServie: ApiService  ) {
    this.dataForm = this.fb.group({
      residence: ['', Validators.required],
      branch: ['', Validators.required],
      address: ['', Validators.required],
      building: ["", [Validators.required]],
      usPostalCode: [""],
      usSocialSecurityNumber:[""],
      usMailingAddress: [""],
    });

    this.dataStore.preferences = {
      ...JSON.parse(localStorage.getItem("preferences") as string),
      ...JSON.parse(localStorage.getItem("nextofkin") as string),
    };
    this.auth = JSON.parse(localStorage.getItem("auth") as string);
    this.branches = JSON.parse(localStorage.getItem("branches") as string);
    this.countries = JSON.parse(localStorage.getItem("countries") as string);

    if (this.auth?.accountType === '29' || this.auth?.accountType === '32'){
      this.showDebitCard = true;
    }
    else{
      this.showDebitCard = false;
    }
    this.dataStore.auth = JSON.parse(localStorage.getItem("auth") as string);
  }

  ngOnInit() {
  }

  verifyUser(){}




  checkboxChanged(){}


  countryChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {}

  branchChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {}

  changeDebitCard(event: any){
    if(event.detail.checked) this.enableDebitCard = true;
  }

  changeChequeBook(event: any){
    if(event.detail.checked) this.enableChequebook = true;
  }

  changeOnlineBanking(event: any){
    if(event.detail.checked) this.enableOnlineBanking = true;
  }

  toNextOfKin(){
    const {residence, branch, address, building} = this.dataForm.value;


    const preference = {
      residence: residence.countryCode ?? "",
      branch: branch?.branchCode ?? "",
      physicalAddress: `${address}#${building}`,
      orderDebitCard: this.enableDebitCard,
      onlineBankingYN: this.enableOnlineBanking,
      chequeBookYN: this.enableChequebook
    }
    sessionStorage.setItem('preference', JSON.stringify(preference));
    this.router.navigate(['/onboarding/next-of-kin'])
  }

  formatSSN() {
    let val = this.dataForm.value.usSocialSecurityNumber.replace(
      /\D/g,
      ""
    );
    let newVal = "";

    if (val.length > 4) {
      this.dataForm.patchValue({ usSocialSecurityNumber: val });
    }
    if (val.length > 3 && val.length < 6) {
      newVal += val.substr(0, 3) + "-";
      val = val.substr(3);
    }
    if (val.length > 5) {
      newVal += val.substr(0, 3) + "-";
      newVal += val.substr(3, 2) + "-";
      val = val.substr(5);
    }
    newVal += val;
    this.dataForm.patchValue({ usSocialSecurityNumber: newVal });
  }
}


