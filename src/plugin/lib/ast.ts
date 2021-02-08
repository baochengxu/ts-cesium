/*
 * @Author: 
 * @Date: 2021-02-01 17:21:32
 * @LastEditTime: 2021-02-08 17:17:10
 * @LastEditors: Please set LastEditors
 * @Description: 全局基础类型定义
 * @FilePath: \ts-cesuim\src\plugin\lib\ast.ts
 */

/**
 * @description: 实体类型
 * @param {*}
 * @return {*}
 */
export const enum EntityType {
    Point = 'Point',
    Polyline = 'Polyline',
    Polygon = 'Polygon',
    Circle = 'Circle',
    Rect = 'Rect',
    Billboard = 'Billboard',
    Label = 'Label'
}

/**
 * @description: 方向类型
 * @param {*}
 */
export type Direction = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'