import { View, drawRectType } from '../index';
import { Primitive, GroundPrimitive } from 'cesium';
import Base from './Base';
export default class Rect extends Base<Primitive | GroundPrimitive> {
    constructor(map: View, opts?: drawRectType);
    drawRect({ id, west, south, east, north, color }: drawRectType): void;
}
