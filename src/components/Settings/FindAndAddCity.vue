<template>
  <form @submit.prevent="sendSearchHandle">

    <fieldset>
      <legend>add location</legend>

    <input v-model="form.searchQuery" @input="sendSearchHandle" type="search"/>

      <div  v-show=form.searchQuery :class="{'active': form.searchQuery }">

        <div v-show="form.loading"> form.loading... </div>

        <div v-if="!form.loading && searchResult.length ">

          <div v-for="(item,index) in searchResult" :key="item.id">
            {{item.name}} [{{item.country}}]  {{item.weather.temperature}} ℃
            <button type="button" @click="addCity(index)">add</button>
          </div>

        </div>

        <div v-else>
          {{ form.message }}
        </div>

      </div>

    </fieldset>
  </form>


</template>

<script lang="ts">

import {useStore} from "vuex";
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import cityItemResponseParser from '@/utils/cityItemResponseParser';
import {defineComponent, reactive, ref, toRefs} from "vue";
import CityItem from "@/types/CityItem";
import store from "@/store";
export default defineComponent({
  name: "FindAndAddCity",

setup() {
    let form = reactive(
        {
          searchQuery: '',
          message: '',
          loading: false
        })
    const searchResult: any = ref([]);
    const store = useStore();
    const sendSearchRequest = async () => {
      try {

        if (!form.searchQuery) {
          return;
        }

        if (/[0-9]/.test(form.searchQuery)) {
          form.message = 'No numbers in search'
          return
        }

        form.loading = true
        form.message = ''
        searchResult.value = []
        searchResult.value = await store.dispatch('weather/findByCityName', form.searchQuery);

        if (!searchResult.value.length) {
          form.message = `city '${form.searchQuery}' not found`
        }

      } catch (err: any) {

        console.log(err);

        const errStatus: any = _get(err, 'response.status', 500)

        if ((errStatus === 404) || (errStatus === 400)) {
          form.message = `city '${form.searchQuery}' not found`
          return
        }

        if (errStatus >= 500) {
          form.message = 'server error, please try later'
          return
        }

        if (errStatus) {
          form.message = `error code ${errStatus} , contact technical support`
          return
        }
        form.message = `undefined error , contact technical support`

      } finally {
        form.loading = false
      }
    }

    const  sendSearchHandle   = _debounce( sendSearchRequest,1000 )

  const addCity = (index :number) => {
    if ( index >= 0) {
      store.commit( 'weather/addOrUpdateCity',( searchResult.value[index] ))
    }
  }

    return {form, searchResult, sendSearchHandle,addCity}
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
