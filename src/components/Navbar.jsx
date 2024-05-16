import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {


    const navigate = useNavigate();


    return (
        <nav className="bg-white border-gray-200 fixed w-full" >
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-8 py-4 lg:py-8">
                <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse hover:text-zinc-700">
                    <span className="self-center text-2xl font-black whitespace-nowrap"><i className="ri-links-line"></i></span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="text-white bg-black hover:bg-zinc-700 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2 text-center hover:scale-[1.02] transition-all" onClick={() => navigate('/url')}>Get started</button>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
