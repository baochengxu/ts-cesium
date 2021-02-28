import { Cartesian2, Cartesian3, Cartographic } from 'cesium';
import { View, ReturnType } from './index';
export default class Coordinate {
    private map;
    private ellipsoid;
    private handler?;
    /**
     * @description: 坐标操作构造函数
     * @param {Viewer} viewer Cesium Viewer
     * @return {*}
     */
    constructor(map: View);
    /**
     * @description: 鼠标实时获取经纬度坐标
     * @param {function} callback 回调函数
     * @param {*} realtime 是否实时 (true: 实时(鼠标移动实时获取); false: 非实时(鼠标单击获取))
     * @return {*}
     */
    rigisterCoordinate(callback: (data: {
        longitude: string;
        latitude: string;
    }) => void, realtime?: boolean): void;
    /**
     * @description: 销毁实时获取经纬度事件
     * @param {*}
     * @return {*}
     */
    distoryCoordinate(): void;
    /**
     * @description: 二维坐标，获取椭球体表面的经纬度坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    pickEllipsoid(position: Cartesian2): false | Cartesian3;
    /**
     * @description: 三维坐标，获取地形表面的经纬度高程坐标：
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    pickRay(position: Cartesian2): Cartesian3 | undefined;
    /**
     * @description: 三维坐标，获取模型表面的经纬度高程坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    pick(position: Cartesian2): Cartesian3 | undefined;
    /**
     * @description: 拾取对象
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    piObj(position: Cartesian2): any;
    /**
     * @description: 拾取屏幕坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    piScreen(position: Cartesian2): Cartesian3 | undefined;
    /**
     * @description: 将提供的笛卡尔坐标转换为制图表达。笛卡尔在椭球的中心是不确定的
     * @param {Cartesian3} positions 笛卡尔坐标
     * @return {*}
     */
    piEllipsoid(positions: Cartesian3): Cartographic;
    /**
     * @description: 判断坐标 判断地形和模型并返回相应坐标
     * @param {Cartesian2} position 屏幕坐标
     * @param {'Cartographic' | 'Cartesian3'} type
     * @return {*}
     */
    piTerrainToModule(position: Cartesian2, type?: 'Cartographic' | 'Cartesian3'): false | Cartesian3 | Cartographic;
    /**
     * @description: 屏幕高程坐标转经纬度坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    screenToLonlat(position: Cartesian2): Cartographic | undefined;
    /**
     * @description: 经纬度转换为世界坐标
     * @param {Cartographic} position 经纬度坐标
     * @return {*}
     */
    lonlatToWorld(position: Cartographic): Cartesian3;
    /**
     * @description: 世界坐标转换为经纬度
     * @param {Cartesian3} position 笛卡尔坐标
     * @return {*}
     */
    worldToLonlat(position: Cartesian3): Cartographic;
    /**
     * @description: 经度转弧度
     * @param {number} degrees 经度转坐标
     * @return {*}
     */
    latToRadian(degrees: number): number;
    /**
     * @description: 弧度转经度
     * @param {number} radians 弧度
     * @return {*}
     */
    radianToLat(radians: number): number;
    /**
     * @description: 屏幕坐标转世界坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    screenToWorld(position: Cartesian2): Cartesian3 | undefined;
    /**
     * @description: 世界坐标转屏幕坐标
     * @param {Cartesian3} cartesian 世界坐标
     * @return {*}
     */
    worldToScreen(cartesian: Cartesian3): Cartesian2;
    /**
     * @description: 世界坐标转地理坐标(经纬度)
     * @param {Cartesian3} world 世界坐标
     * @return {*}
     */
    worldToGeom(world: Cartesian3): number[];
    /**
     * @description: 批量转坐标
     * @param {*} type
     * @param {Cartesian3} datas
     * @return {*}
     */
    convert(type: ReturnType, datas: Cartesian3[]): (number | Cartesian3 | Cartographic)[];
    /**
     * @description: 地理坐标(经纬度)转世界坐标
     * @param {[number, number]} geom [经度, 纬度]
     * @return {*}
     */
    geomToWorld(geom: [number, number]): Cartesian3;
    /**
     * @description: 判断是否在国内，不在国内则不做偏移
     * @param {number} longitude 经度
     * @param {number} latitude 纬度
     * @return {boolean}
     */
    outOfChina(longitude: number, latitude: number): boolean;
}
