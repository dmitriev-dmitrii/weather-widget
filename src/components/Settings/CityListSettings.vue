<template>

<div ref="settings-city-list" class="drag-list">
      <div draggable="true" :data-id="item.id" :data-order="item.order" v-for="item in sortedCityList" :key="item.id"  style="display: flex; justify-content: space-between; margin: 1rem 0">

        <button class="drag__item-activator"> {{item.order}} </button>

        <div draggable="true" style="width: 100%; background-color: #3333;">
          <div>{{item.name}} [{{item.country}}]</div>
          <button type="button" @click="removeCityFromList(item)">remove</button>
        </div>
      </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations} from "vuex";
import dragDropOrders from "./utils/dragDropOrders";

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
      'swapCityListOrders',
    ]),
  },
  mounted() {

    dragDropOrders ( this.$refs["settings-city-list"] , this.swapCityListOrders )
  }

});
</script>

<style lang="scss">
@import "utils/dragDropOrders";
.drag__item-activator {
  cursor: grab;
}
</style>