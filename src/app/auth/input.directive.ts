import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputNumber]',
  standalone: true
})
export class InputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const allowedCharacters = /[0-9]/;
    const inputChar = String.fromCharCode(event.which);
    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

}
