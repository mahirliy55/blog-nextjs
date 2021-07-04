import React, { useState } from 'react'
import Head from 'next/head'

import TextField from '@material-ui/core/TextField'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import styles from '../../styles/CardCreate.module.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
)

const New = () => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const createBlog = async (event: React.FormEvent) => {
    event.preventDefault()

    const res = await fetch('https://simple-blog-api.crew.red/posts', {
      body: JSON.stringify({
        title: title,
        body: body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    setTitle('')
    setBody('')
  }

  return (
    <div>
      <Head>
        <title>Add Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <React.Fragment>
        <form
          action=""
          method="POST"
          className={`${classes.root} ${styles.container}`}
          onSubmit={createBlog}
        >
          <TextField
            required
            id="standard-required"
            value={title}
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaAutosize
            value={body}
            aria-label="minimum height"
            onChange={(e) => setBody(e.target.value)}
            rowsMin={10}
            cols={30}
            placeholder="Write body"
          />
          <button type="submit">Create Blog</button>
        </form>
      </React.Fragment>
    </div>
  )
}

export default New
