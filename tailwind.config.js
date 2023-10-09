/** @type {import('tailwindcss').Config} */
import tailwindForm from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [tailwindForm]
}
