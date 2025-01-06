import React from "react";
import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/Forms/SigninForm";
import SignupForm from "./_auth/Forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./pages/_root/RootLayout";
import { Toaster } from "./components/ui/toaster";

import {Home, UpdateProfile, EditPost, Profile,
  Saved, CreatePost, Explore, PostDetails, AllUsers
} from "./pages";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster/>
    </main>
  );
};

export default App;
