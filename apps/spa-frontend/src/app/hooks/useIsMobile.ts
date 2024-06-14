import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    const isMobile = result.device?.type === 'mobile';

    setIsMobile(isMobile);
  }, []);

  return isMobile;
}
