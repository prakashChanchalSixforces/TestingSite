import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import { useLocation, useNavigate } from 'react-router-dom';
import banner from '../../../../assets/TestingImg/commercial.svg';
import '../../UserHomepage/components/styles.css'
import moment from 'moment';
import TextLoop from "react-text-loop";
import '../../UserHomepage/Calendar.css'
const wordArray = [
"Call our team.","Set your budget.","Kick your feet up." ,"settle in sooner."
]
function CommercialService(props) {
    const dispatch = useDispatch();
    let location = useLocation();
    const navigate = useNavigate()
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time
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
            <Main id="service">
                <Head>
            <Card1Moving >
                <BannerMobImg src={banner} />
                <div>
                <BannerImg src={banner} />
                </div>
                <div className='left-side'>
                    <div >
                            <h2 >Commercial Moving</h2> 
                            <br/>
                        <p className='text2'>Swift movers Moving offers commercial moving services in Vancouver, Calgary, and Toronto. Our number one goal on each commercial move is to earn repeated business through excellence in service and workmanship. Our highly trained moving experts are ready to relocate your business to the next stage at an affordable price. Call us today for a free quote!</p>
                        <br/>
                    </div>
                    <Actions
    
                            variant='light' >
        
                            Get in Touch
                        </Actions>
                        <MobileView>
                            <MobileActions
                                variant='light' >
                                {
                                    "Get in Touch"}
                            </MobileActions>
                        </MobileView>
                </div>
               
            </Card1Moving>
            </Head>
            </Main>

        </React.Fragment>
    )

}
export default CommercialService

const Main = styled.div`
display:flex;
justify-content:center;
`
const Head=styled.div`
width:1312px;
padding-left:20px;
padding-right:20px;

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
const BannerImg = styled.img`
height:421px;
width:700px;
@media (min-width: 822px) and (max-width: 1399px){
    height:361px;
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