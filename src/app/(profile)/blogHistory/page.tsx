import React from 'react'
import BlogHistoryComponent from '@/components/MyProfileComponent/BlogHistoryComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog History - Inspectra',
  description:
    'Explore Inspectra’s history, a cutting-edge white-box testing platform from Cambodia that ensures secure development through source code analysis and identification of security vulnerabilities.',
  keywords:
    'Inspectra blog history, Inspectra, inspectra, inspect, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Blog History - Inspectra',
    description:
      'Delve into the history of Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
    url: 'https://inspectra.istad.co/'
  },
};

export default function page() {
  return (
    <div className='w-[90%] mx-auto my-[60px]'>
      <BlogHistoryComponent/>
    </div>
  )
}
