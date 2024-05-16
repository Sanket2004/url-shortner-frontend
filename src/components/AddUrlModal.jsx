import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function AddUrlModal({ fetchAllUrls }) {
    const [fullUrl, setFullUrl] = useState('');
    const [creator, setCreator] = useState('');
    const [formOpen, setFormOpen] = useState(false);

    const toggleForm = () => {
        setFormOpen(!formOpen);
        // Disable body scrolling when the form is open
        document.body.style.overflow = formOpen ? 'auto' : 'hidden';
    };

    async function addNewUrl() {
        try {
            const response = await fetch('https://short-url-9lz6.onrender.com/api/shortUrls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullUrl, creator }),
            });
            if (!response.ok) {
                throw new Error('Failed to add URL');
            }
            toast.success('URL Added Sucessfully !');
            await fetchAllUrls(); // Refresh URL list after adding a new URL
            setFullUrl('');
            setCreator('');
        } catch (error) {
            console.error('Error adding URL:', error.message);
            toast.error('Error adding URL:', error.message);
        }
    }

    return (
        <>
            <Toaster position='top-center'/>
            {/* Open and Close button */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 transition-opacity duration-300" style={{ display: formOpen ? 'block' : 'none' }} onClick={toggleForm}></div>
            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-50 p-8 rounded-lg w-[90%] max-w-[30rem] z-50 ${formOpen ? 'block' : 'hidden'}`}>
                <button className="absolute top-3 right-3 text-gray-600 hover:text-black focus:outline-none" onClick={toggleForm}>
                    <i className="ri-close-line text-lg"></i>
                </button>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addNewUrl();
                }}>
                    <label htmlFor="fullUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Original Url</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <i className="ri-link"></i>
                        </div>
                        <input
                            type="text"
                            id="fullUrl"
                            value={fullUrl}
                            onChange={(e) => setFullUrl(e.target.value)}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-black block w-full ps-10 p-2.5 focus:outline-none"
                            placeholder="https://example.com"
                        />
                    </div>


                    <label htmlFor="creator" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Created By</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <i className="ri-user-line"></i>
                        </div>
                        <input
                            type="text"
                            id="creator"
                            value={creator}
                            onChange={(e) => setCreator(e.target.value)}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-black block w-full ps-10 p-2.5 focus:outline-none"
                            placeholder="Jack Doe"
                        />
                    </div>
                    <button className="text-white bg-black hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2 text-center" type="submit">Add URL</button>
                </form>
            </div>
            {/* Open form button */}
            <button className="fixed bottom-3 right-3 text-white bg-black hover:bg-zinc-700 focus:ring-0 focus:outline-none font-medium rounded-full text-lg px-4 py-2 flex items-center justify-center w-12 h-12 z-[999]" onClick={toggleForm}><i className="text-sm ri-add-line"></i></button>
        </>
    )
}

export default AddUrlModal
