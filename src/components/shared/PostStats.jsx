import { Bookmark, Heart } from "lucide-react";
import React from "react";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/appwrite/react-query/Mutations";
import { userContext } from "@/context/AuthContext";

const PostStats = ({ post, userId }) => {
    
  const likeslist = post.likes.map((user) => user.$id) ;

  const [likes, setLikes] = useState(likeslist);
  const [isSaved, setIsSaved] = useState(false);

  const {data : currentUser} = useGetCurrentUser()



  

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();
  const savedPostRecord = currentUser?.save.find(
    (record) => record.post?.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e) => {
   
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }


    setLikes(likesArray);
    likePost({postId: post.$id, likesArray} )
  };


  
  const handleSavePost = (
    e
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
  ? "w-full"
  : "";

  return (
    <div className={`flex justify-between items-center z-20 ${containerStyles} `}>
      <div className="flex gap-2 mr-5 items-center">
        <Heart
          size={25}
          fill={likes.includes(userId) ? "#d1001f" : "none"}
          strokeWidth={1.5}
        stroke={likes.includes(userId) ? "#d1001f" : "#e0e0e0"}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <Bookmark
          size={25}
          className={` ${isSaved ? "fill-current text-primary-500" : ""} cursor-pointer border-${isSaved ? "text-primary-500" : "none"} `}
          strokeWidth={1.5}
          onClick={(e) => handleSavePost(e)}
         
        />
      </div>
    </div>
  );
};

export default PostStats;
