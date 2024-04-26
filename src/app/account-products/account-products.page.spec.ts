import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountProductsPage } from './account-products.page';

describe('AccountProductsPage', () => {
  let component: AccountProductsPage;
  let fixture: ComponentFixture<AccountProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
