import React, { forwardRef } from 'react'



const Textarea = forwardRef<HTMLTextAreaElement>((props,ref)=>{
  return (
    <div className='flex items-center gap-1 flex-col'>
    <label className='font-bold shrink-0 w-[10%]' htmlFor="description">Description</label>
    <textarea className='w-full mt-2 bg-gray-200 rounded-md shadow-md p-4 outline-none focus:ring-1 ring-blue-400 resize-none' placeholder='Enter Your Reason..' ref={ref}>
    </textarea>
    </div>
  )
})
Textarea.displayName = "Textarea"

export default Textarea