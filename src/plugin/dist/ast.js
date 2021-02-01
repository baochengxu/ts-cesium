/*
 * @Author:
 * @Date: 2021-02-01 17:21:32
 * @LastEditTime: 2021-02-01 17:32:08
 * @LastEditors: Please set LastEditors
 * @Description: 全局基础类型定义
 * @FilePath: \ts-cesuim\src\plugin\lib\ast.ts
 */
/**
 * @description: 实体类型
 * @param {*}
 * @return {*}
 */
export var EntityType;
(function (EntityType) {
    EntityType["Point"] = "Point";
    EntityType["Polyline"] = "Polyline";
    EntityType["Polygon"] = "Polygon";
    EntityType["Circle"] = "Circle";
    EntityType["Rect"] = "Rect";
    EntityType["Billboard"] = "Billboard";
    EntityType["Label"] = "Label";
})(EntityType || (EntityType = {}));
