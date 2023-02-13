

<template>
  <CityListSettings/>
  <FindAndAddCity/>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import CityListSettings from "@/components/Settings/CityListSettings.vue";
import FindAndAddCity from "@/components/Settings/FindAndAddCity.vue";
export default defineComponent({
  name: "Settings",
  components:{
    FindAndAddCity,
    CityListSettings
  }
});
</script>