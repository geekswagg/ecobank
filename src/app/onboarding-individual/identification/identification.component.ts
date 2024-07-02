/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer, take } from 'rxjs';
import { Auth, Identification } from 'src/app/_models/data-models';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/data-store.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
})
export class IdentificationComponent  implements OnInit {
  @Input() auth: Auth = {};
  identification: Identification = {
    frontId:{},
    backId:{}
  };
  seletedDoc: string = '';

  constructor(
    private fb: FormBuilder,
    public loader: LoadingService,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private modalCtrl: ModalController,
    private dataStore: DataStoreService
  ) { }

  ngOnInit() {}

  selectDocument(event: any){
    this.seletedDoc =  event.detail.value;
    this.dataStore.identification.documentType = event.detail.value;
  }

  toIdScan() {
  this.router.navigate(['/onboarding/id-scan']);
  }

  resendCode(){}

  back(){
    this.modalCtrl.dismiss();
  }


}
