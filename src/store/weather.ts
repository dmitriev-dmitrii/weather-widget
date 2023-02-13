import {weatherApi} from "@/api";

import _get from 'lodash/get';
export default {
    namespaced: true,
    state: {
        cityList:[]
    },
    getters: {
        sortedCityList:(state:any)=>{
            return state.cityList
        }
    },
    mutations: {
        addCityToList:(state : any ,city: any)=>{
            state.cityList.push(city)
        }
    },
    actions: {
        findByCityName:async function (context:any,payload:any)  {

            return  await weatherApi.getByCityName(payload);

        }
    },
};