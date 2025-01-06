import {
  useGetCurrentUser,
  useGetPostById,
} from "@/appwrite/react-query/Mutations";
import GridPostList from "@/components/shared/GridPostList";
import NotFound from "@/components/shared/NotFound";
import { Bookmark } from "lucide-react";
import React from "react";
import Loader from "@/components/shared/Loader";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
  ?.filter((savePost) => savePost?.post) // Filter out items without a valid `post`
  .map((savePost) => ({
    ...savePost.post,
    creator: {
      imageUrl: currentUser.imageUrl,
    },
  }))
  .reverse();

  return (
    <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
      <div className="flex flex-start items-center gap-3 w-full justify-start max-w-5xl">
        <Bookmark size={30} strokeWidth={2} />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved posts</h2>
      </div>

 
      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            
            <div className="w-full flex flex-col items-center justify-center gap-5">
  <NotFound message="No saved posts"/>
</div>
      
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
      
    </div>
  );
};

export default Saved;
