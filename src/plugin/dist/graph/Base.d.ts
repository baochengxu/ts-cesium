import { Color, PrimitiveCollection } from 'cesium';
import { EntityType, View } from '../index';
/**
 * @description：getGeometryInstanceAttributes 为实体类型必备参数 继承T必须为实体Primitive
 */
export default class Base<T extends {
    getGeometryInstanceAttributes(id: string): {
        color: number[];
    };
}> {
    protected map: View;
    protected primitives: Map<string, T>;
    protected collection: PrimitiveCollection;
    protected type: EntityType;
    constructor(map: View, type: EntityType);
    /**
     * @description: 绘制并缓存对象
     * @param {string} group 分组
     * @param {T} primitive Primitive
     * @return {*}
     */
    protected resolve(group: string, primitive: T): void;
    /**
     * @description: 移除集合中所有的对象
     * @param {*}
     * @return {*}
     */
    removeAll(): void;
    /**
     * @description: 按组删除集合的所有对象
     * @param {string} group
     * @return {*}
     */
    removeByGroup(group: string): void;
    /**
     * @description: 获取对象
     * @param {string} groupName
     * @param {string} id
     * @return {*}
     */
    getAttributes(groupName: string, id: string): {
        color: number[];
    } | undefined;
    /**
     * @description: 将对象提升到集合的'顶部'。如果绘制了集合中的所有对象在地球表面上，这在视觉上将图元移动到顶部
     * @param {string} groupName
     * @return {*}
     */
    raiseToTop(groupName: string): void;
    /**
     * @description: 设置对象颜色
     * @param {string} groupName
     * @param {string} id
     * @param {Color} color
     * @return {*}
     */
    setColor(groupName: string, id: string, color: Color): void;
    getPrimitives(): Map<string, T>;
    getPrimitiveById(groupName: string): T | undefined;
}
