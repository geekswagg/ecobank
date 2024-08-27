/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-new-joint-member',
  templateUrl: './new-joint-member.component.html',
  styleUrls: ['./new-joint-member.component.scss'],
})
export class NewJointMemberComponent  implements OnInit {

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  memberForm: FormGroup;

  get f() {
    return this.memberForm.controls;
  }

  constructor(
    public loader: LoadingService,
    private fb: FormBuilder
  ) {
    this.memberForm = this.fb.group({
      phoneNumber: ["",[Validators.required]],
      emailAddress: ["",[Validators.required,Validators.email]]
    });
   }

  ngOnInit() {}

  saveMember(){}

}
