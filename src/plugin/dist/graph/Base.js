/*
 * @Author: your name
 * @Date: 2021-02-01 17:34:26
 * @,@LastEditTime: ,: 2021-02-06 23:44:24
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: 地球基类
 * @FilePath: \ts-cesuim\src\plugin\lib\core\Base.ts
 */
import { Cartesian3, Material, EllipsoidSurfaceAppearance, EllipseGeometry, GeometryInstance, Math, Primitive, PrimitiveCollection, VertexFormat } from 'cesium';
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
        var instance = new Primitive({
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
        });
        var pri = this.collection.add(instance);
        // let prin = map.scene.primitives.add(instance) as T;
        // this.primitives.set("primitive", pri)
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
