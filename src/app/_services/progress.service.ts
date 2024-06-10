import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<any>(0);
  progress$ = this.progressSubject.asObservable();

  setProgress(value: number) {
    this.progressSubject.next(value);
  }
}
