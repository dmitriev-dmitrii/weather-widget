<template>
<div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
    <div>
      <div>{{city.name}} [{{city.country}}]</div>
      <div> last updated at : {{ city.lastUpdated }}</div>
    </div>

  <div>
    <div v-if="city.loading">  loading ... </div>
    <div v-else>
<!--      <figure>-->
<!--      <img :src="`http://openweathermap.org/img/wn/${cityItem.weather.icon}@2x.png`" :alt="`${cityItem.name}weather-image`">-->
<!--      <figcaption>-->
<!--        {{cityItem.weather.description }}-->
<!--      </figcaption>-->
<!--      </figure>-->

   <div>
     <div>
     temperature : {{weather.temperature}} ℃
     </div>
     <div>
     feels like :  {{weather.temperatureFeelsLike}} ℃
   </div>
     <div>
     visibility {{ weather.visibility  }} km
    </div>
   </div>
    </div>

  </div>

</div>
  <hr>

    


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