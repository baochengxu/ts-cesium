/*
 * @Author: your name
 * @Date: 2021-02-08 15:32:28
 * @LastEditTime: 2021-02-08 15:40:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\utils\drag.ts
 */
import { nextTick, reactive, ref, Ref, watch } from 'vue'
export interface IModalPosition {
    top?: number
    bottom?: number
    left?: number
    right?: number
}
export interface IModelProps {
    modalId: string
    visible: boolean
    drag: boolean
    closeButton: boolean
    changeSize: boolean
    width: number
    minWidth: number
    maxHeight: number
    minHeight: number
    position: IModalPosition
}
interface IModalData {
    id: string
    modalStyle: {
        width?: string
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
    modalHeaderStyle: {
        cursor: 'move' | 'defalut'
    }
    modalBodyStyle: {
        minHeight: string
        maxHeight?: string
    }
}

const DefaultValue = {
    leftBlank: 18, // 页面左部留白
    rightBlank: 18, // 页面右部留白
    topBlank: 102, // 页面顶部留白
    bottomBlank: 19, // 页面底部留白
    zIndex: 1000 // 弹窗层级
}
/**
 * @description: 设置弹窗层级
 * @param {Ref} containerRef
 * @return {*}
 */
export const setZIndex = (containerRef: Ref<HTMLElement | null>) => {
    if (containerRef.value) {
        containerRef.value.style.zIndex = (++DefaultValue.zIndex).toString()
    }
}
/**
 * @description: 设置弹窗拖动事件
 * @param {*}
 * @return {*}
 */
export const setDrag = (containerRef: Ref<HTMLDivElement | null>) => {
    nextTick(() => {
        if (containerRef.value) {
            let deviationX = 0 // X轴偏移量
            let deviationY = 0 // Y轴偏移量
            let deviationXcache = 0 // X轴偏移量缓存
            let deviationYcache = 0 // Y轴偏移量缓存
            const elHeader = containerRef.value.querySelector('.common-modal-header') as HTMLDivElement

            const handleMouseMove = (event: MouseEvent) => {
                if (containerRef.value) {
                    let left = parseFloat(containerRef.value.style.left)
                    let top = parseFloat(containerRef.value.style.top)
                    const clientHeight = containerRef.value.clientHeight
                    const clientWidth = containerRef.value.clientWidth
                    const winWidth = window.innerWidth
                    const winHeight = window.innerHeight

                    if (isNaN(left)) left = winWidth - parseFloat(containerRef.value.style.right) - clientWidth
                    if (isNaN(top)) top = winHeight - parseFloat(containerRef.value.style.bottom) - clientHeight

                    deviationXcache += event.movementX
                    deviationYcache += event.movementY
                    if (top + deviationYcache > DefaultValue.topBlank) {
                        if (deviationYcache + top + clientHeight + DefaultValue.bottomBlank <= winHeight) {
                            deviationY = deviationYcache
                        } else {
                            deviationY = winHeight - clientHeight - top - DefaultValue.bottomBlank
                        }
                    } else {
                        deviationY = -(top - DefaultValue.topBlank)
                    }
                    if (left + deviationXcache >= DefaultValue.leftBlank) {
                        if (deviationXcache + left + clientWidth + DefaultValue.rightBlank <= winWidth) {
                            deviationX = deviationXcache
                        } else {
                            deviationX = winWidth - clientWidth - left - DefaultValue.rightBlank
                        }
                    } else {
                        deviationX = -left + DefaultValue.leftBlank
                    }
                    containerRef.value.style.transform = `translate(${deviationX}px, ${deviationY}px)`
                }
            }
            const handleMouseLeftUp = () => {
                deviationXcache = deviationX
                deviationYcache = deviationY
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseLeftUp)
            }
            const handleMouseLeftDown = () => {
                setZIndex(containerRef)
                document.addEventListener('mousemove', handleMouseMove)
                document.addEventListener('mouseup', handleMouseLeftUp)
            }
            elHeader.addEventListener('mousedown', handleMouseLeftDown)
        }
    })
}

/**
 * @description: 设置弹窗可以拖动改变大小
 * @param {Ref} containerRef
 * @param {IModelProps} props
 * @return {*}
 */
export const setDragSize = (containerRef: Ref<HTMLElement | null>, props: IModelProps) => {
    nextTick(() => {
        if (containerRef.value) {
            const elBody = containerRef.value.querySelector('.common-modal-body') as HTMLDivElement
            const elDragSize = containerRef.value.querySelector('.common-modal-drag-size') as HTMLDivElement
            let width = props.width
            let height = props.minHeight
            const handleMouseMove = (event: MouseEvent) => {
                if (containerRef.value) {
                    width = width + event.movementX
                    height = height + event.movementY

                    if (containerRef.value) {
                        containerRef.value.style.width = `${Math.max(props.minWidth, width)}px`
                        elBody.style.height = `${Math.max(props.minHeight, height)}px`
                    }
                }
            }
            const handleMouseLeftUp = () => {
                width = Math.max(props.minWidth, width)
                height = Math.max(props.minHeight, height)
                if (props.maxHeight > 0) height = Math.min(height, props.maxHeight)
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseLeftUp)
            }
            const handleMouseLeftDown = () => {
                setZIndex(containerRef)
                document.addEventListener('mousemove', handleMouseMove)
                document.addEventListener('mouseup', handleMouseLeftUp)
            }
            elDragSize.addEventListener('mousedown', handleMouseLeftDown)
        }
    })
}