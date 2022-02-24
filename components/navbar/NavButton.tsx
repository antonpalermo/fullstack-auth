import React from 'react'
import Link from 'next/link'

type NavButtonProps = {
  href: string
  children: React.ReactNode
}

export const NavButton = ({ href, children: content }: NavButtonProps) => (
  <Link href={href} passHref>
    <a>{content}</a>
  </Link>
)
