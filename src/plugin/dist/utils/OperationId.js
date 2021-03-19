/*
 * @Author: wuyue
 * @Date: 2021-01-11 17:01:24
 * @LastEditTime: 2021-03-07 02:06:07
 * @LastEditors: Please set LastEditors
 * @Description: 工具类
 */
var OperationId = /** @class */ (function () {
    function OperationId() {
    }
    /**
     * @description: 获取一个新的GUID
     * @param {*} OperationId
     * @return {*}
     */
    OperationId.GetGUID = function () {
        var gen = function (count) {
            var out = '';
            for (var i = 0; i < count; i++) {
                out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return out;
        };
        return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-');
    };
    /**
     * @description: 对实体ID进行编码
     * @param {string} type 实体类型
     * @param {string} id
     * @return {*} 格式:'Type_ChildrenType_占位_占位_ID'
     */
    OperationId.EncodeEntityId = function (_a) {
        var type = _a.type, _b = _a.children, children = _b === void 0 ? '' : _b, _c = _a.id, id = _c === void 0 ? this.GetGUID() : _c;
        console.log(type + "_" + children + "_0_0_" + id);
        return type + "_" + children + "_0_0_" + id;
    };
    /**
     * @description: 生成组件id
     * @param component
     * @param id
     */
    OperationId.generateComponentId = function (component, id) {
        var lastId = id ? id : OperationId.GetGUID();
        return component + "_" + lastId;
    };
    /**
     * @description: 对实体ID进行解码
     * @param {string} id
     * @return {*}
     */
    OperationId.DecodeEntityId = function (id) {
        var ids = id.split('_');
        var result = {
            type: '',
            children: '',
            id: ''
        };
        if (ids.length === 5) {
            Object.assign(result, {
                type: ids[0],
                children: ids[1],
                id: ids[4]
            });
        }
        return result;
    };
    return OperationId;
}());
export default OperationId;
