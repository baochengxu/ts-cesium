/*
 * @Author: wuyue
 * @Date: 2021-01-12 20:50:05
 * @LastEditTime: 2021-01-24 00:57:37
 * @LastEditors: wuyue
 * @Description: 算法
 */

import { Cartographic, Rectangle } from 'cesium'

export default class Algorithm {
  /**
   * @description: 方向
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} x3
   * @param {number} y3
   * @return {*}
   */
  static directionV3(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    return x1 * y3 + x2 * y1 + x3 * y2 - x1 * y2 - x2 * y3 - x3 * y1
  }

  /**
   * @description: 判断点是否在矩形中
   * @param {Cartographic} point 点
   * @param {Rectangle} rectangle 矩形
   * @return {*}
   */
  static checkPointInRectangle(point: Cartographic, rectangle: Rectangle) {
    return point.longitude >= rectangle.west && point.latitude <= rectangle.east && point.latitude >= rectangle.north && point.latitude <= rectangle.south
  }

  /**
   * @description: 判断两条线段是否相交
   * @param {*}
   * @return {*}
   */
  static checkPolylineIntersectPolyline(
    line1: {
      startPoint: Cartographic
      endPoint: Cartographic
    },
    line2: {
      startPoint: Cartographic
      endPoint: Cartographic
    }
  ) {
    const x1 = line1.startPoint.longitude
    const y1 = line1.startPoint.latitude
    const x2 = line1.endPoint.longitude
    const y2 = line1.endPoint.latitude
    const x3 = line2.startPoint.longitude
    const y3 = line2.startPoint.latitude
    const x4 = line2.endPoint.longitude
    const y4 = line2.endPoint.latitude
    // 依据:两条线段不相交,必定是存在其中一条线段的两端点在在另一条线段所在直线的同側.所以要分别考虑两种情况.
    if (this.directionV3(x1, y1, x2, y2, x3, y3) * this.directionV3(x1, y1, x2, y2, x4, y4) > 0) {
      // 一条线段的两点全在另一条线段的同一側
      return false
    }
    if (this.directionV3(x3, y3, x4, y4, x1, y1) * this.directionV3(x3, y3, x4, y4, x2, y2) > 0) {
      return false
    }
    return true
  }

  /**
   * @description: 判断线段是否和矩形相交
   * @param {Cartographic} points 线段的节点
   * @param {Rectangle} rect 矩形
   * @return {*}
   */
  static checkPolylineIntersectRectangle(points: Cartographic[], rect: Rectangle) {
    let checked = false
    if (points.length < 2) {
      return false
    }
    const p1 = new Cartographic(rect.west, rect.north)
    const p2 = new Cartographic(rect.east, rect.north)
    const p3 = new Cartographic(rect.east, rect.south)
    const p4 = new Cartographic(rect.west, rect.south)
    for (let i = 0; i < points.length - 1; i++) {
      const startPoint = points[i]
      const endPoint = points[i + 1]
      checked = this.checkPointInRectangle(startPoint, rect) // 起点是否在矩形内
      if (checked) break
      checked = this.checkPointInRectangle(endPoint, rect) // 终点是否在矩形内
      if (checked) break
      checked = this.checkPolylineIntersectPolyline({ startPoint, endPoint }, { startPoint: p1, endPoint: p2 }) // 与矩形的第1条线段相比较
      if (checked) break
      checked = this.checkPolylineIntersectPolyline({ startPoint, endPoint }, { startPoint: p2, endPoint: p3 }) // 与矩形的第2条线段相比较
      if (checked) break
      checked = this.checkPolylineIntersectPolyline({ startPoint, endPoint }, { startPoint: p3, endPoint: p4 }) // 与矩形的第3条线段相比较
      if (checked) break
      checked = this.checkPolylineIntersectPolyline({ startPoint, endPoint }, { startPoint: p4, endPoint: p1 }) // 与矩形的第4条线段相比较
      if (checked) break
    }
    return checked
  }

  /**
   * @description: 计算两点间的距离
   * @param {number} latitude1
   * @param {number} longitude1
   * @param {number} latitude2
   * @param {number} longitude2
   * @return {*}
   */
  static calcFlatternDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number) {
    const EARTH_RADIUS = 6378137.0 // 单位M
    const PI = Math.PI

    function getRad(d: number) {
      return (d * PI) / 180.0
    }
    const f = getRad((latitude1 + latitude2) / 2)
    const g = getRad((latitude1 - latitude2) / 2)
    const l = getRad((longitude1 - longitude2) / 2)

    let sg = window.Math.sin(g)
    let sl = window.Math.sin(l)
    let sf = window.Math.sin(f)

    const a = EARTH_RADIUS
    const fl = 1 / 298.257

    sg = sg * sg
    sl = sl * sl
    sf = sf * sf

    const s = sg * (1 - sl) + (1 - sf) * sl
    const c = (1 - sg) * (1 - sl) + sf * sl

    const w = window.Math.atan(window.Math.sqrt(s / c))
    const r = window.Math.sqrt(s * c) / w
    const d = 2 * w * a
    const h1 = (3 * r - 1) / 2 / c
    const h2 = (3 * r + 1) / 2 / s

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
  }

  /**
   * @description: 根据经纬度，距离，角度计算另外一个点
   * @param {number} latitude 纬度
   * @param {number} longitude 经度
   * @param {number} distance 距离
   * @param {number} angle 角度
   * @return {*}
   */
  static calcCoordinateByCoordinateDistanceAngle(latitude: number, longitude: number, distance: number, angle: number) {
    const ea = 6378137 //   赤道半径
    const eb = 6356725 //   极半径
    const dx = distance * Math.sin((angle * Math.PI) / 180)
    const dy = distance * Math.cos((angle * Math.PI) / 180)
    const ec = eb + ((ea - eb) * (90 - latitude)) / 90
    const ed = ec * Math.cos((latitude * Math.PI) / 180)
    const lon = ((dx / ed + (longitude * Math.PI) / 180) * 180) / Math.PI
    const lat = ((dy / ec + (latitude * Math.PI) / 180) * 180) / Math.PI

    return [lon, lat]
  }
}
