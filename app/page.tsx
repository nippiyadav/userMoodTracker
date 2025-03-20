"use client"
import { MoodsProps } from '@/utils/content'
import React, { useRef, useState } from 'react'
import Selection from '@/app/components/Selection'
import Textarea from '@/app/components/Textarea';
import Button from '@/app/components/Submit';
import { XCircle } from 'lucide-react';
import TodayMood from '@/app/components/TodayMood';
import { useMoodContextValue } from '@/context/ContextProvider';
import MontlyMood from './components/MontlyMood';

function Page() {
  // this is context which are holding value
  const { setMoodValue } = useMoodContextValue();

  // this is for the getting value of selection, we can use simply but we are using like this for that we can reuse this as many time as want
  const selectionRef = useRef<HTMLSelectElement>(null);

  // this is for the getting value of textarea value
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // this is for the setting error 
  const [error, setError] = useState<string>("");
  console.log(error);
  
  // this is for opening the form
  const [openForm, setOpenForm] = useState<boolean>(false);


  const moodFormSubmission = () => {
    const selectionMood = selectionRef.current?.value;
    const textareaText = textareaRef.current?.value;
    const filterEmoji = MoodsProps.filter((data) => data.name === selectionMood);

    console.log("SelectionMood:- ", selectionMood, "\n", "textareaText:- ", textareaText);

    // this is the cheker for the selectionmood and textareaText
    if (!selectionMood?.trim() || !textareaText?.trim()) {
      setError("Please fill the form correctly")
      return
    }

    // i am making object with the value
    const newMoodValue = {
      mood: {
        name: selectionMood,
        emoji: filterEmoji[0].emoji
      },
      description: textareaText,
      date: new Date().toString()
    }

    // this is the value is being sent 
    setMoodValue((prev) => {
      return [newMoodValue, ...prev]
    })

    if (textareaRef.current?.value) {
      textareaRef.current.value = "";
      setOpenForm(false)
    }

  }

  return (
    <main className='lg:w-[80%] mx-auto'>
      {/* mood adder */}
      <div className='bg-gray-600/50 backdrop-blur-xl p-2 rounded-md w-[95%] mx-auto'>
        <div className='text-white'>
          <h1 className='text-center font-bold text-4xl mb-4'>Mood Tracker</h1>
          {/* this is for adding mood of user */}
          <div>
            <div className='bg-pink-500 w-15 h-15  flex justify-center items-center font-bold rounded-full leading-20 shadow-md cursor-pointer scale-100 active:scale-95' onClick={() => setOpenForm(true)}>
              <span className='text-white select-none text-3xl'>+</span>
            </div>

            {/* moods emoji */}
            <div className='flex gap-5 my-4 overflow-x-auto'>
              {MoodsProps.map((data, index) => (
                <div key={index}>
                  <div className='flex flex-col justify-center items-center'>
                    <span className='w-20 h-20 rounded-md text-6xl'>{data.emoji}</span>
                    <span className='text-xl font-bold'>{data.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* mood of emoji insert form */}
            <div className={`w-full h-screen fixed bg-gray-400/0 flex justify-center items-center top-0 left-0 z-[999] ${openForm ? "block" : "hidden"}`}>
              <form onSubmit={(e) => {
                e.preventDefault();
                moodFormSubmission();
              }} className='flex flex-col gap-4 w-[444px] bg-red-400 p-4 rounded-md shadow-md relative text-black'>
                <XCircle className='absolute right-[-10] top-[-10] scale-100 focus:scale-105 cursor-pointer' fill='red' scale={2} onClick={() => setOpenForm(false)} />
                <h1 className='font-bold text-center text-xl'>Mood Form Submission</h1>
                <Selection ref={selectionRef} />
                <Textarea ref={textareaRef} />
                <Button />
              </form>
            </div>

            {/* todayMood Components */}
            <TodayMood />

            {/* monthly Components */}
            <MontlyMood />
          </div>
        </div>
      </div>

    </main>
  )
}

export default Page