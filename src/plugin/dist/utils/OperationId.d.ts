import { EntityType } from '../ast';
export default class OperationId {
    /**
     * @description: 获取一个新的GUID
     * @param {*} OperationId
     * @return {*}
     */
    static GetGUID(): string;
    /**
     * @description: 对实体ID进行编码
     * @param {string} type 实体类型
     * @param {string} id
     * @return {*} 格式:'Type_ChildrenType_占位_占位_ID'
     */
    static EncodeEntityId({ type, children, id }: {
        type: EntityType;
        children?: EntityType | '';
        id: string;
    }): string;
    /**
     * @description: 生成组件id
     * @param component
     * @param id
     */
    static generateComponentId(component: string, id: string): string;
    /**
     * @description: 对实体ID进行解码
     * @param {string} id
     * @return {*}
     */
    static DecodeEntityId(id: string): {
        type: string;
        children: string;
        id: string;
    };
}
