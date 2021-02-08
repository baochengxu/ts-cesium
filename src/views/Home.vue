<!--
 * @Author: your name
 * @Date: 2021-02-01 17:13:11
 * @LastEditTime: 2021-02-08 15:31:26
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
import { defineComponent,onMounted } from 'vue';
import { useMap } from '@/module/useMap'
export default defineComponent({
  name: 'Home',
  setup(){
    onMounted(()=>{
      useMap();
    })
    return {

    }
  }
});
</script>
<style scoped>
#cesium-container{
  height: 820px;
}
</style>