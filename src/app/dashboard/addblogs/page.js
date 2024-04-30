"use client";
import React, {useState, useEffect} from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { api } from '@/app/lib/api'
import { useRouter } from 'next/navigation'


async function fetchCategory (){
  const res = await fetch(api.Api+"getcategory/", {
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
  const router = useRouter();
  const [catname, setCatname] = useState([]);
  const [modal, setModal] = useState(false);
  const [catValue, setCatValue] = useState("");
  const [blogValue, setBlogValue] = useState({
    blog_title: "",
    blog_content: "",
    category_id: ""
  });

  const changeBlogValue = (e) =>{
    setBlogValue({...blogValue, [e.target.name]:e.target.value})
  }

  useEffect(()=>{
    const fetchAll = async() =>{
      const data = await fetchCategory();
      setCatname(data);
    }
    fetchAll();
  },[catValue])

  const changeCatValue = (e) =>{
    setCatValue(e.target.value);
  }
  console.log(blogValue);

  const addCategory = async(e) =>{
    
    e.preventDefault();
    if(catValue!= ""){
    const res = await fetch(api.Api+"addcategory/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"category_name": catValue}),
    })
    
    const data = await res.json()
    if(data){
      setModal(false);
      setCatValue("");
    }
    }
   
  }


  const addBlog = async(e) =>{
    e.preventDefault();
    if(blogValue.blog_title!= "" && blogValue.blog_content!= "" && blogValue.category_id!= ""){
    const res = await fetch(api.Api+"addblog/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogValue),
    })

    const data = await res.json()
    if(data){
      router.push("/dashboard/blogs");
    }
  }
}


  return (

<>
{/* category modal */}
<div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={` ${modal === false ? 'hidden': "block"} overflow-y-auto overflow-x-hidden left-[-0.5%] fixed md:top-[20%] md:left-[35%] md:translate-x-[0%] md:translate-y-[0%] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-white dark:text-white">
                    Add a Category
                </h3>
                <button onClick={()=>{setModal(false)}} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span  className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <form className="space-y-4" action="#" onSubmit={(e)=>addCategory(e)}>
                    <div>
                        <label htmlFor="cname" className="block mb-2 text-sm font-medium text-white dark:text-white">Category Name</label>
                        <input value={catValue} onChange={(e)=>changeCatValue(e)} type="text" name="cname" id="cname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                  
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>
            </div>
        </div>
    </div>
</div> 

{/* end modal */}


    <form className={`${modal == true ? "hidden": "block"}`}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Blogs</h2>
         

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="blog_title"
                    id="title"
                    value={blogValue.blog_title}
                    onChange={(e)=>changeBlogValue(e)}
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                Blog Content
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="blog_content"
                  rows={8}
                  value={blogValue.blog_content}
                  onChange={(e)=>changeBlogValue(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write in the form of html.</p>
            </div>
            
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Categoy Info</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            

            <div className="sm:col-span-3">
              <label htmlFor="category_id" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category_id"
                  name="category_id"
                  value={blogValue.category_id}
                  onChange={(e)=>changeBlogValue(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                   <option disabled>Select Category</option>
                   <option className='text-[green]' onClick={(e)=>setModal(true)} value="">New Category</option>
                  {
                    catname && catname.map((item,index) => (
                      <option value={item.id} key={index}>{item.category_name}</option>
                    ))
                  }
                 
                 
                </select>
              </div>
            </div>


           

           

           
          </div>
        </div>

       
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
       
        <button
        onClick={(e)=>addBlog(e)}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    
</>
  )
}

export default Page
