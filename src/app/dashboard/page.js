'use client'
import React, {useState, useEffect} from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { api } from '../lib/api'

async function fetchGarbages (){
  const res = await fetch(api.Api+"wastes/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(loginInfo),
  })
 
  const data = await res.json()
  // console.log(data);
  let finalCategory = [
    { id: 0, value: 0, label: 'battery' },
    { id: 1, value: 0, label: 'biological' },
    { id: 2, value: 0, label: 'brown-glass' },
    { id: 3, value: 0, label: 'cardboard' },
    { id: 4, value: 0, label: 'clothes' },
    { id: 5, value: 0, label: 'green-glass' },
    { id: 6, value: 0, label: 'metal' },
    { id: 7, value: 0, label: 'paper' },
    { id: 8, value: 0, label: 'plastic' },
    { id: 9, value: 0, label: 'shoes' },
    { id: 10, value: 0, label: 'trash' },
    { id: 11, value: 0, label: 'white-glass' },

  ];
  let battery = 0;
  let biological = 0;
  let brownGlass = 0;
  let cardboard = 0;
  let clothes = 0; 
  let greenGlass = 0;
  let metal = 0;
  let paper = 0;
  let plastic = 0;
  let shoes = 0;
  let trash = 0;
  let whiteGlass = 0;
  data.forEach((categoryAll)=>{
   
   
    if(categoryAll.category === "battery"){

      battery = battery + 1;
    }
    if(categoryAll.category === "biological"){
      biological = biological + 1;
    }
    if(categoryAll.category === "brown-glass"){
      brownGlass = brownGlass + 1;
    }
    if(categoryAll.category === "cardboard"){
      cardboard = cardboard + 1;
    } 
    if(categoryAll.category === "clothes"){
      clothes = clothes + 1;
    }
    if(categoryAll.category === "green-glass"){
      greenGlass = greenGlass + 1;
    }
    if(categoryAll.category === "metal"){
      metal = metal + 1;
    }
    if(categoryAll.category === "paper"){
      paper = paper + 1;
    }
    if(categoryAll.category === "plastic"){
      plastic = plastic + 1;
    }
    if(categoryAll.category === "shoes"){
      shoes = shoes + 1;
    }
    if(categoryAll.category === "trash"){
      trash = trash + 1;
    }
    if(categoryAll.category === "white-glass"){
      whiteGlass = whiteGlass + 1;
    }
  }
  
)
finalCategory[0].value = battery;
finalCategory[1].value = biological;
finalCategory[2].value = brownGlass;
finalCategory[3].value = cardboard;
finalCategory[4].value = clothes;
finalCategory[5].value = greenGlass;
finalCategory[6].value = metal;
finalCategory[7].value = paper;
finalCategory[8].value = plastic;
finalCategory[9].value = shoes;
finalCategory[10].value = trash;
finalCategory[11].value = whiteGlass;


  return finalCategory;
}

const Page = () => {
  const [alldata, setAllData] = useState([]);
  const [cat, setCat] = useState([]);
  // const allDataCategory = (alldata) =>{
  //   if(alldata.length > 0){
      
  //   }
  // }
  useEffect(()=>{
    const fetchWastes = async() =>{
      const data = await fetchGarbages();
      setAllData(data);
    }
    fetchWastes();
    // allDataCategory(data);
  },[])
// console.log(alldata);
  return (
    <div className='flex justify-center items-center flex-col gap-12'>
      <h1 className='text-xl font-bold'>Waste products Chart Category Wise</h1>
      <PieChart
  series={[
    {
      data: alldata,
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
    },
  ]}
  width={800}
  height={400}
  
/>
    </div>
  )
}

export default Page
