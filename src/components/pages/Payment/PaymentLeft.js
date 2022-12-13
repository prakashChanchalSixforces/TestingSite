import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import time from '../../../assets/time.png'
import americanExpress from '../../../assets/american-express.png';
import discover from '../../../assets/discover.png';
import visa from '../../../assets/visa.png';
import master from '../../../assets/mastercard.png';
import back from '../../../assets/back.png'
import Map from '../../layouts/googlemap/profileMap';
import { Row } from 'react-bootstrap';
//import App from '../paymentTest'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm'
import { useLocation, useNavigate } from 'react-router-dom'
import Geocode from "react-geocode";
import SignupModal from '../../layouts/Auth/SignupModal'
import { isAuthenticated } from '../../layouts/Auth/Authentication'
import { getAdminDetails } from '../../../store/Actions/Dashboard.actions';
import { useDispatch } from 'react-redux';
import { verifyEmailUser } from '../../../store/Actions/Auth.action';
import SetPassword from '../../layouts/Auth/SetPassword';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();


const stripePromise = loadStripe('pk_live_51KnIv3IP0V9hIrNScYkpMaRMBSzGwDekxHvEgBoXBo2iTlzOQ13rL927tddCs5JcnWMfVJeC6JJxRcrNtdKz70wY00DcDIUxhf');

function PaymentLeft(props) {
  const [det, setDet] = useState(props?.det||{})
  const [detdata, setDetData] = useState(props?.detdata||{})
  const [position, setPosition] = useState({})
  const [type, setType] = useState(props?.type||'')
  const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [isEmailAvilable, setIsEmailAvlable] = useState(props?.isEmailAvilable||false);
  const [email, setEmail] = useState(props?.email||'')
  const [passwordmodal, setpassworModal] = useState(false)
  const valu = new URLSearchParams(window.location.search)
  const urlFinalPrice = valu.get('price')
  const urlEstimatedPrice=valu.get('estimatedPrice')

  const dispatch = useDispatch()
  let locate = useLocation();
  useEffect(()=>{
    setDet(props?.det)
    setDetData(props?.detdata)
    setType(props?.type)
  },[props?.det,props?.detdata,props?.type])
  const verifyEmail = async (emails) => {
    const data={
      email: emails
    }
    const res = await dispatch(verifyEmailUser(data))
    if (res.status) {
      setIsEmailAvlable(true)
    }
  }
  useEffect(() => {
    init()
    Geocode?.fromAddress(det?.fromAddress || det?.address).then((res) => {
      console.log(res.results[0].geometry.location, "res")
      setPosition(res.results[0].geometry.location)
    })
  }, [det?.fromAddress, det?.address])

  const paymentnav = () => {
    if (locate?.search) {
      !isEmailAvilable ? setLoginModalShow(true) : setpassworModal(true)
    }
    else if (!isAuthenticated()) {
      setSignUpModalShow(true)
      console.log('not authenticate')
    }
    else {
      navigate(`/payment`, { state: { from: "/details" } })
      console.log('authenticate')
    }
  }

  //let finaldata = service?.filter(x => x.spId === spid)
  console.log(urlFinalPrice, urlEstimatedPrice,'finaldata')
  let navigate = useNavigate()
  const init = async () => {
    // const res = await dispatch(getpaymentIntent(data));
    // console.log(res)
    // if (res.status === true) {
    //   setSecretKey(res.data?.client_secret)
    // }
  }
  let location = useLocation()
  console.log(location, 'location in checkout', detdata)

  const handleback = () => {
    if (location?.state?.servicename === 'Pressure Washing') {
      navigate('/pressurewashing')
    }
    else if (location?.state?.servicename === 'Moving') {
      navigate('/moving')
    }
    else
      navigate('/')
  }

  return (
    <React.Fragment>
      <WebView>
        <Head><Backicon src={back} onClick={() => handleback()} /> Booking</Head>
        <br />
        <Headings>Date and Time</Headings>
        <Subtext>
          {/* <Icon src={time} />&nbsp;&nbsp; */}
          {det?.date}&nbsp;,&nbsp;{det?.time}</Subtext>
        <Hr />
        <Headings>Address Details</Headings>
        <Subtext2 style={{ marginTop: '-10px' }}>You should be in house, to meet worker, and to give them keys.</Subtext2>
        <Row className='mt-3 mb-3'>
          <Map
            //google={props.google}
            center={position}
            zoom={10}
          />
        </Row>
        <div className='d-flex justify-content-between'>
          <Subtext style={{ marginBottom: '-3px' }}>
            {/* <Locationicon src={location} /> */}
            {det?.fromAddress || det?.address}</Subtext>
          {/* <p><Icon src={edit} /></p> */}
        </div>
      </WebView>
      <Hr />
      <Headings >Things to Remember</Headings>
      <Subtext2>Please be at home when your worker arrives so that you can review the job and provide access.</Subtext2>
      <Hr />

      <Headings>Price Details</Headings>
      <div className='d-flex justify-content-between'>
        <Subtext3>Deposit (CAD):</Subtext3>
        {/* <h4>${finaldata[0]?.finalPrice.toFixed(2)}</h4> */}
        <h4>$50</h4>
      </div>
      <div className='d-flex justify-content-between'>
        <Subtext3>Price (CAD):</Subtext3>
        {/* <h4>${finaldata[0]?.finalPrice.toFixed(2)}</h4> */}
        <h4>${type === 'Moving' ? `${detdata?.estimatedHourlyPrice?.toFixed(2)||urlEstimatedPrice}/hour` : detdata?.finalPrice?.toFixed(2)||urlFinalPrice}</h4>
      </div>
      <div className='d-flex justify-content-between'>
        <Subtext3>Pay With:</Subtext3>
        <div className='d-flex'>
          <Paymenticon src={visa} />
          <Paymenticon src={master} />
          <Paymenticon src={americanExpress} />
          <Paymenticon src={discover} />
        </div>
      </div>

      <div className="d-grid gap-2">
        {locate?.pathname === '/details' ?
          <>
            <br />
            <Subtext2>
              By selecting the button below, I agree to the SwiftBel Rules,
              <a style={{ color: '#EB873F',cursor:'pointer' }}
              href='https://www.swiftbel.com/help/legal/cancellation-and-refund-policy'
              rel="noreferrer"
              onClick={() => {
                window.analytics.track("Click cancellation and refund policy", {
                  above_continue_to_pay_button: 'cancellation and refund policy'
                })
              }} target='_blank'> Cancellation and Refund Policy</a> and <a style={{ color: '#EB873F',cursor:'pointer' }}
              href='https://www.swiftbel.com/help/legal/terms-of-service'
              rel="noreferrer" onClick={() => {
                window.analytics.track("Click terms of service")
              }} target='_blank'>Terms of Service</a>.
              If your job requires materials, your Service Provider will
              ask you to authorize those material costs and they will
              be added to the price you pay.
            </Subtext2>
            <Confirm variant="dark" size="lg"
              onClick={() => {
                window.analytics.track("Click continue to pay", {
                  color: '#D81159',
                  hourly_price: type === 'Moving' ? `${detdata?.estimatedHourlyPrice?.toFixed(2)}/hour` : detdata?.finalPrice?.toFixed(2),
                  deposit: 'CAD 50',
                  "url": window.location?.pathname
                });
                paymentnav()
              }}
            >
              Continue to pay
            </Confirm>
            <SetPassword
              email={email}
              setPasswordModal={setpassworModal}
              show={passwordmodal}
              onHide={() => setpassworModal(false)}
            />
            <SignupModal
              email={email}
              signupModal={setSignUpModalShow}
              loginModal={setLoginModalShow}
              loginModalshow={loginModalShow}
              show={signUpModalShow}
              onHide={() => setSignUpModalShow(false)}
            />
          </>
          :
          <Elements stripe={stripePromise} >
            <CheckoutForm
              finaldata={detdata}
              customerData={det}
            />
          </Elements>
        }
        {/* <Button   variant="dark" size="lg">
          Confirm Booking
        </Button> */}

      </div>
      <br />
      <Bighr />
      <Subtext2>
        When Service Provider accepts your booking request,
        SwiftBel will charge your account a $50 refundable deposit.
        72 hours prior to your Reserved Time, SwiftBel asks
        your credit card company to hold an amount equal
        to 4 hours of work.
      </Subtext2>
      <br />
      <Cancelpolicy>Cancellation Policy</Cancelpolicy>
      <Subtext3>
        This booking is refundable subject to <a style={{ color: '#EB873F',cursor:'pointer' }}
        onClick={() => {
          window.analytics.track("Click cancellation and refund policy", {
            below_continue_to_pay_button: 'cancellation and refund policy'
          })
        }} target='_blank'
        href='https://www.swiftbel.com/help/legal/cancellation-and-refund-policy'
        rel="noreferrer"
        >Cancellation Policy</a> .</Subtext3>
      <Bighr />
      <Subtext3>
        Your booking won't be confirmed until the Service
        Provider accepts your request. We strive to do
        this within 5 minutes but sometimes it takes longer.
      </Subtext3>
      <Bighr />
      {/* <div className='d-flex justify-content-between'>
        <Subtext3 >Refundable</Subtext3>
        <Subtext3>Insurance Claims</Subtext3>
        <Subtext3>Report Issues</Subtext3>
      </div> */}

      {/* <Subtext>Refundable</Subtext>
      <Subtext>Insurance Claims</Subtext>
      <Subtext>Report Issues</Subtext> */}

    </React.Fragment>
  )
}
export default PaymentLeft

const Hr = styled.hr`
background-color:lightgray;
background:lightgray;
`
const Head = styled.p`
font-size: 21px;
font-weight: 400;
`
const Bighr = styled.hr`
background-color:lightgray;
background:lightgray;
border:1px solid lightgray
`
const Icon = styled.img`
height:22px;
width:22px;
margin-right:5px;
margin-top:-3px;
`
const Locationicon = styled.img`
height:20px;
width:15px;
margin-right:10px;
margin-top:-3px;
`
const Backicon = styled.img`
height:8px;
width:6px;
margin-right:20px;
margin-top:-3px;
`
const Paymenticon = styled.img`
height:25px;
width:25px;
margin-right:5px;
margin-top:-3px;
`
const Subtext = styled.p`
font-size: 16px;
font-family:Inter;
color: #787373;
`
const Subtext2 = styled.p`
font-size: 14px;
font-family:Inter;
color: #787373;
`
const Subtext3 = styled.p`
font-size: 14px;
font-family:Inter;
`
const Headings = styled.p`
font-size: 18px;
line-height: 24px;
font-family:Roobert-medium;
`
const Cancelpolicy = styled.p`
font-weight: 500;
font-size: 18px;
line-height: 24px;
font-family:Roobert-medium;
`
const Confirm = styled(Button)`
width:100%;
height:11%
margin-top:15px;
font-weight: 500;
font-size: 16px;
letter-spacing: 0.02em;
font-family:Open Sans;
background-color:#D81159;
background:#D81159;
color:white;
border:1px solid #D81159;
`
const WebView = styled.div`
@media (min-width: 260px) and (max-width: 820px){
    display:none;
    }

`