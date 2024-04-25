'use client'
import Link from 'next/link'
import React,{useState, useEffect} from 'react'
import { api } from '@/app/lib/api'

async function fetchCampaign (){
  const res = await fetch(api.Api+"allcampaign/", {
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

  useEffect(()=>{
    const fetchCampaign2 = async() =>{
      const data = await fetchCampaign();
      setAllData(data);
    }
    fetchCampaign2();
  },[])
    return (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Campaign Lists</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all Campaign including their name, objective, startdate and enddate.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
              href={"/dashboard/campaigns"}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Campaign
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
                        Campaign Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Objective
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Location
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Target Audience
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Start Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                {alldata.length === 0 ? "No data available" : alldata.map((campaign,id) => (
                  <tr key={id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {campaign.campaign_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.objective}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.location}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.target_audience}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.start_date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.status}</td>
                    
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
