import { api } from '@/app/lib/api'
import useSWR from 'swr'



const fetcher = (...args) => fetch(...args).then(res => res.json())



function useUser () {
  const { data, error, isLoading } = useSWR(`${api.Api}users/`, fetcher)
 
  return {
    user: data,
    isLoading,
    isError: error
  }
}



function useAchieve () {
  const { data, error, isLoading } = useSWR(`${api.Api}allachieve/`, fetcher)
 
  return {
    data: data,
    isLoading,
    isError: error
  }
}

export {useUser, useAchieve}