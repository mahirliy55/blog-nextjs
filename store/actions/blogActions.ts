import axios from 'axios'
import * as types from '../types'

export const fetchblogs = () => async (dispatch: any) => {
  const res = await axios.get('https://simple-blog-api.crew.red/posts')
  dispatch({
    type: types.GET_BLOGS,
    payload: res.data,
  })
}

// Detail card

export const fetchblog = (id: string) => async (dispatch: any) => {
  const res = await axios.get(
    `https://simple-blog-api.crew.red/posts/${id}?_embed=comments`
  )
  dispatch({
    type: types.GET_BLOG,
    payload: res.data,
  })
}

// Add cart

export const addBlog = (data: object) => async (dispatch: any) => {
  const headers = { 'Content-type': 'application/json' }
  const res = await axios.post(`https://simple-blog-api.crew.red/posts`, data, {
    headers,
  })

  if (res.status === 201) {
    dispatch({
      type: types.ADD_BLOG,
      payload: res.data,
    })
  }
}

export const putBlog = (id: string, data: object) => async (dispatch: any) => {
  const headers = { 'Content-type': 'application/json' }
  const res = await axios.put(
    `https://simple-blog-api.crew.red/posts/${id}`,
    data,
    {
      headers,
    }
  )
  if (res.status === 200) {
    dispatch({
      type: types.EDIT_BLOG,
      payload: res.data,
    })
  }
}

export const delBlog = (id: string) => async (dispatch: any) => {
  const res = await axios.delete(`https://simple-blog-api.crew.red/posts/${id}`)
  if (res.status === 204) {
    dispatch({
      type: types.DELETE_BLOG,
      payload: id,
    })
  }
}

export const addComment =
  (data: object) => async (dispatch: any) => {
    const headers = { 'Content-type': 'application/json' }
    const res = await axios.post(
      `https://simple-blog-api.crew.red/comments`,
      data,
      {
        headers,
      }
    )

    if (res.status === 201) {
      dispatch({
        type: types.ADD_COMMENT,
        payload: res.data,
      })
    }
  }
