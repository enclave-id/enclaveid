import { BoundingBox } from 'puppeteer';
import Redis from 'ioredis';

export const redis = new Redis({
  host: process.env['REDIS_HOST'] || 'enclaveid-redis',
  port: parseInt(process.env['REDIS_PORT'] || '6379'),
});

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
