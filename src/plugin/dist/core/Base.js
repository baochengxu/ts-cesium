/*
 * @Author: your name
 * @Date: 2021-02-01 17:34:26
 * @LastEditTime: 2021-02-01 17:41:35
 * @LastEditors: Please set LastEditors
 * @Description: 地球基类
 * @FilePath: \ts-cesuim\src\plugin\lib\core\Base.ts
 */
import { PrimitiveCollection } from 'cesium';
var Base = /** @class */ (function () {
    function Base(map, type) {
        this.map = map;
        this.type = type;
        this.primitives = new Map();
        this.collection = new PrimitiveCollection();
    }
    return Base;
}());
export default Base;
