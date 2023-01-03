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
        r023: '2.3rem',
        r027: '2.7rem',
        r085: '8.5rem',
        r13599: '13.599rem',
        r14662: '14.662rem',
        r18: '18rem',
        r19: '19rem',
        r1605: '16.5rem',
        r1705: '17.5rem',
        r2005: '20.5rem',
        r21563: '21.563rem',
        r22: '22rem',
        r23: '23rem',
        r24: '24rem',
        r26: '26rem',
        r28: '28rem',
        r30: '30rem',
        r32: '32rem',
        r35: '35rem',
        r37: '37rem',
        r40: '40rem',
        r44: '44rem',
        r50: '50rem',
        r55: '55rem',
        r70: '70rem',
        sw93: '93vw',
        sh375: '375vh',
        sh75: '75vh',
      },
      fontSize: {
        r0081: ['0.81rem', '25px'],
        r0085: ['10px', '20px'],
        ultraSm: ['10px', '16px'],
        r009: ['0.9rem', '16px'],
        r0095: ['0.95rem', '25px'],
        r0096: ['0.96rem', '25px'],
      },
      colors: {
        transparent: 'transparent',
        softBlack: '#111019',
        softGray: '#D9D9D9',
        signInRed: '#E31221',
        softBrown: 'rgba(221, 204, 170, 1)',
        blurBlack: 'rgba(0, 0, 0, 0.54)',
        redStar: '#DC3545',
        inputGray: '#CED4DA',
        borderRed: 'rgba(227, 18, 33, 1)',
        borderGreen: 'rgba(25, 135, 84, 1)',
        borderGray: 'rgba(206, 212, 218, 1)',
        grayJourney: '#6C757D',
        blueLogin: '#0D6EFD',
        danger: '#E31221',
      },
      backgroundImage: {
        theRoyalTenenbaums:
          "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%),url('/assets/the-royal-tenenbaums.png')",
        interstellar:
          "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%),url('/assets/interstellar.png')",
        lordOfTheRings:
          "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%), url('/assets/lord-of-the-rings.png')",
        whiteGray:
          'linear-gradient(0deg, rgba(34, 32, 48, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(300deg, rgba(239, 239, 239, 0.1) -1.81%, rgba(239, 239, 239, 0.00514528) 102.5%, rgba(1, 1, 1, 0.00260417) 102.51%, rgba(239, 239, 239, 0.05) 102.52%)',
        darkBlue:
          'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        softBlue:
          'linear-gradient(187.16deg, #222030 0.07%, #222030 51.65%, #222030 98.75%)',
      },
      fontFamily: {
        helveticaEn: ['HelveticaEn'],
        helveticaKa: ['HelveticaKa'],
      },
      screens: {
        nm: '380px',
      },
    },
  },
  plugins: [],
}
