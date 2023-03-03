

import { createStore } from 'vuex'
import storeModules from "./store";
const store = createStore(storeModules)


import App from './App.vue';
import { createApp } from "vue";
createApp(App).use(store).mount("weather-widget")



export default App
