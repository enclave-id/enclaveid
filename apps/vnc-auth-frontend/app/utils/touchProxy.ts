import NoVncClient from '@novnc/novnc/core/rfb';
import { BoundingBox } from 'puppeteer';

export function handleNewTouchProxy(
  boundingBox: BoundingBox,
  vncClient: NoVncClient
) {
  const touchProxy = document.createElement('input');

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
    vncClient.sendMouse(bb.x + bb.width / 2, bb.y + bb.height / 2, 1);
  });
  touchProxy.addEventListener('keydown', (event) => {
    vncClient.sendKey(0, event.code, true);
  });
  touchProxy.addEventListener('keyup', (event) => {
    vncClient.sendKey(0, event.code, false);
  });

  document.querySelector('#noVNC div')?.appendChild(touchProxy);
}
