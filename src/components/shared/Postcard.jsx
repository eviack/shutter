import { Edit } from 'lucide-react';
import React from 'react'

import { multiFormatDateString } from '@/utils/helper';
import { Link } from 'react-router-dom';
import { userContext } from '@/context/AuthContext';
import PostStats from './PostStats';
import Name from './Name';

const Postcard = ({post}) => {

    const { user } = userContext();

    if (!post.creator) return;
    return (
        <div className="post-card">
          <div className="flex-between">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${post.creator.$id}`}>
                <img
                  src={
                    post.creator?.imageUrl
                  }
                  alt="creator"
                  className="w-12 lg:h-12 rounded-full border-primary-500 border-2"
                />
              </Link>
    
              <div className="flex flex-col">
                <Name creator={post?.creator?.name} isverified={post?.creator?.verified} size={18}/>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular ">
                    {multiFormatDateString(post.$createdAt)}
                  </p>
                  •
                  <p className="subtle-semibold lg:small-regular">
                    {post.location}
                  </p>
                </div>
              </div>
            </div>
    
            <Link
              to={`/update-post/${post.$id}`}
              className={`${user.id !== post.creator.$id && "hidden"}`}>
              <Edit/>
            </Link>
          </div>
    
          <Link to={`/posts/${post.$id}`}>
            <div className="small-medium lg:base-medium py-5">
              <p>{post.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post.tags.map((tag, index) => (
                  <li key={`${tag}${index}`} className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
    
            <img
              src={post.imageUrl}
              alt="post image"
              className="post-card_img"
            />
          </Link>
    
          <PostStats post={post} userId={user.id} />
        </div>
      );
}

export default Postcard
