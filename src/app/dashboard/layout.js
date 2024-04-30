"use client"
import Example from "../components/leftbar";
import { useEffect, useState } from "react";
import { validateToken } from "../lib/validateToken";
import {useRouter} from "next/navigation";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    const [username, setUsername] = useState("");
    const router = useRouter(); 
    useEffect(()=>{
      // validateToken();
      const validateKey = async() =>{
        const status = await validateToken();
        if(status[0] === false){
          router.push("/login");
        }
       
      }
      validateKey();
      
    },[])
    return (
      <section className="bg-white">
        <Example>
        
        {children}
        </Example>
      </section>
    )
  }