import { MoodsProps } from '@/utils/content'
import React from 'react'
import { forwardRef } from 'react'

const Selection = forwardRef<HTMLSelectElement>((props,ref)=>{
  return (
    <div className='flex gap-1 justify-center items-center flex-col'>
    <label className='shrink-0 font-bold' htmlFor="selction-mood">Selection Mood</label>
    <select className='w-full bg-white rounded-md outline-0 font-black p-2' ref={ref}>
        {MoodsProps.map((data,index)=>(
            <option key={index} value={data.name}>{data.name}</option>
        ))}
    </select>
    </div>
  )
})

Selection.displayName = "Selection"

export default Selection