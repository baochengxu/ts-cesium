import { Camera, Scene, Viewer, Ion } from "cesium";

/*
 * @Author: your name
 * @Date:: 2021-02-02 00:04:59
 * @,@LastEditTime: ,: 2021-02-03 00:56:48
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\plugin\lib\core\View.ts
 */
import { ViewProps } from './index'
export default class View {
    // viewer 地球主体
    private viewer: Viewer
    // 场景 表示用于创建不同图形的容器
    public scene: Scene
    // 摄像头 用于确定观察地球位置
    public camera: Camera
    // logo及说明 dom
    private container: HTMLDivElement
    constructor(props: ViewProps) {
        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNGQ4OTdhMC0zMjAwLTRkYzMtYTZlMi03YTljM2JiMDBhZDkiLCJpZCI6NDMxNzcsImlhdCI6MTYxMjI4NDk0OX0.BkbalpDSkjTNl4DD3g4vhnf7L53C4gTXMaTf98e5Psk'
        this.viewer = new Viewer(props.el, props.options)
        this.scene = this.viewer.scene
        this.camera = this.viewer.camera
        this.container = this.viewer.cesiumWidget.creditContainer as HTMLDivElement
        this.container.style.display = "none";
    }
    // 销毁部件
    destroyParts() {
        if (!this.viewer.isDestroyed()) {
            this.viewer.destroy()
        }
    }
}