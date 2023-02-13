type CityItem  = {

    name: string,
    country: string,
    id: number,
    order:number,
    lastUpdated: number
    loading: boolean
    weather: {

        icon:string,
        temperature: number,
        temperatureFeelsLike:number,
        humidity:number
        description:string,
        windSpeed:string,
        visibility:number

    }
}

export default CityItem