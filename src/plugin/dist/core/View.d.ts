import { Camera, Scene, ImageryProvider, ImageryLayer, TerrainProvider } from "cesium";
import { ViewProps } from './index';
export default class View {
    private viewer;
    scene: Scene;
    camera: Camera;
    private logo;
    container: HTMLElement;
    animation: HTMLElement | undefined;
    timeline: HTMLElement | undefined;
    private entitys?;
    constructor(props: ViewProps);
    /**
     * @description：地图默认设置
     */
    private defaultSetting;
    /**
     * @description: 移动相机到默认位置
     * @param {*}
     * @return {*}
     */
    flyToDefaultLocation(): void;
    /**
     * @description: 设置地图影像层
     * @param {ImageryProvider} provider 地图影像层
     * @return {*}
     */
    addImageryProvider(provider: ImageryProvider): void;
    /**
     * @description: 移除地图影像层
     * @param {ImageryLayer} layer
     * @return {*}
     */
    removeImageryProvider(layer?: ImageryLayer): void;
    destroyParts(): void;
    /**
   * @description: 设置鼠标在地图上的样式
   * @param {string} cursor
   * @return {*}
   */
    setMouseStyle(cursor: string): void;
    /**
   * @description: 设置地球图层
   * @param {ImageryProvider} layer
   * @return {*}
   */
    setImagery: (layer?: ImageryProvider | undefined, isRemove?: boolean) => void;
    /**
     * @description: 开启地形深度测试
     * @param {*}
     * @return {*}
     */
    private openDepthTestAgainstTerrain;
    /**
     * @description: 关闭地形深度测试
     * @param {*}
     * @return {*}
     */
    private closeDepthTestAgainstTerrain;
    /**
     * @description: 设置地形
     * @param {TerrainProvider} terrainProvider
     * @return {*}
     */
    setTerrain: (terrainProvider: TerrainProvider) => void;
    /** ------------------------------功能api----------------------------------- */
    /**
     * @description: 切换地图模式
     * @param {*} model
     * @return {*}
     */
    switchMapModel(model: '2D' | '3D' | 'ColumbusView', duration?: number): void;
}
