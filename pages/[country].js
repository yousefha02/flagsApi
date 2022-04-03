import Image from 'next/image'
import { useRouter } from 'next/router';
export default function FiltCountry({country})
{
    const router = useRouter()
    const arr = [];
    let native ;
    let currencies;

    for(let i in country.languages)
    {
        arr.push(country.languages[i])
    }

    for(let i in country.name.nativeName)
    {
        native=country.name.nativeName[i].common
    }

    for(let i in country.currencies)
    {
        currencies = country.currencies[i].name
    }

    return(
        <div>
            <div className="container mx-auto px-6 py-[30px]">
                <button className='shadow mb-8 px-6 py-1' onClick={()=>router.push('/')}>Go Back</button>
                <div className='grid lg:grid-cols-2 gap-10 items-center'>
                    <Image unoptimized src={country.flags.png} width={"800px"} height="500px"/>
                    <div>
                        <h3 className=' font-semibold text-[18px] mb-2'>{country.name.common}</h3>
                        <div className='flex justify-between mb-10'>
                            <div>
                            <p>Native Name : <span className='text-[#777]'>{native}</span></p>
                            <p>Area : <span className='text-[#777]'>{country.area}</span></p>
                            <p>Region : <span className='text-[#777]'>{country.region}</span></p>
                            <p>Sub Region : <span className='text-[#777]'>{country.subregion}</span></p>
                            </div>
                            <div>
                            <p>Captial : <span className='text-[#777]'>{country.capital}</span></p>
                            <p>Top-level Domain : <span className='text-[#777]'>{country.tld[0]}</span></p>
                            <p>Currencies : <span className='text-[#777]'>{currencies}</span></p>
                            <p>Languages : 
                                <span className='text-[#777]'> {arr.join(',')}</span>
                            </p>
                            </div>
                        </div>
                        {
                        country.borders&&
                        <div>
                            <p className='mb-2'>Border Countries: </p>
                            <div className='flex flex-wrap gap-3'>
                            {country.borders.map((border,index)=><span key={index} className='text-[#777] shadow p-1'>{border.toUpperCase()}</span>)} 
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context)
{
  const {country} = context.query; 
  const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await response.json();
  return{
    props:{
      country:data[0]
    }
  }
}