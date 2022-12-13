import React, { useEffect, useState } from 'react'
import { Container,Col, Offcanvas, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import dummyimg from '../../../assets/dummyprofile.png'
import propic from '../../../assets/propic.png'
import { getAdminDetails } from '../../../store/Actions/Dashboard.actions'
import  Umbrella from '../../../assets/pinkumbrella.png'

function PressurewashingPayment(props){
    const [det, setDet] = useState(props?.det||{})
    const [detdata, setDetData] = useState(props?.detdata||{})
    const [type, setType] = useState(props?.type||'')
    const [finaldata, setFinalData] = useState(props?.detdata||{})
    const [showSearch, setShowSearch] = useState(false)
    const dispatch = useDispatch()
    let locate = useLocation();

    console.log(finaldata,'finalllll')
    const renderDetails = () => {
        return (
<div>
{/* <Details className='d-flex justify-content-start'>
            <div style={{paddingLeft:'8px',paddingTop:'2px',color:'black'}}>
                Service
                <Text>Pressure washing</Text>
                </div>
        </Details>
        <Details className='d-flex justify-content-start'>
            <div style={{paddingLeft:'8px',paddingTop:'2px',color:'black'}}>
            Areas to be cleaned
                <Text>{det?.areasToBeCleaned.join(' , ')}</Text>
                </div>
        </Details>
        <Details className='d-flex justify-content-start'>
            <div style={{paddingLeft:'8px',paddingTop:'2px',color:'black'}}>
            Approx. sq.ft of your house
                <Text>{det?.approxSizeInSqFt}</Text>
                </div>
        </Details> */}
         <TotalPrices>Price Details</TotalPrices>
         <Hr />
                <Segment onClick={()=>{window.open('https://www.swiftbel.com/help/money-back-guarantee')}} style={{cursor:'pointer'}}>
                 &nbsp;
                <Img src ={Umbrella}/><b>SwiftBel $1000 Guarantee</b>&nbsp;included
                 &nbsp;
                </Segment>
                <Hr />
                <div className='d-flex justify-content-between'>
                    <div>
                        <Prices>{type === 'Electricians'?'Electrician service':type === 'Plumbers'?'Plumber service':'Pressure washing service'}</Prices>
                    </div>
                    <div>
                        <Prices>${type === 'Moving' ? `${detdata?.estimatedHourlyPrice?.toFixed(2)}/hour` : detdata?.finalPrice?.toFixed(2)}</Prices>
                    </div>
                </div>
        <div className='d-flex justify-content-between'>
         <TotalPrices>Total (CAD)</TotalPrices>
         <TotalPrices>${type === 'Moving' ? `${detdata?.estimatedHourlyPrice?.toFixed(2)}/hour` : detdata?.finalPrice?.toFixed(2)}</TotalPrices>
        </div>
</div>
        )}
return(
    <React.Fragment>
     <MainContainer>
        {/* <Heading>{finaldata?.businessName}</Heading> */}
     <ProfileBanner sm={5} >
        <Coverpic src={finaldata?.bannerImage ?finaldata?.bannerImage:dummyimg}/>
        <Profilepic src={finaldata?.logoImage ?finaldata?.logoImage:propic} />
        </ProfileBanner>
        <br/>
        <br/>
        {/* <Tag>{finaldata?.tagLine}</Tag> */}
        <Heading>{finaldata?.businessName}</Heading>
        <div className='d-flex justify-content-start'>
        <Det><span style={{color:'black',fontWeight:500}}>{Number.parseFloat(finaldata?.rating).toFixed(1)}</span>&nbsp;Rating</Det>
        <Det><span style={{color:'black',fontWeight:500}}>{finaldata?.bookingId?.length||0} </span>&nbsp;Bookings</Det>
        <Det><span style={{color:'black',fontWeight:500}}>{finaldata?.review?.length||0} </span>&nbsp;Reviews</Det>


        </div>
<br/>
<WebView>
    {renderDetails()}
</WebView>
<MobileView>
                    <MobileDetails className='justify-content-start'>
                        Service
                        <Text>{type === 'Electricians'?'Electrician service':type === 'Plumbers'?'Plumber service':'Pressure washing'}</Text>
                    </MobileDetails>
                    <hr />
                    <div style={{ marginBottom: '-10px' }} className='d-flex justify-content-between'>
                        <MobileDetails className=' justify-content-start'>
                            Date
                            <Text>{det?.date}</Text>
                        </MobileDetails>
                        <MobileDetails style={{ width: '50%' }} className='justify-content-start'>
                            Time
                            <Text>{det?.time}</Text>
                        </MobileDetails>
                    </div>
                    <hr />
                    <MobileDetails className='justify-content-start'>
                        Address
                        <Text>{det?.address}</Text>
                    </MobileDetails>
                    <ViewDetails onClick={()=>setShowSearch(true) } variant="dark" size="lg">
                        View Details
                    </ViewDetails>
                    <MobileModal show={showSearch} onHide={() => setShowSearch(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => setShowSearch(false)}>
                    <Offcanvas.Title>Details</Offcanvas.Title>
                </Offcanvas.Header>
                <div style={{overflow:'scroll'}}>
                 {renderDetails()}
                </div>
            </MobileModal>
                </MobileView>
        </MainContainer>

    </React.Fragment>
)
}
export default PressurewashingPayment

const MobileModal = styled(Offcanvas)`
border-radius:15px;
background-color:#FAFAFA;
padding:20px;
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
`

const MobileDetails = styled.div`
font-family:Inter;
font-style: normal;
font-weight: 500;
font-size: 14px;
color: #190F0F;
padding-top:5px;
`
const Segment=styled.div`
font-size:16px;
font-family: 'Inter';
display:flex;
justify-content:center;
padding: 15px;
border-radius: 8px;
@media (min-width: 260px) and (max-width: 820px){
    align-items:center;
    font-size: 12px;
    display:none;
}
`
const Img=styled.img`
height:20px;
width:20px;
margin-right:10px;
margin-top:2px;
`
const ProfileBanner=styled(Col)`
margin-top:2px;
`
const ViewDetails = styled(Button)`
width:100%;
height:11%
margin-top:15px;
font-weight: 500;
font-size: 16px;
letter-spacing: 0.02em;
font-family:Open Sans;
background-color:#F3F3F3;
background:#F3F3F3;
color:#000;
border:1px solid #000;
`
const Hr = styled.hr`
background-color:lightgray;
background:lightgray;
display:inline;
@media (min-width: 260px) and (max-width: 601px){
   display:none;

}
`
const MainContainer=styled(Container)`
border-radius:18px;
border:1px solid #F3F3F3;
padding:15px;
background-color:#FFFFFF;
`
const Text=styled.p`
color:black;
font-size: 16px;
`
const Details=styled.div`
border-radius:13px;
border:1px solid #F3F3F3;
margin-bottom:15px;
padding:3px;
padding-top:5px;
`
const Coverpic = styled.img`
height:150px;
width:385px;
object-fit:cover;
border-radius:4px;
@media (min-width: 260px) and (max-width: 601px){
    width:295px;

}
`
const Profilepic = styled.img`
position:absolute;
margin-left:20px;
margin-top:-50px;
margin-bottom:60px;
border-radius:100px;
width:90px;
height:90px;
border:5px solid white;
@media (min-width: 260px) and (max-width: 601px){
    margin-left:30px;
}
@media (min-width: 260px) and (max-width: 601px){
    margin-left:-285px;
    margin-top:100px;

}
`
const Heading = styled.h5`
text-align:start;
font-size:18px;
padding-left:5px;
font-family:Roobert-medium;
font-weight:500;
`
// const Tag = styled.p`
// text-align:center;
// font-size:16px;
// font-family:Open Sans;
// `
const Det = styled.p`
font-size:14px;
margin-right:30px;
margin-left:5px;
color:#787373;
@media (min-width: 260px) and (max-width: 820px){
    margin-right:10px;
}
`
const Prices = styled.p`
font-size:14px;
color:#787373;
`
const MobileView = styled.div`

@media (min-width: 821px) and (max-width: 10000px){
    display:none;
    }

`
const TotalPrices = styled.p`
font-size:18px;
font-family:Roobert-medium;
font-weight:500;
`
const WebView = styled.div`
@media (min-width: 260px) and (max-width: 820px){
    display:none;
    }

`