import { ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { View } from '../index';
export default class EventHandler {
    handler: ScreenSpaceEventHandler;
    constructor(props: {
        view: View;
    });
    private _baseHandler;
    destroyHandler(type: ScreenSpaceEventType): void;
    wheelHandler(callback: (...params: any[]) => void | any): void;
    rightHandler(callback: (...params: any[]) => void | any): void;
    leftHandler(callback: (...params: any[]) => void | any): void;
    dbHandler(callback: (...params: any[]) => void | any): void;
    movehandler(callback: (...params: any[]) => void | any): void;
}
