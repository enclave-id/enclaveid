import { BoundingBox } from 'puppeteer';
import { getKeycode, getKeysym } from '@novnc/novnc/core/input/util';

export function handleNewTouchProxy(boundingBox: BoundingBox, vncClient: any) {
  const touchProxy = document.createElement('input');

  touchProxy.id = 'touchProxy';
  touchProxy.type = 'email';
  touchProxy.style.height = boundingBox.height.toString() + 'px';
  touchProxy.style.width = boundingBox.width.toString() + 'px';
  touchProxy.style.marginTop = boundingBox.y.toString() + 'px';
  touchProxy.style.marginLeft = boundingBox.x.toString() + 'px';
  touchProxy.style.position = 'absolute';
  touchProxy.style.zIndex = '9999999';
  touchProxy.style.opacity = '0';

  touchProxy.addEventListener('focus', (event) => {
    const bb = touchProxy.getBoundingClientRect();
    const x = bb.x + bb.width / 2;
    const y = bb.y + bb.height / 2;
    vncClient.sendMouse(x, y, 1);
  });

  // Doesnt work on android https://bugs.chromium.org/p/chromium/issues/detail?id=118639#c259
  touchProxy.addEventListener('keydown', (event) => {
    vncClient.sendKey(getKeysym(event), getKeycode(event));
  });

  document.querySelector('#noVNC div')?.appendChild(touchProxy);
}
