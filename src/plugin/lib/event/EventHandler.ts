/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2021-02-02 00:44:33
 * @,@LastEditTime: ,: 2021-02-02 01:11:12
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: 事件基类
 * @,@FilePath: ,: \ts-cesium\src\plugin\lib\event\Handler.ts
 */
import { ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium'
import { View } from '../index'

export default class EventHandler {
    // 事件本体
    handler: ScreenSpaceEventHandler
    constructor(props: { view: View }) {
        this.handler = new ScreenSpaceEventHandler(props.view.scene.canvas)
    }
    // 基础事件
    private _baseHandler(type: ScreenSpaceEventType, callback: (...params: any[]) => void | any) {
        if (this.handler.isDestroyed()) return;
        this.handler.setInputAction((e) => {
            callback && callback(e)
        }, type)
    }
    // 清除事件
    destroyHandler(type: ScreenSpaceEventType) {
        this.handler.removeInputAction(type)
    }
    // 滚轮事件
    wheelHandler(callback: (...params: any[]) => void | any) {
        this._baseHandler(ScreenSpaceEventType.WHEEL, (e) => {
            callback && callback(e)
        })
    }
    // 右键事件
    rightHandler(callback: (...params: any[]) => void | any) {
        this._baseHandler(ScreenSpaceEventType.RIGHT_CLICK, (e) => {
            callback && callback(e)
        })
    }
    // 左键事件
    leftHandler(callback: (...params: any[]) => void | any) {
        this._baseHandler(ScreenSpaceEventType.LEFT_CLICK, (e) => {
            callback && callback(e)
        })
    }
    // 双击键事件
    dbHandler(callback: (...params: any[]) => void | any) {
        this._baseHandler(ScreenSpaceEventType.LEFT_DOUBLE_CLICK, (e) => {
            callback && callback(e)
        })
    }
    // 鼠标移动事件
    movehandler(callback: (...params: any[]) => void | any){
        this._baseHandler(ScreenSpaceEventType.MOUSE_MOVE, (e) => {
            callback && callback(e)
        })
    }
}