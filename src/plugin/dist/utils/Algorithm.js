/*
 * @Author: wuyue
 * @Date: 2021-01-12 20:50:05
 * @LastEditTime: 2021-01-24 00:57:37
 * @LastEditors: wuyue
 * @Description: 算法
 */
import { Cartographic } from 'cesium';
var Algorithm = /** @class */ (function () {
    function Algorithm() {
    }
    /**
     * @description: 方向
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @return {*}
     */
    Algorithm.directionV3 = function (x1, y1, x2, y2, x3, y3) {
        return x1 * y3 + x2 * y1 + x3 * y2 - x1 * y2 - x2 * y3 - x3 * y1;
    };
    /**
     * @description: 判断点是否在矩形中
     * @param {Cartographic} point 点
     * @param {Rectangle} rectangle 矩形
     * @return {*}
     */
    Algorithm.checkPointInRectangle = function (point, rectangle) {
        return point.longitude >= rectangle.west && point.latitude <= rectangle.east && point.latitude >= rectangle.north && point.latitude <= rectangle.south;
    };
    /**
     * @description: 判断两条线段是否相交
     * @param {*}
     * @return {*}
     */
    Algorithm.checkPolylineIntersectPolyline = function (line1, line2) {
        var x1 = line1.startPoint.longitude;
        var y1 = line1.startPoint.latitude;
        var x2 = line1.endPoint.longitude;
        var y2 = line1.endPoint.latitude;
        var x3 = line2.startPoint.longitude;
        var y3 = line2.startPoint.latitude;
        var x4 = line2.endPoint.longitude;
        var y4 = line2.endPoint.latitude;
        // 依据:两条线段不相交,必定是存在其中一条线段的两端点在在另一条线段所在直线的同側.所以要分别考虑两种情况.
        if (this.directionV3(x1, y1, x2, y2, x3, y3) * this.directionV3(x1, y1, x2, y2, x4, y4) > 0) {
            // 一条线段的两点全在另一条线段的同一側
            return false;
        }
        if (this.directionV3(x3, y3, x4, y4, x1, y1) * this.directionV3(x3, y3, x4, y4, x2, y2) > 0) {
            return false;
        }
        return true;
    };
    /**
     * @description: 判断线段是否和矩形相交
     * @param {Cartographic} points 线段的节点
     * @param {Rectangle} rect 矩形
     * @return {*}
     */
    Algorithm.checkPolylineIntersectRectangle = function (points, rect) {
        var checked = false;
        if (points.length < 2) {
            return false;
        }
        var p1 = new Cartographic(rect.west, rect.north);
        var p2 = new Cartographic(rect.east, rect.north);
        var p3 = new Cartographic(rect.east, rect.south);
        var p4 = new Cartographic(rect.west, rect.south);
        for (var i = 0; i < points.length - 1; i++) {
            var startPoint = points[i];
            var endPoint = points[i + 1];
            checked = this.checkPointInRectangle(startPoint, rect); // 起点是否在矩形内
            if (checked)
                break;
            checked = this.checkPointInRectangle(endPoint, rect); // 终点是否在矩形内
            if (checked)
                break;
            checked = this.checkPolylineIntersectPolyline({ startPoint: startPoint, endPoint: endPoint }, { startPoint: p1, endPoint: p2 }); // 与矩形的第1条线段相比较
            if (checked)
                break;
            checked = this.checkPolylineIntersectPolyline({ startPoint: startPoint, endPoint: endPoint }, { startPoint: p2, endPoint: p3 }); // 与矩形的第2条线段相比较
            if (checked)
                break;
            checked = this.checkPolylineIntersectPolyline({ startPoint: startPoint, endPoint: endPoint }, { startPoint: p3, endPoint: p4 }); // 与矩形的第3条线段相比较
            if (checked)
                break;
            checked = this.checkPolylineIntersectPolyline({ startPoint: startPoint, endPoint: endPoint }, { startPoint: p4, endPoint: p1 }); // 与矩形的第4条线段相比较
            if (checked)
                break;
        }
        return checked;
    };
    /**
     * @description: 计算两点间的距离
     * @param {number} latitude1
     * @param {number} longitude1
     * @param {number} latitude2
     * @param {number} longitude2
     * @return {*}
     */
    Algorithm.calcFlatternDistance = function (latitude1, longitude1, latitude2, longitude2) {
        var EARTH_RADIUS = 6378137.0; // 单位M
        var PI = Math.PI;
        function getRad(d) {
            return (d * PI) / 180.0;
        }
        var f = getRad((latitude1 + latitude2) / 2);
        var g = getRad((latitude1 - latitude2) / 2);
        var l = getRad((longitude1 - longitude2) / 2);
        var sg = window.Math.sin(g);
        var sl = window.Math.sin(l);
        var sf = window.Math.sin(f);
        var a = EARTH_RADIUS;
        var fl = 1 / 298.257;
        sg = sg * sg;
        sl = sl * sl;
        sf = sf * sf;
        var s = sg * (1 - sl) + (1 - sf) * sl;
        var c = (1 - sg) * (1 - sl) + sf * sl;
        var w = window.Math.atan(window.Math.sqrt(s / c));
        var r = window.Math.sqrt(s * c) / w;
        var d = 2 * w * a;
        var h1 = (3 * r - 1) / 2 / c;
        var h2 = (3 * r + 1) / 2 / s;
        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
    };
    /**
     * @description: 根据经纬度，距离，角度计算另外一个点
     * @param {number} latitude 纬度
     * @param {number} longitude 经度
     * @param {number} distance 距离
     * @param {number} angle 角度
     * @return {*}
     */
    Algorithm.calcCoordinateByCoordinateDistanceAngle = function (latitude, longitude, distance, angle) {
        var ea = 6378137; //   赤道半径
        var eb = 6356725; //   极半径
        var dx = distance * Math.sin((angle * Math.PI) / 180);
        var dy = distance * Math.cos((angle * Math.PI) / 180);
        var ec = eb + ((ea - eb) * (90 - latitude)) / 90;
        var ed = ec * Math.cos((latitude * Math.PI) / 180);
        var lon = ((dx / ed + (longitude * Math.PI) / 180) * 180) / Math.PI;
        var lat = ((dy / ec + (latitude * Math.PI) / 180) * 180) / Math.PI;
        return [lon, lat];
    };
    return Algorithm;
}());
export default Algorithm;
