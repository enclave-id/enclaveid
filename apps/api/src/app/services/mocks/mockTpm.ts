import crypto from 'crypto';
import * as jose from 'jose';
import { sampleAttestationToken } from './sampleAttestationToken';

const privateSigningKey = {
  kty: 'RSA',
  n: 'wVmMiNEXapnUasK-fvKZnUdqoUjhaKbI_oGlKffB2TYoz5qYDSMXC8r4TwtAmZ8ku_dMZL0cZAiwzKJ7tpV7IA8pHT6jqFg5HwrW8MtCltiBR5MdXr0g0j0ekqQUT_iMFDg1DfLA-CX1VpMGZQAtlD9zRxYaDkKpvXcUaKAXVwfTtFDfL-fHrmsFkgv8TryFUfLrbmmEDk8hv3n_bjnGLODr8OiE8b1MLULM8FSBxvlRTdtPrk9QEQMIiu4smfiW0-yCJi-FXu20zD7t9acU6ZfnLItGcXOC_E9SEBVpOflXS9PQaY1hloBqSzRT_bS-PvJJbR7ClKvVgNxCUBRzOw',
  e: 'AQAB',
  d: 'NefA-h4NYL-NjMxJrvv1HvfbvyaiDXq-e9JqWVaFWYkzfJnVvYfkc3m9m8__zTSk2bDbQBTHVw5jOFIumpt3TdtcM5aUqykZl9F-Vnjc0lB_TpSx8glZnrPCk9CiBx-88iAvjnl5GlX-3gm0lTElA_liqtV7IzGrwDJ0Yq0LhMwiEePf_feJoDBivFRiVxoy7DzriWzq-um_FunK9EexPQ5fbetJJdJjgq877oL3Vgg_2N9cCQrqgwieZBSaaV4gf_5WBec74Pkm-3thJzgM5q0jb4O0-JfFHMBJeljE0QRRDLkUeOZ5oXuKjWiVGIh7QIPXc_A9kPAVk55EN1r2VQ',
  p: '696n6wm9NdLzAAkTzrUMc4RM_h8YwgwYaAZERK_6Q9RuEnNk_tHXwJ4Or3r6wjYim27Sxg65kg-z9DPDxyDxU8FutTbNm2dwE7NULb-6raq24i6gV7jwZIqzK5UBGHZR-vngdjSH5_jBCQrHxRK5lgBXok2GXU5VWWN6ueF5Uq8',
  q: '0dnn8sVvRyJQkzQBdwgX0eEnTLnlni2b_TnIUDJBlurBfGQNjuwDia5Ps21zKovD_I-8XmFQb8MSGR2LwEx8uWKxKgqGZPOTArIAfmvOddlK3sZnkQv29UXB3UsC9CX1lR6l3MZfARTCvCl6tY7troZlBQNzo1HKJP_Ml6yYOzU',
  dp: 'bI6-tBN4bRRY2PRUlHeJcoU6tl7zkyPj-8SemQpxYdSckIthuVI1PabBVYyBau9lgCpCgft29z2Y8lT8z2JfD9BgNrExckvqLncD0EaFEbcXkwQoshchNPUNP4rFxU93rc5hu6Wzw1Ue6x12EkLq_ZnMu5t4susBpzF8455dq2s',
  dq: 'N_VniLFlTw6zdc10Zo1d7LWhiTA5Lsjyw7_YzqnYG6pWFhmIFAiTmO9GiY4yG7JRfNPHY1OH44WdGd1rGshKqhTLMW7FD750AU_-GbgdwgdDk8xMab1LCXSkkaIjE3_b0PvvNsQfKWaj1xEoi6mlb9ier4uQFokE4oDjyb5YidE',
  qi: 'FvV6t0U4sNTR3TThAIWfgXXl_2jIeZbOjYVIyIxLVFz07kS7mULj8ZdFg1bMmGtc7CAE_jTNHFF2dkOgODgMbOF6X4oogkbSyDNMj9PIXXBnvjCycqqJS4PFtFHh1VbnHUfpMnnkKsiGK3q8SBUuZszguOIxf4IEZvvaqk2FK2I',
};

const { publicKey: publicEncryptionKey, privateKey: privateEncryptionKey } =
  crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

export function decrypt(encryptedText: string) {
  return crypto
    .privateDecrypt(privateEncryptionKey, Buffer.from(encryptedText, 'base64'))
    .toString();
}

export async function getAttestation(nonce: string) {
  sampleAttestationToken['x-ms-runtime']['client-payload']['nonce'] = nonce;

  sampleAttestationToken['x-ms-runtime']['keys'].forEach((key) => {
    key['TpmEphemeralEncryptionKey'] = publicEncryptionKey;
  });

  const privateKey = await jose.importJWK(privateSigningKey);

  return await new jose.SignJWT(sampleAttestationToken)
    .setProtectedHeader({ alg: 'RS256' })
    .setExpirationTime('2h')
    .sign(privateKey);
}
