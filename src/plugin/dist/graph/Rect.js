var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * @Author: your name
 * @Date: 2021-02-19 22:30:56
 * @LastEditTime: 2021-03-07 02:07:12
 * @LastEditors: Please set LastEditors
 * @Description: 绘制矩形
 * @FilePath: \ts-cesium\src\plugin\lib\graph\Rect.ts
 */
import { OperationId } from '../index';
import { Primitive, RectangleGeometry, GeometryInstance, Rectangle, PerInstanceColorAppearance, ColorGeometryInstanceAttribute } from 'cesium';
import Base from './Base';
var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(map, opts) {
        var _this = _super.call(this, map, "Rect" /* Rect */) || this;
        !!opts && _this.drawRect(opts);
        return _this;
    }
    Rect.prototype.drawRect = function (_a) {
        var id = _a.id, west = _a.west, south = _a.south, east = _a.east, north = _a.north, color = _a.color;
        var Rect = new GeometryInstance({
            geometry: new RectangleGeometry({
                rectangle: Rectangle.fromDegrees(west, south, east, north),
                vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT
            }),
            id: OperationId.EncodeEntityId({ type: "Rect" /* Rect */, id: id }),
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            },
        });
        var RectGeometry = new Primitive({
            geometryInstances: Rect,
            appearance: new PerInstanceColorAppearance({
                closed: false
            })
        });
        _super.prototype.resolve.call(this, 'rect', RectGeometry);
    };
    return Rect;
}(Base));
export default Rect;
