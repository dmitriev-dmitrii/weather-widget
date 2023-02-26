<template>

<div ref="settings-city-list" class="weather-widget__settings-city-list">
      <div class="weather-widget__settings-city-list__item" draggable="true" :data-id="item.id" :data-order="item.order" v-for="item in sortedCityList" :key="item.id" >

        <button title="change city order " class="weather-widget__settings-city-list__item-drag-activator"> {{item.order}} </button>

        <div draggable="true" class="weather-widget__settings-city-list__item-content">
          <div>[{{item.country}}] {{item.name}} </div>
          <button class="weather-widget__settings-city-list__item-remove" type="button" @click="removeCityFromList(item)">remove</button>
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

.weather-widget__settings-city-list {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 ;

  &__item {
    display: flex;
    margin: 0.25rem ;
    overflow: hidden;
    border-radius: $appBorderRadius;
    border: 1px solid $appBorderColor;

    &-content{
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding:0.5rem 1rem;
    }
    &-drag-activator {
      cursor: grab;
    }
  }

}


</style>
