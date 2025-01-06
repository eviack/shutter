import { useGetRecentPosts } from '@/appwrite/react-query/Mutations'
import React from 'react'
import Loader from '@/components/shared/Loader'
import Postcard from '@/components/shared/Postcard'

function Home() {
    const {data: posts, isPending: isPostLoading, isError} = useGetRecentPosts()



  return (
    <div className='flex flex-1'>
        <div className='home-container'>
            <div className='home-posts'>
                <h2 className='h3-bold md:h2-bold text-left w-full'>
                    Home Feed
                </h2>

                {isPostLoading && !posts ? (
                    <Loader/>
                ):(
                    <ul className="flex flex-col flex-1 gap-9 w-full">
                        {posts?.documents.map((post)=>(
                            <li key={post.$id} className='flex justify-center w-full'>

                                <Postcard post = {post}/>
                            </li>
                        ))}

                    </ul>
                )}

            </div>
        </div>
        
      
    </div>
  )
}

export default Home
