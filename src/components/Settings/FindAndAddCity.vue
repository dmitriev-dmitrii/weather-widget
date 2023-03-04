<template>
  <form @submit.prevent="searchHandle" class="weather-widget__find-and-add-city__form">

    <div class="weather-widget__find-and-add-city__form__actions">
      <input class="weather-widget__find-and-add-city__form__actions__input" v-model="form.searchQuery" @input="searchHandle"  type="search" placeholder="search by city name"/>
      <app-button class="weather-widget__find-and-add-city__form__actions__button" @click="searchHandle" :loading="form.loading">search</app-button>
    </div>

      <div tabindex="0"  class="weather-widget__find-and-add-city__form__search-result" >
        <div  v-if="searchResult.length">
          <div @click="addCity(index)" class="weather-widget__find-and-add-city__form__search-result__item" v-for="(item,index) in searchResult" :key="item.id">
            <span>[{{item.country}}]&nbsp;{{item.name}} </span>
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#selected"></use>
          </svg>
          </div>

        </div>

        <div v-else class="weather-widget__find-and-add-city__form__search-result__message">
          <app-spinner v-if="form.loading"><template v-slot:append>
          searching...
          </template>
          </app-spinner>
          <span v-if="form.message">{{form.message}}</span>
        </div>

      </div>

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
import AppSpinner from "@/components/UI/AppSpinner.vue";
import AppButton from "@/components/UI/AppButton.vue";
export default defineComponent({
  name: "FindAndAddCity",
  components: {AppButton, AppSpinner},

setup() {
    let form = reactive(
        {
          searchQuery: '',
          message: 'Enter city name',
          loading: false
        })
    const searchResult: any = ref([]);
    const store = useStore();
    const sendSearchRequest = async  () => {
      try {

        searchResult.value = []

        if (!form.searchQuery) {
          form.message = 'Enter city name'
          return;
        }

        if (!form.searchQuery.replace(/[0-9]/,'')) {
          form.message = 'No only numbers in search'
          return
        }

        form.loading = true
        form.message = ''
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

    const  searchHandle   =  _debounce(sendSearchRequest, 1000)

  const addCity = (index :number) => {
    if ( index >= 0) {
      store.commit( 'weather/addOrUpdateCity',( searchResult.value[index] ))
    }
  }

    return {form, searchResult, searchHandle, addCity }
  }
})
</script>

<style lang="scss">
.weather-widget__find-and-add-city__form {
  font-size: 0.9rem ;
  display: block;
  margin:0.5rem 0.25rem;
  align-items: stretch;
  position: relative;
  border: 1px solid $appBorderColor;
  border-radius: $appBorderRadius;
  transition:all 0.3s linear;
  overflow: hidden;

  &:focus-within {
    //box-shadow: 0 0 0 2px $accentColor;
    border-color:$accentColor ;
  }



  &__actions{

  display: flex;
  //border: 1px solid $appBorderColor;
  //border-radius: $appBorderRadius;

  &__input{
    font-size: 0.9rem ;
    flex: 1;
    display: block;
    outline: none;
    border: none;
    padding: 0.5rem;
  }
  &__input::-webkit-search-decoration,
  &__input::-webkit-search-cancel-button,
  &__input::-webkit-search-results-button,
  &__input::-webkit-search-results-decoration {
    -webkit-appearance:none;
    appearance:none;
  }
  &__button {
    border: none;
    border-left: 1px solid $appBorderColor;
    border-radius: 0;
  }
}
  &__search-result {
    max-height: 0;
    opacity: 0;
    top: 100%;
    left: 0;
    transition: all 0.3s ease-in-out;
    width: 100%;
    background: $appBgColor;
    border-top: 1px solid $appBorderColor;

    overflow: auto;

    &__message {
      padding: 0.25rem 0.5rem ;
      display: flex;
      align-items: center;
    }

    &__item {
      margin: 0.25rem 0;
      padding: 0.25rem ;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        background: $appBorderColor;
        transition: 0.2s ease-in;
      }

      & svg {
        height: 1rem;
        width: 1rem;
        margin-right: 0.25rem;
        fill: $transparent;
      }

      &.selected{
        & svg {
          fill: $accentColor;
        }
      }
    }

  }
  &:focus-within > &__search-result {
    opacity: 1;
    max-height: calc(#{$content-max-height}px / 2);
  }
}


</style>
