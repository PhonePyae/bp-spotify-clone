import { axiosInstance } from "@/lib/axios"
import { useAuth } from "@clerk/clerk-react"
import { useState, useEffect } from "react"
import {Loader} from 'lucide-react'

// Function to update the axios instance with the token
const updateApiToken = (token:string | null) => {
  if(token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in the axios instance
  else delete axiosInstance.defaults.headers.common['Authorization']; // Remove the token from the axios instance
} 

const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const {getToken} = useAuth();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
  const initAuth = async () => {
    try { 
      const token = await getToken();
      updateApiToken(token);
    } catch (error:any) {
      updateApiToken(null);
      console.error("Error initializing auth:", error);
    } finally {
      setLoading(false);
    }
  }; 
  initAuth(); 
  },[getToken]);

  if(loading) return (
    <div className=" h-screen w-full flex justify-center items-center">
      <Loader className="size-8 text-emerald-500 animate-spin" />
    </div>
  ); 
  

  return <div>{children}</div>
}

export default AuthProvider