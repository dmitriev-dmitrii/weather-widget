const apiUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'c4495221ade2ed4a3a81cb33d9d4c796';
import axios from "axios";

export const weatherApi = {
    getByCityName:(cityName='') : any => {
        return axios.get(`${apiUrl}find?q=${cityName}&appid=${apiKey}&units=metric`)
    },
    getById:(id : number) : any => {
        return axios.get(`${apiUrl}weather?id=${id}&appid=${apiKey}&units=metric`)
    },
    getByLocation:(lat : number,lon : number ) : any => {
        return axios.get(`${apiUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    }

}