import { View } from "../core";
import { Primitive, GroundPrimitive } from "cesium";
import Base from "./Base";
import { drawPolygonType } from "./types";
export default class Polygon extends Base<Primitive | GroundPrimitive> {
    constructor(map: View, opts?: drawPolygonType);
    drawPolygon({ id, coord, color }: drawPolygonType): void;
}
