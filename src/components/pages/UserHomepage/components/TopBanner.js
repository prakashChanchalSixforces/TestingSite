import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import PressureBanner from '../../../../assets/pressurewashingbanner1.png'
import MovingBanner from '../../../../assets/movingbanner2.png'
import MovingmobBanner from '../../../../assets/movingmobbanner.png'
import PressuremobBanner from '../../../../assets/pressuremobbanner.png'
import Electricianbanner from '../../../../assets/electricianbanner.png'
import Electricianmobbanner from '../../../../assets/electricmobbanner.png'

import { Button } from 'react-bootstrap'
import SignupModal from '../../../layouts/Auth/SignupModal'

function TopBanner(props) {
    const [signUpModalShow, setSignUpModalShow] = React.useState(false);
    const [loginModalShow, setLoginModalShow] = React.useState(false);
    const [type,setType]=useState(props?.type)
    let location = useLocation();

    useEffect(()=>{
        setType(props?.type)
        console.log(props?.type,"fnfbfb")
    },[props?.type])

    function Card1moving() {
        return (
            <Card1Moving className='card'>
                <div className='textdiv'>
                    <p className='text1'>Save an average of $145
                    </p>
                    <p className='text2'>when you book a moving company on <span style={{ color: 'black' }}>SwiftBel</span></p>
                    <Button variant='light' className='button' onClick={() => {
                        props.setview(true);
                        if (props?.type !== "newMoving") {
                            setTimeout(() => {
                                props.setview(false)
                            }, 3000)
                        }
                    }
                    }>Book a Moving company</Button>
                </div>
                <br />
                <br />
                <br />
                <img src={MovingBanner} className='bannerimage' />
            </Card1Moving>
        )
    }

    function Card1pressure() {
        return (
            <Card1Pressure className='card mt-3'>
                <div className='textdiv'>
                    <p className='text1'>Save an average of $55
                    </p>
                    <p className='text2'>{location?.pathname === '/electricians'?'When you book a Electricians company on':'When you book a Pressure washing company on'} <span style={{ color: '#D81159' }}>SwiftBel</span></p>
                    <Button variant='dark' className='button' onClick={() => {
                        props.setview(true);
                        setTimeout(() => {
                            props.setview(false)
                        }, 3000);
                    }}>{location?.pathname === '/electricians'?'Book a Electricians company':'Book a Pressure washing company'}</Button>
                </div>
                <br />
                <br />
                <br />
                <img src={location?.pathname === '/electricians'?Electricianbanner:PressureBanner} className='bannerimage' />
            </Card1Pressure>
        )
    }

    const Banner=()=>{
        if(location?.pathname==='/moving'||location?.pathname==='/moving/1'){
            return <Card1moving/>
        }
        else if(location?.pathname === '/pressurewashing'){
            return <Card1pressure/>
        }
        else if(location?.pathname === '/electricians'){
            return <Card1pressure/>
        }
        else return ''
        }

        console.log(type,'typeee')

    return (
        <React.Fragment>

            <WebView >
                <Banner/>
                <br />
            </WebView>
            <MobileView className='mobbanner'>
                {location?.pathname==='/moving'||location?.pathname==='/moving/1'?
                <Card1Moving>
            <div className='textdiv'>
                <p className='text1'>Save an
                    <br />average of $145</p>
                <p className='text2'>when you book a moving company <br />on <span style={{ color: 'black' }}>SwiftBel</span></p>
            </div>
            <br />
            <br />
            <br />
            <img src={MovingmobBanner} className='mobbannerimage' />
        </Card1Moving>
        :location?.pathname==='/pressurewashing'||'/electricians'?
        <Card1Pressure className='mt-5'>
        <div className='textdiv'>
            <p className='text1'>Save an average of $55
            </p>
            <p className='text2'>{location?.pathname === '/electricians'?'When you book a Electricians company on':'When you book a Pressure washing company on'} <span style={{ color: '#D81159' }}>SwiftBel</span></p>
        </div>
        <br />
        <br />
        <br />
        <img src={location?.pathname === '/electricians'?Electricianmobbanner:PressuremobBanner} className='bannerimage' />
    </Card1Pressure>
    :''}
            </MobileView>
            <SignupModal
                signupModal={setSignUpModalShow}
                loginModal={setLoginModalShow}
                loginModalshow={loginModalShow}
                show={signUpModalShow}
                onHide={() => setSignUpModalShow(false)}
            />
        </React.Fragment>
    )
}
export default TopBanner

const Card1Moving = styled.div`
width: 100%;
background:#5B82B6;
padding-top:-40px;
.bannerimage{
    margin-top:-63px;
    width:100%;
}
.text1{
    font-family:Roobert-medium;
    font-weight: 500;
    font-size: 40px;
    color: white;
    line-height: 150%;
    font-style: normal;
    @media (min-width: 260px) and (max-width: 820px){
        text-align:center;
        font-size: 28px;
    }
}
.text2{
    font-family:Roobert-medium;
    font-weight: 500;
    font-size: 24px;
    color: white;
    font-style: normal;
    margin-top:-13px;
    @media (min-width: 260px) and (max-width: 820px){
        text-align:center;
        font-size: 20px;
    }
}
.textdiv{
    position:absolute;
    padding-bottom:20px;
    margin-left:40px;
    margin-top:30px;
    @media (min-width: 260px) and (max-width: 820px){
        margin-top:5px;
        }
    }

    .button{
     color:#13488D;
     border-radius:8px;
     font-weight: 500;
     font-size: 18px;
     font-family:Roobert-medium;
     padding-left:30px;
     padding-right:30px;
    }
    .mobbannerimage{
        margin-top:-20px;
        width:100%;
    }
`
const Card1Pressure = styled.div`
width: 100%;
padding-top:-40px;
background:#FFF6CD;
.bannerimage{
    margin-top:-93px;
    width:100%;
}
.text1{
    font-family:Roobert-medium;
    font-weight: 500;
    font-size: 40px;
    color: black;
    line-height: 150%;
    font-style: normal;
    @media (min-width: 260px) and (max-width: 820px){
        text-align:center;
        font-size: 28px;
    }
}
.text2{
    font-family:Roobert-medium;
    font-weight: 500;
    font-size: 24px;
    color: black;
    font-style: normal;
    margin-top:-15px;
    @media (min-width: 260px) and (max-width: 820px){
        text-align:center;
        font-size: 20px;
    }
}
.textdiv{
    position:absolute;
    padding-bottom:20px;
    margin-left:40px;
    margin-top:30px;
    @media (min-width: 260px) and (max-width: 820px){
        margin-top:-10px;
        margin-left:15px;

    }
    }
    .button{
        color:white;
        border-radius:8px;
        font-weight: 500;
        font-size: 18px;
        font-family:Roobert-medium;
        padding-left:30px;
        padding-right:30px;
       }
`

const MobileView = styled.div`
@media (min-width: 821px) and (max-width: 10000px){
    display:none;
    }
`
const WebView = styled.div`
background:#FAFAFA;
@media (min-width: 260px) and (max-width: 820px){
    display:none;
    }
    .card{
        @media (min-width: 1800px) and (max-width: 2500px)
  {
      padding-left:250px;
      padding-right:250px;
  }
  @media (min-width: 2501px) and (max-width:3000px)
  {
      padding-left:350px;
      padding-right:350px;
  }
  @media (min-width: 3001px) and (max-width:4000px)
  {
      padding-left:650px;
      padding-right:650px;
  }
  @media (min-width: 4001px) and (max-width:9999px)
  {
      padding-left:1350px;
      padding-right:1350px;
  }
    }
`

