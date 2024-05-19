'use client'
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { api } from '@/app/lib/api'
import { useAchieve } from '../api'


const Page = () => {
  const {data, isLoading, error} = useAchieve();
  
    return (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">All Achievements Lists</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all Achievements 
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
                        Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Category
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Trophy
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Points
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Username
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                {data && data.map((achievement,id) => (
                  <tr key={id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {achievement.description}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{achievement.date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{achievement.type}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{achievement.trophy}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{achievement.points}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{achievement.username}</td>
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
