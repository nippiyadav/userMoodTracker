import { useMoodContextValue } from '@/context/ContextProvider'
import React, { useEffect, useState } from 'react'

// i am using writing some modifined because i want to add also the days and timming in the data
interface TodayMoodValueProps {
    date: {
        days: string;
        timming: string
    }
    description: string
    mood: {
        emoji: string
        name: string
    }
}

function TodayMood() {
    // this is holding all value of context which we are giving from CreateContext
    const value = useMoodContextValue();
    const [todatMood, setTodayMood] = useState<TodayMoodValueProps[]>([]);

    // i am using the useEffect for updating the or re-render whenever the value change in the value.moodValue
    useEffect(() => {
        if (value.moodValue.length>0) {
            // this for debug the value of date in different formate because i am saving date in the string formate
            const date = new Date(value.moodValue[0].date)
            console.log("Date of Making:- ", date.toDateString(), date.toLocaleTimeString(), date.toLocaleDateString());
    
            // this filter will retrun only today value 
            const todaymoodFilter = value.moodValue.filter((data) => {
                const checkingDate = new Date();
                if (new Date(data.date).toDateString() === checkingDate.toDateString()) {
                    return true
                } else {
                    return false
                }
            });
    
            // this is for the debug only
            console.log("todayMoodFilter:- ", todaymoodFilter);
    
            // i am changing the date property with the object
            const todayMapping = todaymoodFilter.map((data) => {
                const newData = { ...data, date: { days: new Date(data.date).toDateString(), timming: new Date(data.date).toLocaleTimeString() } };
                return newData
            });
    
            // this is for the debug only
            console.log("todayMapping:- ", todayMapping);
    
            // and after filter and transformation i am giving all value 
            setTodayMood(todayMapping);
        }

    }, [value.moodValue])

    return (
        <div className='bg-gray-600/50 backdrop-blur-xl p-2 rounded-md w-[95%] mx-auto mt-4'>
            <div>
                <h1 className='text-2xl font-bold text-center text-white'>Today Mood</h1>
            </div>
            <div>
                {todatMood.length>0 ?
                    (<>
                        <div className='overflow-x-auto mt-2 flex gap-2'>{todatMood.map((data, index) => (
                            <div key={index}>
                                <div className='flex items-start flex-col gap-2 justify-start bg-white/20 backdrop-blur-2xl p-2 w-40 rounded-md shadow-md mb-2'>
                                    <div>
                                        <span className='text-4xl'>{data.mood.emoji}</span>
                                        <span className='text-2xl font-bold'>{data.mood.name}</span>
                                    </div>
                                    <span className='flex flex-col'>
                                        <span className='font-semibold'> 
                                            {data?.date?.days}
                                        </span>
                                        <span className='font-semibold'>
                                            {data?.date?.timming}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ))}</div>
                    </>)
                    :
                    (<></>)}
            </div>
        </div>
    )
}

export default TodayMood