import { PrimitiveCollection } from 'cesium';
import { EntityType } from '../ast';
export default class Base<T> {
    protected map: any;
    protected type: EntityType;
    protected primitives: Map<string, T>;
    protected collection: PrimitiveCollection;
    constructor(map: any, type: EntityType);
}
