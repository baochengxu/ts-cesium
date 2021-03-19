import { Viewer, Ion, Rectangle } from "cesium";
import { Point, Rect, Circle, Billboard, Label, Polyline, Polygon } from '../graph';
// type geoType = keyof Entitys
var View = /** @class */ (function () {
    function View(props) {
        var _this = this;
        var _a, _b;
        /**
       * @description: 设置地球图层
       * @param {ImageryProvider} layer
       * @return {*}
       */
        this.setImagery = function (layer, isRemove) {
            if (isRemove === void 0) { isRemove = true; }
            if (layer) {
                isRemove && _this.viewer.imageryLayers.remove(_this.viewer.imageryLayers.get(0));
                var imageryLayer = _this.viewer.imageryLayers.addImageryProvider(layer);
                _this.viewer.flyTo(imageryLayer);
            }
        };
        /**
         * @description: 设置地形
         * @param {TerrainProvider} terrainProvider
         * @return {*}
         */
        this.setTerrain = function (terrainProvider) {
            _this.viewer.terrainProvider = terrainProvider;
            _this.openDepthTestAgainstTerrain();
        };
        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNGQ4OTdhMC0zMjAwLTRkYzMtYTZlMi03YTljM2JiMDBhZDkiLCJpZCI6NDMxNzcsImlhdCI6MTYxMjI4NDk0OX0.BkbalpDSkjTNl4DD3g4vhnf7L53C4gTXMaTf98e5Psk';
        this.viewer = new Viewer(props.el, props.options);
        this.scene = this.viewer.scene;
        this.camera = this.viewer.camera;
        this.logo = this.viewer.cesiumWidget.creditContainer;
        this.container = this.viewer.container;
        if (props.options.animation && props.options.timeline) {
            this.animation = (_a = this.viewer.animation) === null || _a === void 0 ? void 0 : _a.container;
            this.timeline = (_b = this.viewer.timeline) === null || _b === void 0 ? void 0 : _b.container;
        }
        this.defaultSetting();
        this._createGraph();
    }
    /**
     * @description：地图默认设置
     */
    View.prototype.defaultSetting = function () {
        this.logo.style.display = "none";
        this.animation && (this.animation.style.visibility = 'hidden');
        this.timeline && (this.timeline.style.visibility = 'hidden');
        this.flyToDefaultLocation();
    };
    /**
     * @description: 创建图形
     * @param {*}
     * @return {*}
     */
    View.prototype._createGraph = function () {
        this.entitys = {
            Rect: new Rect(this),
            Circle: new Circle(this),
            Polygon: new Polygon(this),
            Polyline: new Polyline(this),
            Point: new Point(this),
            Label: new Label(this),
            Billboard: new Billboard(this)
        };
    };
    /**
     * @description: 获取对应图形
     * @param {*}
     * @return {*}
     */
    View.prototype.getGraph = function () {
        return this.entitys;
    };
    // getGraphByType(type: keyof Entitys): Entitys[keyof Entitys] {
    //     return this.entitys[type]
    // }
    /**
     * @description: 移动相机到默认位置
     * @param {*}
     * @return {*}
     */
    View.prototype.flyToDefaultLocation = function () {
        var west = 72.004;
        var south = 0.8293;
        var east = 137.8347;
        var north = 55.8271;
        var rectangle = Rectangle.fromDegrees(west, south, east, north);
        this.viewer.camera.flyTo({ destination: rectangle, duration: 1 });
    };
    /**
     * @description: 设置地图影像层
     * @param {ImageryProvider} provider 地图影像层
     * @return {*}
     */
    View.prototype.addImageryProvider = function (provider) {
        this.viewer.imageryLayers.addImageryProvider(provider);
    };
    /**
     * @description: 移除地图影像层
     * @param {ImageryLayer} layer
     * @return {*}
     */
    View.prototype.removeImageryProvider = function (layer) {
        if (layer) {
            this.viewer.imageryLayers.remove(layer);
        }
        else {
            this.viewer.imageryLayers.removeAll();
        }
    };
    // 销毁部件
    View.prototype.destroyParts = function () {
        if (!this.viewer.isDestroyed()) {
            this.viewer.destroy();
        }
    };
    /**
     * @description: 开启地形深度测试
     * @param {*}
     * @return {*}
     */
    View.prototype.openDepthTestAgainstTerrain = function () {
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
    };
    /**
     * @description: 关闭地形深度测试
     * @param {*}
     * @return {*}
     */
    View.prototype.closeDepthTestAgainstTerrain = function () {
        this.viewer.scene.globe.depthTestAgainstTerrain = false;
    };
    /**
     * @description: 显示每秒帧数
     * @param {*}
     * @return {*}
     */
    View.prototype.showFrames = function () {
        this.viewer.scene.debugShowFramesPerSecond = true;
    };
    /** ------------------------------功能api----------------------------------- */
    /**
     * @description: 切换地图模式
     * @param {*} model
     * @return {*}
     */
    View.prototype.switchMapModel = function (model, duration) {
        if (duration === void 0) { duration = 2; }
        switch (model) {
            case '2D':
                this.viewer.scene.morphTo2D(duration);
                break;
            case '3D':
                this.viewer.scene.morphTo3D(duration);
                break;
            case 'ColumbusView':
                this.viewer.scene.morphToColumbusView(duration);
                break;
        }
    };
    /**
     * @description: 设置鼠标在地图上的样式
     * @param {string} cursor
     * @return {*}
     */
    View.prototype.setMouseStyle = function (cursor) {
        this.container.style.cursor = cursor;
    };
    /**
     * @description:  设置鼠标在地图上的样式为十字准线
     * @param {*}
     * @return {*}
     */
    View.prototype.setMouseStyleToCrosshair = function () {
        this.setMouseStyle('crosshair');
    };
    /**
     * @description: 设置鼠标在地图上的样式为默认
     * @param {*}
     * @return {*}
     */
    View.prototype.setMouseStyleToDefault = function () {
        this.setMouseStyle('default');
    };
    return View;
}());
export default View;
var ViewEcr;
var ViewInstance = function (props) {
    if (!ViewEcr) {
        ViewEcr = new View(props);
    }
    return ViewEcr;
};
