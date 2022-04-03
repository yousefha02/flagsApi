import { useEffect, useState } from 'react';
import Country from '../components/Country';
import styles from '../styles/Home.module.css'

export default function Home({countries}) {

  let [select,setSelect] = useState('All');
  const [search,setSearch]=useState("")
  let [coun,setCoun] = useState([]);
  const [on,setOn] = useState(false);

  useEffect(()=>
  {
    setCoun(countries);
    setOn(true)
  },[])

  useEffect(()=>
  {
    async function regions()
    {
    if(select!="All")
    {
      const response = await fetch(`https://restcountries.com/v3.1/region/${select}`)
      const data = await response.json();
      setCoun(data)
    }
    else
    setCoun(countries)
    }
    regions()
  },[select])


  useEffect(()=>
  {
    async function searching()
    {
      if(search!=" " && search!="")
      {
        const response = await fetch(`https://restcountries.com/v3.1/name/${search}`)
        const data = await response.json();
        setCoun(data)
      }
      else
      setCoun(countries)
      }
    searching()
  },[search])

  
  if(on)
  return(
    <div className='relative'>
      <div className='container mx-auto px-6 py-[30px]'>
      <div className='flex justify-between items-center mb-10 sm:flex-row flex-col gap-5'>
        <input type="text" placeholder="Search for a country" 
        className='px-3 py-1'
        onChange={(e)=>setSearch(e.target.value)}/>
        <select onChange={(e)=>setSelect(e.target.value)} className="bg-white mw-full w-[150px] shadow h-[32px]">
          <option value='All'>All</option>
          <option value='Europe'>Europe</option>
          <option value='Asia'>Asia</option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </div>
      <div layout className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
        {
          coun.map((box,index)=>
          {
            return <Country {...box} key={index}/>
          })
        }
      </div>
      </div>
    </div>
  )
}


export async function getServerSideProps()
{
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  console.log(data);
  return{
    props:{
      countries:data
    }
  }
}