/*
 * @Author: your name
 * @Date: 2021-02-11 23:52:13
 * @LastEditTime: 2021-03-07 00:42:20
 * @LastEditors: Please set LastEditors
 * @Description: 绘制图形实现
 * @FilePath: \ts-cesium\src\module\useGraph.ts
 */

import { View } from '@/plugin/dist/index'
import { useMap } from './useMap'
let geometry: any

export const useGraph = () => {
    let map: View = useMap()
    if (!geometry) {
        geometry = map.getGraph()
    }
    return geometry
}