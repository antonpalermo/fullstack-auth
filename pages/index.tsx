import Link from 'next/link'
import React from 'react'
import { MainLayout } from '../components/MainLayout'

const IndexPage = () => (
  <>
    <h1>Hello Next.js 👋</h1>
  </>
)

IndexPage.getBaseLayout = (page: React.ReactElement) => (
  <MainLayout title="Home">{page}</MainLayout>
)

export default IndexPage
