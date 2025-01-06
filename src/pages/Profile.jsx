import React from "react";
import { useParams } from "react-router-dom";
import { userContext } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";
import { useGetUserById } from "@/appwrite/react-query/Mutations";
import Name from "@/components/shared/Name";
import { Routes, Route, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/shared/GridPostList";
import LikedPosts from "@/components/shared/LikedPosts";
import { Link } from "react-router-dom";
import { Edit, Heart, Images } from "lucide-react";
import Loader from "@/components/shared/Loader";

const StatBlock = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center px-4 text-center cursor-pointer hover:opacity-80 transition-opacity">
    <p className="small-semibold lg:body-bold text-light-1">{value}</p>
    <p className="small-medium lg:base-medium text-light-3">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = userContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="flex items-center md:mb-8 xl:items-start gap-8 flex-col relative max-w-5xl w-full">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-8 xl:pl-20 ">
          <img
            src={currentUser?.imageUrl}
            alt="profile"
            className="h-28 w-28 rounded-full border-2 border-primary-500 "
          />

          <div className="flex flex-col items-center xl:items-start w-full gap-2 ">
            <div className="flex flex-1 justify-between gap-3 flex-col  xl:flex-row md:mt-2  ">
              <div className="flex flex-col w-full ">
                <Name
                  creator={currentUser?.name}
                  isverified={currentUser?.verified}
                  size={29}
                  className="text-center xl:text-left h3-bold md:h1-semibold  "
                />

                <div className="flex items-center justify-center xl:justify-start gap-2">
                  <p className="small-regular md:small-regular text-light-3 text-center xl:text-left ">
                    @shutter/{currentUser?.username}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <div
                  className={`${
                    user.id !== currentUser?.$id && "hidden"
                  } xl:px-10 xl:py-2`}
                >
                  <Link
                    to={`/update-profile/${currentUser?.$id}`}
                    className={`h-8 bg-dark-4 p-5  text-light-1 flex-center gap-2 rounded-lg ${
                      user.id !== currentUser?.$id && "hidden"
                    }`}
                  >
                    <Edit className="text-secondary-500" size={18} />
                    <p className="flex whitespace-nowrap small-medium">
                      Edit Profile
                    </p>
                  </Link>
                </div>
                <div
                  className={`${user.id === id && "hidden"} xl:px-5 xl:py-2`}
                >
                  <Button type="button" className="shad-button_primary px-8">
                    Follow
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center xl:items-start">
              <div className="flex xl:justify-start flex-wrap z-20 space-x-4 py-4">
                <StatBlock value={currentUser?.posts.length} label="posts" />
                <StatBlock value="4.5M" label="followers" />
                <StatBlock value="1,256" label="following" />
              </div>

              <p className="small-regular md:base-regular text-center xl:text-left mt-7 max-w-screen-sm">
                {currentUser?.bio}
              </p>
            </div>
          </div>
        </div>

        {currentUser?.$id === user.id ? (
          <div className="flex max-w-5xl w-full">
            <Link
              to={`/profile/${id}`}
              className={`profile-tab rounded-l-lg ${
                pathname === `/profile/${id}` && "!bg-dark-3"
              }`}
            >
              <Images className="text-primary-500" />
              Posts
            </Link>
            <Link
              to={`/profile/${id}/liked-posts`}
              className={`profile-tab rounded-r-lg ${
                pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
              }`}
            >
              <Heart className="text-primary-500" />
              Liked Posts
            </Link>
          </div>
        ) : (
          <div className="flex max-w-5xl w-full">
            <Link
              to={`/profile/${id}`}
              className={`profile-tab rounded-l-lg ${
                pathname === `/profile/${id}` && "!bg-dark-3"
              }`}
            >
              <Images color="#877EFF" />
              Posts
            </Link>
          </div>
        )}
      </div>

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser?.posts} showUser={false} />}
        />
        {currentUser?.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
