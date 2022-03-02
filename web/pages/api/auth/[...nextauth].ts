import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import NextAuth, { Awaitable, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const api = axios.create({
    baseURL: process.env.API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await NextAuth(req, res, {
    providers: [
      Credentials({
        name: 'Credentials',
        credentials: {
          identity: {
            type: 'text',
            label: 'Username or Email address',
            placeholder: 'Username or Email address'
          },
          password: {
            type: 'password',
            label: 'Password',
            placeholder: 'Password'
          }
        },
        authorize: async credential => {
          const request = await fetch('http://localhost:3000/auth/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credential)
          })

          const data = await request.json()

          if (data?.message) {
            return null
          }

          return data
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
    adapter: {
      createUser: async user => {
        return await api.post('/auth/create', user)
      },
      getUser: async (id: string) => {
        return await api.get('/auth/user?id=' + id)
      },
      getUserByEmail: async (email: string) => {
        return await api.get('/auth/user?email=' + email)
      },
      getUserByAccount: async providerAccountId => {
        console.log(providerAccountId)
        return await api.get(
          '/auth/account?provider_id=' + providerAccountId.providerAccountId
        )
      },
      updateUser: async user => {
        return await api.patch('auth/update', user)
      },
      deleteUser: async userId => {
        await api.delete('/auth/delete?id=' + userId)
      },
      linkAccount: async account => {
        await api.post('/auth/link', account)
      },
      unlinkAccount: async providerAccountId => {
        await api.delete('auth/link?id=' + providerAccountId)
      },
      createSession: async session => {
        return await api.post('/auth/session', session)
      },
      updateSession: async session => {
        await api.patch('/auth/session', session)
        return null
      },
      getSessionAndUser: async sessionToken => {
        return await api.get('/auth/user_session?sessionToken=' + sessionToken)
      },
      deleteSession: async sessionToken => {
        api.delete('/auth/session?sessionToken=' + sessionToken)
      }
    },
    callbacks: {}
  })
}

export default handler
