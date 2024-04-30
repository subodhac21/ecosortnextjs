"use client";
import Link from 'next/link'
import React,{useState, useEffect} from 'react'
import { api } from '@/app/lib/api'
import { useRouter } from 'next/navigation'




async function fetchBlogs (){
  const res = await fetch(api.Api+"getblogs/", {
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
    const [alldata, setAllData] = useState([]);
    const [catname, setCatname] = useState([]);
    const [deleteId, setDeleteId] = useState("");

    useEffect(()=>{
      const fetchAll = async() =>{
        const data = await fetchBlogs();
        setAllData(data.data);
        setCatname(data.item);
      }
      fetchAll();
    },[deleteId])

    const deleteBlog = async(id) =>{
      const res = await fetch(api.Api+"deleteblog/", {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"id": id}),
      })
     
      const data = await res.json()
      if(data['message']=== "deleted"){
        setDeleteId(id);
      }
      
    }

      return (
        <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">All Blogs Lists</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all Blogs 
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
              href={"/dashboard/addblogs"}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Blog
              </Link>
            </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                   Blog Name
                 </th>
                 <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                   Category
                 </th>
                 <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                   Content
                 </th>
                 <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                   Action
                 </th>
                 
                
             </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
              {alldata.map((blog,id) => (
                <tr key={id}>
                             <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                               {blog.blog_title}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{catname && catname[id]}</td>
                              <td  className="cursor-pointer whitespace-nowrap px-3 py-4 text-sm text-gray-500">{blog.blog_content.slice(0,50)}...
                              <div className='text-[green]' onClick={()=>{router.push("/dashboard/blogs/"+blog.id)}}>
                                Go To Content
                              </div>

                              
                              </td>
                              <td onClick={(e)=>deleteBlog(blog.id)} className="cursor-pointer whitespace-nowrap px-3 py-4 text-sm text-[red]">Delete</td>

                           </tr>
              ))}
            </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        )
}

export default Page





