import React, { useState } from 'react'
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import PhoneInput from '../../layouts/phonenumber/Phonenumber';
import '../../layouts/phonenumber/phonenostyles.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import singlelogowhite from '../../../assets/singlelogowhite.png';
import swiftbellogo from '../../../assets/Logo.png'
import './SPStyles/spStyles.css'
import { newCreateAdminProfile, newCreateProfile } from '../../../store/Actions/Auth.action';
import Autocomplete from 'react-google-autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewSignup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({})
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [submit, setSubmit] = useState(false)
    const { state } = useLocation();
    console.log(state);
    const handlechange = (name, num) => (event, e) => {
        console.log(name, event.target.value, "value")
        const value = name === 'phone' ? num : event.target.value;
        setValues({ ...values, [name]: value })
        console.log(values, "value")
    }
    let onPlaceSelected = (place) => {
        const address = place.formatted_address
        console.log(address, values)
        setAddress(address)
        //setValues({ ...values,'address': address })
    }
    const onSubmit = async () => {
        const data = { ...values, "phone": phoneNumber, 'address': address }
        console.log(data, "data")
        if (isValid()) {
            console.log("hiii")
            if (state) {
                const res = await dispatch(newCreateAdminProfile(data))
                if (res.status === true) {
                    navigate('/business/admindashboard')
                }
                else {
                    toast.error(`${res.message}`)
                }
            }
            else {
                const res = await dispatch(newCreateProfile(data))
                if (res.status === true) {
                    navigate('/business/setservices')
                }
                else {
                    toast.error(`${res.message}`)
                }
            }
        }
        else {
            setSubmit(true)
        }
    }
    const handleBack = () => {
        navigate('/business')
    }
    const isValid = () => {
        if (!values.businessName) {
            return false
        }
        else if (!values.ownerName) {
            return false
        }
        else if (!address) {
            return false
        }
        else if (!phoneNumber) {
            return false
        }
        else if (!values.email) {

            return false
        }

        else return true
    }
    return (
        <Container fluid className="sp-profile">
            <ToastContainer />
            <Row>
                <ProfileLeft>
                    <Col lg={6} md={12} sm={12} xs={12}  >
                        <div className='headerCreate'>
                            <Row xs={1} md={4} lg={3} style={{ marginLeft: 10 }}>
                                <Col lg={1} md={5} sm={5} xs={5}>
                                    <h6 style={{ fontWeight: '600', fontFamily: 'Roobert-medium' }} onClick={handleBack} className='mt-3'>Back</h6>
                                </Col>
                                <Col lg={4} md={7} sm={7} xs={7} >
                                    <h6 style={{ fontWeight: '600', fontFamily: 'Roobert-medium' }} className='mt-3'>Sign Up</h6>
                                </Col>
                            </Row>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                                <img src={swiftbellogo} alt='logo' className='mobileprofilelogo' />
                            </div>
                            <p > Create your profile</p>
                        </div>

                        <h1> Create your profile</h1>
                        <img src={singlelogowhite} alt='logo' className='profilelogos' />
                    </Col>
                </ProfileLeft>
                <Col lg={6} sm={12} className="profileRight">
                    <Row className='owner-content'>
                        <InnerContent lg={12}>
                            <Form >
                                <Row className="mb-3 mt-5">
                                    <Form.Group controlId="formGridEmail">
                                        <StyledLabel>Business name *</StyledLabel>
                                        <StyledSMInput
                                            type="text"
                                            value={values.businessName}
                                            onChange={handlechange('businessName')}
                                            placeholder="Business name"
                                            autoComplete='new-off'
                                        />
                                        {!values.businessName && submit ? (
                                            <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>Business name required</p>
                                        ) : ''}
                                        <PhoneInput
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={(item) => setPhoneNumber(item)}
                                            name='phoneinput'
                                            international
                                            focusInputOnCountrySelection='true'
                                            defaultCountry="CA"
                                            limitMaxLength='true'
                                            autoComplete='off'
                                        />
                                        {!phoneNumber && submit ? (
                                            <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>Phone number required</p>
                                        ) : ''}
                                        <StyledPlaceLabel>Business address *</StyledPlaceLabel>
                                        <Place
                                            apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                            types={['address', '(cities)', '(regions)']}
                                            options={{
                                                types: ["geocode", "establishment"],
                                            }}
                                            placeholder='address'
                                            onPlaceSelected={onPlaceSelected}
                                            defaultValue={values?.address ? values?.address : ''}
                                            className="form-control form-control-default"
                                        />
                                        {!address && submit ? (
                                            <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>Business address required</p>
                                        ) : ''}
                                        <StyledLabel>Owner Name *</StyledLabel>
                                        <StyledSMInput
                                            type="text"
                                            value={values.ownerName}
                                            onChange={handlechange('ownerName')}
                                            placeholder="Owner Name"
                                            autoComplete='new-off'
                                        />
                                        {!values.ownerName && submit ? (
                                            <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>Owner name required</p>
                                        ) : ''}
                                        <StyledLabel>Email *</StyledLabel>
                                        <StyledEmailInput
                                            type="text"
                                            value={values.email}
                                            onChange={handlechange('email')}
                                            placeholder="Email"
                                            autoComplete='new-off'
                                        />
                                        {!values.email && submit ? (
                                            <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>email required</p>
                                        ) : ''}
                                    </Form.Group>
                                </Row>
                            </Form>

                        </InnerContent>
                    </Row>
                    <FixedFooter>
                        <a href="/business"
                            className="backlink"
                        >Back</a>
                        <Button
                            className='createProfile'

                            variant='dark'
                            onClick={() => onSubmit()}
                        >Create a Profile
                        </Button>
                    </FixedFooter>
                </Col>
            </Row>
        </Container>
    )
}

export default NewSignup;

const InnerContent = styled(Col)`
overflow-y: scroll;
width: 100%;
height: 88vh;
-ms-overflow-style: none;  /* IE and Edge */
scrollbar-width: none;
-ms-overflow-style: none;  /* IE and Edge */
scrollbar-width: none;

&::-webkit-scrollbar {
    display: none;
}
`
const Place = styled(Autocomplete)`
height: 70px;
margin-bottom:20px;
background: #F3F3F3;
border-radius: 10px;
padding: 12px 12px 12px 12px;
border: none;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 2px solid #000000;
  background: #F3F3F3;
}
&::placeholder {
    font-family: 'Roobert-medium';
  }
`
const ProfileLeft = styled(Col)`
background: #190F0F;
display: flex;
align-items: center;
justify-content: center;
h1 {
    font-weight: 600;
    font-size: 40px;
    line-height: 120%;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #FFFFFF;
    margin-left: 0.5rem;
    font-style:Roobert-medium;
  }
  .profilelogos {
    position: absolute;
    bottom: 1rem;
    left: 40rem;
  }

@media (min-width: 240px) and (max-width: 796px){
    background: #fff;
    align-items: center8
    justify-content: center;
   
   h1{
     display:none;
   }
   .profilelogos{
       display:none;
   }
    .headerCreate{
        align-items: center;
justify-content: center;
    h6{
        font-family: 'Roobert TRIAL';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 120%;
    }
    p{
        font-family:Roobert-medium;
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 136%;
        align-self:center;
        text-align:center;
    }
    .mobileprofilelogo{
        width: 25%;
        display:flex;
        align-items: center;
justify-content: center;
    }
    }
}
    @media (min-width: 793px) and (max-width: 8000px){
        .headerCreate{
            display:none;
        }
       
    }
`
const StyledLabel = styled(Form.Label)`
font-weight: 400;
font-size: 16px;
line-height: 120%;
display: flex;
align-items: center;
letter-spacing: 0.01em;
color: #190F0F;
`
const StyledPlaceLabel = styled(Form.Label)`
font-weight: 400;
font-size: 16px;
line-height: 120%;
display: flex;
align-items: center;
margin-top:20px;
letter-spacing: 0.01em;
color: #190F0F;
`
const StyledSMInput = styled(Form.Control)`
height: 70px;
margin-bottom:20px;
background: #F3F3F3;
border-radius: 10px;
padding: 12px 12px 12px 12px;
border: none;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 2px solid #000000;
  background: #F3F3F3;
}
`
const StyledEmailInput = styled(Form.Control)`
height: 70px;
margin-bottom:50px;
background: #F3F3F3;
border-radius: 10px;
padding: 12px 12px 12px 12px;
border: none;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 2px solid #000000;
  background: #F3F3F3;
}
`
const FixedFooter = styled.div`
position: absolute;
bottom: 0;
left: 0;
height: 10vh;
width: 50vw;
border-top: 2px solid rgba(120, 115, 115, 0.16);
display: flex;
align-items: center;
justify-content: space-around;
flex-direction: row;
background-color: #fff;
.backlink {
    font-family: 'SF Pro Display';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    top: 1.5rem;
    left: 3.25rem;
    color: #190F0F;
    text-decoration: none;
    position: absolute;
  }
  .createProfile {
    top: 1rem;
    right: 4rem;
    position: absolute;
    border-radius: 10px;
    height: 40px;
    width: 150px;
    padding: 15px, 15px, 15px, 15px;
    font-family: 'SF Pro Display';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.02em;
    text-align: center;
  }
  @media (min-width: 240px) and (max-width: 796px){
    width: 100%;
    justify-content:center;
    .backlink {
        display:none;
    }
    .createProfile{
        justify-content:center;
        position: relative;
        margin-bottom:2.5rem;
        padding: 0px, 0px, 0px, 0px;
        margin-left:8rem;
        border-radius: 30px;
    }
  }

`