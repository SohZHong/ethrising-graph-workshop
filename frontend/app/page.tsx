'use client'; // Enables Next.js client-side rendering

import { fetchAllData, fetchUserData } from '@/utils/getRequestData'; // Import API functions
import { useQuery } from '@tanstack/react-query'; // React Query for data fetching
import { useState } from 'react'; // State management

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State to store user input

  /**
   * Query to fetch all data from The Graph
   * - Uses React Query for automatic caching and background updates
   */
  const { data: allData } = useQuery({
    queryKey: ['data'], // Unique cache key
    queryFn: () => fetchAllData(), // API call function
  });

  /**
   * Query to fetch specific user data
   * - Fetches data only when `searchQuery` is provided (`enabled: !!searchQuery`)
   */
  const { data } = useQuery({
    queryKey: ['data', searchQuery], // Cache key includes search input
    queryFn: () => fetchUserData(searchQuery),
    enabled: !!searchQuery, // Ensures API call only happens when searchQuery is non-empty
  });

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        {/* Search Input for Wallet Address */}
        <div className='border border-lightgrey p-4 rounded-full flex items-center justify-center gap-2 min-w-full'>
          <input
            type='text'
            className='p-2 w-full outline-none bg-transparent font-bold'
            placeholder='Enter a wallet public address'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Updates search query state
          />
        </div>

        {/* Display all recent transactions */}
        {allData && <pre>{JSON.stringify(allData, null, 2)}</pre>}

        {/* Display user-specific transactions */}
        {data && <pre>{JSON.stringify(data.user, null, 2)}</pre>}
      </main>
    </div>
  );
}
