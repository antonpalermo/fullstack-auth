import React from 'react'

import { getSession } from 'next-auth/react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'

import { MainLayout } from '../../components/MainLayout'
import Link from 'next/link'

type UserProps = {
  users: User[]
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let users: User[]
  const session = await getSession(ctx)

  if (session) {
    users = sampleUserData
  } else {
    return {
      redirect: {
        destination:
          '/api/auth/signin?callbackUrl=' + encodeURIComponent(ctx.resolvedUrl),
        permanent: false
      }
    }
  }

  return {
    props: {
      users
    }
  }
}

const Users = ({ users }: UserProps) => {
  return (
    <div>
      <h1>List of available users 👨‍👨‍👦‍👦</h1>
      {users?.map(user => (
        <div key={user.id}>
          <Link href={`/users/${user.id}`}>
            <a>{`${user.id} : ${user.name}`}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

Users.getBaseLayout = (page: React.ReactElement) => (
  <MainLayout title="Users">{page}</MainLayout>
)

export default Users
