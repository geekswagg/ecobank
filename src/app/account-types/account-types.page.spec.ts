import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountTypesPage } from './account-types.page';

describe('AccountTypesPage', () => {
  let component: AccountTypesPage;
  let fixture: ComponentFixture<AccountTypesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
