import React from 'react'

import Card from '../../components/Card'

interface Props {
  data?: any
}

const Post = (props: Props) => {
  return (
    <>
      <Card data={props.data} />
    </>
  )
}

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await fetch(
    `https://simple-blog-api.crew.red/posts/${params.id}?_embed=comments`
  )
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Post
