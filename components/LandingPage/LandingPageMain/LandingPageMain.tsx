import { Background } from '../background'
import { NavBar } from '../navBar'
import { RegisterForm } from '../registerForm'
import { LoginForm } from '../loginForm'
import {
  CheckYourEmail,
  EmailActivated,
  PasswordChanged,
  PasswordRecover,
} from '../feedback'
import { ForgotPasswordForm } from '../forgotPasswordForm'
import { PasswordResetForm } from '../passwordResetForm'
import { useLandingPage } from './useLandingPage'

const LandingPage = () => {
  const { setHasScrollBar, hasScrollBar, locale, t, stage } = useLandingPage()

  return (
    <>
      {stage === 'register' && (
        <RegisterForm setHasScrollBar={setHasScrollBar} />
      )}

      {stage === 'checkYourEmail' && (
        <CheckYourEmail setHasScrollBar={setHasScrollBar} />
      )}

      {stage === 'emailActivated' && (
        <EmailActivated setHasScrollBar={setHasScrollBar} />
      )}

      {stage === 'login' && <LoginForm setHasScrollBar={setHasScrollBar} />}

      {stage === 'forgotPassword' && (
        <ForgotPasswordForm setHasScrollBar={setHasScrollBar} />
      )}

      {stage === 'passwordRecover' && (
        <PasswordRecover setHasScrollBar={setHasScrollBar} />
      )}

      {stage === 'passwordReset' && (
        <PasswordResetForm setHasScrollBar={setHasScrollBar} />
      )}

      {stage === 'passwordChanged' && (
        <PasswordChanged setHasScrollBar={setHasScrollBar} />
      )}

      <main className={`h-screen ${!hasScrollBar && 'overflow-hidden'}`}>
        <NavBar setHasScrollBar={setHasScrollBar} />

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
