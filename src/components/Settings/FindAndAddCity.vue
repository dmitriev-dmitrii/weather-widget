<template>
  <form @submit.prevent="sendSearchRequest">

    <fieldset><div>add location</div>
    <input v-model="searchQuery" @input="sendSearchRequest" type="search"/>
      <div  v-show=searchQuery :class="{'active': searchQuery }">

        <div v-if="formLoading"> loading... </div>

        <div v-if="Object.keys(searchResult).length && !formLoading">

          <span>{{searchResult.name}}</span> <button type="button" @click="addCity">add</button>

        </div>

        <div v-else>
          {{ formMessage }}
        </div>

      </div>

    </fieldset>
  </form>



</template>

<script>

import {mapActions, mapMutations} from "vuex";
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
export default {
  name: "FindAndAddCity",
  data:()=>{
   return {
       searchQuery:'',
       searchResult : {},
       formLoading:false,
       formMessage:''
   }
  },
  methods:{
    ...mapActions('weather', [
      'getWeatherByCityName',
    ]),
    ...mapMutations('weather', [
      'addCityToList',
    ]),
    sendSearchRequest :async function () {
      try {

        if (!this.searchQuery) {
          return;
        }

        this.searchResult = {}
        this.formMessage = ''
        this.formLoading = true


        const res = await this.getWeatherByCityName( this.searchQuery );
        // const res = await this.getWeatherByCityName( this.searchQuery );
        this.searchResult = _get(res,'data',{})

      } catch (err) {
        console.log(err)

        const errStatus =  _get( err ,'response.status' , 0)

        if (errStatus === 404) {
          this.formMessage = `city '${this.searchQuery}' not found`
          return
        }

        if (errStatus >= 500) {
          this.formMessage = 'server error, please try later'
          return
        }

          this.formMessage = `error code ${errStatus}  , contact technical support`

      }

      finally {
        this.formLoading = false
      }

    },
    addCity : function () {

      this.addCityToList(this.searchResult)

      this.resetForm()


    },
    resetForm : function () {

      this.searchResult = {}

      this.formMessage= ''
      this.searchQuery = ''

    }
  },
  created() {
    this.sendSearchRequest = _debounce( this.sendSearchRequest , 1000)
  }
}
</script>

<style scoped>

</style>