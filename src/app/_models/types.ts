export interface IAccountType{
  description: string;
  accountCode: string;
}

export interface Item {
  text: string;
  value: string;
}

export interface Branch{
  branchName: string;
  branchCode: string;
  branchEmail:string;
  branchId: string;

}

export interface Currency{
  currencyCode: string;
  currencyName: string;
  currencyId: string;
}
