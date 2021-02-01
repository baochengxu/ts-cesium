/*
 * @Author: your name
 * @Date: 2021-02-01 17:34:26
 * @LastEditTime: 2021-02-01 17:41:35
 * @LastEditors: Please set LastEditors
 * @Description: 地球基类
 * @FilePath: \ts-cesuim\src\plugin\lib\core\Base.ts
 */
import { CallbackProperty, ClassificationType, Color, Math, PrimitiveCollection, Rectangle } from 'cesium'
import { EntityType } from '../ast'
export default class Base<T> {
    protected primitives: Map<string, T> = new Map()
    protected collection: PrimitiveCollection = new PrimitiveCollection()
    constructor(protected map: any, protected type: EntityType) {

    }
}