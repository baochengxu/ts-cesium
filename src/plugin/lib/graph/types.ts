/*
 * @Author: your name
 * @Date: 2021-02-02 00:15:33
 * @LastEditTime: 2021-03-07 02:01:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\plugin\lib\graph\types.ts
 */

import { Color } from "cesium";
// 绘制圆形参数
export interface drawCircleType {
    id:number | string
    lat: number
    lon: number
    radius: number
    color: Color
    height?: number
}
// 绘制矩形参数
export interface drawRectType {
    id:number | string
    west: number
    south: number
    east: number
    north: number
    color: Color
}
// 绘制线条参数
export interface drawPolylineType {
    id:number | string
    coord: number[]
    color: Color
    width?: number
}
// 绘制多边形参数
export interface drawPolygonType {
    id:number | string
    coord: number[]
    color: Color
}