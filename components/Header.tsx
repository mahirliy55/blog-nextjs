import React from 'react'
import Link from 'next/link'

import styles from '../styles/Header.module.css' 

const Header: React.FC = () => {
  return (
    <header>
      <nav className={styles.container}>
        <h1>
          <Link href="/">
            <a>Blog</a>
          </Link>
        </h1>

        <ul>
          <li>
            <Link href="/posts/new">
              <a>Add Blog</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
