import { BoundingBox } from 'puppeteer';

export enum ChromeUserEventEnum {
  CHROME_READY = 'chromeReady',
  LOGIN_SUCCESS = 'loginSuccess',
  NEW_BOUNDING_BOX = 'newBoundingBox',
}

export interface InputOverlay {
  inputId: string;
  boundingBox: BoundingBox;
}

export type ChromeUserEventData = {
  [ChromeUserEventEnum.CHROME_READY]: never;
  [ChromeUserEventEnum.LOGIN_SUCCESS]: never;
  [ChromeUserEventEnum.NEW_BOUNDING_BOX]: InputOverlay;
};

export function toEventPayload<E extends ChromeUserEventEnum>(
  event: E,
  data?: ChromeUserEventData[E],
): string {
  if (!data) {
    return JSON.stringify({ event });
  }

  return JSON.stringify({ event, data });
}

export function fromEventPayload<E extends ChromeUserEventEnum>(
  payload: string,
): { event: E; data?: ChromeUserEventData[E] } {
  return JSON.parse(payload);
}
