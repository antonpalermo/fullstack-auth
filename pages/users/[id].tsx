import React from 'react'

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'

import { MainLayout } from '../../components/MainLayout'
import { signIn, useSession } from 'next-auth/react'

type UserDetailsProps = {
  user: User
}

const UserDetails = ({ user }: UserDetailsProps) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    }
  })

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <p>
          <strong>id</strong>: {user.id}
        </p>
        <p>
          <strong>name</strong>: {user.name}
        </p>
      </div>
    </div>
  )
}

UserDetails.getBaseLayout = (page: React.ReactElement) => (
  <MainLayout title="Users">{page}</MainLayout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sampleUserData.map(user => ({
    params: { id: user.id.toString() }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
  const id = params?.id
  const user = sampleUserData.find(user => user.id === Number(id))

  return {
    props: {
      user
    }
  }
}

export default UserDetails
