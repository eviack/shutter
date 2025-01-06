
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/appwrite/api";
import { Verified } from "lucide-react";


const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  verified: false
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => {},
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({children})=>{

    const navigate = useNavigate()
    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuthUser = async() =>{
        try {
            const current = await getCurrentUser()
            if(current){
                setUser({
                    id: current.$id,
                    name: current.name,
                    username: current.username,
                    email: current.email,
                    imageUrl: current.imageUrl,
                    bio: current.bio,
                    verified: current.verified
                })

                setIsAuthenticated(true)
                return true
            }
            
        } catch (error) {
            console.log(error)
            return false
            
        }finally{
            setIsLoading(false)
        }

    }

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
          cookieFallback === "[]" ||
          cookieFallback === null ||
          cookieFallback === undefined
        ) {
          navigate("/sign-in");
        }
      
        checkAuthUser();
      }, []);
      

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser

    }




    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}


export const userContext = ()=> useContext(AuthContext)

export default AuthProvider
