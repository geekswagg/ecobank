/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_services/api.service';
import { LoadingService } from 'src/app/_services/loading.service';
import { OtpFormComponent } from 'src/app/auth/otp-form/otp-form.component';
import { NewJointMemberComponent } from './new-joint-member/new-joint-member.component';

@Component({
  selector: 'app-joint-members',
  templateUrl: './joint-members.component.html',
  styleUrls: ['./joint-members.component.scss'],
})
export class JointMembersComponent  implements OnInit {

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

  get f() {
    return this.occupationForm.controls;
  }

  occupationSample= [
    {
      occupationCode:"11",
      occupationName:"Salaried Employee-BANK"
    }
  ];

  industrySample = [
    {
      industryCode: "1408",
      industryDescription:"Public Administration Civil Servant and Defence",
      occupationCode: "11"
    }
  ];


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

    this.occupations = JSON.parse(localStorage.getItem("occupations") as string) ?? this.occupationSample;
    this.incomes = JSON.parse(localStorage.getItem("incomes") as string);
    this.industries = JSON.parse(localStorage.getItem("industries") as string) ?? this.industrySample;
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

  async addMember(){
    const modal = await this.modalCtrl.create({
      component: NewJointMemberComponent,
      componentProps:{ auth: '' },
      initialBreakpoint:0.65,
      breakpoints:[0.65,0.8],
      cssClass: 'message-modal'
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
    this.router.navigate(['/onboarding/joint/preferences'])
  //   this.loader.loading = true;
  //   const {occupation, industry, employerName} = this.occupationForm.value;
  //   const payload = {
  //     employerName: employerName,
  //     industry: industry?.industryCode,
  //     monthlyIncome: this.selectedIncome,
  //     occupation: occupation?.occupationCode
  //   }
  //   sessionStorage.setItem('occupation', JSON.stringify(payload));
  //   this.apiService.saveOccupation(payload).subscribe({
  //     next:(res) => {
  //       if (res.successful) {
  //         this.loader.loading = false;
  //         this.router.navigate(['/onboarding/selfie']);
  //       } else {
  //         this.loader.loading = false;
  //         this.toastr.error(res.message);
  //       }
  //     },
  //     error:(error) => {
  //       this.loader.loading = false;
  //       this.toastr.error("An error occurred. Please try again");
  //     }
  // });
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
        // this.employers.push(data);
      });
    }

}
