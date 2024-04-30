'use client';
import React, {useState, useEffect} from 'react'
import parse from 'html-react-parser';
import { api } from '@/app/lib/api';

async function fetchContent (id){
  const res = await fetch(api.Api+"getcontent/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"id": id}),
  })
 
  const data = await res.json()
  
  return data;
}


const Page = ({params}) => {
  
  const [content, setContent] = useState("");
  useEffect(()=>{
    const fetchAll = async() =>{
      const data = await fetchContent(params.id);
      setContent(data.content);
      }
    fetchAll();
  },[])
  return (
    
    <div>
      <h1 className='text-[40px] mb-8'>Content</h1>
      {content && parse(content)}
    </div>
  )
}

export default Page
