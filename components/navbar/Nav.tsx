import React from 'react'
import { NavButton } from './NavButton'

export const Nav = () => {
  return (
    <header>
      <nav>
        <NavButton href="/">Home</NavButton> |{' '}
        <NavButton href="/about">About</NavButton> |{' '}
      </nav>
    </header>
  )
}
