<template>
<div class="weather-widget">
  <div class="weather-widget_tab-list">
    <button class="weather-widget_tab-list_item" @click="currentTabComponent = 'CityList'">CityItem List</button>
    <button class="weather-widget_tab-list_item settings" @click="currentTabComponent = 'Settings'"> S </button>
  </div>
  <keep-alive>
    <component v-bind:is="currentTabComponent" />
  </keep-alive>
</div>


</template>
<script lang="ts">

import { defineComponent } from 'vue'
import CityList from '@/components/CityList/Index.vue'
import Settings from '@/components/Settings/Index.vue'
export default defineComponent({
  components: {
    CityList,
    Settings,
  },
  data:()=>{
    return {
      currentTabComponent: "CityList",
      tabsArr:[
        {
          name:'CityList',
          title:'CityItem List',
          class:'weather-widget_city-list-btn'
        },
        {
          name:'Settings',
          title: 'Settings',
          class:'weather-widget_settings-btn'
        }
      ],
    }
  },
  computed: {

  }
});
</script>

<style  lang="scss">
.weather-widget {
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;

  &_tab-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_item{

    }
    &_item.settings{
    color: red;
    }

  }

}
</style>


