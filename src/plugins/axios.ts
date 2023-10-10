import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'https://restcountries.com/v3.1'

export { VueAxios, axios }
