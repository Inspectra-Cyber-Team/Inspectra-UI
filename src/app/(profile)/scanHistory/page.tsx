import React from 'react'
import ScanHistoryComponent from '@/components/MyProfileComponent/ScanHistoryComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scan History - Inspectra',
  description:
    'Check up your scanning history of all your previous scans on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
  keywords:
    'Inspectra Scan History, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Scan History - Inspectra',
    description:
      'Check up your scanning history of all your previous scans on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
    siteName: 'Inspectra',
    locale: 'en_KH',
    type: 'website',
  },
};

export default function page() {
  return (
    <main className='w-[90%] mx-auto my-[60px]'>
      <ScanHistoryComponent/>
    </main>
  )
}
