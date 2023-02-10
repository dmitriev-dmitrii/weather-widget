<template>
  <div>

 <CityList/>
  <Settings/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CityList from '@/components/CityList/Index.vue'
import Settings from '@/components/Settings/Index.vue'
export default defineComponent({
  components: {
    CityList,
    Settings,
  },
});
</script>


