<template>

<div class="weather-widget">
  <div class="weather-widget__tab-list">
    <button class="weather-widget__tab-list-item" :class="{'active' : currentTabComponent === 'CityList'}" @click="currentTabComponent = 'CityList'">CityItem List</button>
    <button class="weather-widget__tab-list-item" :class="{'active' : currentTabComponent === 'Settings'}" @click="currentTabComponent = 'Settings'"> Settings </button>
  </div>
  <div class="weather-widget__content">
  <keep-alive>
    <component v-bind:is="currentTabComponent" />
  </keep-alive>
  </div>
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

  &__tab-list{
    display: flex;
    align-items: center;
    border-bottom: 1px solid $appBorderColor;

    &-item{
      border:none;
      padding: 0.5rem 1rem;
      margin: 0;
      background: $appBgColor;

      transition: all 0.2s ease;
      &.active{
        background-color: $accentColor;
        color: $appBgColor;
      }
      &:hover:not(.active) {
        background-color: lighten($accentColor ,30);
      }
      //&:not(:last-child) {
      //  border-right: 1px solid $transparent;
      //}
    }


  }
  &__content {
    max-height: $content-max-height;
    overflow: scroll;

  }

}
</style>


