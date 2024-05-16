import React from 'react'
import Navbar from './Navbar'

function HomePage() {
    return (
        <>
            <Navbar />
            <section className="bg-white min-h-screen">
                <div className="min-h-screen gap-16 items-center py-24 px-8 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-8">
                    <div className="font-light text-gray-500 sm:text-lg">
                        <h2 className="mb-4 text-4xl font-black text-black">Tiny Path</h2>
                        <p className="mb-4 font-semibold text-gray-500 text-l sm:text-xl">A self-hosted URL shortener app.</p>
                        <p className="mb-4 ">
                            Tiny Path offers a simple and efficient way to shorten long URLs into easy-to-share links. Whether you're managing a personal blog, running a business, or simply need to track your links, Tiny Path provides a reliable solution. Enjoy features such as click tracking. With a user-friendly interface and robust backend, Tiny Path ensures your links are always accessible and manageable. Start shortening your URLs today and experience the convenience of Tiny Path.
                        </p>
                    </div>
                    <div className="gap-4 mt-8">
                        <img className="w-full" src="/img/hero.svg" alt="hero content 1" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage
