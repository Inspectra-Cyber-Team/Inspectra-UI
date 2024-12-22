import React from 'react'
import { Metadata } from 'next';
import MyProfileComponent from '@/components/MyProfileComponent/MyProfileComponent';

export const metadata: Metadata = {
    title: 'My profile - Inspectra',
    description:
        'Change up your profile on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
    keywords:
        'Inspectra My profile, Inspectra, inspectra, inspect, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
    authors: { name: 'Inspectra Team' },
    publisher: 'Inspectra',
    openGraph: {
        title: 'My profile - Inspectra',
        description:
            'Change up your profile on Inspectra, a leading platform from Cambodia that strengthens secure development with advanced source code analysis tools.',
        siteName: 'Inspectra',
        locale: 'en_KH',
        type: 'website',
        url: 'https://inspectra.istad.co/'
    },
};

export default function page() {
    return (
        <div className='w-[90%] mx-auto my-[60px]'>
            <MyProfileComponent />
        </div>
    )
}
