import { Viewer } from "cesium"

/*
 * @Author: your name
 * @Date: 2021-02-01 17:33:40
 * @,@LastEditTime: ,: 2021-02-02 00:19:37
 * @,@LastEditors: ,: Please set LastEditors
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