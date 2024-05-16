import React, { useState, useEffect } from 'react';
import AddUrlModal from './AddUrlModal';
import UrlCard from './UrlCard';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';

function UrlPage() {

  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUrls();
  }, []);

  async function fetchAllUrls() {
    setLoading(true);
    try {
      const response = await fetch('https://short-url-9lz6.onrender.com/api/shortUrls/all');
      if (!response.ok) {
        throw new Error('Failed to fetch URLs');
      }
      const data = await response.json();
      setUrls(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching URLs:', error.message);
      toast.error('Error fetching URLs');
      setLoading(false);
    }
  }


  return (
    loading ?
      <Loader />
      :
      <>
        <Toaster position='top-center' />
        <section className="bg-white min-h-screen">
          <div className="min-h-screen items-center py-8 px-8 mx-auto max-w-screen-xl lg:py-8 lg:px-8">
            <div className="flex flex-row gap-2">
              <Link to={'/'}>
                <i className="text-2xl font-bold ri-link"></i>
              </Link>
              <h1 className='text-2xl font-bold text-black mb-4'>Manage urls</h1>
            </div>

            {/* Form to add a new URL */}
            <AddUrlModal fetchAllUrls={fetchAllUrls} />


            {/* Display all URLs in a table */}
            <h2 className='font-semibold'>All URLs</h2>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 py-8">
              {urls.map((url) => (
                <UrlCard key={url._id} url={url} />
              ))}
            </div>

          </div>
        </section>
      </>
  );
}

export default UrlPage;
