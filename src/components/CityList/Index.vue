<template>
  <div>

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
