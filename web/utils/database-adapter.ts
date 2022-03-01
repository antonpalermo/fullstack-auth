import { Awaitable, Account, User } from 'next-auth'
import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters'

import axios from 'axios'

export type SessionUser = {
  session: AdapterSession
  user: AdapterUser
}

export const DataAdapter = (
  options = {
    baseUrl: process.env.API_ENDPOINT
  }
): Adapter => {
  const axiosInstance = axios.create({
    baseURL: options.baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // createUser
  const createUser = async (
    user: Omit<AdapterUser, 'id'>
  ): Promise<AdapterUser> => {
    return await axiosInstance.post('/auth/create', {
      ...user
    })
  }

  const getUser = async (id: string): Promise<AdapterUser> => {
    return await axiosInstance.get(`/auth/user?id=${id}`)
  }

  const getUserByEmail = async (email: string): Promise<AdapterUser> => {
    return await axiosInstance.get(`/auth/user?email=${encodeURI(email)}`)
  }

  const getUserByAccount = (
    providerAccountId: Pick<Account, 'provider' | 'providerAccountId'>
  ): Awaitable<AdapterUser> => {
    return axiosInstance.get(`/auth/account?provider_id=${providerAccountId}`)
  }

  const updateUser = async (
    user: Partial<AdapterUser>
  ): Promise<AdapterUser> => {
    return await axiosInstance.patch('/auth/update', {
      ...user
    })
  }

  const linkAccount = (account: Account): Awaitable<Account> => {
    return axiosInstance.post('/auth/link', {
      ...account
    })
  }

  const unlinkAccount = async (
    providerAccountId: Pick<Account, 'provider' | 'providerAccountId'>
  ): Promise<void> => {
    axiosInstance.delete(`/auth/link?id=${providerAccountId}`)
  }

  const createSession = async (session: {
    sessionToken: string
    userId: string
    expires: Date
  }): Promise<AdapterSession> => {
    return await axiosInstance.post('/auth/session', {
      ...session
    })
  }

  const updateSession = async (
    session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>
  ): Promise<AdapterSession> => {
    return await axiosInstance.patch('/auth/session', { session })
  }

  const getSessionAndUser = async (
    sessionToken: string
  ): Promise<SessionUser> => {
    return await axiosInstance.get(
      `/auth/user_session?sessionToken=${sessionToken}`
    )
  }

  const deleteSession = async (sessionToken: string): Promise<void> => {
    return await axiosInstance.delete(`/auth/session?id=${sessionToken}`)
  }

  return {
    createUser,
    getUser,
    getUserByEmail,
    getUserByAccount,
    updateUser,
    linkAccount,
    unlinkAccount,
    createSession,
    updateSession,
    getSessionAndUser,
    deleteSession
  }
}
