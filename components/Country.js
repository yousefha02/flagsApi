import Image from 'next/image'
import {useRouter} from 'next/router'

export default function Country(props)
{
    const router = useRouter();

    return(
        <div layout className='country cursor-pointer w-fit shadow m-auto' onClick={()=>router.push(`/${props.name.common}`)}>
            <div><Image unoptimized src={props.flags.png} width={"300px"} height="200px"/></div>
            <div className='p-3 pb-14'>
                <h3 className=' font-semibold text-[18px] mb-2'>{props.name.common}</h3>
                <p>Area : <span className='text-[#777]'>{props.area}</span></p>
                <p>Region : <span className='text-[#777]'>{props.region}</span></p>
                <p>Capital : <span className='text-[#777]'>{props.capital}</span></p>
            </div>
        </div>
    )
}