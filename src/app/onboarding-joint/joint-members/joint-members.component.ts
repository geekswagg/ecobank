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
import { DataStoreService } from 'src/app/_services/data-store.service';
import { Auth } from 'src/app/_models/data-models';

@Component({
  selector: 'app-joint-members',
  templateUrl: './joint-members.component.html',
  styleUrls: ['./joint-members.component.scss'],
})
export class JointMembersComponent implements OnInit {
  occupationForm: FormGroup;
  termsAccepted: boolean = false;

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  selectedFruitsText: any = '0 Items';
  selectedFruits: string[] = [];

  occupations = [];
  industries = [];
  members = [];
  incomes: any = [];
  filteredIndustry = [];
  showOther: boolean = false;
  otherValid: boolean = false;
  selectedIncome: string = '';
  auth: Auth = {}

  get f() {
    return this.occupationForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    public loader: LoadingService,
    private modalCtrl: ModalController,
    private dataStore: DataStoreService
  ) {
    this.occupationForm = this.fb.group({
      occupation: ['', Validators.required],
      industry: ['', Validators.required],
      employerName: ['', [Validators.required]],
    });
    this.members = dataStore.joint.accountMembers;
    this.occupations = JSON.parse(
      localStorage.getItem('occupations') as string
    );
    this.incomes = JSON.parse(localStorage.getItem('incomes') as string);
    this.industries = JSON.parse(localStorage.getItem('industries') as string);
  }

  ngOnInit() {}

  checkboxChanged() {}

  async validateOtp() {
    const modal = await this.modalCtrl.create({
      component: OtpFormComponent,
      componentProps: { auth: '' },
    });
    await modal.present();
  }

  async addMember() {
    const modal = await this.modalCtrl.create({
      component: NewJointMemberComponent,
      componentProps: { auth: '' },
      initialBreakpoint: 0.65,
      breakpoints: [0.65, 0.8],
      cssClass: 'message-modal',
    });
    await modal.present();
  }


  async sendInvites() {
    this.dataStore.joint.accountMembers = await [];
    this.dataStore.joint.accountMembers = await this.members;
    this.router.navigate(['/onboarding/joint/preferences']);
  }

    /** delete some members from the list */
    removeMember(email: string) {
      if (this.auth.emailAddress !== email)  {
        this.members = this.members.filter((value: any) => {
          return value.email !== email;
        })
      }
    }

}
