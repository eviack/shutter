import Loader from "@/components/shared/Loader";
import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useGetPostById } from "@/appwrite/react-query/Mutations";
import { multiFormatDateString } from "@/utils/helper";
import { ArrowLeft, Edit, MoveLeft, Trash, Trash2 } from "lucide-react";
import { userContext } from "@/context/AuthContext";
import { useDeletePost } from "@/appwrite/react-query/Mutations";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = userContext();
  const navigate = useNavigate()

  const { mutate: deletePost, isSuccess, isPending: isDeleting } = useDeletePost();

  const handleDeletePost = () => {


    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1)
  
    
  };


  return (
    <div className="post_details-container">
      <div className="flex gap-2 items-center max-w-5xl w-full">
       
          <ArrowLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer md:size-7"/>

          <p className="body-medium lg:base-medium">Back</p>
        
      </div>

      {isPending || isDeleting ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.creator?.imageUrl}
                  alt="creator"
                  className="w-12 lg:h-12 rounded-full border-primary-500 border-2"
                />

                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post.$id}`}
                  className={`${post?.creator.$id !== user.id && "hidden"}`}
                >
                  <Edit />
                </Link>

                <Trash2
                  onClick={handleDeletePost}
                  className={`${
                    post?.creator.$id !== user.id && "hidden"
                  } mx-3`}
                  cursor="pointer"
                  size={25}
                  color="#d1001f"
                />
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="small-medium lg:base-medium py-5">
              <p>{post.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post.tags.map((tag, index) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
