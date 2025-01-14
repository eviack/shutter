import PostForm from '@/components/forms/PostForm'
import { ImagePlus } from 'lucide-react'
import React from 'react'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
        <div className='common-container'>
            <div className='max-w-5xl flex-start gap-3 w-full justify-start'>
                <ImagePlus size={30} strokeWidth={2}/>
                <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>

            </div>

        
            <PostForm action="Create"/>


        </div>
    </div>
  )
}

export default CreatePost
