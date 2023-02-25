<template>

<div class="weather-widget">
  <div class="weather-widget_tab-list">
    <button class="weather-widget_tab-list_item city-list" @click="currentTabComponent = 'CityList'">CityItem List</button>
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
import {mapActions} from "vuex";

export default defineComponent({
  components: {
    CityList,
    Settings,
  },
  data:()=>{
    return {
      currentTabComponent: "CityList",
    }
  },
  methods:{
      ...mapActions('weather',[
        'getCityListWeather',
      ]),
    },

  created() {
    this.getCityListWeather()
  },
});
</script>

<style  lang="scss">

.weather-widget {

  &_tab-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $appBorderColor;

    margin-bottom: 0.5rem ;


    &_item{
      border:none;
      padding: 0.5rem 1rem;
      margin: 0;
      //background-color: $appAccentColor;
      //color: white;
      &:not(:last-child){
        border-right: 1px solid $appTextColor;
    }
      &:hover {
      }
    }

    &_item.settings{
    color: red;
    }

  }

}
</style>


