const devOcr = 'https://uat-onboarding.stanbicbank.co.ke/';
const imageUrl = "https://uat-onboarding.stanbicbank.co.ke/rest/sms-mcs/image/getImage/";
const dev = 'https://digitalonboard.ecobank.com/self-onboarding/api/v1/';
const dev1 = 'https://digitalonboard.ecobank.com/self-onboarding/api/business/v1/';
const dev2 = 'https://digitalonboard.ecobank.com/self-onboarding/api/business/v2/';

// const dev = 'https://uat-onboarding.stanbicbank.co.ke/rest/individual-onboarding/api/v1/';
// const dev1 = 'https://uat-onboarding.stanbicbank.co.ke/rest/individual-onboarding/api/business/v1/';
// const dev2 = 'https://uat-onboarding.stanbicbank.co.ke/rest/individual-onboarding/api/business/v2/';
// const devOcr = 'https://uat-onboarding.stanbicbank.co.ke/';
// const imageUrl = "https://uat-onboarding.stanbicbank.co.ke/rest/sms-mcs/image/getImage/";



export const environment = {
  production: true,
  devOcr:devOcr,
  imageUrl: imageUrl,
  baseUrl: dev,
  businessUrlV1: dev1,
  businessUrlV2: dev2,
  firebaseConfig: {
    apiKey: "AIzaSyDhQsvEFSsVfMyfisdyin4dUraiBx1By3A",
    authDomain: "twaa-84f76.firebaseapp.com",
    databaseURL: "https://twaa-84f76-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "twaa-84f76",
    storageBucket: "twaa-84f76.appspot.com",
    messagingSenderId: "636258380194",
    appId: "1:636258380194:web:a714b6d8d527c9d30b2afb",
    measurementId: "G-CD1GE11142",
  },
  appleConfigs: {
    clientId: 'io.twaa.twaa',
    redirectURI: 'https://twaa-84f76.firebaseapp.com/__/auth/handler',
    nonce: 'mysupersecretnonce'
  },
};
