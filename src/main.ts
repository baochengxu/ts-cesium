/*
 * @Author: your name
 * @Date: 2021-02-01 22:54:24
 * @LastEditTime: 2021-02-08 17:28:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'cesium/Build/Cesium/Widgets/widgets.css'
createApp(App).use(store).use(router).mount('#app')
