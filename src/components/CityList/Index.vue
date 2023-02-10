<template>
  <div>
    CityList
    <CityItem/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CityItem from './CityItem.vue'
export default defineComponent({
  name: "CityList",
  components:{
    CityItem
  }
});
</script>
