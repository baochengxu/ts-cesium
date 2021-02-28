<!--
 * @Author: your name
 * @Date: 2021-02-01 17:13:11
 * @LastEditTime: 2021-02-19 23:15:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesuim\src\views\Home.vue
-->
<template>
  <div class="home">
    <div id="cesium-container"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useMap } from "@/module/useMap";
import { Circle, Rect } from "@/plugin/dist";
import { Color } from "cesium";
export default defineComponent({
  name: "Home",
  setup() {
    onMounted(() => {
      let map = useMap();
      let circle = new Circle(map);
      let rect = new Rect(map);
      let opts = { lat: 95.0, lon: 43.0, radius: 250000, color: Color.BLUE };
      let rectOpts = {
        west: 120.0,
        south: 30.0,
        east: 130.0,
        north: 40.0,
        color: Color.RED,
      };
      circle.drawCircle(opts);
      rect.drawRect(rectOpts);
      // console.log(circle);
    });
    return {};
  },
});
</script>
<style scoped>
#cesium-container {
  height: 720px;
}
</style>