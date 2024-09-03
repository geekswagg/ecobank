/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { trimPayload } from 'src/app/_helpers/payload-trimmer';
import { Branch, Currency } from 'src/app/_models/types';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  currencies: Currency[] = [];
  branches:Branch[] = [];
  members: any[] = [];
  mandates = [
    { code: 'all', name: 'All to Sign' },
    { code: 'any', name: 'Any to Sign' },
    { code: 'select_signatories', name: 'Select Signatories' },
  ];

  relations = [
    { code: 'Member', name: 'Member' },
    { code: 'Signatory', name: 'Signatory' }
  ];

  myForm: FormGroup;
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  selectedMandateType:string = '';

  get f() {
    return this.myForm.controls;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public loader: LoadingService,
    private dataStore: DataStoreService,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.myForm = this.fb.group({
      accountName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      purpose: [
        '',
        [
          Validators.required,
          Validators.pattern("^[A-Za-z0-9'ñÑáéíóúÁÉÍÓÚ ]+$"),
          Validators.maxLength(35),
        ],
      ],
      relation: ['', [Validators.required]],
      mandate: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      currency: ['', [Validators.required]],
    });

    this.members = this.dataStore.joint.accountMembers;

    const storedBranches = localStorage.getItem('branches');
    this.branches = storedBranches ? (JSON.parse(storedBranches) as Branch[]) : [];

    const storedCurrencies = localStorage.getItem('currencies');
    this.currencies = storedCurrencies ? (JSON.parse(storedCurrencies) as Currency[]) : [];

  }

  ngOnInit() {}

    // Get Branches
    getBranches() {
      this.loader.loading = true;

      try {

        this.apiService.getBranches().subscribe((res) => {
          if (res.successful) {
            this.loader.loading = false;
            this.branches = res.object.info;
          } else {
            this.loader.loading = false;
            this.toastr.error(res.message);
            this.branches = [];
          }
        }, (error) =>{

          this.loader.loading = false;
          this.toastr.error('System error');
          this.branches = [];
        });// end of api call

      } catch (error) {

        this.loader.loading = false;
        this.toastr.error('System error');
        this.branches = [];

      }

    }

    // Get Currencies
    getCurrencies() {
      try {
        this.apiService.getCurrencies().subscribe((res) => {
          if (res.successful) {
            this.currencies = res.object.info;
          } else {
            this.branches = [];
          }
        }, (error) => {
           this.branches = [];
        });

      } catch (error) {
        this.branches = [];
      }

    }

  mandateChange(event: any) {
    this.selectedMandateType = event.value.code;
  }

  saveJointAccount() {

    const {accountName,emailAddress, phoneNumber,purpose,relation,mandate,branch,currency} = this.myForm.value;
    this.loader.loading = true;
    const accountMembers: any[] = [];
    const membrs: any[] = [];
    const signatories: any[] = [];
    this.members.forEach((member: any) => {
      accountMembers.push(member.email);
      membrs.push({
        emailAddress: member.email,
        phoneNumber: member.phoneNumber,
      });
      if (
        mandate.code === 'select_signatories' &&
        member.selected
      ) {
        signatories.push(member.email);
      } else if (
        mandate.code === 'any' ||
        mandate.code === 'all'
      ) {
        signatories.push(member.email);
      }
    });
    const payload = {
      members: membrs,
      phoneNumbers: 'test',
      accountMembers: accountMembers.toString(),
      accountName: accountName,
      preferredBranch: branch.branchCode,
      preferredCurrency: currency.currencyCode,
      preferredEmail: emailAddress,
      purposeOfAccount : purpose,
      relationship : relation.code,
      preferredPhone: phoneNumber.e164Number.replace("+", ""),
      principalMember: this.members[0]?.email,
      signatoriesList: signatories.toString(),
      signatoryOption: mandate.code,
      memberType: this.dataStore.jointPrincipal.memberType,
      customerNumber: this.dataStore.jointPrincipal.customerNumber
    };

    trimPayload(payload);

      this.apiService.createJointAcc(payload).subscribe(
        {
        next: (res) => {
        if (res.successful) {
          this.loader.loading = false;
          this.toastr.success(res.message);
          this.router.navigate(['/onboarding/success']);
        } else {
          this.loader.loading = false;
          this.toastr.error(res.message);
        }
      },
      error:(error) =>{
        this.loader.loading = false;
        this.toastr.error('Error creating account try again');
      }}); // end of API Call




  }
}
