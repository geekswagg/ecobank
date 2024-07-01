import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = false;

  // Identification
  scanningPassport = false;
  passportCaptured = false;
  passportScanSuccess = false;
  frontIdScanSuccess = false;
  backIdScanSuccess = false;
  savingPassport = false;
  savedPassport = false;
  savingSignature = false;
  savedSignature = false;

  // ID Scan
  scanningFront = false;
  savingFront = false;
  scanningBack = false;
  savingBack = false;
  savedBack = false;
  savedFront = false;
  scannedFront = false;
  scannedBack = false;
  savingIdFailed = false;

  // Selfie
  detectingFace = false;
  savingSelfie = false;

  // Child
  savedCert = false;
  scanningCert = false;
  savingCert = false;
  creatingAccount = false;

  frontCaptured = false;
  backCaptured = false;
  signCaptured = false;

  //Signature
  scanningSignature = false;
  signatureCaptured = false;
  signatureScanSuccess = false;
  constructor() {}
}
