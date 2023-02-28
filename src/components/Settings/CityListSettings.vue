<template>

<div ref="settings-city-list" class="weather-widget__settings-city-list">
      <div class="weather-widget__settings-city-list__item" draggable="true" :data-id="item.id" :data-order="item.order" v-for="item in sortedCityList" :key="item.id" >

        <button title="change city order " class="weather-widget__settings-city-list__item-drag-activator">
          <svg class="icon" aria-hidden="true">
          <use xlink:href="#drag-drop-up-down"></use>
        </svg>
        </button>

        <div draggable="true" class="weather-widget__settings-city-list__item-content">
          <div>[{{item.country}}] {{item.name}} </div>
          <button class="weather-widget__settings-city-list__item-remove" type="button" @click="removeCityFromList(item)">    <svg class="icon" aria-hidden="true">
            <use xlink:href="#delete-basket"></use>
          </svg></button>
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
    align-items: center;
    margin: 0.25rem ;
    overflow: hidden;
    border-radius: $appBorderRadius;
    border: 1px solid $appBorderColor;
    height: 100%;
    max-height: 3rem;
    &-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
    }
    &-drag-activator,
    &-remove
    {
      background:$appBgColor ;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem;
      & > svg {
        transition:all 0.2s ease;
      }
    }

    &-drag-activator {
      height: 100%;
      cursor: grab;
      border: 0;
      border-right: 1px solid $appBorderColor ;
      & > svg {
        height: 1.5rem;
        width: 1.5rem;
      }
      &:hover {
        & > svg {
          fill: $accentColor;
        }
      }
    }
    &-remove {
      border: 1px solid $appBorderColor ;
      border-radius: $appBorderRadius;
      & > svg {
        height: 1.25rem;
        width: 1.5rem;
      }
      &:hover {
        & > svg {
          fill: $errorColor;
        }
      }
    }
  }

}


</style>
