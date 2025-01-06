import { useGetPostById } from '@/appwrite/react-query/Mutations'
import PostForm from '@/components/forms/PostForm'
import { ImagePlus } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '@/components/shared/Loader'

const EditPost = () => {

    const {id} = useParams() // to load params from url

    const {data: post, isPending} = useGetPostById(id ||"")

    if(isPending) return <Loader/>
  return (
    <div className='flex flex-1'>
        <div className='common-container'>
            <div className='max-w-5xl flex-start gap-3 w-full justify-start'>
                <ImagePlus size={30} strokeWidth={2}/>
                <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>

            </div>

        
            <PostForm action="Update" post={post}/>


        </div>
    </div>
  )
}

export default EditPost
