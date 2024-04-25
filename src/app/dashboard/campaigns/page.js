'use client'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation';
import { api } from '@/app/lib/api';

async function submitData(campaignData) {
  let isSaved = false;
const res = await fetch(api.Api+"addcampaign/", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(campaignData),
})

const data = await res.json()
console.log(data);
// if(data?.message === "Login successful"){
//   // handleLogin(data.)
//   const token = localStorage.setItem('token', data.token);
//   isLogin = true;
// }

return isSaved;
//   return NextResponse.json(data)

}




const page = () => { 
  const router = useRouter();
  const [vars, setVars] = useState({
    campaign_name: "", target_audience: "",  location: "", objective: "", start_date: "", end_date: "" , status: "planned"
  })

  const changeField = (e) =>{
    setVars({...vars, [e.target.name]:e.target.value})
  }
  const submitCampaign = async(e) =>{
    e.preventDefault();
    if(vars.campaign_name != "" && vars.target_audience != "" && vars.location != "" && vars.objective != "" && vars.start_date != "" && vars.end_date != "" && vars.status != ""){
      const data = await submitData(vars);
      router.push("/dashboard/campaignList");
    }
  }
  return (
    <><div>
    <div className='w-100 md:h-screen h-[200vh] bg-white'>
    <form className="w-full max-w-xxl" onSubmit={(e)=>{submitCampaign(e)}}>
      <p className='text-xl font-bold mb-5'>Add a Campaign</p>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Campaign Name
      </label>
      <input value={vars.campaign_name} name='campaign_name' onChange={(e)=>{changeField(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Campaign Name" />
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>  
    <div className="w-full md:w-1/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Target Audience
      </label>
      <input value={vars.target_audience} name='target_audience' onInput={(e)=>{changeField(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" />
    </div>
    <div className="w-full md:w-1/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Location
      </label>
      <input value={vars.location} name='location' onInput={(e)=>{changeField(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6 md:w-100">
    <div className="w- full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Objective
      </label>
      <textarea name='objective' value={vars.objective} onChange={(e)=>{changeField(e)}} rows={5} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password"/>
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
       Start Date
      </label>
      <input type="date" value={vars.start_date} name='start_date' onInput={(e)=>{changeField(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
  <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
       End Date
      </label>
      <input type="date" value={vars.end_date} name='end_date' onInput={(e)=>{changeField(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" />
    </div>
   
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
        Status
      </label>
      <select value={vars.status} onChange={(e)=>{changeField(e)}} name='status' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" >\
      <option value="planned">Planning</option>
      <option value="ongoing">Ongoing</option>
      <option value="completed">Completed</option>
        </select>
    </div>
    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-8'>
      <button type='submit' className='border border-black bg-[#14B8A6] hover:opacity-[0.8] hover:transition-all text-white px-8 py-2'>Add</button>
    </div>
  </div>
</form>
    </div>
    </div>
    </>
  )
}

export default page
