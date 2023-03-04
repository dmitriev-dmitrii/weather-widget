<template>
    <span class="weather-widget__button" :class="[variant]" tabindex="0" >
      <div class="weather-widget__button__loader"  :class="{'active': loading }">
        <app-spinner />
      </div>
      <div class="weather-widget__button__content" :class="{'hidden': loading }" >
        <slot></slot>
      </div>


    </span>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AppSpinner from "@/components/UI/AppSpinner.vue";

export default defineComponent({
  name: "AppButton",
  components: {AppSpinner},
  props:{
    loading:{
      type:Boolean,
      default:false
    },
    variant:{
      type:String,
      default: 'secondary'
    }
  }
})
</script>

<style lang="scss">
.weather-widget__button {
  border: 1px  $appBorderColor solid;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition:all 0.2s ease;
  position: relative;
  &:active{

  }
  &__content {

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }

  &__loader {

    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: inherit;
    margin: 0;
    opacity: 0;
    z-index: -1;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    transition: all 0.3s linear ;
    cursor: wait;

    &.active {
      z-index: auto;
      opacity: 1;
    }
  }

}

</style>
