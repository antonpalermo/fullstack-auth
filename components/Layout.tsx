import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { signIn, signOut, useSession } from 'next-auth/react';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { data } = useSession();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href='/about'>
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href='/users'>
            <a>Users List</a>
          </Link>{' '}
          | <a href='/api/users'>Users API</a> |{' '}
          {data?.user ? (
            <button onClick={() => signOut()}>Sign Out</button>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default Layout;
