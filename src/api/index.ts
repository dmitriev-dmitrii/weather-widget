

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const apiKey = 'c4495221ade2ed4a3a81cb33d9d4c796'
import axios from "axios";

export const weatherApi = {
    getByCityName:(cityName='') : any => {
        return axios.get(`${apiUrl}?q=${cityName}&appid=${apiKey}`)
    }
}