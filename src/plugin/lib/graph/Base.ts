/*
 * @Author: your name
 * @Date: 2021-02-01 17:34:26
 * @,@LastEditTime: ,: 2021-02-06 23:44:24
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: 地球基类
 * @FilePath: \ts-cesuim\src\plugin\lib\core\Base.ts
 */
import { CallbackProperty, Cartesian3, ClassificationType, Material, EllipsoidSurfaceAppearance, Color, EllipseGeometry, GeometryInstance, Math, Primitive, PrimitiveCollection, Rectangle, VertexFormat } from 'cesium'
import { EntityType, View } from '../index'

/**
 * @description：getGeometryInstanceAttributes 为实体类型必备参数 继承T必须为实体Primitive
 */
export default class Base<T extends { getGeometryInstanceAttributes(id: any): any }> {
    // 图形容器map
    protected primitives: Map<string, T> = new Map()
    // 用于装载图形的容器集合
    protected collection: PrimitiveCollection
    constructor(protected map: View, protected type: EntityType) {
        this.collection = map.scene.primitives.add(new PrimitiveCollection())
        let instance = new Primitive({
            geometryInstances: new GeometryInstance({
                geometry: new EllipseGeometry({
                    center: Cartesian3.fromDegrees(-100.0, 20.0),
                    semiMinorAxis: 500000.0,
                    semiMajorAxis: 1000000.0,
                    rotation: Math.PI_OVER_FOUR,
                    vertexFormat: VertexFormat.POSITION_AND_ST
                })
            }),
            appearance: new EllipsoidSurfaceAppearance({
                material: Material.fromType('Checkerboard')
            })
        })
        let pri = this.collection.add(instance) as Primitive
        // let prin = map.scene.primitives.add(instance) as T;
        // this.primitives.set("primitive", pri)
    }
    public getPrimitives() {
        return this.primitives;
    }
    public getPrimitiveById(id: string) {
        return this.primitives.get(id)
    }
}