
/*
 * @Author: duhu
 * @Description: 绘制几何面
 * @Date: 2021-03-06 23:24:26
 * @LastEditTime: 2021-03-07 02:02:19
 * @FilePath: \ts-cesium\src\plugin\lib\graph\Polygon.ts
 */
import { View } from "../core";
import { Primitive, GroundPrimitive, GeometryInstance, ColorGeometryInstanceAttribute, Cartesian3, PerInstanceColorAppearance, PolygonGeometry } from "cesium";
import Base from "./Base";
import { drawPolygonType } from "./types";
import { EntityType } from "../ast";
import { OperationId } from "../utils";
export default class Polygon extends Base<Primitive | GroundPrimitive> {
    constructor(map: View, opts?: drawPolygonType) {
        super(map, EntityType.Polygon)
        !!opts && this.drawPolygon(opts)
    }
    // 绘制几何面
    drawPolygon({ id, coord, color }: drawPolygonType) {
        let polygon = new GeometryInstance({
            geometry: PolygonGeometry.fromPositions({
                positions: Cartesian3.fromDegreesArray(coord),
                vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT
            }),
            id: OperationId.EncodeEntityId({ type: EntityType.Polygon, id }),
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            }
        })
        let polygonGeometry = new Primitive({
            geometryInstances: polygon,
            appearance: new PerInstanceColorAppearance({
                closed: false,
                translucent: false
            })
        })
        super.resolve('polygon', polygonGeometry)
    }
}