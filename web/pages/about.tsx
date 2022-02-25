import React from 'react'
import { MainLayout } from '../components/MainLayout'

const About = () => {
  return <h1>Next.js is awesome 🤟😍</h1>
}

About.getBaseLayout = (page: React.ReactElement) => (
  <MainLayout title="About">{page}</MainLayout>
)

export default About
