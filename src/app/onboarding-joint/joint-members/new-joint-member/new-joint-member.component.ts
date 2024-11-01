/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-new-joint-member',
  templateUrl: './new-joint-member.component.html',
  styleUrls: ['./new-joint-member.component.scss'],
})
export class NewJointMemberComponent implements OnInit {
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  memberForm: FormGroup;
  members: any[] = [];
  contact_already_added_flag = false;

  get f() {
    return this.memberForm.controls;
  }

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public loader: LoadingService,
    private dataStore: DataStoreService,
    private modalCtrl: ModalController,
    private fb: FormBuilder) {
    this.memberForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
    });

    this.members = dataStore.joint;
  }

  ngOnInit() {}

  saveMember() {}

  addMember() {
    const {phoneNumber, emailAddress} = this.memberForm.value;
    const member = {
      custNumber: '',
      name: '',
      idNumber: '12345678',
      email: emailAddress,
      selected: false,
      phoneNumber: phoneNumber.e164Number.replace("+", ""),
    };

    const userAlreadyAdded = this.members.find((value: any) => {
      return (
        value.email == member.email || value.phoneNumber == member.phoneNumber
      );
    });

    if (!userAlreadyAdded) {
      this.members.push(member);
      this.contact_already_added_flag = false;
      this.memberForm.reset();
      this.toastr.success('Member added successfully');
      this.modalCtrl.dismiss({
        data: member
      });
    } else {
      this.toastr.warning('Member with this email or phone number exists');
      this.contact_already_added_flag = true;
    }
  }
}
