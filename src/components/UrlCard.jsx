import React from 'react'
import { Link } from 'react-router-dom'

function UrlCard({url}) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:scale-[1.02] transition-all">
            <Link to={'https://short-url-9lz6.onrender.com/'+url.short} target='_blank'>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 hover:underline">{url.short}</h5>
            </Link>
            <p className="mb-1 font-normal text-gray-700"><i className="ri-external-link-line"/> {url.clicks}</p>
            <p className="mb-1 font-normal text-gray-700"><i className="ri-link"/> {url.full}</p>
            <p className="mb-1 font-normal text-gray-700"><i className="ri-calendar-2-line"/> {new Date(url.createdAt).toLocaleString()}</p>
            <p className="mb-2 font-normal text-gray-700"><i className="ri-user-line"/> {url.creator}</p>
            <Link to={'https://short-url-9lz6.onrender.com/'+url.short} target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-zinc-700 focus:ring-0 focus:outline-none hover:scale-[1.05] transition-all">
                visit site
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
        </div>
    )
}

export default UrlCard
