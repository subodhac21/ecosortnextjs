'use client';
import React, { useState } from 'react'

const AppData = ({data}) => {
    const [email, setEmail] = useState(false);
  return (
    <div>
        {data.map((d, id)=>{
            return <div key={id}>
                <p>{d.username}</p>
                <h1>{d.email}</h1>
            </div>
        })}
    </div>
  )
}

export default AppData
