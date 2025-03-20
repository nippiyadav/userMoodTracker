"use client"

import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';

// ye help in data ko predict karne mai, what types of data i will get in array and satisfy the typescripts
export interface MoodValueProps {
    mood: {
        name: string;
        emoji: string;
    },
    description: string;
    date: string;
}

// this help in what types of value and methods, are being sent which will be available all over the application where i will use useContext 
// moodValue bata rha hai ki is mai ek erray, jiske pas MoodValueProps object hoga
export interface moodContextProps {
    moodValue: MoodValueProps[],
    montlyMoodValue:MoodValueProps[],
    setMoodValue: React.Dispatch<React.SetStateAction<MoodValueProps[]>>
}

// hamane createContext ko type diya hai es liye hume a dome data dena hoga otherwise type script will give error
const moodContext = createContext<moodContextProps>(
    {
        moodValue: [{
            mood: {
                emoji: "",
                name: ""
            },
            date: "",
            description: ""
        }],
        setMoodValue: () => { },
        montlyMoodValue: [{
            mood: {
                emoji: "",
                name: ""
            },
            date: "",
            description: ""
        }]
    }
);

function ContextProvider({ children }: { children: React.ReactNode }) {
    // es useState ka use mai intial data fetching mai bhi kar sakta hu aur i will have to send what value this hold which must be same array holding Object
    const [moodValue, setMoodValue] = useState<MoodValueProps[]>([]);

    const [montlyMoodValue, setmontlyMoodValue] = useState<MoodValueProps[]>([]);

    // this useEffect run when components is mounted, this will get the data from the localStorage and set the data in the moodValue
    useEffect(() => {
        const response = () => {
            const response = localStorage.getItem("userMoodTracker");

            const monthlyResponse = JSON.parse(localStorage.getItem("mostMoodPreviousDay")??"[]");

            setmontlyMoodValue(monthlyResponse as MoodValueProps[]);

            console.log("userModeTracker_Response:- ", response);

            if (response !== null) {
                const jsonParse = JSON.parse(response)
                setMoodValue(jsonParse as MoodValueProps[])
                // return jsonParse as MoodValueProps[]
            } else {
                return []
            }
        }
        response()
    }, []);

    // this useEffect run when the moodValue is changed, this will save the data in the localStorage
    useEffect(() => {
        if (moodValue.length > 0) {
            try {
                const newMoodValue = moodValue.filter((data, index) => new Date(data.date).toDateString() === new Date().toDateString());
                const response = localStorage.setItem("userMoodTracker", JSON.stringify(newMoodValue));
                console.log("Response after saving in the LocalStorage:- ", response);
            } catch (error) {
                console.log("Error in the time of saving value in localStorage:- ", error);

            }
        } else {
            // const response = localStorage.setItem("userMoodTracker",JSON.stringify([]));
            console.log("Error in the time saving ");

        }
    }, [moodValue]);


    // monthly moodsaver for previous day
    useEffect(() => {
        // this methods will run only once when the component is mounted, this does not run when navigating to other page
        const singleValueMoodSaver = () => {
            // this try to get the all data from the localStorage and if it is not present then it will return empty array, i want to get all the data except today data
            const userMoodTrackerData: MoodValueProps[] = JSON.parse(localStorage.getItem("userMoodTracker") ?? "[]");

            // this data will filter the data which are not of today, this will retrun data of previous date
            const allPreviousValueExceptToday = userMoodTrackerData.filter((data, index) => {
                const todayDate = new Date()
                return new Date(data.date).toDateString() !== todayDate.toDateString();
            });

            console.log("allPreviousValueExceptToday:- ", allPreviousValueExceptToday);

            // i am using the reduce to find how many time a mood is repeated in the previous day, 
            const knowingAverageMood = allPreviousValueExceptToday.reduce((prev, curr, index) => {
                // this is for debugging purpose
                console.log(prev, index);
                prev.some((data, index) => {
                    console.log("Data in Some:- ", data.mood);
                });

                // this if condition check if prev which is the [] and holding a object of mood and count, if the mood is already present then it will give me true boolean value if not that this means value is not present in the array and else will run 
                if (prev.some((data, index) => data.mood === curr.mood.name)) {
                    // debugging purpose
                    console.log("inside the some condition passed:- ", prev);

                    // map is used for transformation of the data, i am using this directly to increase the value of count by 1 and if not then retrun value as it is as
                    const modifiedValue = prev.map((data, index) => data.mood === curr.mood.name ? { ...data, count: data.count + 1 } : data);

                    // debugging purpose
                    console.log("modifiedValue:- ", modifiedValue);
                    // i am returning a array and its modfied property count
                    return modifiedValue

                } else {
                    // this is being used for the new Data making and adding in the array
                    const newData = {
                        mood: curr.mood.name,
                        count: 1
                    }
                    // i am spreading previous value and adding new data in the array
                    return [...prev, newData]
                }

            }, [] as { mood: string, count: number }[]);

            // debugging purpose
            console.log("knowingAverageMood:- ", knowingAverageMood);

            // this is being used for sorting the data in decending order, this will give me the mood which is most repeated in the previous day, in first position
            const sortedValueDecending = knowingAverageMood.sort((a,b)=> b.count - a.count);

            // debugging purpose
            console.log("sortedValueDecending:- ", sortedValueDecending);

            // i am using filter to get the most repeated mood in the previous day, this will give me the last mood which is most repeated in the previous day
            const mostMoodPreviousDay = allPreviousValueExceptToday.filter((data,index)=> data.mood.name === sortedValueDecending[0].mood);

            // debugging purpose
            console.log("mostMoodPreviousDay:- ", mostMoodPreviousDay[mostMoodPreviousDay.length - 1]);

            // this is being used for saving the most repeated mood in the previous day in the localStorage
            if (mostMoodPreviousDay.length > 0) {
                // i am doing this because i want to get previous data
                const previousData = JSON.parse(localStorage.getItem("mostMoodPreviousDay")?? "[]");
                console.log("previousData:- ", previousData);
                

                // which i recieved above i am adding the most repeated mood in the previous day
                localStorage.setItem("mostMoodPreviousDay", JSON.stringify([{...previousData},{...mostMoodPreviousDay[mostMoodPreviousDay.length - 1]}]));

                // this is filtering and cleaning up the previous data and adding only today data
                const deletingPreviousValueAddingOnlyToday= userMoodTrackerData.filter((data, index) => {
                    const todayDate = new Date()
                    return new Date(data.date).toDateString() === todayDate.toDateString();
                });

                // debugging purpose
                console.log("deletingPreviousValueAddingOnlyToday:- ", deletingPreviousValueAddingOnlyToday);

                localStorage.setItem("userMoodTracker", JSON.stringify(deletingPreviousValueAddingOnlyToday));
            }

        }
        singleValueMoodSaver()
    }, []);

    return (
        <moodContext.Provider value={{ moodValue, setMoodValue,montlyMoodValue }}>
            {children}
        </moodContext.Provider>
    )
}

export default ContextProvider

// we are doing this because it help in solving problem of repeat code again and again because if we do not use then we have to use useContent this again and again
export const useMoodContextValue = () => {
    const value = useContext(moodContext);
    if (!value) {
        throw Error("ContextProvider not wraped in the main.tsx")
    }
    return value
}