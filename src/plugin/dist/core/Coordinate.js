/*
 * @Author: wuyue
 * @Date: 2020-12-30 18:53:17
 * @LastEditTime: 2021-02-08 17:04:51
 * @LastEditors: Please set LastEditors
 * @Description: 坐标操作类
 */
import { Cartesian3, Cartographic, Cesium3DTileFeature, defined, Ellipsoid, Math, SceneMode, SceneTransforms, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
var Coordinate = /** @class */ (function () {
    /**
     * @description: 坐标操作构造函数
     * @param {Viewer} viewer Cesium Viewer
     * @return {*}
     */
    function Coordinate(map) {
        this.map = map;
        this.ellipsoid = this.map.scene.globe.ellipsoid;
    }
    /**
     * @description: 鼠标实时获取经纬度坐标
     * @param {function} callback 回调函数
     * @param {*} realtime 是否实时 (true: 实时(鼠标移动实时获取); false: 非实时(鼠标单击获取))
     * @return {*}
     */
    Coordinate.prototype.rigisterCoordinate = function (callback, realtime) {
        var _this = this;
        if (realtime === void 0) { realtime = true; }
        this.handler = new ScreenSpaceEventHandler(this.map.viewer.scene.canvas);
        var eventType;
        if (realtime) {
            eventType = ScreenSpaceEventType.MOUSE_MOVE;
        }
        else {
            eventType = ScreenSpaceEventType.LEFT_CLICK;
            this.map.container.style.cursor = 'crosshair';
        }
        return this.handler.setInputAction(function (e) {
            var cartesian = _this.piScreen(e.endPosition || e.position);
            if (cartesian) {
                // 苗卡尔椭球体的三维坐标 转 地图坐标（弧度）
                var cartographic = _this.map.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                // 地图坐标（弧度） 转 十进制度数 toFixed保留小数点后几位
                var longitude = Math.toDegrees(cartographic.longitude).toFixed(8); // 经度
                var latitude = Math.toDegrees(cartographic.latitude).toFixed(8); // 纬度
                // const altString = (this.viewer.camera.positionCartographic.height / 1000).toFixed(2) // 视角高
                var height = _this.map.viewer.scene.globe.getHeight(cartographic) || 0; // .toFixed(4) // 海拔
                var data = { longitude: longitude, latitude: latitude, height: height };
                callback(data);
                if (!realtime) {
                    _this.map.container.style.cursor = 'default';
                }
            }
        }, eventType);
    };
    /**
     * @description: 销毁实时获取经纬度事件
     * @param {*}
     * @return {*}
     */
    Coordinate.prototype.distoryCoordinate = function () {
        this.handler && this.handler.destroy();
        this.handler = undefined;
    };
    /**
     * @description: 二维坐标，获取椭球体表面的经纬度坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    Coordinate.prototype.pickEllipsoid = function (position) {
        var cartesian = this.map.camera.pickEllipsoid(position, this.ellipsoid);
        if (!cartesian) {
            return false;
        }
        var cartographic = Cartographic.fromCartesian(cartesian);
        var lng = Math.toDegrees(cartographic.longitude); // 经度值
        var lat = Math.toDegrees(cartographic.latitude); // 纬度值
        return new Cartesian3(lng, lat, cartographic.height); // cartographic.height的值始终为零。
    };
    /**
     * @description: 三维坐标，获取地形表面的经纬度高程坐标：
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    Coordinate.prototype.pickRay = function (position) {
        var cartesian = this.screenToWorld(position);
        if (cartesian) {
            var cartographic = Cartographic.fromCartesian(cartesian);
            var lng = Math.toDegrees(cartographic.longitude); // 经度值
            var lat = Math.toDegrees(cartographic.latitude); // 纬度值
            // height结果与cartographic.height相差无几，注意：cartographic.height可以为0，也就是说，可以根据经纬度计算出高程。
            var height = this.map.scene.globe.getHeight(cartographic);
            return new Cartesian3(lng, lat, height); // height的值为地形高度。
        }
    };
    /**
     * @description: 三维坐标，获取模型表面的经纬度高程坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    Coordinate.prototype.pick = function (position) {
        if (this.map.scene.mode !== SceneMode.MORPHING) {
            var pickedObject = this.map.scene.pick(position);
            if (this.map.scene.pickPositionSupported && defined(pickedObject) && pickedObject.node) {
                var cartesian = this.map.scene.pickPosition(position);
                if (defined(cartesian)) {
                    var cartographic = Cartographic.fromCartesian(cartesian);
                    var lng = Math.toDegrees(cartographic.longitude);
                    var lat = Math.toDegrees(cartographic.latitude);
                    var height = cartographic.height; // 模型高度
                    return new Cartesian3(lng, lat, height);
                }
            }
        }
    };
    /**
     * @description: 拾取对象
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    Coordinate.prototype.piObj = function (position) {
        return this.map.scene.pick(position);
    };
    /**
     * @description: 拾取屏幕坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    Coordinate.prototype.piScreen = function (position) {
        return this.map.camera.pickEllipsoid(position, this.ellipsoid);
    };
    /**
     * @description: 将提供的笛卡尔坐标转换为制图表达。笛卡尔在椭球的中心是不确定的
     * @param {Cartesian3} positions 笛卡尔坐标
     * @return {*}
     */
    Coordinate.prototype.piEllipsoid = function (positions) {
        return this.ellipsoid.cartesianToCartographic(positions);
    };
    /**
     * @description: 判断坐标 判断地形和模型并返回相应坐标
     * @param {Cartesian2} position 屏幕坐标
     * @param {'Cartographic' | 'Cartesian3'} type
     * @return {*}
     */
    Coordinate.prototype.piTerrainToModule = function (position, type) {
        if (type === void 0) { type = 'Cartesian3'; }
        var world = this.screenToWorld(position);
        if (world === undefined) {
            return false;
        }
        var lon;
        var lat;
        var height;
        var feature = this.piObj(position);
        if (feature === undefined) {
            var WGS84 = Ellipsoid.WGS84.cartesianToCartographic(world);
            if (WGS84 === undefined)
                return false;
            lon = Math.toDegrees(WGS84.longitude);
            lat = Math.toDegrees(WGS84.latitude);
            height = WGS84.height;
        }
        if (feature !== undefined) {
            if (feature instanceof Cesium3DTileFeature) {
                // 3dtiles
                var cartesian = this.map.scene.pickPosition(position);
                if (cartesian === undefined)
                    return false;
                if (defined(cartesian)) {
                    var cartographic = Cartographic.fromCartesian(cartesian);
                    if (cartographic.height < 0)
                        return false;
                    lon = Math.toDegrees(cartographic.longitude);
                    lat = Math.toDegrees(cartographic.latitude);
                    height = cartographic.height; // 模型高度
                }
            }
            if (feature.id !== undefined) {
                var cartesian = this.map.scene.pickPosition(position);
                if (cartesian === undefined)
                    return false;
                if (defined(cartesian)) {
                    var cartographic = Cartographic.fromCartesian(cartesian);
                    if (cartographic.height < 0)
                        return false;
                    lon = Math.toDegrees(cartographic.longitude);
                    lat = Math.toDegrees(cartographic.latitude);
                    height = cartographic.height; // 模型高度
                }
            }
        }
        // 判断是否有值
        if (lon === undefined || lat === undefined)
            return false;
        var result;
        if (type === 'Cartographic') {
            result = new Cartographic(lon, lat, height);
        }
        else {
            result = Cartesian3.fromDegrees(lon, lat, height);
        }
        return result;
    };
    /**
     * @description: 屏幕高程坐标转经纬度坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    Coordinate.prototype.screenToLonlat = function (position) {
        var cartesian = this.screenToWorld(position);
        if (!cartesian)
            return;
        var cartographic = Cartographic.fromCartesian(cartesian);
        var longitude = Math.toDegrees(cartographic.longitude);
        var latitude = Math.toDegrees(cartographic.latitude);
        var height = this.map.scene.globe.getHeight(cartographic);
        return new Cartographic(longitude, latitude, height);
    };
    /**
     * @description: 经纬度转换为世界坐标
     * @param {Cartographic} position 经纬度坐标
     * @return {*}
     */
    Coordinate.prototype.lonlatToWorld = function (position) {
        return Cartesian3.fromDegrees(position.longitude, position.latitude, position.height, this.ellipsoid);
    };
    /**
     * @description: 世界坐标转换为经纬度
     * @param {Cartesian3} position 笛卡尔坐标
     * @return {*}
     */
    Coordinate.prototype.worldToLonlat = function (position) {
        var cartographic = this.ellipsoid.cartesianToCartographic(position);
        var longitude = Math.toDegrees(cartographic.longitude);
        var latitude = Math.toDegrees(cartographic.latitude);
        var height = cartographic.height;
        return new Cartographic(longitude, latitude, height);
    };
    /**
     * @description: 经度转弧度
     * @param {number} degrees 经度转坐标
     * @return {*}
     */
    Coordinate.prototype.latToRadian = function (degrees) {
        return Math.toRadians(degrees);
    };
    /**
     * @description: 弧度转经度
     * @param {number} radians 弧度
     * @return {*}
     */
    Coordinate.prototype.radianToLat = function (radians) {
        return Math.toDegrees(radians);
    };
    /**
     * @description: 屏幕坐标转世界坐标
     * @param {Cartesian2} position 屏幕坐标
     * @return {*}
     */
    Coordinate.prototype.screenToWorld = function (position) {
        return this.map.scene.globe.pick(this.map.camera.getPickRay(position), this.map.scene);
    };
    /**
     * @description: 世界坐标转屏幕坐标
     * @param {Cartesian3} cartesian 世界坐标
     * @return {*}
     */
    Coordinate.prototype.worldToScreen = function (cartesian) {
        return SceneTransforms.wgs84ToWindowCoordinates(this.map.scene, cartesian);
    };
    /**
     * @description: 世界坐标转地理坐标(经纬度)
     * @param {Cartesian3} world 世界坐标
     * @return {*}
     */
    Coordinate.prototype.worldToGeom = function (world) {
        var cartesian = this.ellipsoid.cartesianToCartographic(world);
        return [Math.toDegrees(cartesian.longitude), Math.toDegrees(cartesian.latitude)];
    };
    /**
     * @description: 批量转坐标
     * @param {*} type
     * @param {Cartesian3} datas
     * @return {*}
     */
    Coordinate.prototype.convert = function (type, datas) {
        var _this = this;
        var result = [];
        switch (type) {
            case 'Cartesian3':
                result = datas;
                break;
            case 'Cartographic':
                datas.forEach(function (data) {
                    result.push(_this.worldToLonlat(data));
                });
                break;
            case 'number':
                datas.forEach(function (data) {
                    var lonlat = _this.worldToLonlat(data);
                    result.push.apply(result, [lonlat.longitude, lonlat.latitude]);
                });
                break;
        }
        return result;
    };
    /**
     * @description: 地理坐标(经纬度)转世界坐标
     * @param {[number, number]} geom [经度, 纬度]
     * @return {*}
     */
    Coordinate.prototype.geomToWorld = function (geom) {
        return Cartesian3.fromDegrees(geom[0], geom[1]);
    };
    /**
     * @description: 判断是否在国内，不在国内则不做偏移
     * @param {number} longitude 经度
     * @param {number} latitude 纬度
     * @return {boolean}
     */
    Coordinate.prototype.outOfChina = function (longitude, latitude) {
        return longitude < 72.004 || longitude > 137.8347 || latitude < 0.8293 || latitude > 55.8271 || false;
    };
    return Coordinate;
}());
export default Coordinate;
