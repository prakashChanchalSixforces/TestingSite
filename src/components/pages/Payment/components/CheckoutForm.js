import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { Button, Form, Modal, ModalBody ,Spinner} from 'react-bootstrap';
import styled from 'styled-components';
import React, { useState, useMemo } from 'react'
import countryList from 'react-select-country-list'
import arrowaddpost from '../../../../assets/arrowAddPosts.png'
import tick from '../../../../assets/tick.png'
import { useNavigate } from 'react-router-dom';
import { getAdvancepaymentIntent, getPatentValue, getpaymentIntent, paymentBooking } from '../../../../store/Actions/User.action';
import { useDispatch } from 'react-redux';

const CheckoutForm = (props) => {
    const [value, setValue] = useState('')
    const [postalCode, setpostalCode] = useState('')
    const [modalShow, setModalShow] = useState(false)
    const [country, setcountry] = useState('CA')
    const [loader,setLoader]=useState(false)
    const [setSecretKey] = useState('')
    const [error,setError]=useState('')
    const options = useMemo(() => countryList().getData(), [])
    const navigate = useNavigate()
    const { finaldata,customerData } = props
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const [values,setValues]=useState({})


    const handleSubmit = async (event) => {
        setLoader(true)
        event.preventDefault();
        const data = {
            "paymentMethod":["card"],
            "serviceProviderId": finaldata?.spId,
          }
        let res = await dispatch(getpaymentIntent(data));
        let ClientSercet=''
        console.log(res)
        if (res.status === true) {
            ClientSercet=res.data?.client_secret
          setSecretKey(res.data?.client_secret)
        }

        const result = await stripe.confirmCardPayment(ClientSercet, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: value,
                    address: {
                        postal_code: postalCode,
                        country: country
                    }
                }
            }
        });
        if (!result?.error) {
           const res1= await dispatch(paymentBooking(finaldata,customerData))
            const res3 = await dispatch(getAdvancepaymentIntent(data));
            setValues({...values,["bookingRef"]:res1?.findData?.bookingRefNo})
            setValues({...values,["total"]:res?.data?.id})
            setValues({...values,["advance"]:res3?.data?.id})
            const res4 = await dispatch(getPatentValue(values));
            setModalShow(true)
        }
        else{
            setError(result.error.message)
        }
        console.log(elements.getElement(CardNumberElement))
        console.log(result, "result")

        if (result.error) {
            console.log(result.error.message);
        } else {
        }
        setLoader(false)
    };

    return (
        <React.Fragment>
            <SucessfulModal
                show={modalShow}
                size='md'
                onHide={() => {
                    navigate('/')
                    setModalShow(false)
                }}
                centered
            >
                <Modal.Header style={{ height: "55px" }} closeButton={() => {
                    navigate('/')


                }} >
                    <img src={arrowaddpost} alt='back' onClick={() => {
                        navigate('/')
                        setModalShow(false)

                    }}></img>

                </Modal.Header>
                <SuccesfulModalBody style={{ alignItems: 'center' ,paddingTop:'40px',paddingBottom:'40px',}}>
                <div style={{justifyContent:'center',display:'flex'}}>
                    <img alt='' src={tick} style={{ width: '80px', height: '80px' }} />
                    </div>

                    <SuccesfulHeader>Booking request sent</SuccesfulHeader>
                    <Text>We will send an email once the service provider confirms the booking</Text>
                    <Text>We strive to do this within <p style={{ color: '#E24F84' }}> 5 minutes </p> but sometimes it takes longer</Text>
                    </SuccesfulModalBody>
            </SucessfulModal >
            <form onSubmit={handleSubmit}>
                <CardInputWrapper>
                    <Label>Cardholder Name</Label>
                    <Input placeholder='Cardholder Name' onChange={(event) => setValue(event.target.value)} />
                </CardInputWrapper>
                <CardInputWrapper>
                    <Label>Card Number</Label>
                    <CardNumberElement

                        options={{
                            showIcon: true,

                            style: {
                                base: {
                                    iconColor: '#000',

                                    fontWeight: '500',
                                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                                    fontSize: '16px',
                                    fontSmoothing: 'antialiased',
                                    ':-webkit-autofill': {

                                    },
                                    '::placeholder': {

                                    },
                                },
                            },
                        }}
                    />
                </CardInputWrapper>
                <div className='d-flex justify-content-between'>
                    <CardCvInputWrapper
                        style={{ marginRight: '10px' }}
                    >
                        <Label>Expiraion Day (MM/YY)</Label>
                        <CardExpiryElement options={{
                            showIcon: true,
                        }} />

                    </CardCvInputWrapper>
                    <CardCvInputWrapper>
                        <Label>CVV (3 Digits)</Label>
                        <CardCvcElement
                            options={{
                                showIcon: true,
                            }}
                        />
                    </CardCvInputWrapper>
                </div>
            <div className='d-flex justify-content-between'>
                <CardCvInputWrapper style={{ marginRight: '10px' }} >
                    <Label>Country</Label>
                    <Select value={country} onChange={(event) => setcountry(event.target.value)}>

                        {

                            options.map((item) =>
                                <option value={item.value}>{item.label}</option>
                            )
                        }
                    </Select>

                </CardCvInputWrapper>
                <CardCvInputWrapper>
                    <Label>Postal Code</Label>
                    <PostalInput placeholder='Postal Code' maxLength={6} onChange={(event) => setpostalCode(event.target.value)} />
                </CardCvInputWrapper>
            </div>
            {
                error?<div>
<br/>
            <p style={{fontSize:'14px',color:'#D81159'}}>{error}</p>
                </div>:null
            }
            <br />
            <Subtext2>
                By selecting the button below, I agree to the SwiftBel Rules,
                <a  style={{ color: '#EB873F',cursor:'pointer' }} href='https://www.swiftbel.com/help/legal/cancellation-and-refund-policy'
                target='_blank' rel="noreferrer"> Cancellation and Refund Policy</a> and <a style={{ color: '#EB873F',cursor:'pointer' }} href='https://www.swiftbel.com/help/legal/terms-of-service'
                onClick={()=>{
                window.analytics.track("Click terms of service")
                }} target='_blank' rel="noreferrer">Terms of Service</a>.
                If your job requires materials, your Service Provider will
                ask you to authorize those material costs and they will
                be added to the price you pay.
            </Subtext2>
            <Confirm onClick={handleSubmit} disabled={loader?true:false}  variant='dark' size="lg" >
            {loader?<div> <Spinner
                    as="span"
                    variant="light"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="border"/>
                    {"   Loading...."}
                    </div>
                    :
                "Request to book - SwiftBel"}
            </Confirm>
        </form>
        </React.Fragment>
    )
};
export default CheckoutForm

const Confirm = styled(Button)`
width:100%;
height:11%;
margin-top:15px;
font-weight: 500;
font-size: 16px;
letter-spacing: 0.02em;
background-color:#D81159;
background:#D81159;
color:white;
border:1px solid #D81159;
`
const SuccesfulModalBody=styled(ModalBody)`
-webkit-border-radius: 0px !important;     -moz-border-radius: 0px !important;     border-radius: 0px !important;
`
const Label = styled.label`
font-family: Open Sans;
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 150%;
margin-bottom:5px;
display: flex;
align-items: center;

`
const Subtext2 = styled.p`
font-size: 14px;
font-family:Open Sans;
`
const Select = styled(Form.Select)`
font-family:Open Sans;
border:none;

background-color:#FAFAFA;
margin-left:-10px;
margin-top:-10px;
.placeholder {
  font-family: Open Sans;
}
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:0px solid #190F0F;
  background-color: #FAFAFA;
}
`
const CardInputWrapper = styled.div`
border: 1px solid #190F0F;
border-radius: 10px;
  padding: 10px;
  margin-top:15px;
`;
const CardCvInputWrapper = styled.div`
width:100%;
border: 1px solid #190F0F;
border-radius: 10px;
  padding: 10px ;
  margin-top:15px;
`;

const Input = styled.input`
border: none;
display:flex;
background:#FAFAFA;
&:focus {
    outline: none;
    box-shadow: 0px 0px 0px white;
    border:0px solid #FAFAFA;
   
  }

`
const PostalInput = styled.input`
width:100%;
border: none;
display:flex;
margin-bottom:-10px;
background:#FAFAFA;
&:focus {
    outline: none;
    box-shadow: 0px 0px 0px white;
    border:0px solid #FAFAFA;
   
  }

`
const SucessfulModal = styled(Modal)`


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
const Text = styled.p
    `
    display:flex;
    text-align:center;
    
margin-top: 0.30rem;


`