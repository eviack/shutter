import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useSignOutUser } from "@/appwrite/react-query/Mutations";
import { toast } from "@/hooks/use-toast";
import Loader from "./Loader";
import { userContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants/Barlinks";
import { useLocation } from "react-router-dom";
import Name from "./Name";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    mutate: signOutUser,
    isPending: isSigningOut,
    isSuccess,
  } = useSignOutUser();

  // const {user, setIsAuthenticated} = userContext()
  const { user } = userContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar ">
      <div className="flex flex-col gap-10">
        <Link to="/" className="flex-col" alt="logo">
          <Logo />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl}
            alt="profile"
            className="h-14 w-14 rounded-full border-2 border-primary-500"
          />

          
          <div className="flex flex-col">
          <Name creator={user.username} isverified={user.verified} size={16}/>
            <p className="small-regular text-light-3"> @{user.name}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
     

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive ? "bg-primary-500" : ""
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4 group hover:text-white transition-colors"
                >
                  <span
                    className={`transition-colors ${
                      isActive ? "text-white" : "text-primary-500"
                    } group-hover:text-white`}
                  >
                    {link.icon}
                  </span>
                  <span className="text-light-2 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button className="shad-button_ghost" onClick={() => signOutUser()}>
        <LogOut size={64} />
        <p className="small-medium lg:base-medium"> Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
