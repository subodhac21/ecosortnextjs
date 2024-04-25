import React from 'react'
import { api } from "../lib/api"

const validateToken = async() => {
    const token = localStorage.getItem('token');
    if(token != null){
        let isLogin = false;
        const res = await fetch(api.Api+"validateAdmin/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token}),
          })
          const data = await res.json()
          if(data?.valid_token === true){
            // handleLogin(data.)
            isLogin = true;
          }
          
          return [isLogin, data?.username]; 
    }
    else{
        return [false];
    }
    
}

export {validateToken}
