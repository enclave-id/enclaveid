import NoVncClient from '@novnc/novnc/core/rfb';
import { BoundingBox } from 'puppeteer';

function handleFocus(event: FocusEvent) {

}

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
    vncClient._sendMouse()
  });
  touchProxy.addEventListener('keydown', (event) => {
    vncClient.sendKey(0, event.code, true);
  });
  touchProxy.addEventListener('keyup', (event) => {
    vncClient.sendKey(0, event.code, false);
  });

  document.querySelector('#noVNC div')?.appendChild(touchProxy);
}
