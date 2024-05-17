import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function UrlCard({ url }) {
    const [isCopyDisabled, setIsCopyDisabled] = useState(false);

    const copyToClipboard = () => {
        const textToCopy = 'https://tinypath.onrender.com/' + url.short;

        // Disable the copy button
        setIsCopyDisabled(true);

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('URL copied to clipboard');
                toast.success('URL copied to clipboard');
                // Enable the copy button after 2 seconds
                setTimeout(() => {
                    setIsCopyDisabled(false);
                }, 2000);
            })
            .catch(error => {
                console.error('Error copying text:', error);
                toast.error('Error copying text:', error);
                // Enable the copy button again due to error
                setIsCopyDisabled(false);
            });
    };

    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${url.full}`;

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:scale-[1.02] transition-all relative">
            <i className={`ri-file-copy-2-line absolute right-5 top-5 cursor-pointer ${isCopyDisabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`} onClick={copyToClipboard}></i>
            <div className="flex flex-row items-center gap-2">
                {faviconUrl && <img src={faviconUrl} alt="Website logo" className="w-6 h-6 mb-2" />}
                <Link to={'https://tinypath.onrender.com/' + url.short} target='_blank' className='w-max block'>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 hover:underline w-max block">{url.short}</h5>
                </Link>
            </div>
            <p className="mb-1 font-normal text-gray-700" style={{ lineBreak: "anywhere" }}><i className="ri-external-link-line" /> {url.clicks}</p>
            <p className="mb-1 font-normal text-gray-700" style={{ lineBreak: "anywhere" }}><i className="ri-link" /> {url.full}</p>
            <p className="mb-1 font-normal text-gray-700" style={{ lineBreak: "anywhere" }}><i className="ri-calendar-2-line" /> {new Date(url.createdAt).toLocaleString()}</p>
            <p className="mb-2 font-normal text-gray-700" style={{ lineBreak: "anywhere" }}><i className="ri-user-line" /> {url.creator}</p>
            <Link to={'https://tinypath.onrender.com/' + url.short} target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-zinc-700 focus:ring-0 focus:outline-none hover:scale-[1.05] transition-all">
                visit site
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
        </div>
    );
}

export default UrlCard;
