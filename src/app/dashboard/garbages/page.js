'use client'
import React, { useEffect, useState } from 'react'
import { api } from '@/app/lib/api'
import { imageRender } from '@/app/components/imageRender'
import Link from 'next/link'

async function fetchGarbages (){
  const res = await fetch(api.Api+"wastes/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(loginInfo),
  })
 
  const data = await res.json()
  return data;
}


const Page = () => {
  const [alldata, setAllData] = useState([]);
  const [deleteGarbageId, setDeleteGarbageId] = useState(0);

  useEffect(()=>{
    const fetchWastes = async() =>{
      const data = await fetchGarbages();
      setAllData(data);
    }
    fetchWastes();
  },[deleteGarbageId])


  const deleteGarbage = async(e) => {
    const id = e.target.dataset.id;
    const res = await fetch(api.Api+"deletegarbage/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"garbage_id": id}),
    })
    const response = await res.json();
    if(response['message'] ==="Waste deleted"){
      setDeleteGarbageId(id);
    }
  }


  return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-0 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recent Waste products</h2>
           
          </div>
  
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {alldata && alldata.map((product, id) => (
              <div key={id} className="group relative mb-8">
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    height={100}
                    width={100}
                    src={imageRender(product.image)}
                    alt={product.description}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                    <span className="inset-0" />
                    {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{product.username}</p>
                <p className="mt-1 text-sm font-medium text-blue-400">{product.category}</p>
                <p className="mt-1 text-sm font-medium text-blue-400">
<button data-id={product.id} type='button' onClick={(e)=>deleteGarbage(e)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Garbage</button>
                </p>
              </div>
            ))}
          </div>
  
          {/* <div className="mt-8 text-sm md:hidden">
            <a href='' className="font-medium text-indigo-600 hover:text-indigo-500">
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div> */}
        </div>
      </div>
    )
  
}

export default Page
