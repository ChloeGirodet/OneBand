/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      dropShadow: {
        'card' : '0px 0ox 35px',
      },
      scale: {
        '300' : '3.00',
      },
      width: {
        '100' : '30rem',
        '120' : '40rem',
      },
      height: {
        '100' : '30rem',
        '120' : '40rem',
      },
      animation: {
        'spin-slow': 'spin 75s linear infinite',
        'spin-accelerate' : 'spin 30s linear infinite' 
      }
    },
    screens: {
      'big-phone': '500px',
      'tablet' : '680px',
      'laptop':'1024px',
      'desktop' : '1400px',
      'big-desktop' : '1920px'
    },
  },
  plugins: [],
}