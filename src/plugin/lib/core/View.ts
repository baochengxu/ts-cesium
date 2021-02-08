import { Camera, Scene, Viewer, Ion, Rectangle, ImageryProvider, ImageryLayer, TerrainProvider } from "cesium";

/*
 * @Author: your name
 * @Date:: 2021-02-02 00:04:59
 * @LastEditTime: 2021-02-08 17:11:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\plugin\lib\core\View.ts
 */
import { ViewProps } from './index'
export default class View {
    // viewer 地球主体
    public viewer: Viewer
    // 场景 表示用于创建不同图形的容器
    public scene: Scene
    // 摄像头 用于确定观察地球位置
    public camera: Camera
    // logo及说明 dom
    private logo: HTMLDivElement
    // 地球控件
    public container: HTMLElement
    // 时间控件
    public animation: HTMLElement | undefined
    // 时间轴控件
    public timeline: HTMLElement | undefined
    // 图形成员对象
    private entitys?: {
        // point: Point
        // polyline: Polyline
        // rect: Rect
        // polygon: Polygon
        // circle: Circle
        // billboard: Billboard
    }
    constructor(props: ViewProps) {
        // Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNGQ4OTdhMC0zMjAwLTRkYzMtYTZlMi03YTljM2JiMDBhZDkiLCJpZCI6NDMxNzcsImlhdCI6MTYxMjI4NDk0OX0.BkbalpDSkjTNl4DD3g4vhnf7L53C4gTXMaTf98e5Psk'
        this.viewer = new Viewer(props.el, props.options)
        this.scene = this.viewer.scene
        this.camera = this.viewer.camera
        this.logo = this.viewer.cesiumWidget.creditContainer as HTMLDivElement
        this.container = this.viewer.container as HTMLDivElement
        if (props.options.animation && props.options.timeline) {
            this.animation = this.viewer.animation?.container as HTMLElement
            this.timeline = this.viewer.timeline?.container as HTMLElement
        }
        this.defaultSetting()
    }
    /**
     * @description：地图默认设置
     */
    private defaultSetting() {
        this.logo.style.display = "none";
        this.animation && (this.animation.style.visibility = 'hidden')
        this.timeline && (this.timeline.style.visibility = 'hidden')
        this.flyToDefaultLocation()
    }
    /**
     * @description: 移动相机到默认位置
     * @param {*}
     * @return {*}
     */
    flyToDefaultLocation() {
        const west = 72.004
        const south = 0.8293
        const east = 137.8347
        const north = 55.8271
        const rectangle = Rectangle.fromDegrees(west, south, east, north)
        this.viewer.camera.flyTo({ destination: rectangle, duration: 1 })
    }
    /**
     * @description: 设置地图影像层
     * @param {ImageryProvider} provider 地图影像层
     * @return {*}
     */
    addImageryProvider(provider: ImageryProvider) {
        this.viewer.imageryLayers.addImageryProvider(provider)
    }

    /**
     * @description: 移除地图影像层
     * @param {ImageryLayer} layer
     * @return {*}
     */
    removeImageryProvider(layer?: ImageryLayer) {
        if (layer) {
            this.viewer.imageryLayers.remove(layer)
        } else {
            this.viewer.imageryLayers.removeAll()
        }
    }
    // 销毁部件
    destroyParts() {
        if (!this.viewer.isDestroyed()) {
            this.viewer.destroy()
        }
    }
    /**
   * @description: 设置地球图层
   * @param {ImageryProvider} layer
   * @return {*}
   */
    setImagery = (layer?: ImageryProvider, isRemove = true) => {
        if (layer) {
            isRemove && this.viewer.imageryLayers.remove(this.viewer.imageryLayers.get(0))
            const imageryLayer = this.viewer.imageryLayers.addImageryProvider(layer)
            this.viewer.flyTo(imageryLayer)
        }
    }
    /**
     * @description: 开启地形深度测试
     * @param {*}
     * @return {*}
     */
    private openDepthTestAgainstTerrain() {
        this.viewer.scene.globe.depthTestAgainstTerrain = true
    }

    /**
     * @description: 关闭地形深度测试
     * @param {*}
     * @return {*}
     */
    private closeDepthTestAgainstTerrain() {
        this.viewer.scene.globe.depthTestAgainstTerrain = false
    }
    /**
     * @description: 设置地形
     * @param {TerrainProvider} terrainProvider
     * @return {*}
     */
    setTerrain = (terrainProvider: TerrainProvider) => {
        this.viewer.terrainProvider = terrainProvider
        this.openDepthTestAgainstTerrain()
    }
    /**
     * @description: 显示每秒帧数
     * @param {*}
     * @return {*}
     */
    showFrames() {
        this.viewer.scene.debugShowFramesPerSecond = true
    }
    /** ------------------------------功能api----------------------------------- */

    /**
     * @description: 切换地图模式
     * @param {*} model
     * @return {*}
     */
    switchMapModel(model: '2D' | '3D' | 'ColumbusView', duration = 2) {
        switch (model) {
            case '2D':
                this.viewer.scene.morphTo2D(duration)
                break
            case '3D':
                this.viewer.scene.morphTo3D(duration)
                break
            case 'ColumbusView':
                this.viewer.scene.morphToColumbusView(duration)
                break
        }
    }
    /**
     * @description: 设置鼠标在地图上的样式
     * @param {string} cursor
     * @return {*}
     */
    setMouseStyle(cursor: string) {
        this.container.style.cursor = cursor
    }

    /**
     * @description:  设置鼠标在地图上的样式为十字准线
     * @param {*}
     * @return {*}
     */
    setMouseStyleToCrosshair() {
        this.setMouseStyle('crosshair')
    }

    /**
     * @description: 设置鼠标在地图上的样式为默认
     * @param {*}
     * @return {*}
     */
    setMouseStyleToDefault() {
        this.setMouseStyle('default')
    }
    /**
   * @description: 监听全局鼠标移动事件
   * @param {function} callback
   * @return {*}
   */
    // watchGlobalMouseMove(callback: (cartographic: Cartographic, position: Cartesian2) => void) {
    //     this.handler.setInputAction(movement => {
    //         if (typeof callback === 'function') {
    //             const cartographic = this.coordinate.screenToLonlat(movement.endPosition)
    //             if (cartographic) {
    //                 callback.call(this, cartographic, movement.endPosition)
    //             }
    //         }
    //     }, ScreenSpaceEventType.MOUSE_MOVE)
    // }

    /**
     * @description: 监听全局鼠标单击事件
     * @param {function} callback
     * @return {*}
     */
    // watchGlobalMouseClick(callback: (cartographic: Cartographic, position: Cartesian2, pick?: object) => void) {
    //     this.handler.setInputAction(movement => {
    //         if (typeof callback === 'function') {
    //             const pickedObject = this.scene.pick(movement.position)
    //             console.log(pickedObject)
    //             const cartographic = this.coordinate.screenToLonlat(movement.position)
    //             if (cartographic) {
    //                 callback.call(this, cartographic, movement.endPosition, pickedObject)
    //             }
    //         }
    //     }, ScreenSpaceEventType.LEFT_CLICK)
    // }

    /**
     * @description: 移除全局鼠标移动监听事件
     * @param {*}
     * @return {*}
     */
    // removeGlobalMouseMove() {
    //     this.handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
    // }

    /**
     * @description: 移除全局鼠标单击监听事件
     * @param {*}
     * @return {*}
     */
    // removeGlobalMouseClick() {
    //     this.handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
    // }
}
let ViewEcr: View
const ViewInstance = (props: ViewProps) => {
    if (!ViewEcr) {
        ViewEcr = new View(props)
    }
    return ViewEcr
}