const apiUrl = 'https://api.openweathermap.org/data/2.5/';
// https://openweathermap.org/data/2.5/find?q=ber&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric

const apiKey = 'c4495221ade2ed4a3a81cb33d9d4c796';
import axios from "axios";

export const weatherApi = {
    getByCityName:(cityName='') : any => {
        return axios.get(`${apiUrl}find?q=${cityName}&appid=${apiKey}&units=metric`)
    }
}