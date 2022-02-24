import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { NavButton } from './NavButton'

export const Nav = () => {
  const { data: session } = useSession()

  return (
    <header>
      <nav>
        <NavButton href="/">Home</NavButton> |{' '}
        <NavButton href="/about">About</NavButton> |{' '}
        <button onClick={() => (session ? signOut() : signIn())}>
          {session ? 'Sign Out' : 'Sign In'}
        </button>
      </nav>
    </header>
  )
}
