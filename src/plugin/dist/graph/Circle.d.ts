import { View, drawCircleType } from '../index';
import { Primitive, GroundPrimitive } from 'cesium';
import Base from './Base';
export default class Circle extends Base<Primitive | GroundPrimitive> {
    constructor(map: View, opts?: drawCircleType);
    /**
     * @description: 绘制圆形
     * @param {number} lat 经度
     * @param {number} lon 维度
     * @param {number} height 高度
     * @return {*}
     */
    drawCircle({ lat, lon, height, radius, color }: drawCircleType): void;
}
