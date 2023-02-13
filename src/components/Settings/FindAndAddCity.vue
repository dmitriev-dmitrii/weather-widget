<template>
  <form @submit.prevent="sendSearchRequest">

    <fieldset>
      <legend>add location</legend>

    <input v-model="searchQuery" @input="sendSearchRequest" type="search"/>

      <div  v-show=searchQuery :class="{'active': searchQuery }">

        <div v-show="formLoading"> loading... </div>

        <div v-if="!formLoading && searchResult.length ">

          <div v-for="(item,index) in searchResult" :key="item.id">
           {{index}} {{item.name}} [{{item.country}}]
            <button type="button" @click="addCity(index)">add</button>
          </div>

        </div>

        <div v-else>
          {{ formMessage }}
        </div>

      </div>

    </fieldset>
  </form>


</template>

<script lang="ts">

import {mapActions, mapMutations} from "vuex";
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import cityItemParser from '@/utils/cityItemParser';
import {defineComponent} from "vue";
import CityItem from "@/types/CityItem";
export default defineComponent({
  name: "FindAndAddCity",
  data:()=>{
   return {
       searchQuery:'',
       searchResult :[] ,
       formLoading:false,
       formMessage:''
   }
  },
  methods:{
    ...mapActions('weather', [
      'findByCityName',
    ]),
    ...mapMutations('weather', [
      'addCityToList',
    ]),

    sendSearchRequest : async function () {
      try {

        if (!this.searchQuery) {
          return;
        }

        if (/[0-9]/.test(this.searchQuery)) {
          this.formMessage = 'No numbers in search'
          return
        }

        this.formLoading = true
        this.searchResult = []
        this.formMessage = ''

        const res :any = await this.findByCityName( this.searchQuery ) ;

        this.searchResult =   _get(res,'data.list',[]).map(cityItemParser);

         if ( !this.searchResult.length) {
           this.formMessage = `city '${this.searchQuery}' not found`
         }

      } catch (err : any) {

       console.log(err);

        const errStatus : any =  _get( err ,'response.status' , 0 )

        if ( errStatus === 404  ) {
          this.formMessage = `city '${this.searchQuery}' not found`
          return
        }

        if (errStatus >= 500) {
          this.formMessage = 'server error, please try later'
          return
        }

        if (errStatus)
        {
          this.formMessage = `error code ${errStatus} , contact technical support`
        return
        }
          this.formMessage = `undefined error , contact technical support`

      }

      finally {
        this.formLoading = false
      }

    },
    addCity : function (index :number) {

      this.addCityToList( this.searchResult[index] )

    },

  },
  async created() {

    // this.sendSearchRequest  =  _debounce  ( this.sendSearchRequest , 1000)

  }
})
</script>

<style lang="scss">

input[type="search"],
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance:none;
  appearance:none;
}

</style>