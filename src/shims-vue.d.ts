/*
 * @Author: your name
 * @Date: 2021-02-01 17:13:11
 * @LastEditTime: 2021-02-08 17:21:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesuim\src\shims-vue.d.ts
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "*.json" {
  const value: any;
  export default value;
}
// declare module 'cesium' {
//   export * from 'cesium'
// }
declare module 'ol' {
  export * from 'ol'
}