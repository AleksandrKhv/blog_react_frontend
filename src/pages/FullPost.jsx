import React, { useEffect, useState } from 'react'

import { Post } from '../components'
import { Index } from '../components'
import { CommentsBlock } from '../components'
import { useParams } from 'react-router-dom'
import axios from '../axios'
import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert('Error getting article')
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.user}
        createdAt={data.creatdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Max Mini',
              avatarUrl: 'https://mui.com/static/images/avatar/7.jpg'
            },
            text: 'This is a test comment.'
          },
          {
            user: {
              fullName: 'Max Maxi',
              avatarUrl: 'https://mui.com/static/images/avatar/6.jpg'
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top'
          }
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  )
}
