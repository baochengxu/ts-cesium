/*
 * @Author: your name
 * @Date: 2021-02-02 00:15:33
 * @LastEditTime: 2021-02-19 22:55:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\plugin\lib\graph\types.ts
 */

import { Color } from "cesium";

export interface drawCircleType {
    lat: number
    lon: number
    radius: number
    color: Color
    height?: number
}
export interface drawRectType {
    west: number 
    south: number 
    east: number 
    north: number 
    color: Color 
}