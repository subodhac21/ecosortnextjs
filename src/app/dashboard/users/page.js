'use client'
import Link from 'next/link'
import React,{useState, useEffect} from 'react'
import { api } from '@/app/lib/api'
import { useUser } from '../api'
import { useSWRConfig } from 'swr'

async function fetchUsers (){
  const res = await fetch(api.Api+"users/", {
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
  const [deleteUserId, setDeleteUserId] = useState(0);
  // console.log(user);
  const {user, isLoading, error} = useUser();

  const { mutate } = useSWRConfig()


const deleteUser = async(e) => {

  const id = e.target.dataset.id;

  const res = await fetch(api.Api+"deleteuserbyid/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"user_id": id}),
  })

  const response = await res.json();

  if(response['message'] ==="User deleted"){
    // setDeleteUserId(id);
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    mutate(`${api.Api}user/`)
  }
}

    return (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">All Users Lists</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all Users 
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Username
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Last Login
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Is SuperUser
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Delete
                     </th>
                      
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                {user && user.map((users,id) => {
 if(users.is_superuser === false){
  return <tr key={id}>
  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
    {users.username}
  </td>

  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{users.last_login}</td>
  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{users.email}</td>
  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{users.is_superuser === false ? "no": "yes"}</td>
  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><button data-id={users.id} type='button' onClick={(e)=>deleteUser(e)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete User</button></td>
</tr>
}
                
                
                 
                 
})}
              </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Page
