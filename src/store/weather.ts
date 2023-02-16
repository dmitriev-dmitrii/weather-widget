import {weatherApi} from "@/api";

import _findIndex from 'lodash/findIndex';

import CityItem from "@/types/CityItem";
import localStorageCityList from "@/utils/localStorageCityList";
import cityItemResponseParser from "@/utils/cityItemResponseParser";


export default {
    namespaced: true,
    state: {
        cityList: [] as CityItem[]
    },
    getters: {
        sortedCityList:(state:any) : CityItem []=>{
            return state.cityList.sort( ( a:CityItem , b:CityItem  )=>{
                return a.order - b.order
            })
        }
    },
    mutations: {
        addOrUpdateCity:(state : any ,city: CityItem)=> {
            const targetIndex : number =  _findIndex(  state.cityList, ( item: CityItem ) => {
                return item.id === city.id;
            })

if (targetIndex < 0){
    state.cityList.unshift(city)
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

        },

        swapCityListOrders:(state : any  ,ordersData =  [] as { id:number,order:number }[]    ) :void => {

            const sourceItem :  number =   _findIndex(  state.cityList, ( item: CityItem ) => {
                return item.id === ordersData[0].id;
            })
            const targetItem : number =   _findIndex(  state.cityList, ( item: CityItem ) => {
                return item.id === ordersData[1].id;
            })

            state.cityList[sourceItem].order = ordersData[1].order
            state.cityList[targetItem].order = ordersData[0].order

            localStorageCityList.save(state.cityList);
        }
    },
    actions: {
        addCityByUserLocation: async function (context:any ){


                const geoData:any = await   new Promise((resolve, reject) : any => {
                    const  successCallBack = (geoData:any) => {
                        resolve(geoData.coords)
                    }

                    const  errCallBack = (err:any) => {
                         reject ( err )
                    }
                    navigator.geolocation.getCurrentPosition( successCallBack, errCallBack );

                })

                const { latitude  , longitude } =  geoData

                const res = await weatherApi.getByLocation( latitude  ,longitude)

                context.commit('addOrUpdateCity', cityItemResponseParser(res.data) );

        },

        findByCityName:async function (context:any,payload:string)  {

            return  await weatherApi.getByCityName(payload);

        },

        getCityListWeather:async function (context:any )  {

        try {

            let savedCityArr: CityItem [] = localStorageCityList.get();

            if (!savedCityArr.length) {
                return
            }

            savedCityArr.forEach(( item)=>{
                context.commit('addOrUpdateCity', item );
            })

            for  ( const  index in savedCityArr   ) {

                const item = savedCityArr[index]

                item.loading = true;
                context.commit('addOrUpdateCity', item );

                const res = await weatherApi.getById(item.id);

                const updatedItem =  cityItemResponseParser( res.data )

                updatedItem.order = item.order

                context.commit('addOrUpdateCity', updatedItem );

            }

} catch (err) {
            console.log(err)
}

        }
    },
};