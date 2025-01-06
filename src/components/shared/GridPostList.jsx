import { userContext } from '@/context/AuthContext'
import React from 'react'
import PostStats from './PostStats'
import { Link } from 'react-router-dom'
import Name from './Name'

const GridPostList = ({posts, showUser=true, showStats=true}) => {
  const {user} = userContext()

  return (

    <ul className='grid-container'>
      
      {posts.map((post)=> (
        <li key={post.$id} className='relative min-w-80 h-80'>
          
         <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img src={post.imageUrl} alt={post.caption} className='w-full h-full object-cover'/>


         </Link>

         <div className='grid-post_user'>
          {showUser && (
            <div className='flex items-center  justify-start gap-2 flex-1'>
              <img src={post.creator.imageUrl} alt={post.creator.name} className='w-8 h-8 rounded-full border-2 border-primary-500'/>
              <Name creator={post.creator.name} isverified={post.creator.verified}/>

            </div>
          )}

          {showStats &&(
            <PostStats post={post} userId={user.id}/>
          )}

         </div>
        
        </li>

      ))}

    </ul>

    
  )
}

export default GridPostList
