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
 * @Author: duhu
 * @Description: 绘制线
 * @Date: 2021-03-06 23:24:36
 * @LastEditTime: 2021-03-07 02:19:33
 * @FilePath: \ts-cesium\src\plugin\lib\graph\Polyline.ts
 */
import { Primitive, GeometryInstance, PolylineGeometry, ColorGeometryInstanceAttribute, PolylineColorAppearance, Cartesian3 } from "cesium";
import Base from "./Base";
var Polyline = /** @class */ (function (_super) {
    __extends(Polyline, _super);
    function Polyline(map, opts) {
        var _this = _super.call(this, map, "Polyline" /* Polyline */) || this;
        !!opts && _this.drawPolyline(opts);
        return _this;
    }
    // 绘制线
    Polyline.prototype.drawPolyline = function (_a) {
        var id = _a.id, coord = _a.coord, _b = _a.width, width = _b === void 0 ? 5.0 : _b, color = _a.color;
        var polyline = new GeometryInstance({
            geometry: new PolylineGeometry({
                positions: Cartesian3.fromDegreesArray(coord),
                width: width,
                vertexFormat: PolylineColorAppearance.VERTEX_FORMAT
            }),
            // id: OperationId.EncodeEntityId({ type: EntityType.Polyline, id }),
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            }
        });
        var polylineGeometry = new Primitive({
            geometryInstances: polyline,
            appearance: new PolylineColorAppearance()
        });
        _super.prototype.resolve.call(this, 'polyline', polylineGeometry);
    };
    return Polyline;
}(Base));
export default Polyline;
