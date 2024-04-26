'use client';
import React, { useState } from 'react'
import { api } from '@/app/lib/api';

const Page = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(null);
    const [image, setImage] = useState(null);
    const handleChange = (e) => {
        setImage(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);
        const res = await fetch(api.Api+"checkwaste/", {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()
        setResult(data.category);
        setLoading(false);
    }
  return (
<>
<form className="max-w-md mx-auto" onSubmit={(e)=>handleSubmit(e)}>
 <p className='text-[25px] font-bold'>Check garbage using strongest AI</p>
  <div className="mt-8 mb-8">

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
<input onChange={(e)=>handleChange(e)} name='image' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check</button>
</form>

{loading===true ? <p className='text-center mt-16'>Loading...</p> : loading === false ? <p className='font-bold text-[18px] text-center mt-16'>Result: {result}</p> : ""}

</>
  )
}

export default page
