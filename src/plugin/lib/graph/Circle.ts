/*
 * @Author: your name
 * @Date: 2021-02-08 15:12:47
 * @LastEditTime: 2021-02-19 23:24:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\plugin\lib\graph\Circle.ts
 */
import { View, EntityType, drawCircleType } from '../index'
import { Primitive, GroundPrimitive, CircleGeometry, GeometryInstance, Cartesian3, PerInstanceColorAppearance, ColorGeometryInstanceAttribute } from 'cesium'
import Base from './Base'
export default class Circle extends Base<Primitive | GroundPrimitive> {
    constructor(map: View, opts?: drawCircleType) {
        super(map, EntityType.Circle)
        !!opts && this.drawCircle(opts)
    }
    /**
     * @description: 绘制圆形
     * @param {number} lat 经度
     * @param {number} lon 维度
     * @param {number} height 高度
     * @return {*}
     */
    drawCircle({ lat, lon, height, radius, color }: drawCircleType) {
        let Circle = new GeometryInstance({
            geometry: new CircleGeometry({
                center: Cartesian3.fromDegrees(lat, lon, height),
                radius,
                vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT
            }),
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            }
        })
        let circleGeometry = new Primitive({
            geometryInstances: Circle,
            appearance: new PerInstanceColorAppearance({
                closed: false
            })
        })
        super.resolve('geometry', circleGeometry)
    }
}