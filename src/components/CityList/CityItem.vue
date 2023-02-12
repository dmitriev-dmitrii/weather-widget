<template>
  <li>
    <div>
      {{cityItem.name}} {{cityItem.sys.country}}
    </div>
    {{cityItem.weather[0].main }} , {{parseInt(cityItem.main.temp,10)}} ℃
  </li>


  <div>
    <figure>
      <img :src="`http://openweathermap.org/img/wn/${cityItem.weather[0].icon}@2x.png`" :alt="`${cityItem.name}weather-image`">
      <figcaption>
        {{cityItem.weather[0].description }}
      </figcaption>
    </figure>

  </div>

  <div>feels_like {{cityItem.main.feels_like}} ℃</div>
  <div> humidity  {{cityItem.main.humidity}} %</div>

  <div>wind   {{cityItem.wind.speed.toFixed(1) }} meter/sec</div>

 <div>  visibility {{( cityItem.visibility  / 1000 ).toFixed(1) }} km</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CityItem",
  props: {
    cityItem: {
      required:true,
      type:Object,
      default:()=>{return {}}
    },
  },

});
</script>