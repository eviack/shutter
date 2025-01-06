import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userContext } from "@/context/AuthContext";


function AuthLayout() {

  const {isAuthenticated} = userContext()
  
  const navigate = useNavigate()

  return(
    <>
    {isAuthenticated ? (
        navigate("/")
    ): (
        <>
        <section className="flex flex-1 justify-center items-center flex-col">
            <Outlet/>
        </section>
        </>
    )}
    </>
  )
}

export default AuthLayout;
