<template>
  <div>

    <div v-if="!sortedCityList.length">not data </div>
    <CityItem v-else :city-item="item" v-for="item in sortedCityList" :key="item"/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CityItem from './CityItem.vue';
import { mapGetters} from "vuex";

export default defineComponent({
  name: "CityList",
  computed:{

    ...mapGetters('weather',[
      'sortedCityList',
      // 'anotherGetter',
    ])
  },
  components:{
    CityItem
  }
});
</script>
