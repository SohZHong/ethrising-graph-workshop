'use client';

import { fetchData } from '@/utils/getRequestData';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const url = 'INSERT URL HERE';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data } = useQuery({
    queryKey: ['data', searchQuery],
    queryFn: () => fetchData(searchQuery),
    enabled: !!searchQuery,
  });
  return (
    // Neat! Serialization is now as easy as passing props.
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div className='border border-lightgrey p-4 rounded-full flex items-center justify-center gap-2 min-w-full'>
          <input
            type='text'
            className='p-2 w-full outline-none bg-transparent font-bold'
            placeholder='Enter a wallet public address'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {data && <pre>{JSON.stringify(data.user, null, 2)}</pre>}
      </main>
    </div>
  );
}
