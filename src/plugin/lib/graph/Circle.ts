/*
 * @Author: your name
 * @Date: 2021-02-08 15:12:47
 * @LastEditTime: 2021-02-08 15:14:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\plugin\lib\graph\Circle.ts
 */
import { Primitive, GroundPrimitive } from 'cesium'
import { Base, View, EntityType } from '../index'
export default class Circle extends Base<Primitive | GroundPrimitive> {
    constructor(map: View) {
        super(map, EntityType.Circle)
    }
}