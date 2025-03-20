import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useMoodContextValue } from '@/context/ContextProvider'

function MontlyMood() {
    // this is the value of the context which we are getting from the context
    const { montlyMoodValue } = useMoodContextValue();

    // debugging purpose
    console.log("MontlyMoodValue:- ", new Date(montlyMoodValue[0]?.date).toLocaleDateString("en-CA"));

    // we are like this because we are adding new property in the object which will help in the styling of the calendar
    const newMonthlyMoodValue = montlyMoodValue.map((data) => {
        if (data.date) { return { title: data.mood.name, date: new Date(data.date).toLocaleDateString("en-CA"), color: "black", className: ["text-center  leading-4"] } }
    });

    // debugging purpose
    console.log("newMonthlyMoodValue:- ", newMonthlyMoodValue);

    // this is for the filtering the undefined value
    const events = newMonthlyMoodValue.filter((data) => data !== undefined);


    return (
        <div className=' bg-gray-600/50 backdrop-blur-xl p-2 rounded-md w-[95%] mx-auto mt-4 '>
            <h1 className='text-2xl font-bold text-center leading-10 mb-2'>Monthly Mood</h1>

            <div className=' mx-auto lg:w-[50%] outline-1 outline-black p-2 rounded-md bg-black/0 backdrop-blur-md'>
                <FullCalendar
                    eventColor='black'
                    headerToolbar={{
                        
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek'
                    }}
                    expandRows={true}
                    aspectRatio={2}
                    _resize={() => true}
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    contentHeight={500}
                    events={events}
                />
            </div>
        </div>
    )
}

export default MontlyMood
