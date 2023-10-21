import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/api/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inria: ['"Inria Sans"', 'sans'],
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
      colors: {

        // Background Colors

        bg: "#22C55E",
        bg1:"#15803D",
        bg2:"#14532D",
        bg3:"#",
        bg4:"#",
        bg5:"#",

        bgpage: "#197C17",
        bgpage1:  "#37511C",
        bgpage2: "#22350E",
        bgpage3: "#1C1C1C",

// Background Button

        blue: '#0F766E',
        blue1: '#0F766E',
        blue2: "#0F766E",

        // Text Colors
        text:'#FFFFFF',
        text1:'#AEAEAE',
        text2:'#525050',
        text3:'#787777',
        text4:'#292929',


    
      },
    },
  },
  plugins: [],
}
export default config
