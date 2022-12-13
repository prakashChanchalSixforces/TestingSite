import React, { useState, lazy, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import HeaderTop from '../../../layouts/headerTop'
import styled from 'styled-components'
import MovingForm from './Forms/MovingForm'
import { isAdminAuthenticated, isAuthenticated } from '../../../layouts/Auth/Authentication'
import { useLocation, useNavigate } from 'react-router-dom'
import PressureForm from '../../SpprofileCustomer/Forms/PressureForm'
import ElectricianForm from '../../SpprofileCustomer/Forms/ElectricianForm'
import PlumberForm from '../../SpprofileCustomer/Forms/PlumberForm'
import MainFooter from '../../MainFooter/MainFooter'
import TrackingMap from '../../../layouts/googlemap/TrackingMap'
import back from '../../../../assets/back.png'
import Geocode from "react-geocode";
import tick from '../../../../assets/tick.png'
import RightService from './RightService'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ServiceModal from '../ServiceModal'
import SwiftbelExperince from './SwiftbelExperince'
import BookingAndManaging from './BookingAndManaging'
import CrousalPage from './Carousels'
import ProfileMap from '../../../layouts/googlemap/map'
import { useSelector } from 'react-redux'
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
const MovingServices = (props) => {
    let location = useLocation();
    const search = location.search;
    const fromAddress = new URLSearchParams(search).get('fromAddress');
    const toAddress = new URLSearchParams(search).get('toAddress');
    const [likeList, setLikeList] = useState('')
    const [index, setIndex] = useState(false)
    const [callback, setCallback] = useState(false)
    const [profileValue, setProfileValue] = useState({})
    const [spId, setSpId] = useState('')
    const [value, setValue] = useState('')
    const [isAdminModal, setIsAdminModal] = useState(false)
    const [servicemodal, setServiceModal] = useState(false || props?.setview)
    const [estimated, setEstimaterd] = useState(129)
    const data = useSelector(state => state.customerReducer.service);
    const finaldata = useSelector(state => state.customerReducer.finaldata);
    const trucktypes = [
        { title: '1  Mover with a truck ', value: 95 },
        { title: '2 Movers with 3 ton truck ', value: 129 },
        { title: '3 Movers with 5 ton truck ', value: 169, recommended: true },
        { title: '4 Movers with 5 ton truck ', value: 210 }
    ]
    const renderLikeList = () => {
        return <div className="likes__list" >
            <div className='d-flex justify-content-between p-2'>
                <div >

                    <p className='heads'>Travel time:</p>
                    <p className='heads'>Loading time:  </p>
                    <p className='heads'>Unloading time:</p>
                    <p className='heads2'>Travel time b/w locations:</p>
                </div>
                
                <div >
                    <p className='heads text-end'> 1 hour ($129)</p>
                    <p className='heads text-end'> 1.5 hours ($193.5)</p>
                    <p className='heads text-end'> 1 hour ($129)</p>
                    <p className='heads2 text-end'> 30 mins ($65)</p>
                </div>
            </div>
        </div>
    }
    const handleLeave = () => {
        return setLikeList('')
    }
    const handleHover = () => {
        return setLikeList(renderLikeList())
    }
    useEffect(() => {
        console.log(location.state, "state")
        Geocode.fromAddress(`${fromAddress}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setFrom({ lat: lat, lng: lng })
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );
        Geocode.fromAddress(`${toAddress}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setTo({ lat: lat, lng: lng })
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );
    }, [])
    let navigate = useNavigate();
    const services = props?.finalData
    const servicesOffered = props?.servicesOffered
    const [from, setFrom] = useState({})
    const [to, setTo] = useState({})


    const Renderitem = () => {
        if (servicesOffered === 'Moving') {
            return <MovingForm />
        }
        else if (servicesOffered === 'Pressure Washing') {
            return <PressureForm />
        }
        else if (servicesOffered === 'Electricians') {
            return <ElectricianForm />
        }
        else if (servicesOffered === 'Plumbers') {
            return <PlumberForm />
        }
    }
    const handlebooknow = () => {
        console.log(spId, "id")
        localStorage.setItem('data', JSON.stringify(profileValue))
        localStorage.setItem('type', 'Moving')
        localStorage.setItem('spId', spId)
        if (spId) {
            if(isAuthenticated()){
                navigate(`/payment`, { state: { servicename: "Moving", spId: spId } })
             }
             else {
                navigate(`/details`, { state: { servicename: "Moving", spId: spId } })
             }
     
        }
        else {
            toast.error("Select company", { position: "top-right" });
        }

    }
    return (
        <React.Fragment>
            <div>
                <HeaderTop />
                <Mains>
                    <Head>
                        <Segment>
                            <br />
                            <Text onClick={() => setIndex(false)}><Backicon src={back} /> Back</Text>
                            <h2>{index === true ? "Select a moving company" : "Get an estimate"}</h2>
                            <br />
                            {
                                index == true ? <MovingMain >
                                    <div style={{ display: 'inline', position: 'relative', overflowY: 'auto', flexGrow: 1 }}>
                                        <CardContainer>

                                            <RightService selectedProfile={(item, spid) => {
                                                setProfileValue(item)
                                                setSpId(spid)
                                            }} type={"moving"} setview={() => { console.log('') }} loader={false} />

                                        </CardContainer>

                                    </div>
                                    <Form  >
                                        <EstimateContainer>
                                            <Heading >
                                                 Booking details

                                            </Heading>  
                                           <br/>
                                            {data[0]?.estimatedHourlyPrice?<div className='d-flex justify-content-between p-2'> 
                                                <p className='estimatedprice'><span style={{textDecoration: 'line-through',color:'#787373'}}>${data[0]?.estimatedHourlyPrice+15}</span> ${data[0]?.estimatedHourlyPrice} per hour</p>
                                            </div>:null}
                                            <WeBView >
                                                <Vbutton class="fun"  size='md'  onClick={handlebooknow} >Reserve now</Vbutton>
                                            </WeBView>
                                            <p style={{textAlign:'center'}}>You won't be charged yet</p>
                                            {/* <div className="likes__relavance" onMouseOver={handleHover} onMouseLeave={handleLeave}>
                                                <div style={{paddingLeft:'10px',paddingRight:'15px'}} className='d-flex justify-content-between'>
                                                    <ServiceHeader> <u>Total estimated cost:</u></ServiceHeader>
                                                    <ServiceHeader>${data[0]?.finalPrice}</ServiceHeader>
                                                </div>
                                                {likeList}
                                            </div> */}

                                            <hr/>
                                            {data[0]?.estimatedHourlyPrice?<ServiceHeader style={{textAlign:'center',marginTop:'-10px',marginBottom:'-5px'}} className=' p-2'> {
                                              trucktypes.map((item)=>{
                                                  if(item.value===estimated)
                                                    return item.title
                                              })
                                            }</ServiceHeader>:null}
                                          
                                        </EstimateContainer>
                                        <br />
                                    </Form>
                                </MovingMain> : <MovingMain>
                                    <Form>
                                        {callback ? <BookingConfirmed>
                                            <div style={{ justifyContent: 'center', display: 'flex', marginTop: 20 }}>
                                                <img alt='' src={tick} style={{ width: '80px', height: '80px' }} />
                                            </div>
                                            <SuccesfulHeader>Estimation request sent</SuccesfulHeader>
                                            <div style={{ paddingLeft: '20px' }}>
                                                <Text style={{ textAlign: 'center' }}>We will call you back shortly!</Text>
                                                <Viewpricing variant="dark" size='md' className='reservenow' onClick={() => setCallback(false)} >Done</Viewpricing>
                                            </div>
                                        </BookingConfirmed> : <MovingForm
                                            fromAddres={(item) => {
                                                Geocode.fromAddress(`${item}`).then(
                                                    (response) => {
                                                        const { lat, lng } = response.results[0].geometry.location;
                                                        setFrom({ lat: lat, lng: lng })
                                                        console.log(lat, lng);
                                                    },
                                                    (error) => {
                                                        console.error(error);
                                                    }
                                                );
                                            }}
                                            toAddres={(item) => {
                                                Geocode.fromAddress(`${item}`).then(
                                                    (response) => {
                                                        const { lat, lng } = response.results[0].geometry.location;
                                                        setTo({ lat: lat, lng: lng })
                                                        console.log(lat, lng);
                                                    },
                                                    (error) => {
                                                        console.error(error);
                                                    }
                                                );
                                            }}
                                            handleSubmit={(item) => {
                                                setIndex(true)
                                                setEstimaterd(item)
                                            }}
                                            requestCallback={() => setCallback(true)}
                                            setIndex={(item) => setValue(item)}
                                        />}
                                    </Form>
                                    {value === 1 ? <ProfileMap
                                        center={from}
                                        zoom={10}
                                    /> : <TrackingMap
                                        fromAddres={from}
                                        toAddres={to}
                                        center={{
                                            lat: 49.246292,
                                            lng: -123.116226
                                        }}
                                        zoom={11}

                                    />}
                                </MovingMain>
                            }

                            <ToastContainer
                                position="bottom-left" />
                            <div>
                            </div>
                        </Segment>
                        <br />
                        <SwiftbelExperince />
                        <br />
                        <BookingAndManaging
                            type="moving"
                        />
                        <br />
                        <CrousalPage />
                    </Head>

                </Mains>
                <ServiceModal
                    Servicemodal={setServiceModal}
                    show={servicemodal}
                    onHide={() => setServiceModal(false)}
                    handleSubmit={() => setIndex(true)}
                    index={value}
                />
                {index !== true ?
                    <Footer>
                        <Viewpricing className='bottonfooter' variant="dark" size='md' onClick={() => setServiceModal(true)} >{'Instant online estimates'}</Viewpricing>
                    </Footer> : <Footer>
                        <Viewpricing variant="dark" size='md' className='reservenow' onClick={handlebooknow} >Reserve now</Viewpricing>
                    </Footer>}
                <br />
                <br />
                <MainFooter />
            </div>
        </React.Fragment>
    )
}

export default MovingServices;

const Form = styled.div`
margin-right:30px;

.estimatedprice{
color:black ;
font-size:24px;
font-family: 'Roobert-medium';
font-style: normal;
font-weight: 500;
margin-left:10px;
@media (min-width: 260px) and (max-width: 1115px){
  display:flex;
  }
}
@media (min-width: 260px) and (max-width: 820px){
    padding-left:25px;
    padding-right:25px;
}
`
const CardContainer = styled.div`
display:flex; 
position:relative; 
overflow-y:auto; 
flex-grow: 1; 
max-height:480px;
justify-content:center;
@media (min-width: 260px) and (max-width: 820px){
    max-height:100%;
}

`
const Viewpricing = styled(Button)`
height:44px;
width:92%;
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
letter-spacing: 0.02em;
margin-bottom:1rem;
border-radius:8px;
@media (min-width: 260px) and (max-width: 767px){
    width:80%;
  
margin-bottom:10px;
margin-left:10px;
            }
            @media (min-width: 768px) and (max-width: 1360px){
                
                margin-top:0px;
            margin-bottom:20px;
            margin-left:0px;
            }
`
const MovingMain = styled.div`
display:flex;
@media (min-width: 260px) and (max-width: 820px){
    display:inline;
    }
`
const EstimateContainer = styled.div`
background:white;
border-radius: 8px;
width:350px;
margin-left:20px;
padding-bottom:10px;
filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
@media (min-width: 260px) and (max-width: 820px){
    margin-right:0px;
    }
  .likes__relavance{
    position:relative;
    padding:0 0px;
  }
  .likes__list{
    position:absolute;
    box-sizing: border-box;
    overflow-y:scroll;
    max-height:150px;
    left:10%;
    width:400px;
    z-index:999;
    background:white;
    padding:10px;
    border-radius:8px;
    box-shadow: 0 0 1px 1px #787373;
    filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
  }
  .heads{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    color: #787373;
    margin-top:-10px;
}
.heads2{
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    color: black;
    margin-top:-10px;
}
`
const BookingConfirmed = styled.div`
background:white;
border-radius: 8px;
margin-left:20px;
padding-bottom:20px;
padding-top:20px;
filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
width:500px;
@media (min-width: 260px) and (max-width: 820px){
    width:100%;
    margin-bottom:20px;
    margin-right:0px;
}
`
const Heading = styled.div`
border-radius: 8px 8px 0px 0px;
color:white;
background-color:#D81159;
background:#D81159;
padding: 12px 44px;
text-align:center;
font-size: 20px;

`

const ServiceHeader = styled.p`
color:black ;
font-size:16px;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
margin-left:10px;
@media (min-width: 260px) and (max-width: 1115px){
  display:flex;
  }
`
const Mains = styled.div`
display:flex;
justify-content:center;
`
const Text = styled.p`
font-size: 16px;
cursor:pointer;
color:#787373;
font-weight: 400;
@media (min-width: 260px) and (max-width: 820px){
    padding-left:15px;
    padding-right:15px;
}
`
const Backicon = styled.img`
height:12px;
width:8px;
margin-right:15px;
margin-top:-3px;
`
const Segment = styled.div`
h2{
    @media (min-width: 260px) and (max-width: 820px){
        padding-left:15px;
        padding-right:15px;
    }
}
@media (min-width: 821px) and (max-width: 1500px)
{
    padding-left:70px;
    padding-right:70px;
    
}
`
const Head = styled.div`
width:100%;

@media (min-width: 1501px) and (max-width: 9099px){
    width:1312px;
    padding-left:20px;
}

`
const Footer = styled.div`
display:flex;
position: fixed;
bottom: 0;
height:100px;
background-color:#fff;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
width:100%;
justify-content:center;
align-items:center;
margin-left:-10px;
.bottonfooter{
    background-color:#000;
    border-color:#000;
    color:#fff;
    margin-right:10px;
    margin-bottom:0px;
    marginTop:0;
}
@media (min-width: 746px) and (max-width: 10000px){
    display:none;
}
`


const WeBView = styled.div`
display:flex;
justify-content:center;
@media (min-width: 260px) and (max-width: 820px){
    display:none;
}
`

const SuccesfulHeader = styled.h1
    `
font-weight: 600;
font-size: 2rem;
line-height: 120%;
display: flex;
align-items: center;
letter-spacing: 0.01em;
justify-content:center;
display:flex;
margin-top: 2.25rem;
margin-bottom: 1.25rem;
`
const Vbutton=styled(Button)`
--gradient: linear-gradient(90deg, #D81159, #EB873F,#FFCF23);
height:44px;
width:92%;
font-family: Roobert-medium;
font-weight: 500;
font-size: 16px;
letter-spacing: 0.02em;
margin-bottom:1rem;
border:1px solid #fff;
border-radius:8px;
  background: #ddd;
  background-size: 300%;
  background-image: var(--gradient);
@keyframes bg-animation {
  0% {background-position: left}
  50% {background-position: right}
  100% {background-position: left}
}
.fun {
  color: white;
  border: 0;
  cursor: pointer;
  padding: .5em 1.25em;
  background: linear-gradient(90deg, #D81159,#FFCF23,#EB873F);
  background-size: 300%;
  background-position: left;
  transition: background-position 250ms;
}

:hover {
  background-position: center;
  border:1px solid #fff;
}
`