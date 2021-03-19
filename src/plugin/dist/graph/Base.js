/*
 * @Author: your name
 * @Date: 2021-02-01 17:34:26
 * @LastEditTime: 2021-03-07 02:19:21
 * @LastEditors: Please set LastEditors
 * @Description: 地球基类
 * @FilePath: \ts-cesium\src\plugin\lib\graph\Base.ts
 */
import { PrimitiveCollection } from 'cesium';
import { OperationId } from '../index';
/**
 * @description：getGeometryInstanceAttributes 为实体类型必备参数 继承T必须为实体Primitive
 */
var Base = /** @class */ (function () {
    function Base(map, type) {
        this.map = map;
        // 图形容器map
        this.primitives = new Map();
        this.type = type;
        this.collection = map.scene.primitives.add(new PrimitiveCollection());
    }
    /**
     * @description: 绘制并缓存对象
     * @param {string} group 分组
     * @param {T} primitive Primitive
     * @return {*}
     */
    Base.prototype.resolve = function (group, primitive) {
        var prim = this.collection.add(primitive);
        this.primitives.set(group, prim);
    };
    /**
     * @description: 移除集合中所有的对象
     * @param {*}
     * @return {*}
     */
    Base.prototype.removeAll = function () {
        this.collection.removeAll();
        this.primitives.clear();
    };
    /**
     * @description: 按组删除集合的所有对象
     * @param {string} group
     * @return {*}
     */
    Base.prototype.removeByGroup = function (group) {
        var member = this.primitives.get(group);
        if (member) {
            this.collection.remove(member);
            this.primitives.delete(group);
        }
    };
    /**
     * @description: 获取对象
     * @param {string} groupName
     * @param {string} id
     * @return {*}
     */
    Base.prototype.getAttributes = function (groupName, id) {
        var group = this.primitives.get(groupName);
        if (group) {
            return group.getGeometryInstanceAttributes(OperationId.EncodeEntityId({ type: this.type, id: id }));
            // return group.getGeometryInstanceAttributes(id)
        }
    };
    /**
     * @description: 将对象提升到集合的'顶部'。如果绘制了集合中的所有对象在地球表面上，这在视觉上将图元移动到顶部
     * @param {string} groupName
     * @return {*}
     */
    Base.prototype.raiseToTop = function (groupName) {
        var group = this.primitives.get(groupName);
        if (group) {
            return this.collection.raiseToTop(group);
        }
    };
    /**
     * @description: 设置对象颜色
     * @param {string} groupName
     * @param {string} id
     * @param {Color} color
     * @return {*}
     */
    Base.prototype.setColor = function (groupName, id, color) {
        var attr = this.getAttributes(groupName, id);
        if (attr) {
            attr.color = color.toBytes();
        }
    };
    Base.prototype.getPrimitives = function () {
        return this.primitives;
    };
    Base.prototype.getPrimitiveById = function (groupName) {
        return this.primitives.get(groupName);
    };
    return Base;
}());
export default Base;
