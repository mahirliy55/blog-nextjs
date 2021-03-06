import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import styles from '../styles/Card.module.css'

import Button from '@material-ui/core/Button'

import {
  addBlog,
  putBlog,
  delBlog,
  addComment,
} from '../store/actions/blogActions'

interface Props {
  data?: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

const Card = ({ data }: Props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  let router = useRouter()

  const [comment, setComment] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    setTitle(data.title)
    setBody(data.body)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteBlog = async (
    event: React.MouseEvent<HTMLButtonElement>,
    blogID: string
  ) => {
    event.preventDefault()
    dispatch(delBlog(blogID))
  }
  const stateDel = useSelector((state) => state.blog)
  if (stateDel.deleted) {
    router.push('/')
  }

  const editBlog = async (
    event: React.FormEvent<HTMLFormElement>,
    blogID: string
  ) => {
    event.preventDefault()
    dispatch(
      putBlog(blogID, {
        title: title,
        body: body,
      })
    )
    setOpen(false)
  }

  const createComment = async (event: React.FormEvent) => {
    event.preventDefault()

    dispatch(addComment({ postId: data.id, body: comment }))

    setComment('')
  }

  return (
    <main>
      <Head>
        <title>Blog Detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <article>
          <header>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={(event) => deleteBlog(event, data.id)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ right: '22%' }}
              type="button"
              onClick={handleOpen}
            >
              Edit
            </Button>
          </header>
        </article>
        <figure>
          <img
            src={`https://picsum.photos/1040/673?random=1`}
            alt={data.title}
          />
        </figure>

        <section>
          <h3>Comments</h3>
          <ul>
            {data.comments?.map((comment: string, index: number) => (
              <li key={index}>{comment.body}</li>
            ))}
          </ul>
        </section>

        <section>
          <form action="" method="POST" onSubmit={createComment}>
            <TextareaAutosize
              value={comment}
              aria-label="minimum height"
              onChange={(e) => setComment(e.target.value)}
              rowsMin={10}
              cols={30}
              placeholder="Write body"
            />

            <Button variant="contained" color="primary" type="submit">
              Create Comment
            </Button>
          </form>
        </section>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Edit Blog</h2>

            <form
              className={styles.form}
              action=""
              method="POST"
              onSubmit={(event) => editBlog(event, data.id)}
            >
              <div>
                <TextField
                  required
                  id="standard-required"
                  value={title}
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <TextareaAutosize
                  placeholder="Body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <div>
                <Button variant="contained" color="primary" type="submit">
                  Edit
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </main>
  )
}

export default Card
