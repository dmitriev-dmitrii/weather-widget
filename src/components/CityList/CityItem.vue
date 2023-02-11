<template>
 {{cityItem.name}}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CityItem",
  props: {
    cityItem: {
      required:true,
      type:Object,
      default:()=>{return {}}
    },
  },

});
</script>