import   _get from 'lodash/get'
import CityItem from "@/types/CityItem";

export default function (data : any ) : CityItem  {

  return  {

      name: _get( data ,'name' , ''),
        country: _get( data ,'sys.country' , ''),
        id: _get( data ,'name' , 0 ),
        order : _get( data ,'order' , 0),

        weather:{

            icon: _get( data ,'weather[0].icon' , ''),
            description:_get( data ,'weather[0].description' , ''),
            temperature:_get( data ,'main.temp' , 0),
            temperatureFeelsLike:_get ( data ,'main.feels_like' , 0),
            humidity:_get ( data ,'main.humidity' , 0),
            windSpeed: _get( data ,'wind.speed' , 0),
            visibility: _get( data ,' visibility' , 0)

        }

}

}