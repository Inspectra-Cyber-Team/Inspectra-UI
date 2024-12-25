import React from 'react'
import ScanHistoryComponent from '@/components/MyProfileComponent/ScanHistoryComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scan History - Inspectra',
  description:
    'Check up your scanning history of all your previous scans on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
  keywords:
    'Inspectra Scan History, Inspectra, inspectra, inspect, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Scan History - Inspectra',
    description:
      'Check up your scanning history of all your previous scans on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
    url: 'https://inspectra.istad.co/',
    images: [
      {
        url: 'http://136.228.158.126:4011/images/3639a448-5eb8-43f4-bba9-a7f98c27792e.png',
        width: 1200,
        height: 630,
        alt: 'Inspectra',
      },
    ],
  },
};

export default function page() {
  return (
    <main className='w-[90%] mx-auto my-[60px]'>
      <ScanHistoryComponent/>
    </main>
  )
}
