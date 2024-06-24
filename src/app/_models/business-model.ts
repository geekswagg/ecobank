/**
 * @author : Isaac Mrongo
 * @date : 20/06/2024
 * @description:
 */

import { Chequebook, PostMandate } from "./business-form-model";

/** result for fetching Main account details */
export interface ObjectMainAccountDetails {
  id: string;
  shortDescription: string;
  longDescription: string;
  image: string;
}

export interface MainAccountDetails {
  successful: Boolean;
  message: string;
  object: ObjectMainAccountDetails[];
  timestamp: Date;
  status: Number;
  stepCode: Number;
}

/** Response POST Auth */
export interface ResPostAuth {
  successful: Boolean;
  message: string;
  object: any;
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** Response POST OTP */
export interface ResPostOTP {
  successful: Boolean;
  message: string;
  object: null;
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** Response POST Business Profile */
export interface ResBusinessProfile {
  successful: boolean;
  message: string;
  object: BusinessProfileObject[];
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** ==  Business Profile object */
export interface BusinessProfileObject {
  id: string;
  documentName: string;
  uploaded?: boolean;
}

/** == Response POST Business preferences  */
export interface ResBusinessPreferences {
  successful: boolean;
  message: string;
  object: any;
  timestamp: Date;
  status: number;
  stepCode: number;
}

/**  == Response POST Account Type   */
export interface ResAccountType {
  successful: boolean;
  message: string;
  object: BusinessProfileObject[];
  timestamp: Date;
  status: number;
  stepCode: number;
}

/**  == Response POST Business Savings   */
export interface ResBusinessSaving {
  successful: boolean;
  message: string;
  object: BusinessProfileObject[];
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** == Response POST Documents */
export interface ResDocuments {
  successful: boolean;
  message: string;
  object: null;
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** == Response Bulk director upload */
export interface ResBulkDirector {
  successful: boolean;
  message: string;
  object: null;
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** === Res Signatories */
export interface ResSignatories {
  successful: boolean;
  message: string;
  object: any;
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** == Res Invite Directors */
export interface ResInviteDirectors {
  successful: boolean;
  message: string;
  object: any;
  timestamp: Date;
  status: number;
  stepCode: number;
}

export interface MandateSignatories {
  name: string;
  email: string;
  phone: string;
  directorYn: string;
}
export interface MandateDirectorObject {
  name: string;
  email: string;
  phone: string;
}

export interface MandateDirector {
  directorsYn: string;
  listOfDirectors: MandateDirectorObject[];
}

export interface BusinessInfo {
  businessType: string;
  turnover: string;
  businessNo: string;
  yearOfIncorporation: string;
  companyEmail: string;
  phoneNo: string;
  companyBranch: string;
  preferredCurrency: string;
  businessLocation: string;
  businessActivity: string;
  businessName: string;
  accountType: string;
  bankBranch: string;
  rmCode: string;
  salesCode: string;
  preferedEmail: string;
  preferedPhone: string;
  physicalAddress: string;
  town: string;
}

/** Res Mandate Response */
export interface ResMandate {
  successful: true;
  message: string;
  object: {
    signatories: { signatories: MandateSignatories[] };
    mandate: PostMandate;
    directors: MandateDirector;
    accountType: {
      accountName: string;
      accountCode: string;
      currenciesCodes: string[];
    };
    businessInfo: BusinessInfo;
    agent : {
      agent : [
        {
          name : string;
          email : string;
          phone : string;
          nationalityCode : string;
          directorYn : string;
          signatoryYn : string;
        }
      ]
    };

    bankInstrument:{
      bankInstrument: {
        debitCard: {
          name : string;
          pickupBranch : string,
          currency: string[]
        };
        chequeBook : {
          users : [
            {
              name : string;
              email : string;
            }
          ];
          orderedChequebook: Chequebook[];
          pickupBranch : string;
        };
        internetBanking : [
          {
            name : string;
            view : string;
            email : string;
            input : string;
            authorizing : string;
            phoneNumber : string;
          }
        ];
        debitCardSelected : string;
        chequebookSelected : string;
        internetBankingSelected : string;
      };
    }


  };
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** Invited KYC details */

export interface ResInvitedConfirmKyc {
  successful: true;
  message: "successful";
  object: {
    signatories: {
      signatories: MandateSignatories[];
    };
    mandate: PostMandate;
    directors: MandateDirector;
    accountType: {
      accountName: string;
      currenciesCodes: string[];
    };
    businessInfo: BusinessInfo;
  };
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** Res invited Director confirm OTP */
export interface ResInvitedDirectorOtp {
  successful: boolean;
  message: string;
  object: {
    NationalityCode: string;
  };
  timestamp: Date;
  status: number;
  stepCode: number;
}

/** Res Account products */

export interface ResAccountProducts {
  message: string;
  object: AccountProductDetails[];
  status: number;
  stepCode: number;
  successful: boolean;
  timestamp: string;
}

export interface AccountProductDetails {
  accountType: string;
  benefits: string;
  bundleCode: string;
  bundleId: string;
  features: string;
  initialBalance: string;
  monthlyFee: string;
  multipleAccountsAllowed: any;
  name: string;
  openningBalance: string;
  policyDecription: string;
  policyImageName: string;
  policyTitle: string;
  targetMarket: string;
  kes ?: boolean;
  usd ?: boolean;
  eu ?: boolean;
}


export interface PostInstrument {

     bankInstrument:{
        internetBankingSelected: string; // Y or N
        debitCardSelected : string; // Y or N
        chequebookSelected : string; // Y or N
        chequeBook :{
            pickupBranch : string; // branch code,
            orderedChequebook: Chequebook[];      
            users? : [
               {
                  name : string;
                  email : string;
              }
             ]

        };
        debitCard : {
            name :  string;
            pickupBranch : string; // branch code
            currency: string[]
        };
        internetBanking? :[
        {
              name : string;
              email : string;
              phoneNumber : string; // phone number
              view : string; // Y or N
              input : string; // Y or N
              authorizing : string; // Y or N
          }
        ]
    }

}
