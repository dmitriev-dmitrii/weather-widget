<template>

      <div  v-for="(item,index) in sortedCityList" :key="item.id" :data-order="index" style="display: flex; margin: 1rem 0">

        <div>{{item.order}} {{item.name}} [{{item.country}}]</div>
        <button type="button" @click="removeCityFromList(item)">remove</button>
      </div>



</template>

<script lang="ts">
import { defineComponent } from "vue";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default defineComponent({
  name: "CityListSettings",
  computed:{

    ...mapGetters('weather',[
      'sortedCityList',
    ])
  },
  methods:{
    ...mapMutations('weather',[
      'removeCityFromList',
    ]),

  }

});
</script>
