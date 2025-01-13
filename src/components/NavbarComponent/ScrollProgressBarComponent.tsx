'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpCircle } from 'lucide-react'

const ScrollProgressBarComponent = () => {
    const [isVisible, setIsVisible] = useState(false)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Track scroll percentage for display
    const [scrollPercentage, setScrollPercentage] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight
            const percentage = Math.round((scrollPosition / windowHeight) * 100)

            setScrollPercentage(percentage)
            setIsVisible(scrollPosition > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Progress Bar Container */}
            <motion.div
                className="fixed top-16 bg-gray-200 dark:bg-card_color_dark left-0 right-0 h-2 z-50"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                }}
            >
                {/* Animated Progress Bar */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-primary_color to-ascend_color"
                    style={{
                        scaleX,
                        transformOrigin: "0%",
                    }}
                />
            </motion.div>
        </>
    )
}

export default ScrollProgressBarComponent