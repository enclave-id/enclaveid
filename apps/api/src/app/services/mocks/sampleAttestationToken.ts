export const sampleAttestationToken = {
  exp: 1702164033,
  iat: 1702135233,
  iss: 'https://sharedeus2.eus2.attest.azure.net',
  jti: '241390aa13605791ea5a2e641195d5c19412e3d4fb711f7fb054ad3b294b3244',
  nbf: 1702135233,
  secureboot: true,
  'x-ms-attestation-type': 'azurevm',
  'x-ms-azurevm-attestation-protocol-ver': '2.0',
  'x-ms-azurevm-attested-pcrs': [0, 1, 2, 3, 4, 5, 6, 7],
  'x-ms-azurevm-bootdebug-enabled': false,
  'x-ms-azurevm-dbvalidated': true,
  'x-ms-azurevm-dbxvalidated': true,
  'x-ms-azurevm-debuggersdisabled': true,
  'x-ms-azurevm-default-securebootkeysvalidated': true,
  'x-ms-azurevm-elam-enabled': false,
  'x-ms-azurevm-flightsigning-enabled': false,
  'x-ms-azurevm-hvci-policy': 0,
  'x-ms-azurevm-hypervisordebug-enabled': false,
  'x-ms-azurevm-is-windows': false,
  'x-ms-azurevm-kerneldebug-enabled': false,
  'x-ms-azurevm-osbuild': 'NotApplication',
  'x-ms-azurevm-osdistro': 'Ubuntu',
  'x-ms-azurevm-ostype': 'Linux',
  'x-ms-azurevm-osversion-major': 22,
  'x-ms-azurevm-osversion-minor': 4,
  'x-ms-azurevm-signingdisabled': true,
  'x-ms-azurevm-testsigning-enabled': false,
  'x-ms-azurevm-vmid': '9F827411-12C9-4D96-8EC2-E3BD600A73BE',
  'x-ms-isolation-tee': {
    'x-ms-attestation-type': 'sevsnpvm',
    'x-ms-compliance-status': 'azure-compliant-cvm',
    'x-ms-runtime': {
      keys: [
        {
          e: 'AQAB',
          key_ops: ['sign'],
          kid: 'HCLAkPub',
          kty: 'RSA',
          n: 'l-TEhwAAdEPCKheF23HbjHLkq_SM22spfsq98512Jda4gu4afjEtZ2YYpkmU3WNEsKTDtjZCKIYuxumBJN5aW9vPL_wOSv39DEzRBiQ_Wc-6f6_RmH6dzV3jEsxopunHCmLLNvVwMffvd7qSZCBgArfP81torxg1yfrXQyGgfcJ7nfSaORRdzK8YTeKshvRkR8-HAifmBGc_m2pSCUWgM_2f_xDneyho8c_XpXKIGhPXxjPVV7ef5GC5Zz97UQUZ1PjK0Ml7reyTxqrtgnDW2o19gbY3ekcV7MFEgrdrGpFZYmvP6p5WFrmYotjUwAMYFIp4VlALln4Pdh-f2d5voQ',
        },
        {
          e: 'AQAB',
          key_ops: ['encrypt'],
          kid: 'HCLEkPub',
          kty: 'RSA',
          n: 'nLjZiAAAR9kcUWRVORzfsVKim7U1Mr7NHtJXsPdF-5nJkNJHTPYTYcZtv8n7OqkH5g4cPTDJo_x4bFCPFRNih1G8HcET1V_U3pOpvB1qv1JO7CU3m-2E5ELx5MwHsykcoQRDSx2zvdl4HZCSALjd0mDZ5uedTGEKJiwA3G7-_nkQ_XhucL6fKReqZVnGXxw0FfYmZXxRrZflMSDGhAFOqe96nlE_VU2rCppmvsAqbHN4fhtfpUd8LOMxDfAAnL4QLI3jOrDchOZFazo42Cp53gIf-Q_hVdugYOXBq-lStdUxjYCT-vpO_uvpoBG70vBvKGE-NFikc0DthLtHlCz23Q',
        },
      ],
      'user-data':
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      'vm-configuration': {
        'console-enabled': true,
        'secure-boot': true,
        'tpm-enabled': true,
        vmUniqueId: '9F827411-12C9-4D96-8EC2-E3BD600A73BE',
      },
    },
    'x-ms-sevsnpvm-authorkeydigest':
      '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    'x-ms-sevsnpvm-bootloader-svn': 3,
    'x-ms-sevsnpvm-familyId': '01000000000000000000000000000000',
    'x-ms-sevsnpvm-guestsvn': 5,
    'x-ms-sevsnpvm-hostdata':
      '0000000000000000000000000000000000000000000000000000000000000000',
    'x-ms-sevsnpvm-idkeydigest':
      '0356215882a825279a85b300b0b742931d113bf7e32dde2e50ffde7ec743ca491ecdd7f336dc28a6e0b2bb57af7a44a3',
    'x-ms-sevsnpvm-imageId': '02000000000000000000000000000000',
    'x-ms-sevsnpvm-is-debuggable': false,
    'x-ms-sevsnpvm-launchmeasurement':
      '9ac48fcac8a2d88aeeff8d427ad4f2be0e3917c748a18bdf52cc317e7fe20308b459d5ef1a12e0c22944eb386d17c315',
    'x-ms-sevsnpvm-microcode-svn': 115,
    'x-ms-sevsnpvm-migration-allowed': false,
    'x-ms-sevsnpvm-reportdata':
      'b08ae74990ccf88b658a4df8428845e516125b0e4b4105998112530241e4c4df0000000000000000000000000000000000000000000000000000000000000000',
    'x-ms-sevsnpvm-reportid':
      '537c4b97527fc6d353e0cf90b1d9bab37fb90cce216c1f48d55818d3244de920',
    'x-ms-sevsnpvm-smt-allowed': true,
    'x-ms-sevsnpvm-snpfw-svn': 8,
    'x-ms-sevsnpvm-tee-svn': 0,
    'x-ms-sevsnpvm-vmpl': 0,
  },
  'x-ms-policy-hash': 'wm9mHlvTU82e8UqoOy1Yj1FBRSNkfe99-69IYDq9eWs',
  'x-ms-runtime': {
    'client-payload': {
      nonce: 'bm9uY2V0ZXN0MTIz',
    },
    keys: [
      {
        e: 'AQAB',
        key_ops: ['encrypt'],
        kid: 'TpmEphemeralEncryptionKey',
        kty: 'RSA',
        n: 'uNnyWQAA-pBr01WnpQsGQLflk8DNaF41vP6ojlVjAe3XBMXZOm6dbUEdIXsupAE1zYWxyWZYiKTx_eQO7AwRHMs9gNN3OMz4lqCOH68bUhTvAr-mp-dOYIzcFkx1rtuNfllKZmrHAiBC42afyvW4LqpK6sJJYjrAhdFI4XI8FCeIeoBeUEwO4tTn4xNN3v9nw_D2CNr9pfbBBvJr0OW0MtzYiwlvftJd5MYtUK6Mt0w_FGeNtPZi2vkdrAW7z2IQfNeagAarzqiAPzwJrH8yHYefiaha6T0R0VpJCffZp2CPP3amTFcs-8Ge2n-wGpRNq-KeGoPqn2pRwZdl0572dw',
      },
    ],
  },
  'x-ms-ver': '1.0',
};
