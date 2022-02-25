import React from 'react'
import Head from 'next/head'
import { Nav } from './navbar/Nav'

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
      <Nav />
      <div>{children}</div>
    </>
  )
}
