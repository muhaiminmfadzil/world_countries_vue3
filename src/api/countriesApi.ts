import axios from 'axios'

export const getAllCountries = async () => {
  try {
    const { data } = await axios.get('/all')
    return { data, success: true, error: null }
  } catch (error) {
    return { data: null, success: false, error }
  }
}
