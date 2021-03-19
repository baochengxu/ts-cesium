<!--
 * @Author: your name
 * @Date: 2021-02-01 17:13:11
 * @LastEditTime: 2021-03-07 02:18:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\src\views\Home.vue
-->
<template>
  <div class="home">
    <div id="cesium-container"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useMap, useGraph } from "@/module";
import { Color } from "cesium";
export default defineComponent({
  name: "Home",
  setup() {
    onMounted(() => {
      useMap();
      let { Polyline, Circle, Rect, Polygon } = useGraph();
      let opts = {
        id: 1,
        lat: 95.0,
        lon: 43.0,
        radius: 250000,
        color: Color.BLUE,
      };
      let rectOpts = {
        id: 2,
        west: 120.0,
        south: 30.0,
        east: 130.0,
        north: 40.0,
        color: Color.RED,
      };
      let line = {
        id: 3,
        coord: [-124.0, 40.0, -80.0, 40.0],
        color: Color.YELLOW,
      };
      let polygon = {
        id: 4,
        coord: [
          -115.0,
          37.0,
          -115.0,
          32.0,
          -107.0,
          33.0,
          -102.0,
          31.0,
          -102.0,
          35.0,
        ],
        color: Color.ORANGE,
      };
      Circle.drawCircle(opts);
      Rect.drawRect(rectOpts);
      Polyline.drawPolyline(line);
      // let test = Polyline.getPrimitiveById("polyline");
      Polygon.drawPolygon(polygon);
      setTimeout(() => {
        // console.log(
        //   Polyline.getPrimitiveById("polyline").getGeometryInstanceAttributes(
        //     "Polyline__0_0_3"
        //   )
        // );
        Polyline.setColor("polyline", "Polyline__0_0_3", Color.PINK);
      }, 2000);
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