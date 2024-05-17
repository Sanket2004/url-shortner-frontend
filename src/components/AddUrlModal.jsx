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
            const response = await fetch('https://tinypath.onrender.com/api/shortUrls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullUrl, creator }),
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.short) {
                    toast.error('URL already shortened');
                    return;
                }
                toast.success('URL Added Successfully!');
                await fetchAllUrls(); // Refresh URL list after adding a new URL
                setFullUrl('');
                setCreator('');
            } else {
                throw new Error('Failed to add URL');
            }
        } catch (error) {
            console.error('Error adding URL:', error.message);
            toast.error('Error adding URL:', error.message);
        }
    }
    

    return (
        <>
            <Toaster position='top-center' />
            {/* Open and Close button */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 transition-opacity duration-300" style={{ display: formOpen ? 'block' : 'none' }} onClick={toggleForm}></div>
            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-50 rounded-lg w-[90%] max-w-[30rem] z-50 ${formOpen ? 'block' : 'hidden'}`}>
                {/* Modal header  */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Add URL
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " onClick={toggleForm}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addNewUrl();
                    }}>
                    <div className="p-6">
                        <label htmlFor="fullUrl" className="block mb-2 text-sm font-medium text-gray-900">Original Url</label>
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


                        <label htmlFor="creator" className="block mb-2 text-sm font-medium text-gray-900">Created By</label>
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
                    </div>
                    {/* Modal footer  */}
                    <div className="flex items-center border-t border-gray-200 p-6 rounded-b gap-2">
                        <button className="text-white bg-black hover:bg-zinc-700 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2 text-center" type="submit">Add URL</button>
                    </div>
                </form>


            </div>
            {/* Open form button */}
            <button className="fixed bottom-3 right-3 text-white bg-black hover:bg-zinc-700 focus:ring-0 focus:outline-none font-medium rounded-full text-lg px-4 py-2 flex items-center justify-center w-12 h-12 z-[999]" onClick={toggleForm}><i className="text-sm ri-add-line"></i></button>
        </>
    )
}

export default AddUrlModal
