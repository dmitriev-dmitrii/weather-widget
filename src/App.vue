<template>
  <div>
    <h1>
      {{name}}
    </h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: function() {
    return {
      name: 'Hello World!',
    }
  },
});
</script>

<!--<style lang="scss">-->
<!--h1 {-->
<!--  color: dodgerblue;-->
<!--}-->
<!--</style>-->
