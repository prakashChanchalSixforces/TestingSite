import React from  'react'
import MainFooter from '../MainFooter/MainFooter'
import HomeServicesBar from '../UserHomepage/components/HomeServiceBar'
import HomeHeader from './HomeHeader'
import PlayVideo from './PlayVideo'
import SwiftbelBanner from './SwiftbelBanner'
import TryItOut from './TryItOut'
import Carousels from '../Services/ServiceHomePage/Carousels'
import SwiftbelExperince from '../Services/ServiceHomePage/SwiftbelExperince'
import styled from 'styled-components'
import BookingAndManaging from '../Services/ServiceHomePage/BookingAndManaging'
function SwiftbelHome(){
    return(
    <Main>
    <HomeHeader/>
    <HomeServicesBar serviceName={()=>console.log('hii')} setActivePage={()=>console.log('')}/>
    <SwiftbelBanner/>
    <BookingAndManaging/>
    <TryItOut/>
    <PlayVideo/>
    <SwiftbelExperince/>
    <Carousels/>
    <MainFooter/>
    </Main>
    )
    }
    export default SwiftbelHome

    const Main=styled.div`
    @media (min-width: 260px) and (max-width: 820px){
    overflow-x: hidden;
    }
    @media (min-width: 821px) and (max-width: 1310px){
        padding-left:30px;
        padding-right:30px;
    }
    `