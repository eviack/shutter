import { useGetCurrentUser } from '@/appwrite/react-query/Mutations'
import React from 'react'
import GridPostList from './GridPostList'
import Loader from './Loader'

const LikedPosts = () => {
    const{data:currentUser, isLoading} = useGetCurrentUser()

    if (isLoading)
        return (
          <div className="flex-center w-full h-full">
            <Loader />
          </div>
        );

  return (
    <>
      {currentUser?.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser?.liked} showStats={false} />
    </>
  )
}

export default LikedPosts
