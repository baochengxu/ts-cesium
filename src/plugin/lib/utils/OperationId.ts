/*
 * @Author: wuyue
 * @Date: 2021-01-11 17:01:24
 * @LastEditTime: 2021-03-07 02:06:07
 * @LastEditors: Please set LastEditors
 * @Description: 工具类
 */

import { EntityType } from '../ast'

export default class OperationId {
  /**
   * @description: 获取一个新的GUID
   * @param {*} OperationId
   * @return {*}
   */
  static GetGUID() {
    const gen = (count: number) => {
      let out = ''
      for (let i = 0; i < count; i++) {
        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return out
    }
    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-')
  }

  /**
   * @description: 对实体ID进行编码
   * @param {string} type 实体类型
   * @param {string} id
   * @return {*} 格式:'Type_ChildrenType_占位_占位_ID'
   */
  static EncodeEntityId({ type, children = '', id = this.GetGUID() }: { type: EntityType; children?: EntityType | ''; id: string | number }) {
    console.log(`${type}_${children}_0_0_${id}`);
    return `${type}_${children}_0_0_${id}`
  }
  /**
   * @description: 生成组件id
   * @param component 
   * @param id 
   */
  static generateComponentId(component: string, id: string) {
    const lastId = id ? id : OperationId.GetGUID()
    return `${component}_${lastId}`
  }

  /**
   * @description: 对实体ID进行解码
   * @param {string} id
   * @return {*}
   */
  static DecodeEntityId(id: string) {
    const ids = id.split('_')
    const result = {
      type: '',
      children: '',
      id: ''
    }
    if (ids.length === 5) {
      Object.assign(result, {
        type: ids[0],
        children: ids[1],
        id: ids[4]
      })
    }
    return result
  }
}
