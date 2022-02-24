import React from 'react'
import Link from 'next/link'

export const Nav = () => {
  return (
    <header>
      <nav>
        <Link href={'/'} passHref>
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href={'/about'} passHref>
          <a>About</a>
        </Link>
      </nav>
    </header>
  )
}
