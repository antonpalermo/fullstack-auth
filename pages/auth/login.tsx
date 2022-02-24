import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

const SignInPage = ({ providers }) => {
  return (
    <>
      {Object?.values(providers).map(({ id, name }) => (
        <div key={name}>
          <button onClick={() => signIn(id)}>Sign In with {name}</button>
        </div>
      ))}
    </>
  );
};

export default SignInPage;
