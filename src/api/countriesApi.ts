import axios from 'axios'
import type { ICountry } from '@/interfaces/country'

export const getAllCountries = async () => {
  try {
    const { data }: { data: ICountry[] } = await axios.get('/all')
    return { data, success: true, error: null }
  } catch (error) {
    return { data: null, success: false, error }
  }
}
