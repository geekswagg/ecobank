/**
 * @author :: Isaac Mrongo
 * @date : 20/06/2024
 *
 */

import { BusinessProfileObject } from "./business-model";

/** == Auth payload */
export interface PostAuth {
  emailAddress: string;
  phoneNumber: string;
  name: string;
  smsCode?: string;
  stepCode?: number;
  isDirector?: boolean;
  idNumber?: string;
  nationalityCode?: string;
  isSignatory: boolean;
  relationToAccount: string;
}

/** ==== OTP payload */
export interface PostOTP {
  phoneNumber: string;
  smsCode: string;
  emailAddress: string;
}

/** == Business Description */
export interface BusinessDescription {
  businessType: string;
  turnover: string;
  businessNo: string;
  yearOfIncorporation: Date;
  yearOfIncorporationFlag: string;
  companyEmail?: string;
  phoneNo: string;
  companyBranch: string;
  preferredCurrency: string;
  businessLocation: string;
  businessActivity: string;
  businessName: string;
  accountType: any;
}

/**  Business Preferences  */
export interface BusinessPreferences {
  bankBranch: any;
  rmCode?: string;
  salesCode?: string;
  accountType?: any;
  phone: string;
  email: string;
  building: string;
  street: string;
  town: string;
  physicalAddress?: string;
}

/** Account types */
export interface AccountType {
  accountName: string;
  currenciesCodes: string[];
  files?: BusinessProfileObject[];
  accountCode?: string;
}

/** Account types */
export interface BusinessSaving {
  accountName: string;
  currenciesCodes: string[];
}

/** == Director payload */
export interface PostDirector {
  email: string;
  phone: string;
  name: string;
  nationalityCode: string;
  isSignatory?: boolean;
  isDirector?: string;
}

/** Bulk Post Director payload */
export interface BulkDirector {
  directorsYn: string; // N/Y
  listOfDirectors: PostDirector[];
}

export interface SingleSignatory {
  phone: string;
  email: string;
  name: string;
  directorYn: string; // Y/N
  nationalityCode: string;
  idNumber: string;
}

export interface SingleAgent {
  phone: string;
  email: string;
  name: string;
  agentYn: string; // Y/N
  nationalityCode: string;
  idNumber: string;
}

/** == Signatory payload  */
export interface PostSignatory {
  signatories: SingleSignatory[];
}

/** == Agent payload  */
export interface PostAgent {
  agents: SingleAgent[];
}

/** == Mandate Member */
export interface MandateMember {
  email: string;
  phone: string;
}


export interface Chequebook {
  currency: string;
  pages?: number;
}


/** == Mandate Payload */
export interface PostMandate {
  mandateCode: string;
  mandateDescription: string;
  mandateMembers: MandateMember[];
}

/** Invited director OTP payload */
export interface InvitedOtp {
  smsCode: string;
}

/** Foreign director payload */
export interface PostForeignDirector {
  imageType?: string;
  nationalId?: string;
  match?: string;
  idType?: string;
  firstName?: string;
  surname?: string;
  otherName?: string;
  gender?: string;
  dateOfBirth?: string;
  documentDateOfExpiry?: string;
}
