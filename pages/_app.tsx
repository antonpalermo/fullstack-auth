import React from 'react'
import { NextPage } from 'next'
import { AppProps as NextAppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

type PageLayout = NextPage & {
  getBaseLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppProps = NextAppProps & {
  Component?: PageLayout
}

const App = ({ Component, pageProps: { session, ...rest } }: AppProps) => {
  const getBaseLayout = Component.getBaseLayout ?? (page => page)

  return getBaseLayout(
    <SessionProvider session={session}>
      <Component {...rest} />
    </SessionProvider>
  )
}

export default App
