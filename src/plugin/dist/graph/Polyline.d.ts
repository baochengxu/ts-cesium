import { Primitive, GroundPrimitive } from "cesium";
import { View } from "../core";
import Base from "./Base";
import { drawPolylineType } from "./types";
export default class Polyline extends Base<Primitive | GroundPrimitive> {
    constructor(map: View, opts?: drawPolylineType);
    drawPolyline({ id, coord, width, color }: drawPolylineType): void;
}
