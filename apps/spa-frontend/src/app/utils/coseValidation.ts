import * as cose from 'cose-js';
import { base64ToUint8array } from './typeConversion';
import { Certificate, ECPublicKey } from 'pkijs';
import { fromBER } from 'asn1js';
import { bufferToHexCodes, fromBase64, stringToArrayBuffer } from 'pvutils';

// From: https://docs.aws.amazon.com/enclaves/latest/user/verify-root.html
const awsPem = `-----BEGIN CERTIFICATE-----
MIICETCCAZagAwIBAgIRAPkxdWgbkK/hHUbMtOTn+FYwCgYIKoZIzj0EAwMwSTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoMBkFtYXpvbjEMMAoGA1UECwwDQVdTMRswGQYD
VQQDDBJhd3Mubml0cm8tZW5jbGF2ZXMwHhcNMTkxMDI4MTMyODA1WhcNNDkxMDI4
MTQyODA1WjBJMQswCQYDVQQGEwJVUzEPMA0GA1UECgwGQW1hem9uMQwwCgYDVQQL
DANBV1MxGzAZBgNVBAMMEmF3cy5uaXRyby1lbmNsYXZlczB2MBAGByqGSM49AgEG
BSuBBAAiA2IABPwCVOumCMHzaHDimtqQvkY4MpJzbolL//Zy2YlES1BR5TSksfbb
48C8WBoyt7F2Bw7eEtaaP+ohG2bnUs990d0JX28TcPQXCEPZ3BABIeTPYwEoCWZE
h8l5YoQwTcU/9KNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUkCW1DdkF
R+eWw5b6cp3PmanfS5YwDgYDVR0PAQH/BAQDAgGGMAoGCCqGSM49BAMDA2kAMGYC
MQCjfy+Rocm9Xue4YnwWmNJVA44fA0P5W2OpYow9OYCVRaEevL8uO1XYru5xtMPW
rfMCMQCi85sWBbJwKKXdS6BptQFuZbT73o/gBh1qUxl/nNr12UO8Yfwr6wPLb+6N
IwLz3/Y=
-----END CERTIFICATE-----`;

// Function to convert PEM to ArrayBuffer
function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/(-----(BEGIN|END) CERTIFICATE-----|[\n\r])/g, '');
  return new Uint8Array(stringToArrayBuffer(fromBase64(b64))).buffer;
}

// Function to extract ECC public key components for COSE
async function pemToCoseKey(pem) {
  const pemBuffer = pemToArrayBuffer(pem);
  const asn1 = fromBER(pemBuffer);
  const certificate = new Certificate({ schema: asn1.result });

  // Assuming ECC public key
  const { x, y } = certificate.subjectPublicKeyInfo.parsedKey as ECPublicKey;

  const coseKey = {
    kty: 'ECDSA',
    crv: 'P-384',
    x: bufferToHexCodes(x),
    y: bufferToHexCodes(y),
  };

  return coseKey;
}

export async function validateAttestationSignature(base64Attestation: string) {
  const cborBytes = base64ToUint8array(base64Attestation);

  const signingKey = await pemToCoseKey(awsPem);

  const validationResult = await cose.sign.verify(
    cborBytes,
    {
      key: signingKey,
    },
    {
      defaultType: 18, //cose.sign.Sign1Tag,
    }
  );

  return validationResult;
}
