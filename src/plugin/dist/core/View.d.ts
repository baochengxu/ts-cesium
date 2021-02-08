import { Camera, Scene } from "cesium";
import { ViewProps } from './index';
export default class View {
    private viewer;
    scene: Scene;
    camera: Camera;
    private container;
    constructor(props: ViewProps);
    destroyParts(): void;
}
