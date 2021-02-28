var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        var west = _a.west, south = _a.south, east = _a.east, north = _a.north, color = _a.color;
        var Rect = new GeometryInstance({
            geometry: new RectangleGeometry({
                rectangle: Rectangle.fromDegrees(west, south, east, north),
                vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT
            }),
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            }
        });
        var RectGeometry = new Primitive({
            geometryInstances: Rect,
            appearance: new PerInstanceColorAppearance({
                closed: false
            })
        });
        _super.prototype.resolve.call(this, 'geometry', RectGeometry);
    };
    return Rect;
}(Base));
export default Rect;
