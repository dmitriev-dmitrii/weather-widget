

<template>
  Settings
  <CityListSettings/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CityListSettings from "@/components/Settings/CityListSettings.vue";
export default defineComponent({
  name: "Settings",
  components:{
    CityListSettings
  }
});
</script>