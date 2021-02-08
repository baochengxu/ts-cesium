/*
 * @Author: your name
 * @Date: 2021-02-01 17:34:26
 * @,@LastEditTime: ,: 2021-02-02 23:15:09
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: 地球基类
 * @FilePath: \ts-cesuim\src\plugin\lib\core\Base.ts
 */
import { PrimitiveCollection } from 'cesium';
/**
 * @description：getGeometryInstanceAttributes 为实体类型必备参数 继承T必须为实体Primitive
 */
var Base = /** @class */ (function () {
    function Base(map, type) {
        this.map = map;
        this.type = type;
        // 图形容器map
        this.primitives = new Map();
        this.collection = map.scene.primitives.add(new PrimitiveCollection());
    }
    Base.prototype.getPrimitives = function () {
        return this.primitives;
    };
    Base.prototype.getPrimitiveById = function (id) {
        return this.primitives.get(id);
    };
    return Base;
}());
export default Base;