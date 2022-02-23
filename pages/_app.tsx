import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...rest } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...rest} />
    </SessionProvider>
  );
};

export default App;
