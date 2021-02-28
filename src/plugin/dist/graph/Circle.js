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
import { Primitive, CircleGeometry, GeometryInstance, Cartesian3, PerInstanceColorAppearance, ColorGeometryInstanceAttribute } from 'cesium';
import Base from './Base';
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(map, opts) {
        var _this = _super.call(this, map, "Circle" /* Circle */) || this;
        !!opts && _this.drawCircle(opts);
        return _this;
    }
    /**
     * @description: 绘制圆形
     * @param {number} lat 经度
     * @param {number} lon 维度
     * @param {number} height 高度
     * @return {*}
     */
    Circle.prototype.drawCircle = function (_a) {
        var lat = _a.lat, lon = _a.lon, height = _a.height, radius = _a.radius, color = _a.color;
        var Circle = new GeometryInstance({
            geometry: new CircleGeometry({
                center: Cartesian3.fromDegrees(lat, lon, height),
                radius: radius,
                vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT
            }),
            attributes: {
                color: ColorGeometryInstanceAttribute.fromColor(color)
            }
        });
        var circleGeometry = new Primitive({
            geometryInstances: Circle,
            appearance: new PerInstanceColorAppearance({
                closed: false
            })
        });
        _super.prototype.resolve.call(this, 'geometry', circleGeometry);
    };
    return Circle;
}(Base));
export default Circle;
