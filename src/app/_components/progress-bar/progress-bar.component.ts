import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProgressService } from 'src/app/_services/progress.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    IonicModule,]
})
export class ProgressBarComponent  implements OnInit{
    progress$ = this.progressService.progress$;



  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    console.log("ngOnInit",this.progress$);
  }
}
