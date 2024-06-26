/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/_models/types';
import { ApiService } from 'src/app/_services/api.service';
import { LoadingService } from 'src/app/_services/loading.service';
import { OtpFormComponent } from 'src/app/auth/otp-form/otp-form.component';

interface Employer {
  companyId: string;
  companyName: string;
  companyCode: string;
}
@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss'],
})
export class OccupationComponent  implements OnInit {


  occupationForm: FormGroup;
  termsAccepted: boolean = false;

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  selectedFruitsText: any = '0 Items';
  selectedFruits: string[] = [];

  occupations = [];
  industries = [];
  incomes: any = [];
  filteredIndustry = [];
  showOther: boolean = false;
  otherValid: boolean = false;
  selectedIncome: string = '';

  employers: Employer[] = [];

  get f() {
    return this.occupationForm.controls;
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    public loader: LoadingService,
    private  modalCtrl: ModalController
  ) {
    this.occupationForm = this.fb.group({
      occupation: ['', Validators.required],
      industry: ['', Validators.required],
      employerName: ["", [Validators.required]],
    });

    this.occupations = JSON.parse(localStorage.getItem("occupations") as string);
    this.incomes = JSON.parse(localStorage.getItem("incomes") as string);
    this.industries = JSON.parse(localStorage.getItem("industries") as string);
  }

  ngOnInit() {
  }



  checkboxChanged(){}



  async validateOtp(){
    const modal = await this.modalCtrl.create({
      component: OtpFormComponent,
      componentProps:{ auth: '' },
    });
    await modal.present();
  }


  changeIncome(income: string){
    this.selectedIncome = income;
  }

  selectionChange(val: any, type: string) {
    switch (type) {
      case "occupation":
        this.filteredIndustry = this.industries.filter((value: any) => {
          return (
            value.occupationCode === this.f['occupation'].value.occupationCode
          );
        });
        this.occupationForm.controls['industry'].patchValue("");
        break;
      case "employer":
        if (val.companyCode === "GS9999") {
          this.showOther = true;
          this.otherValid = false;
        } else {
          this.otherValid = true;
          this.showOther = false;
          this.occupationForm.controls['otherDescription'].patchValue("");
        }
        break;
      default:
        break;
    }
  }

  saveOccupation(){
    this.loader.loading = true;
    const {occupation, industry, employerName} = this.occupationForm.value;
    const payload = {
      employerName: employerName,
      industry: industry,
      monthlyIncome: this.selectedIncome,
      occupation: occupation
    }
    sessionStorage.setItem('occupation', JSON.stringify(payload));
    this.apiService.saveOccupation(payload).subscribe({
      next:(res) => {
        if (res.successful) {
          this.loader.loading = false;
          this.router.navigate(['/onboarding/selfie']);
        } else {
          this.loader.loading = false;
          this.toastr.error(res.message);
        }
      },
      error:(error) => {
        this.loader.loading = false;
        this.toastr.error("An error occurred. Please try again");
      }
  });
  }

    // Capitalize Employers  *** changes to sentence case
    capitalizeEmployers() {
      const employers: any = JSON.parse(localStorage.getItem("employers") as string);
      employers.forEach((element: any) => {
        const data = {
          companyId: element.companyId,
          companyName: element.companyName.toUpperCase(),
          companyCode: element.companyCode,
        };
        this.employers.push(data);
      });
    }

}
