/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.page.html',
  styleUrls: ['./requirements.page.scss'],
})
export class RequirementsPage implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }

  viewRequirements(){
    this.router.navigate(['requirements']);
  }

  gotoAuth(){
    this.router.navigate(['auth']);
  }

}
