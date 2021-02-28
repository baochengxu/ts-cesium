import { Color } from "cesium";
export interface drawCircleType {
    lat: number;
    lon: number;
    radius: number;
    color: Color;
    height?: number;
}
export interface drawRectType {
    west: number;
    south: number;
    east: number;
    north: number;
    color: Color;
}
