/*
 * @Author: duhu
 * @Description: 绘制线
 * @Date: 2021-03-06 23:24:36
 * @LastEditTime: 2021-03-07 02:19:33
 * @FilePath: \ts-cesium\src\plugin\lib\graph\Polyline.ts
 */
import { Primitive, GroundPrimitive, GeometryInstance, PolylineGeometry, ColorGeometryInstanceAttribute, PolylineColorAppearance, Cartesian3, PerInstanceColorAppearance, Color } from "cesium";
import { EntityType } from "../ast";
import { View } from "../core";
import { OperationId } from "../utils";
import Base from "./Base";
import { drawPolylineType } from "./types";
export default class Polyline extends Base<Primitive | GroundPrimitive> {
    constructor(map: View, opts?: drawPolylineType) {
        super(map, EntityType.Polyline)
        !!opts && this.drawPolyline(opts)
    }
    // 绘制线
    drawPolyline({ id, coord, width = 5.0, color }: drawPolylineType) {
        let polyline = new GeometryInstance({
            geometry: new PolylineGeometry({
                positions: Cartesian3.fromDegreesArray(coord),
                width,
                vertexFormat: PolylineColorAppearance.VERTEX_FORMAT
            }),
            // id: OperationId.EncodeEntityId({ type: EntityType.Polyline, id }),
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            }
        })
        let polylineGeometry = new Primitive({
            geometryInstances: polyline,
            appearance: new PolylineColorAppearance()
        })
        super.resolve('polyline', polylineGeometry)
    }
}