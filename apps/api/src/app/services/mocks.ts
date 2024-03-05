const mockNonce = 'dbfc891be3687e6fa54cda65129ca6412be18edb';
const mockPCR0 =
  'b142ee376de99bdd43489a1e039780f694452ea5fa9b34d3b1d95b573fab363f5781b3063cbdc5884dcd6055b46f2409';

const mockAttestation =
  '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';

const mockPrivateKey = `-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQI0jKkKWNQnhcCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBDvuz/oEE/wHef5u2G8qey8BIIE
0FwLa9bWfuTa/O0Cqs5aGtc2+28nZus7bSTJpmDnOivNXn8izqLlUU1wShRCJB2P
Z4pcoalYBPYar7yq7LaQSy4SnOUfLGXGnFD/c1nmu85BQnjzXJBLVJvZ0FoC54Tw
KbBRU8Ftzmm30tKOeQ+1uOhgHrSy+ZFtY7df7ZJNTNmM5pxU8cKbtMhaYQRamTmN
/4KMCK0aZDOIzxFPib/Bcf/SDDbw+LzTZUfv4rE/UvgZV9zVF9J69juPyZRbNh9R
xlBLl3QjyLkyB5J6f1Lc8DelhH0GQqUcgkFMrpueSz95dMi9GhUHrJ6N3rlNhJkg
6PhYA4ppROz4qirtgU5hxpcYW2L5GxI0tnEf73H1ziCSIU2e/PbrMwZ9rYlHy6OX
x/PNXiK9C4alduwvLuDfzlxNdT3jYPHboaqyuhPXxkFZBRVma7Bq/qDdTuCSbssL
jT9B2mvAhZ5vdwfh+Fi7/c5LqHOidLMfN3hsjT1oR6s4ufPw6mf2sFE15SxcBZFJ
BLbkk1GAdARkPBvC917WouGMY44HQDorBtZqWs2usDLZQ4fSM9lLuPtXDzcZl5gf
Y2Lfn74DNbrrJGH8tN8eJd3E9VzPlJ7d8VwP1NXQgG4oU+Y2Zfk058489PszoGJ7
di0nC3JERTZ33uZvvGJHb/B2X54m7JjWqDR1R0rQPUhek/r0pYIb7ALajkbKpaBI
43Ju+vluHUtHR2y1SnLV9jF6V8yZ3rdr3M6jxuR6xZdLqv5xFGheKSK71S4VTIoc
EY7+1hkPliVy31F33el1cgx98ZBsvRyx1aIsbGSthSXfRUcWU2OO7RTuzH5IWthf
5wXFUJcXywBGoWIguztd4UThzdrNpNUEBSxr7KUZ4D5sPP/fgz0EnUDl22u3cIxo
t/G3AD+hLlYEvmg4FCFXybdiBCYrqhRy01Uye1X+320SX9BqoRD74HPGc12j27ie
FzHaKHmP7Nz+z+BnoF1U5LDe+dLx4F8zruL4Qwq9HyYnMfWMn0TVZPW6xxOCyY/r
+rLr2NfY392zSpAQZlZbO+EJuw1B7ZLQCHPRsj+c/Z1fdC029Uw752fkFpiVo/TZ
l7Fc1XFwOq/136oOJz7kglD4D/JijKP0yeFX8+wfs0uOWu5ZKEk49x0Hn5BXiEzU
dRK5YFfU0JGzObIbB4FO8xKU7mjkfp/t7jlfgfSo5rKhlGqPKRB4Ajjn2vmSXl9U
Wqx6G0j1S5YCScsMmxg1fdQrdLyV0GLu2shAML5/mugIdv34mWkcrzOQCT/PxEmj
Dftk9zurtY1A6Q/z3kSXBMNr/LjOYlguXSt52T9GA3NtRiFufeV0OJ1nLtFHN5pa
77xk9+WmRIwHpVCF6cqDA6XZOiR1JNHUo8qRGXgGwNOMeHHOj+CQBDmpLzL07g4h
ZHwCERGZYZqeN58VkAGnayBKna3qdLt515I2cuPvlSJP/7n5TSRs9Eov5N0J8CD6
6UbYwLXw0VvkCia0/r6Iwhq+vi9x2zjR+Xl07a3k5LeXojXrNzWe+2ZETXSInthC
6YL6xo4JD4ZXkeEfUWJgw8/32bfgKK0FDsES+d3b3Zson77HQX+UPnI1QhUOfIKS
Kq3WelA9EWzjUQR/ggWuxYvCQMYSWwzMTNFIv0WEmU6n
-----END ENCRYPTED PRIVATE KEY-----`;

// SHA-256 hash: lPEt0C1N6HXbg75v2jYIQTLv7RkrYwQnxseEuPWRHoU=
const mockPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnpZ7KpwymjY8uG9Lfd3q
2fkMyzUdRdretHSGG+eFyO+9Iheo0EfBEM9QiM39R/vAYsZr5bOE+QM0FZynIjmB
t6B75Pk7VXKhA2DKxLEoPxd8QfOOE7w+UEDVqpC6Fz4sjxW9Dyy6jQ9PqTUechNr
3RZo8yRXlTUjwE4EuJVRevA1AF0RiEdqPsMEnhBBOL74WaHwpOINm1RHU2abxsqV
LMswObjFFRyo+/nWjQOvXBhhQFlzGIoT1anKHccfXrZzv/GGl9DU8cknes9+5Hnl
36yaT+XAjl98e6h0gNSxcuBmC2j2J5PI7ad0zzwkaAxLqaGReX1BkbPfkbkuMMTg
1wIDAQAB
-----END PUBLIC KEY-----`;

export { mockNonce, mockPCR0, mockAttestation, mockPrivateKey, mockPublicKey };
