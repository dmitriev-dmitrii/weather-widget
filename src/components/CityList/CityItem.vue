<template>
  <li>
    <div>
      {{city.name}} [{{city.country}}]
    </div>
     {{parseInt(weather.temperature,10)}} ℃
     <div>
        feels like : {{parseInt(weather.temperatureFeelsLike,10)}} ℃
     </div>
    
  </li>

<!-- 
  <div>
    <figure>
      <img :src="`http://openweathermap.org/img/wn/${cityItem.weather.icon}@2x.png`" :alt="`${cityItem.name}weather-image`">
      <figcaption>
        {{cityItem.weather.description }}
      </figcaption>
    </figure>

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
    ])
    const weather = _get (props,'cityItem.weather' , { } )

    return { city , weather }
  },

});
</script>