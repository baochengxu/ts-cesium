/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2021-02-02 23:01:43
 * @LastEditTime: 2021-02-08 14:40:04
 * @LastEditors: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \ts-cesium\src\module\useMap.ts
 */
import { View, ViewProps } from '@/plugin/dist'
let map: View
export const useMap = () => {
    if (!map) {
        map = new View({
            el: 'cesium-container',
            options: {
                homeButton: false,
                timeline: true,
                animation: true,
                navigationHelpButton: false,
                infoBox: false,
                fullscreenButton:false,
                selectionIndicator:false,
                shouldAnimate:false,
                navigationInstructionsInitiallyVisible:false,
                sceneModePicker:false,
                geocoder:false,
                baseLayerPicker:false,
                vrButton:false
            }
        })
    }
    return map
}