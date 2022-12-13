import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import { useLocation, useNavigate } from 'react-router-dom';
import banner from '../../../../assets/TestingImg/RESIDENTIAL_MOVING-1.svg';
import '../../UserHomepage/components/styles.css'
import moment from 'moment';
import TextLoop from "react-text-loop";
import '../../UserHomepage/Calendar.css'
const wordArray = [
"Call our team.","Set your budget.","Kick your feet up." ,"settle in sooner."
]
function MovingSearch(props) {
    const dispatch = useDispatch();
    let location = useLocation();
    const navigate = useNavigate()
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time
    const [datecalendar, setDatecalendar] = useState(false);
    const [isloading, setIsloading] = useState(false)
    const [active, setActive] = useState(false);
    const [focusedname, setFocusedname] = useState('')
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                return prevIndex + 1 < wordArray.length ? prevIndex + 1 : 0;
            });
        }, 2000);

        return () => clearInterval(interval);
    });


    console.log(address, date, time, 'yes data')
    const search = location.search;
    const approxSizeInSqFt = new URLSearchParams(search).get('approxSizeInSqFt');
    const fromAddress = new URLSearchParams(search).get('fromAddress');
    const date2 = new URLSearchParams(search).get('date');
    const time2 = new URLSearchParams(search).get('time');
    const elevatorAvailable = new URLSearchParams(search).get('elevatorAvailable');
    const typeofHouse = new URLSearchParams(search).get('typeofHouse');
    const toAddress = new URLSearchParams(search).get('toAddress');
    const numberOfRooms = new URLSearchParams(search).get('numberOfRooms');

    const [from, setFrom] = useState(fromAddress || location?.state?.address);
    const [to, setTo] = useState(toAddress);
    const [show, setShow] = useState("Call us");
    const [values, setValues] = useState({
        "typeofHouse": typeofHouse || "Condo",
        "approxSizeInSqFt": approxSizeInSqFt || "500 to 1,200 ",
        "numberOfRooms": numberOfRooms || "2",
        "elevatorAvailable": elevatorAvailable || "Shared elevator",
        "fromAddress": fromAddress || address || "",
        "date": date2 || date || moment(new Date()).format('DD MMM YYYY'),
        "time": time2 || time || "10:00AM",
        "toAddress": toAddress || ""
    })

  

 

    const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
    let limit = mql === true ? 9 : 8
    let dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }

 
    return (
        <React.Fragment>
            <Main>
                <Head>
            <Card1Moving >
                <BannerMobImg src={banner} />
                <div className='left-side'>
                    <div >
                            <h2 >Start Moving.</h2> 
                               
                               <p className='text1'>
                               <TextLoop>
                                    {
                                        wordArray.map((item) =>
                                            <span > {item}</span>
                                        )
                                    }
                                </TextLoop>
                               </p>
                               <h5>Worried about your upcoming move?</h5>
                        <p className='text2'>Call us today to find out how the Care Full team can make the transition to your new home easy, affordable, and seamless.</p>

                    </div>
                    <Actions onMouseEnter={()=>setShow('+1 604 358 4116')} onMouseLeave={()=>setShow("Call the Care for team")}
    
                            variant='light' >
        
                            {show}
                        </Actions>
                        <MobileView>
                            <MobileActions
                                variant='light' >
                                {
                                    "Call the Care for team"}
                            </MobileActions>
                        </MobileView>
                </div>
                <div>
                <BannerImg src={banner} />
                </div>
            </Card1Moving>
            </Head>
            </Main>

        </React.Fragment>
    )

}
export default MovingSearch

const Main = styled.div`
display:flex;
justify-content:center;
background:white;
`
const Head=styled.div`
width:1312px;
padding-left:20px;
padding-right:20px;
background:white;
}
`

const Tiles = styled.div`
display:flex;
flex-wrap:wrap;
@media (min-width: 260px) and (max-width: 820px){
    display:inline;
 }

`

const MobileView = styled.div`
@media (min-width: 821px) and (max-width: 10000000px){
    display:none;
 }
`

const animation = keyframes`
10%, 15%, 100% {transform: translateY(0);}
     25%,36% {transform: translateY(-45px);}
     46%,57% {transform: translateY(-90px);}
     67%,78% {transform: translateY(-135px);}
     88%, 99% {transform: translateY(-180px);}
`

const Card1Moving = styled.div`
display:flex;
background:#FFFFFF;
justify-content:space-between;
padding-top:35px;
padding-bottom:30px;
@media (min-width: 260px) and (max-width: 820px){
    flex-wrap:wrap;
    justify-content:center;
padding-left:25px;
padding-right:25px;
.text1{
    font-size: 24px;
}
}
.error{
    border:3px solid red;
    }
.text1{
font-family:Roobert-medium;
font-weight: 500;
font-size: 40px;
color: #190F0F;
    @media (min-width: 260px) and (max-width: 1099px){
        font-size: 21px;
    }
        @media (min-width: 1100px) and (max-width: 1399px){
            font-size: 30px;
        }
}
.left-side{
    margin-top:20px;
}
.text2{
    font-family:Roobert-medium;
    font-size:16px;
    color: #787373;
    margin-top:-6px;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 14px;
    }
    @media (min-width: 821px) and (max-width: 1099px){
        font-size:16px;
    }
    @media (min-width: 1100px) and (max-width: 1399px){
        font-size:16px;
    }
}
    .text3{
        font-family:Roobert-medium;
    font-weight: 500;
    color:#D81159;
    font-size: 32px;
        @media (min-width: 260px) and (max-width: 820px){
            font-size: 21px;
        }
    }
`
const Place = styled(Autocomplete)`
height:32px;
width:300px;
border-radius:10px;
border-width:0px;
margin-left:-12px;
margin-top:-8px;
font-size:16px;
font-family:roobert-medium;
font-weight:500;
&::placeholder {
  font:Roobert-medium;
  font-size:16px;
  color:gray;
}
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:0px solid #190F0F;
background: transparent;
}
`
const Actions = styled(Button)`
width:300px;
height: 48px;
border-radius: 8px;
background-color:#fff;
border:1px solid #000;
font-size: 16px;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 820px){
    display:none;
 }
`
const MobileActions = styled(Button)`
width:97%;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
`
const Details = styled.div`

margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
color:#787373;
font-family:Inter;
font-size:12px;
height:54px;
padding-bottom:5px;
focused{
color:Black;
margin-bottom:5px;
margin-top:10px;
font-size:16px;
}
.focusing{
color:#787373;
margin-top:3px;
padding-left:-12px;
font-family:Inter;
}
.subdiv{
padding-left:12px;
padding-top:6px;
}
input[type=range] {
    -webkit-appearance: none;
    width:100%;
    padding:15px;
    margin-bottom:10px;
    }
    input[type=range]:focus {
    outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background: #190F0FA3;
    border-radius: 25px;
    }
    input[type=range]::-webkit-slider-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(0,0,0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8px;
    border:1px solid black;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
    background: #190F0FA3;
    }
    .range-wrap{
    position: relative;
    }
    .range-value{
    position: absolute;
    }
    .range-value span{
    width: 30px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: #03a9f4;
    color: #fff;
    font-size: 12px;
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 6px;
    }
    .range-value span:before{
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid #03a9f4;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    margin-top: -1px;
    }
`
const BannerImg = styled.img`
height:421px;
width:700px;
@media (min-width: 822px) and (max-width: 1399px){
    height:381px;
    }
@media (min-width: 260px) and (max-width: 820px){
    display:none;
 }

`
const BannerMobImg = styled.img`
height:231px;
@media (min-width: 821px) and (max-width: 10000px){
   display:none;
 }

`