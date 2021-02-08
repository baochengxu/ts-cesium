/*
 * @Author: your name
 * @Date: 2021-02-01 17:34:26
 * @LastEditTime: 2021-02-08 15:08:24
 * @LastEditors: Please set LastEditors
 * @Description: 地球基类
 * @FilePath: \ts-cesuim\src\plugin\lib\core\Base.ts
 */
import { CallbackProperty, Cartesian3, ClassificationType, Material, EllipsoidSurfaceAppearance, Color, EllipseGeometry, GeometryInstance, Math, Primitive, PrimitiveCollection, Rectangle, VertexFormat } from 'cesium'
import { EntityType, View, OperationId } from '../index'

/**
 * @description：getGeometryInstanceAttributes 为实体类型必备参数 继承T必须为实体Primitive
 */
export default class Base<T extends { getGeometryInstanceAttributes(id: string): { color: number[] } }> {
    // 图形容器map
    protected primitives: Map<string, T> = new Map()
    // 用于装载图形的容器集合
    protected collection: PrimitiveCollection
    protected type: EntityType
    constructor(protected map: View, type: EntityType) {
        this.type = type
        this.collection = map.scene.primitives.add(new PrimitiveCollection())
        // let instance = new Primitive({
        //     geometryInstances: new GeometryInstance({
        //         geometry: new EllipseGeometry({
        //             center: Cartesian3.fromDegrees(-100.0, 20.0),
        //             semiMinorAxis: 500000.0,
        //             semiMajorAxis: 1000000.0,
        //             rotation: Math.PI_OVER_FOUR,
        //             vertexFormat: VertexFormat.POSITION_AND_ST
        //         })
        //     }),
        //     appearance: new EllipsoidSurfaceAppearance({
        //         material: Material.fromType('Checkerboard')
        //     })
        // })
        // let pri = this.collection.add(instance) as Primitive
        // let prin = map.scene.primitives.add(instance) as T;
        // this.primitives.set("primitive", pri)
    }
    /**
     * @description: 绘制并缓存对象
     * @param {string} group 分组
     * @param {T} primitive Primitive
     * @return {*}
     */
    protected resolve(group: string, primitive: T) {
        const prim = this.collection.add(primitive) as T
        this.primitives.set(group, prim)
    }
    /**
     * @description: 移除集合中所有的对象
     * @param {*}
     * @return {*}
     */
    removeAll() {
        this.collection.removeAll()
        this.primitives.clear()
    }
    /**
     * @description: 按组删除集合的所有对象
     * @param {string} group
     * @return {*}
     */
    removeByGroup(group: string) {
        const member = this.primitives.get(group)
        if (member) {
            this.collection.remove(member)
            this.primitives.delete(group)
        }
    }
    /**
     * @description: 获取对象
     * @param {string} groupName
     * @param {string} id
     * @return {*}
     */
    getAttributes(groupName: string, id: string) {
        const group = this.primitives.get(groupName)
        if (group) {
            return group.getGeometryInstanceAttributes(OperationId.EncodeEntityId({ type: this.type, id }))
        }
    }
    /**
     * @description: 将对象提升到集合的'顶部'。如果绘制了集合中的所有对象在地球表面上，这在视觉上将图元移动到顶部
     * @param {string} groupName
     * @return {*}
     */
    raiseToTop(groupName: string) {
        const group = this.primitives.get(groupName)
        if (group) {
            return this.collection.raiseToTop(group)
        }
    }
    /**
     * @description: 设置对象颜色
     * @param {string} groupName
     * @param {string} id
     * @param {Color} color
     * @return {*}
     */
    setColor(groupName: string, id: string, color: Color) {
        const attr = this.getAttributes(groupName, id)
        if (attr) {
            attr.color = color.toBytes()
        }
    }
    public getPrimitives() {
        return this.primitives;
    }
    public getPrimitiveById(id: string) {
        return this.primitives.get(id)
    }
}