import { Viewer } from "cesium"

/*
 * @Author: your name
 * @Date: 2021-02-01 17:33:40
 * @LastEditTime: 2021-02-08 17:07:55
 * @LastEditors: Please set LastEditors
 * @Description: 核心结构类型库
 * @FilePath: \ts-cesuim\src\plugin\lib\core\types.ts
 */
export type IData = {
    max: number,
    min: number,
    data: []
}
// View.ts props配置项参数
export interface ViewProps {
    el: string | Element
    options: Viewer.ConstructorOptions
}

export type ReturnType = 'Cartographic' | 'Cartesian3' | 'number'