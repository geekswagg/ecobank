/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent  implements OnInit {

  loading: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {}

  createAccount(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/onboarding/success'])
    }, 2000);

  }

}
