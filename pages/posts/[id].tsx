import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchblog } from '../../store/actions/blogActions'

import Card from '../../components/Card'

interface Props {
  data?: any
}

const Post = (props: Props) => {
  const router = useRouter()
  const { id } = router.query
  const detailBlog = useSelector((state) => state.blog)

  console.log(detailBlog.blog)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchblog(id))
  }, [id])

  return (
    <>
      <Card data={detailBlog.blog} />
    </>
  )
}

export default Post
