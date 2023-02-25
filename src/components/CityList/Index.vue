<template>
  <div class="weather-widget__city_list">

    <div v-if="!sortedCityList.length">

     you dont have any  city , y can try

     <FindUserLocation/>

    </div>

    <CityItem v-else :city-item="item" v-for="item in sortedCityList" :key="item"/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CityItem from './CityItem.vue';
import { mapGetters} from "vuex";
import FindUserLocation from "@/components/Settings/FindUserLocation.vue";

export default defineComponent({
  name: "CityList",
  computed:{

    ...mapGetters('weather',[
      'sortedCityList',
    ])
  },
  components:{
    FindUserLocation,
    CityItem
  },

});
</script>

<style  lang="scss">

.weather-widget__city_list {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
}
</style>
