// This page just tests that the encryption is working e2e

import axios from 'axios';
import { useEffect, useState } from 'react';

const doAttestation = async () => {
  const response = await axios
    .get('http://localhost:3000/api/attestation', {
      params: {
        nonce: 'testNonce123',
      },
    })
    .then((res) => {
      console.log(res);

      return res.data;
    });
};

export function PingPong({ title }: { title: string }) {
  const [started, setStarted] = useState(false);

  return (
    <div>
      <h1>{title}</h1>
      <p>Happy coding!</p>
    </div>
  );
}

export default PingPong;
