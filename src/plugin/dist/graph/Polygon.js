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
import { Primitive, GeometryInstance, ColorGeometryInstanceAttribute, Cartesian3, PerInstanceColorAppearance, PolygonGeometry } from "cesium";
import Base from "./Base";
import { OperationId } from "../utils";
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(map, opts) {
        var _this = _super.call(this, map, "Polygon" /* Polygon */) || this;
        !!opts && _this.drawPolygon(opts);
        return _this;
    }
    // 绘制几何面
    Polygon.prototype.drawPolygon = function (_a) {
        var id = _a.id, coord = _a.coord, color = _a.color;
        var polygon = new GeometryInstance({
            geometry: PolygonGeometry.fromPositions({
                positions: Cartesian3.fromDegreesArray(coord),
                vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT
            }),
            id: OperationId.EncodeEntityId({ type: "Polygon" /* Polygon */, id: id }),
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            }
        });
        var polygonGeometry = new Primitive({
            geometryInstances: polygon,
            appearance: new PerInstanceColorAppearance({
                closed: false,
                translucent: false
            })
        });
        _super.prototype.resolve.call(this, 'polygon', polygonGeometry);
    };
    return Polygon;
}(Base));
export default Polygon;
