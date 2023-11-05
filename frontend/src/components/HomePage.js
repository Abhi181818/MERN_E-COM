import React from 'react'
import HomeCarousel from './HomeCarousel'
import HomeCard from './HomeCard'
import Navigation from './Navigation'

export default function HomePage() {
   
    return (
        <div>
            <Navigation />
            <HomeCarousel />
            <HomeCard />
        </div>
    )
}

