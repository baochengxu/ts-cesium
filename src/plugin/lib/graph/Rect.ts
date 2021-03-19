/*
 * @Author: your name
 * @Date: 2021-02-19 22:30:56
 * @LastEditTime: 2021-03-07 02:07:12
 * @LastEditors: Please set LastEditors
 * @Description: 绘制矩形
 * @FilePath: \ts-cesium\src\plugin\lib\graph\Rect.ts
 */
import { View, EntityType, drawRectType, OperationId } from '../index'
import { Primitive, GroundPrimitive, RectangleGeometry, GeometryInstance, Rectangle, PerInstanceColorAppearance, ColorGeometryInstanceAttribute } from 'cesium'
import Base from './Base'
export default class Rect extends Base<Primitive | GroundPrimitive>{
    constructor(map: View, opts?: drawRectType) {
        super(map, EntityType.Rect)
        !!opts && this.drawRect(opts)
    }
    drawRect({ id, west, south, east, north, color }: drawRectType) {
        let Rect = new GeometryInstance({
            geometry: new RectangleGeometry({
                rectangle: Rectangle.fromDegrees(west, south, east, north),
                vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT
            }),
            id: OperationId.EncodeEntityId({ type: EntityType.Rect, id }),  
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            },
        })
        let RectGeometry = new Primitive({
            geometryInstances: Rect,
            appearance: new PerInstanceColorAppearance({
                closed: false
            })
        })
        super.resolve('rect', RectGeometry)
    }
}