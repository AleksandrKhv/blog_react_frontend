import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'

import { Post } from '../components'
import { TagsBlock } from '../components'
import { CommentsBlock } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchTags } from '../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading
            ? [...Array(5)]
            : posts.items).map((post, id) =>
            isPostsLoading
              ? (<Post key={id} isLoading={true} />)
              : (<Post
                  key={id}
                  id={post._id}
                  title={post.title}
                  imageUrl={post.imageUrl ? `http://localhost:7777${post.imageUrl}`: ''}
                  user={post.user}
                  createdAt={post.createdAt}
                  viewsCount={post.viewsCount}
                  commentsCount={3}
                  tags={post.tags}
                  isEditable={userData?._id === post.user._id}
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Max Mini',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'
                },
                text: 'This is a test comment.'
              },
              {
                user: {
                  fullName: 'Max Maxi',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg'
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla dolor dapibus lacus blandit tincidunt. Nulla sed rutrum diam, eu semper risus. Mauris fermentum leo dolor, non efficitur purus dapibus commodo. Etiam luctus nisl vitae metus congue, sed venenatis libero aliquet. In nec quam nec tortor interdum aliquam et ac odio. Quisque porttitor est quis nulla laoreet, sed rutrum nulla consequat. Phasellus iaculis viverra venenatis. Ut elementum venenatis eros, nec sagittis dui vulputate viverra. Sed eleifend sapien ipsum, sed dapibus dolor rutrum eget. Maecenas non ante interdum, mollis nunc ac, volutpat ante. Integer non orci at justo placerat porta ac vitae sapien. In leo est, consequat eget risus eget, porta varius augue. Cras non nulla leo.'
              }
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  )
}
