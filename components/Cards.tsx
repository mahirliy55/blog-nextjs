import React from 'react'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

interface DataProps {
  data?: any
}

interface Card {
  id: string
  title: string
  body: string
}

const Cards = ({ data }: DataProps) => {
  const cards = data

  return (
    <>
      {cards
        .sort((a, b) => b.id - a.id)
        ?.map((card: Card, index: number) => (
          <div className={styles.cards} key={card.id}>
            <Link href={`/posts/${card.id}`}>
              <a>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <img
                      src={`https://picsum.photos/320/200?random=${index}`}
                      alt={card.title}
                    />
                    <h2>{card.title}</h2>
                    <p>{card.body}</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
    </>
  )
}

export default Cards
