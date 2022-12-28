/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        0.1: '1px',
        0.2: '2px',
        r006: '0.6rem',
        r013: '1.3rem',
        r23: '23rem',
        r37: '37rem',
        r44: '44rem',
        r70: '70rem',
        sw93: '93vw',
        sh375: '375vh',
        sh75: '75vh',
      },
      fontSize: {
        ultraSm: ['10px', '16px'],
      },
      colors: {
        transparent: 'transparent',
        softBlack: '#111019',
        softGray: '#D9D9D9',
        signInRed: '#E31221',
        softBrown: 'rgba(221, 204, 170, 1)',
        blurBlack: 'rgba(0, 0, 0, 0.54)',
        softBlue: '#222030',
      },
      backgroundImage: {
        theRoyalTenenbaums:
          "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%),url('/assets/the-royal-tenenbaums.png')",
        interstellar:
          "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%),url('/assets/interstellar.png')",
        lordOfTheRings:
          "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%), url('/assets/lord-of-the-rings.png')",
      },
      fontFamily: {
        helveticaEn: ['HelveticaEn'],
        helveticaKa: ['HelveticaKa'],
      },
      screens: {
        tabletLg: '880px',
      },
    },
  },
  plugins: [],
}
