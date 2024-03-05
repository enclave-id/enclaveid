// @ts-expect-error TODO idk why but vite won't compile without the .ts
import { mockPCR0, mockNonce } from 'apps/api/src/app/services/mocks.ts';
import { generateNonce } from '../confidentiality';

export function getExpectedMesaurements() {
  if (process.env.NODE_ENV === 'development') {
    return {
      expectedPcr0: mockPCR0,
      expectedNonce: mockNonce,
    };
  } else {
    return {
      expectedPcr0: 'TODO',
      expectedNonce: Buffer.from(generateNonce()).toString('hex'),
    };
  }
}
