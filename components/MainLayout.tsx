import React from 'react'
import Head from 'next/head'

type MainLayoutProps = {
  title?: string
  children?: React.ReactNode
}

export const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>{children}</div>
    </>
  )
}
