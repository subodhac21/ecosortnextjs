
"use client"
import { api } from "../lib/api"
import { useRouter } from 'next/navigation'
import Image from "next/image";
import { useEffect, useState } from "react";
import {validateToken} from "../lib/validateToken";
// import { handleLogin } from "../lib/actions";

async function getData(loginInfo) {
    let isLogin = false;
const res = await fetch(api.Api+"loginadmin/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginInfo),
  })
 
  const data = await res.json()
  if(data?.message === "Login successful"){
    // handleLogin(data.)
    const token = localStorage.setItem('token', data.token);
    isLogin = true;
  }
  
  return isLogin;
//   return NextResponse.json(data)

}





export default  function Page() {
  const [fieldError, setFieldError] = useState("");
  const [loading, setLoading] = useState(true);
  const [logging, setLogging] = useState(false);
    // console.log(api.Api);
const router = useRouter();

  const [logininfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });


  const updateLoginInfo = (e) =>{
    setLoginInfo({...logininfo, [e.target.name]: e.target.value});
  }
  const loginAdmin = async(e) =>{
    e.preventDefault();
    if(logininfo.username != "" && logininfo.password != ""){
      setLogging(true);
        const data = await getData(logininfo);
        // console.log(data);
        if(data){
            router.push("/dashboard");
        }
        else{
          setLogging(false);
          setFieldError("Invalid username or password");
        }
    }
    else{
      setLogging(false);
      setFieldError("Please fill all fields");
    }
  }
  useEffect(()=>{
    // validateToken();
    const validateKey = async() =>{
      const status = await validateToken();
      console.log(status);  
      if(status[0] === true){
        router.push("/dashboard");
      }
      else{
        setLoading(false);
      }
    }
   
    validateKey();
    
  },[])
  // console.log(validateToken())
  if(loading === true){

<div role="status" className="bg-white">
    {/* <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span> */}
    <p>Loading...</p>
</div>

  }
  else{
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-900">
          <body class="h-full">
          ```
        */}
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto h-20 w-auto"
              src="/asset/Eco1.png"
              width={250}
              height={250}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <p className="text-[red] text-bold w-100 text-center">{fieldError}</p>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                  username
                </label>
                <div className="mt-2">
                  <input
                    value={logininfo.username}
                    onChange={(e)=>updateLoginInfo(e)}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                   value={logininfo.password}
                   onChange={(e)=>updateLoginInfo(e)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                onClick={(e)=>loginAdmin(e)}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {
                    logging === false ? " Sign in":  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                  }
                 
                 
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-400">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
                Request to be an Admin
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  
}