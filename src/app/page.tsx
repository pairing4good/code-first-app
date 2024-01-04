import Image from 'next/image'
import { cookieBasedClient, isAuthenticated } from './utils/amplify-utils'
import Post from './components/Post'
import { onDeletePost } from './_actions/actions'

export default async function Home() {

  const { data: posts} = await cookieBasedClient.models.Post.list({
    selectionSet: ['title', 'id'],
    authMode: 'apiKey'
  })

  console.log('posts', posts)

  return (
    <main className="flex flex-col items-center justify-between p-24">
     <h1 className='text-2xl pb-10'>List of All Titles</h1>
      {posts?.map(async (post, idx) => (
        <Post
          onDelete={onDeletePost}
          post={post}
          key={idx}
          isSignedIn={await isAuthenticated()}
        />
      ))}
    </main>
  )
}
