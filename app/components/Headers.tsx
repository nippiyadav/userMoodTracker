"use client"
import React from 'react'
import { HeadersProps } from "@/utils/content"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Headers() {
    // this is used for the getting pathname like // returns "/dashboard" on /dashboard?foo=bar
    const pathname = usePathname();
    console.log("pathname:- ",pathname);    

    return (
        <div className='p-2'>
            <div className='lg:w-fit mx-auto bg-gray-400/50 p-3 backdrop-blur-2xl rounded-full'>
                <header className='flex gap-10  overflow-x-auto'>
                    {HeadersProps.map((data, index) => (
                        <div key={index} className={`px-5 rounded-full py-2 transition-colors duration-300 ${pathname===data.link?"bg-white":""}`}>
                            <Link href={data.link}>
                                <nav>{data.name}</nav>
                            </Link>
                        </div>
                    ))}
                </header>
            </div>
        </div>
    )
}

export default Headers