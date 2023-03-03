import weather from "@/store/weather";
import { GetterTree, MutationTree, ActionTree } from "vuex"

export default {
  modules: {
    weather: weather,
  }
}
