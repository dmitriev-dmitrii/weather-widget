<template>
<div class="weather-widget__city_list-item">
    <div class="weather-widget__city_list-item-about">
      <span> [{{city.country}}] {{city.name}} </span>
      <i> last updated at : {{ city.lastUpdated }}</i>
    </div>

    <div v-if="city.loading">  loading ... </div>
    <div class="weather-widget__city_list-item-weather" v-else>
      <div class="weather-widget__city_list-item-weather-img-wrapper">
        <img  @load="imgLoadHandle" loading="lazy"  :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" :alt="`${weather.description}weather-image`">
        <i>{{weather.description }}</i>
      </div>
   <div class="weather-widget__city_list-item-weather-data">
     <div>
     <span>temperature :</span>  {{weather.temperature}} ℃
     </div>
     <div>
     <span> feels like :</span>   {{weather.temperatureFeelsLike}} ℃
   </div>
     <div>
     <span>visibility :</span> {{ weather.visibility  }} km
    </div>
   </div>
    </div>
</div>

<!-- 
  <div>
    <figure>


  </div>

  <div>feels_like {{cityItem.weather.feels_like}} ℃</div>
  <div> humidity  {{cityItem.main.humidity}} %</div>

  <div>wind   {{cityItem.wind.speed.toFixed(1) }} meter/sec</div>

 <div>  visibility {{( cityItem.visibility  / 1000 ).toFixed(1) }} km</div> -->

</template>

<script lang="ts">
import CityItem from "@/types/CityItem";
import { defineComponent } from "vue";
import _pick from 'lodash/pick'
import _get from 'lodash/get'
export default defineComponent({
  name: "CityItem",
  props: {
    cityItem: {
      required:true,
      type: Object ,
      // default:()=>{return {}}
    },
  },
  methods:{
    imgLoadHandle:function (event:any) {
      if (event.type ===  "load") {
        event.target.classList.add('loaded')
        return
      }

    }
  },
  setup(props) {
    
    const city = _pick (props.cityItem , ['name' ,
    'country',
    'id',
      'loading'
,'lastUpdated'
    ])

    city.lastUpdated =  new Date(city.lastUpdated).toLocaleTimeString().slice(0,-3);

    const weather = _get (props,'cityItem.weather' , {

    } )

    weather.temperature =  parseInt(weather.temperature,10);
    weather.temperatureFeelsLike = parseInt(weather.temperature,10);
    weather.visibility  =  (weather.visibility / 1000 ).toFixed(1);

    return { city , weather }
  },

});
</script>

<style lang="scss">
.weather-widget__city_list-item {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem  1rem 0.25rem 0.5rem ;
  &:not(:last-child) {
    border-bottom: 1px solid $appBorderColor;
  }
  &-about,
  &-weather {
    display: flex;

  }
  &-about {
    flex-direction: column;
    justify-content: space-between;
    & span {
      font-weight: bold;
      color: $appTitleTextColor;
    }
  }
  &-weather {
    margin-left: 2rem;
    flex: 1;
    align-items: stretch;
    justify-content: flex-end;
    &-data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 10rem;
      & div {
        // div - its data-item
        display: flex;
        justify-content: space-between;
      }
      & span {
        // span - its title
        font-weight: bold;
      }
    }
    &-img-wrapper {
      margin:0  2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      & img {
        object-fit: cover;
        max-height: 100%;
        max-width: 3rem;
        opacity: 0;
        transition: all 0.3s linear;
      }
      & img.loaded{
        opacity: 1;
      }

    }
  }
}
</style>
