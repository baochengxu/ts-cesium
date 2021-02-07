import { Viewer } from "cesium";
export declare type IData = {
    max: number;
    min: number;
    data: [];
};
export interface ViewProps {
    el: string | Element;
    options: Viewer.ConstructorOptions;
}
