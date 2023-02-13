import {weatherApi} from "@/api";

import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';

import CityItem from "@/types/CityItem";
import localStorageCityList from "@/utils/localStorageCityList";
import cityItemParser from "@/utils/cityItemParser";

export default {
    namespaced: true,
    state: {
        cityList: [] as CityItem[]
    },
    getters: {
        sortedCityList:(state:any) : CityItem []=>{
            return state.cityList
        }
    },
    mutations: {
        addOrUpdateCity:(state : any ,city: CityItem)=> {

            const targetIndex : number =  _findIndex(  state.cityList, ( item: CityItem ) => {
                return item.id === city.id;
            })


if (targetIndex < 0){
    state.cityList.push(city)
}
else {
    state.cityList[targetIndex] = city
}

            localStorageCityList.save(state.cityList)
        },

        removeCityFromList:(state : any ,city: CityItem)=> {

           const targetIndex : any =   _findIndex(  state.cityList, ( item: CityItem ) => {
                return item.id === city.id;
            })

           state.cityList.splice( targetIndex, 1);
           localStorageCityList.save(state.cityList);

        }
    },
    actions: {

        findByCityName:async function (context:any,payload:any)  {

            return  await weatherApi.getByCityName(payload);

        },

        getCityListWeather:async function (context:any )  {

        try {

            let savedCityArr: CityItem [] = localStorageCityList.get();

            if (!savedCityArr.length) {
                return
            }



            for  ( const  item  of savedCityArr   ) {

                item.loading = true;
                context.commit('addOrUpdateCity', item );

                const res = await weatherApi.getById(item.id);

                const updatedItem =  cityItemParser(  _get (res,'data', item ) )
                updatedItem.loading = false

                context.commit('addOrUpdateCity', updatedItem );

            }
            // for ( const item of  savedCityArr) {
            //     item.loading = true;
            //     context.commit('addOrUpdateCity', item );
            //     const res = await weatherApi.getById(item.id);
            //
            // }

            // const  promises = savedCityArr.map((item:CityItem)=> {
            //     return weatherApi.getById(item.id);
            // })
            //
            // const resArr =  await Promise.all(promises);
            //
            // resArr.forEach((res)=>{
            //     console.log(res.data)
            //  context.commit('addOrUpdateCity', cityItemParser(res.data) );
            // });

            // console.log('resArr',resArr);

} catch (err) {
            console.log(err)
}

        }
    },
};