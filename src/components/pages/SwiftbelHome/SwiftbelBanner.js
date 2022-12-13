import React from 'react'
import styled from 'styled-components'
import ServiceSearch from './ServiceSearch'
import Apple from '../../../assets/appleplaystore.png'
import Google from '../../../assets/googleplay.png'
import  movingpink from '../../../assets/movingpink.png'
import  plumberspink from '../../../assets/plumberspink.png'
import  electricianspink from '../../../assets/electricianspink.png'
import  paintingpink from '../../../assets/paintingpink.png'
import  cleaningpink from '../../../assets/cleaningpink.png'
import  pressurewashingpink from '../../../assets/pressurewashingpink.png'
import  handymanpink from '../../../assets/handymanpink.png'
import  washingpink from '../../../assets/washingpink.png'

function SwiftbelBanner(){
    return(
    <>
    <Main>
     <Head>
      <div className='d-flex justify-content-center'>
        <Iconsdiv >
        <ServicesImg src={movingpink} className='movingpink'/>
        <br/>
        <ServicesImg src={handymanpink} className='handymanpink'/>
        <br/>
        <ServicesImg src={cleaningpink} className='cleaningpink'/>
        <br/>
        <ServicesImg src={pressurewashingpink} className='pressurewashingpink'/>
        </Iconsdiv>
      <div>
      <Heading>Taking care of your home</Heading>
      <Heading className='center-heading'>has never been easier</Heading>
      <Heading className='subheading'>Search home service providers, compare prices, and book</Heading>
      <div className='d-flex justify-content-center mt-4'>
      <ServiceSearch/>
      </div>
       {/* <Heading className='appavailable'>Our App is availible on:</Heading>
       <div className='d-flex justify-content-center'>
        <Playstores src={Apple} className='right'/>
        <Playstores src={Google}/>
       </div> */}
      </div>
      <Iconsdiv>
        <ServicesImg src={paintingpink} className='paintingpink'/>
        <br/>
        <ServicesImg src={electricianspink} className='electricianspink'/>
        <br/>
        <ServicesImg src={plumberspink} className='plumberspink'/>
        <br/>
        <ServicesImg src={washingpink} className='washingpink'/>
        </Iconsdiv>
      </div>
     </Head>
    </Main>
    </>
    )
}

export default SwiftbelBanner

const Main = styled.div`
display:flex;
justify-content:center;
background:white;
@media (min-width: 1150px) and (max-width: 1310px){
padding-left:50px;
padding-right:50px;
}
`
const Head=styled.div`
width:1312px;
background:white;
padding-top:64px;
padding-bottom:64px;
padding-left:20px;
padding-right:20px;
.center-heading{
text-align: center;
}
.subheading{
font-size: 18px;
text-align: center;
margin-top:16px;
}
.appavailable{
text-align: center;
font-size: 14px;
color:#787373;
margin-top:124px;
}
.right{
margin-right:17px;
}
.movingpink{
margin-left:17px;
}
.handymanpink{
margin-left:83px;
margin-top:64px;
}
.cleaningpink{
margin-left:175px;
margin-top:79px;
}
.pressurewashingpink{
margin-left:25px;
margin-top:49px;
}
.paintingpink{
margin-left:202px;
}
.electricianspink{
margin-top:32px;
margin-left:100px;
}
.plumberspink{
margin-top:38px;
margin-left:192px;
}
.washingpink{
margin-top:69px;
margin-left:100px;
}
`
const Iconsdiv=styled.div`
display:inline;

@media (min-width: 200px) and (max-width: 550px){
display:none;
}
`
const Heading=styled.div`
font-family:Roobert-medium;
font-weight: 500;
font-size: 64px;
color: #190F0F;
@media (min-width: 200px) and (max-width: 1311px){
 text-align:center;
 font-size: 44px;
  }
`
const Playstores=styled.img`
width: 103px;
height: 32px;
margin-top:12px;
`
const ServicesImg=styled.img`
width: 54.94px;
height: 54.94px;
position:relative;
  animation-name: example;
  animation-duration: 5s;
  animation-timing-function:linear;
  animation-delay: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
@keyframes example {
    0%   {left:0px; top:0px;}
    50%  {left:20px; top:20px;}
    100% {left:0px; top:0px;}
  }
`