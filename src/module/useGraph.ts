/*
 * @Author: your name
 * @Date: 2021-02-11 23:52:13
 * @LastEditTime: 2021-02-19 23:42:09
 * @LastEditors: Please set LastEditors
 * @Description: 绘制图形实现
 * @FilePath: \ts-cesium\src\module\useBase.ts
 */

import { View, EntityType, Circle, Rect } from '@/plugin/dist'
import { useMap } from './useMap'
let geometry: Circle | Rect
// 匹配对应类型的图形
const geometrys = {
    'Point': (map: View) => new Circle(map),
    'Polyline': (map: View) => new Circle(map),
    'Polygon': (map: View) => new Circle(map),
    'Circle': (map: View) => new Circle(map),
    'Rect': (map: View) => new Rect(map),
    'Billboard': (map: View) => new Circle(map),
    'Label': (map: View) => new Circle(map)
}

export const useGraph = (type: EntityType) => {
    let map: View = useMap()
    if (!type) return;
    if (!geometry) {
        geometry = geometrys[type](map)
    }
    return geometry
}