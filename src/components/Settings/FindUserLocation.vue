<template>

   <button @click="addLocaleCity" :disabled="loading" >

     find my location {{errMessage}}

   </button>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions, mapState} from "vuex";
import _get from "lodash/get";

export default defineComponent({
  name: "FindUserLocation",
  data:()=>{
    return {
      loading:false,
      errMessage:''
    }
  },
  computed:{
    // ...mapState('weather', [
    //   'cityList',
    // ]),
  },
  methods:{
    ...mapActions('weather', [
      'addCityByUserLocation',
    ]),

    addLocaleCity: async  function () {

try {

  this.loading = true
  this.errMessage = ''
  await  this.addCityByUserLocation();

 } catch (err:any) {

  if (err.code === 1) {
    this.errMessage = ' user access denied'
    return
  }

  this.errMessage = 'server error'

}
finally {
  this.loading = false
}
    }
  },
mounted() {
    // if(!this.cityList.length){
      // this.addLocaleCity()
    // }
}

})
</script>
