import { EventEmitter } from 'eventemitter3';

// TODO Redis
export const eventEmitter = new EventEmitter();

export interface ViewportChangeEvent {
  vh: number;
  vw: number;
}

function handleViewportChange(input: ViewportChangeEvent) {
  console.log(input);
}

eventEmitter.on('viewportChange', handleViewportChange);
