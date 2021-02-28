/*
 * @Author: your name
 * @Date: 2021-02-02 00:44:33
 * @LastEditTime: 2021-02-08 17:15:52
 * @LastEditors: Please set LastEditors
 * @Description: 事件基类
 * @FilePath: \ts-cesium\src\plugin\lib\event\Handler.ts
 */
import { ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
var EventHandler = /** @class */ (function () {
    function EventHandler(props) {
        this.handler = new ScreenSpaceEventHandler(props.view.scene.canvas);
    }
    // 基础事件
    EventHandler.prototype._baseHandler = function (type, callback) {
        if (this.handler.isDestroyed())
            return;
        this.handler.setInputAction(function (e) {
            callback && callback(e);
        }, type);
    };
    // 清除事件
    EventHandler.prototype.destroyHandler = function (type) {
        this.handler.removeInputAction(type);
    };
    // 滚轮事件
    EventHandler.prototype.wheelHandler = function (callback) {
        this._baseHandler(ScreenSpaceEventType.WHEEL, function (e) {
            callback && callback(e);
        });
    };
    // 右键事件
    EventHandler.prototype.rightHandler = function (callback) {
        this._baseHandler(ScreenSpaceEventType.RIGHT_CLICK, function (e) {
            callback && callback(e);
        });
    };
    // 左键事件
    EventHandler.prototype.leftHandler = function (callback) {
        this._baseHandler(ScreenSpaceEventType.LEFT_CLICK, function (e) {
            callback && callback(e);
        });
    };
    // 双击键事件
    EventHandler.prototype.dbHandler = function (callback) {
        this._baseHandler(ScreenSpaceEventType.LEFT_DOUBLE_CLICK, function (e) {
            callback && callback(e);
        });
    };
    // 鼠标移动事件
    EventHandler.prototype.movehandler = function (callback) {
        this._baseHandler(ScreenSpaceEventType.MOUSE_MOVE, function (e) {
            callback && callback(e);
        });
    };
    /**
     * @description: 移除监听事件
     * @param {*}
     * @return {*}
     */
    EventHandler.prototype.removeEvent = function (EventType) {
        this.handler.removeInputAction(EventType);
    };
    return EventHandler;
}());
export default EventHandler;
