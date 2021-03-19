import { Color } from "cesium";
export interface drawCircleType {
    id: number | string;
    lat: number;
    lon: number;
    radius: number;
    color: Color;
    height?: number;
}
export interface drawRectType {
    id: number | string;
    west: number;
    south: number;
    east: number;
    north: number;
    color: Color;
}
export interface drawPolylineType {
    id: number | string;
    coord: number[];
    color: Color;
    width?: number;
}
export interface drawPolygonType {
    id: number | string;
    coord: number[];
    color: Color;
}
