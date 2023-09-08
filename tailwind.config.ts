import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-aespa':
          'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);'
      },
      colors: {
        aespa: {
          blue: '#33539E',
          skyblue: '#7FACD6',
          lilac: '#BFB8DA',
          pink: '#E8B7D4',
          purple: '#A5678E',
          babypink: '#EEAECA'
        }
      }
    },
  },
  plugins: []
}
export default config
