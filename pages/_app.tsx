import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'store'
import 'styles/globals.css'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <Component {...pageProps} />
          <ToastContainer
            toastClassName='toast-background'
            progressClassName='progress-color'
          />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)
