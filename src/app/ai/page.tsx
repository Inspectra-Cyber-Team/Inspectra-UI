import AIComponent from '@/components/AI/AiComponent'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Inspectra - AI Chat Assistant",
  description:
    "Interact with Inspectra's AI Chat to get instant support, guidance, and insights on code security and vulnerabilities. Harness the power of AI to improve your development process and protect your applications.",
  keywords:
    "Inspectra AI Chat, AI assistant,ai chatbot, ai, ai chat, Ai chatbot, Ai chat, inspectra ai, inspectra ai chat , code security, vulnerability detection, AI support, secure coding, AI-powered chat, developer tools, cybersecurity chat, instant support",
  authors: { name: "Inspectra Team" },
  publisher: "Inspectra",
  openGraph: {
    title: "AI Chat - Inspectra",
    description:
      "Get immediate assistance and expert insights through Inspectra's AI-powered chat assistant. Your go-to solution for understanding and securing your code.",
    siteName: "Inspectra",
    locale: "en_KH",
    type: "website",
    url: "https://inspectra.istad.co/",
    images: [
      {
        url: "https://api-inspectra.istad.co/images/1b42a22a-897f-4bd0-b4f2-ba1a9e9e3659.png",
        width: 1200,
        height: 630,
        alt: "AI Chat Assistant - Inspectra",
      },
    ],
  },
};


export default function page() {
  return (
    <AIComponent />
  )
}
