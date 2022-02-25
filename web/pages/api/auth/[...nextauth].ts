import { NextApiRequest, NextApiResponse } from 'next'

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    ]
  })
}

export default handler
