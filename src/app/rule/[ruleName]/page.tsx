
import React from 'react'
import { ruleName } from '@/types/Params'
import RuleComponent from '@/components/RuleComponent/RuleComponent';
import { Metadata } from 'next';


export const metadata: Metadata ={
  title: 'Rules - Inspectra',
  description:
    'Inspectra provides a comprehensive list of rules to help you identify and address code vulnerabilities. Learn more about our rules and how they can help you secure your code.',
  keywords:
    'Inspectra Rules, Inspectra, inspectra, inspect, source code scan, scan, code scan, white-box testing Cambodia, secure development platform, source code analysis, cybersecurity tools, secure coding practices',
  authors: { name: 'Inspectra Team' },
  publisher: 'Inspectra',
  openGraph: {
    title: 'Rules - Inspectra',
    description:
      'Inspectra provides a comprehensive list of rules to help you identify and address code vulnerabilities. Learn more about our rules and how they can help you secure your code.',
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
}


export default function page(prop:ruleName) {
  
  const ruleName = prop?.params?.ruleName;

  return (
    <section>
        <RuleComponent ruleKey={ruleName} />
    </section>
  )
}
