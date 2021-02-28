import { Cartographic, Rectangle } from 'cesium';
export default class Algorithm {
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
    static directionV3(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number;
    /**
     * @description: 判断点是否在矩形中
     * @param {Cartographic} point 点
     * @param {Rectangle} rectangle 矩形
     * @return {*}
     */
    static checkPointInRectangle(point: Cartographic, rectangle: Rectangle): boolean;
    /**
     * @description: 判断两条线段是否相交
     * @param {*}
     * @return {*}
     */
    static checkPolylineIntersectPolyline(line1: {
        startPoint: Cartographic;
        endPoint: Cartographic;
    }, line2: {
        startPoint: Cartographic;
        endPoint: Cartographic;
    }): boolean;
    /**
     * @description: 判断线段是否和矩形相交
     * @param {Cartographic} points 线段的节点
     * @param {Rectangle} rect 矩形
     * @return {*}
     */
    static checkPolylineIntersectRectangle(points: Cartographic[], rect: Rectangle): boolean;
    /**
     * @description: 计算两点间的距离
     * @param {number} latitude1
     * @param {number} longitude1
     * @param {number} latitude2
     * @param {number} longitude2
     * @return {*}
     */
    static calcFlatternDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number;
    /**
     * @description: 根据经纬度，距离，角度计算另外一个点
     * @param {number} latitude 纬度
     * @param {number} longitude 经度
     * @param {number} distance 距离
     * @param {number} angle 角度
     * @return {*}
     */
    static calcCoordinateByCoordinateDistanceAngle(latitude: number, longitude: number, distance: number, angle: number): number[];
}
