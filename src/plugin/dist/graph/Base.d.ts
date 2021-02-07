import { PrimitiveCollection } from 'cesium';
import { EntityType, View } from '../index';
/**
 * @description：getGeometryInstanceAttributes 为实体类型必备参数 继承T必须为实体Primitive
 */
export default class Base<T extends {
    getGeometryInstanceAttributes(id: any): any;
}> {
    protected map: View;
    protected type: EntityType;
    protected primitives: Map<string, T>;
    protected collection: PrimitiveCollection;
    constructor(map: View, type: EntityType);
    getPrimitives(): Map<string, T>;
    getPrimitiveById(id: string): T | undefined;
}
