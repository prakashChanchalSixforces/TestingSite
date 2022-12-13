import React, { useEffect, useState } from 'react'
import { Container, Button, Offcanvas } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import dummyimg from '../../../assets/dummyprofile.png'
import propic from '../../../assets/propic.png'
import  Umbrella from '../../../assets/pinkumbrella.png'
import { getAdminDetails } from '../../../store/Actions/Dashboard.actions'

function Movingpayment(props) {
    const [det, setDet] = useState(props?.det||{})
  const [detdata, setDetData] = useState(props?.detdata||{})
  const [type, setType] = useState(props?.type||'')
    const [showSearch, setShowSearch] = useState(false)
    const dispatch = useDispatch()
    let locate = useLocation();
    const valu = new URLSearchParams(window.location.search)
    const urlFinalPrice = valu.get('price')
    const urlEstimatedPrice=valu.get('estimatedPrice')
    const renderDetails = () => {
        return (
            <div>
                {/* <Details className='d-flex justify-content-start'>
                    <div style={{ paddingLeft: '8px', paddingTop: '2px', color: 'black', fontSize: '12px' }}>
                        Service
                        <Text>Moving</Text>
                    </div>
                </Details>
                <Details className='d-flex justify-content-start'>
                    <div style={{ paddingLeft: '8px', paddingTop: '2px', color: 'black', fontSize: '12px' }}>
                    Type of home you're moving from
                        <Text>{det?.typeofHouse}</Text>
                    </div>
                </Details>
                <Details className='d-flex justify-content-start'>
                    <div style={{ paddingLeft: '8px', paddingTop: '2px', color: 'black', fontSize: '12px' }}>
                    Home size you're moving from (Sq.Ft.)
                        <Text>{det?.approxSizeInSqFt}</Text>
                    </div>
                </Details>
                <Details className='d-flex justify-content-start'>
                    <div style={{ paddingLeft: '8px', paddingTop: '2px', color: 'black', fontSize: '12px' }}>
                    Number of bedrooms
                        <Text>{det?.numberOfRooms}</Text>
                    </div>
                </Details>
                <Details className='d-flex justify-content-start'>
                    <div style={{ paddingLeft: '8px', paddingTop: '2px', color: 'black', fontSize: '12px' }}>
                        is a dedicated elevator available
                        <Text>{det?.elevatorAvailable}</Text>
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
                        <Prices>Estimated price for moving service</Prices>
                    </div>
                    <div>
                        <Prices>${detdata?.finalPrice?.toFixed(2)||urlFinalPrice}</Prices>
                    </div>
                </div>
                <Hr />
                <div className='d-flex justify-content-between'>
                    <TotalPrices>Total (CAD)</TotalPrices>
                    <TotalPrices>${type === 'Moving' ? `${detdata?.estimatedHourlyPrice?.toFixed(2)||urlEstimatedPrice}/hour` : detdata?.finalPrice?.toFixed(2)}</TotalPrices>
                </div>
            </div>
        )
    }
    return (
        <React.Fragment>
            <MainContainer>
                <ProfileBanner sm={5} >
                    <Coverpic style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} src={detdata?.bannerImage ? detdata?.bannerImage : dummyimg} />
                    <Profilepic src={detdata?.logoImage ? detdata?.logoImage : propic} />
                </ProfileBanner>
                <Businessline>{detdata?.businessName}</Businessline>
                <Subtitle className='d-flex '>
                    <div className='description'>
                        <p className='d-flex text '><p className='num'>{detdata?.rating || "0"}</p>&nbsp; Rating</p>
                    </div>
                    <div className='description'>
                        <p className='d-flex text'><p className='num'>{detdata?.moves || "0"}</p>&nbsp;Moves</p>
                    </div>
                    <div className='description'>
                        <p className='d-flex text'><p className='num'>{detdata?.review?.length || "0"}</p>&nbsp; Reviews</p>
                    </div>
                </Subtitle>
                <br />
                <WebView>
                    {renderDetails()}
                </WebView>
                <MobileView>
                    <MobileDetails className='justify-content-start'>
                        Service
                        <Text>Moving</Text>
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
                        <Text>{det?.fromAddress || det?.address}</Text>
                    </MobileDetails>
                    <ViewDetails onClick={() => setShowSearch(true)} variant="dark" size="lg">
                        View Details
                    </ViewDetails>
                    <MobileModal show={showSearch} onHide={() => setShowSearch(false)} placement={'bottom'} style={{ height: '650px' }}>
                        <Offcanvas.Header closeButton={() => setShowSearch(false)}>
                            <Offcanvas.Title>Details</Offcanvas.Title>
                        </Offcanvas.Header>
                        <div style={{ overflow: 'scroll' }}>
                            {renderDetails()}
                        </div>
                    </MobileModal>
                </MobileView>
            </MainContainer>
        </React.Fragment>
    )
}
export default Movingpayment
const ProfileBanner = styled.div`
display:flex;
margin-bottom:35px;
`

const MobileModal = styled(Offcanvas)`
border-radius:15px;
background-color:#FAFAFA;
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
`
const Prices = styled.p`
font-size:14px;
color:#787373;
font-family:Inter;
`
const TotalPrices = styled.p`
font-size:18px;
font-family:Roobert-medium;
font-weight:500;
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
const MobileDetails = styled.div`
font-family:Inter;
font-style: normal;
font-weight: 500;
font-size: 14px;
color: #190F0F;
padding-top:5px;
`
const MainContainer = styled(Container)`
border-radius:18px;
border:1px solid #F3F3F3;
padding:15px;
background-color:#FFFFFF;
@media (min-width: 260px) and (max-width: 767px){
    padding:0px;
    border:0
}
`
const Text = styled.p`
color:black;
font-size: 16px;
font-family: Inter;
font-style: normal;
font-weight: 400;
@media (min-width: 260px) and (max-width: 820px){
    margin-top:5px;
    }

`
const Details = styled.div`
border-radius:13px;
border:1px solid #F3F3F3;
margin-bottom:15px;
padding:3px;
padding-top:5px;
`
const Hr = styled.hr`
background-color:lightgray;
background:lightgray;
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
const Businessline = styled.h2`
font-weight: 500;
font-size: 24px;
font-family:Roobert-medium;
line-height: 100%;
letter-spacing: 0.02em;
`
const Coverpic = styled.img`
cursor:pointer;
width:100%;
object-fit:cover;
height:150px;
`
const Profilepic = styled.img`
position:absolute;
margin-top:110px;
cursor:pointer;
margin-bottom:60px;
border-radius:100px;
margin-left:10px;
width:72px;
height:72px;
border:5px solid white;
`

const Subtitle = styled.div`
font-size: 14px;
font:Inter;
margin-bottom:-15px;
@media (min-width: 200px) and (max-width:970px)
{
font-size: 14px;
}
.num{
color:black;
font-weight: 500;
}
.text{
color:#787373;
font-weight: 400;
font-size: 16px;
}
.description{
    margin-right:15px;
}
`
const MobileView = styled.div`

@media (min-width: 821px) and (max-width: 10000px){
    display:none;
    }

`
const WebView = styled.div`
@media (min-width: 260px) and (max-width: 820px){
    display:none;
    }

`