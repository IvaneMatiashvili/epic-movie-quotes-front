import { Background, NavBar, RegisterForm } from './landingPageComponents'
import { useLandingPage } from './useLandingPage'

const LandingPage = () => {
  const {
    setHasScrollBar,
    hasScrollBar,
    setIsRegisterOn,
    isRegisterOn,
    locale,
    t,
  } = useLandingPage()

  return (
    <>
      {isRegisterOn && (
        <RegisterForm
          setHasScrollBar={setHasScrollBar}
          setIsRegisterOn={setIsRegisterOn}
        />
      )}

      <main className={`h-screen ${!hasScrollBar && 'overflow-hidden'}`}>
        <NavBar
          setHasScrollBar={setHasScrollBar}
          setIsRegisterOn={setIsRegisterOn}
        />

        <Background
          bottom={false}
          top={true}
          firstLine={t('home:interstellarQuoteFirstLine')}
          secondLine={t('home:interstellarQuoteSecondLine')}
          name={t('home:interstellar')}
          thirdLine={null}
          background='interstellar'
          itemsPosition='items-start'
        />

        <Background
          top={false}
          bottom={false}
          firstLine={t('home:tenenbaumsQuoteFirstLine')}
          secondLine={t('home:tenenbaumsQuoteSecondLine')}
          thirdLine={t('home:tenenbaumsQuoteThirdLine')}
          name={t('home:tenenbaums')}
          background='theRoyalTenenbaums'
          itemsPosition='items-center'
        />
        <Background
          top={false}
          bottom={true}
          firstLine={t('home:tenenbaumsQuoteFirstLine')}
          secondLine={t('home:tenenbaumsQuoteSecondLine')}
          thirdLine={t('home:tenenbaumsQuoteThirdLine')}
          name={t('home:tenenbaums')}
          background='lordOfTheRings'
          itemsPosition='items-end'
        />
        <div className='w-full h-12 bg-softBlack flex items-center'>
          <p
            className={`text-softBrown sm:text-sm text-ultraSm sm:ml-20 ml-8 ${
              locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
            } font-normal`}
          >
            {t('home:movieQuotesC')}
          </p>
        </div>
      </main>
    </>
  )
}

export default LandingPage
