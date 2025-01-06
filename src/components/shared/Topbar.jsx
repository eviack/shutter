import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useSignOutUser } from "@/appwrite/react-query/Mutations";
import { toast } from "@/hooks/use-toast";
import Loader from "./Loader";
import { userContext } from "@/context/AuthContext";

const Topbar = () => {
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

  // const signOut = ()=>{
  //   signOutUser().then(()=>{
  //     toast({title: "Logged Out successfully!"})
  //     navigate(0)
  //   })
  // }

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center" alt="logo">
          <Logo />
        </Link>

          <div className="flex gap-4">
            <Button onClick={() => signOutUser()}>
              <LogOut size={64} />
            </Button>

            <Link to={`/profile/${user.id}`} className="flex flex-center gap-3">
              <img
                src={user.imageUrl}
                alt="profile"
                className="h-8 w-8 rounded-full border-2 border-primary-500"
              />
            </Link>
          </div>
        
      </div>
    </section>
  );
};

export default Topbar;
