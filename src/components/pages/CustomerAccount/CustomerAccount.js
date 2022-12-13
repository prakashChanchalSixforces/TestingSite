import React from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-number-input';
import HeaderTop from '../../layouts/headerTop';
import '../UserHomepage/components/styles.css'
import OTPInput from "otp-input-react";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import Hr from '../../../assets/hrcustom.png'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Editcustomerdetails, getCustomerDetails, getVerificationMailCode, matchotpCode } from '../../../store/Actions/User.action';
import { spResetPassword } from '../../../store/Actions/Dashboard.actions';
import MainFooter from '../MainFooter/MainFooter';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function CustomerAccount() {
  const [edit, setEdit] = useState('')
  const [passerror, setPasserror] = useState('')
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [verificationCode, setVerificationCode] = useState(false);
  const [OTP, setOTP] = useState("");
  const [email,setEmail]=useState('')

  let dispatch = useDispatch();
  const customerdetails = useSelector(state => state.customerReducer.customerdetails)
  const [phoneNumber, setPhoneNumber] = useState('')
  console.log(customerdetails, 'customerdetails')
  const [values, setValues] = useState({
  })
  const [passvalues, setPassvalues] = useState({

  })
  useEffect(() => {
    setValues({
      "firstName": customerdetails?.firstName,
      "lastName": customerdetails?.lastName,
      "phone": customerdetails?.phone,
      "address": customerdetails?.address,
    })
    setPassvalues({
      "email": customerdetails?.email
    })
    setEmail( customerdetails?.email);
  }, [customerdetails])
  console.log(values, 'profilevalues')
  console.log(passvalues, 'pass')

  const init = async () => {
    await dispatch(getCustomerDetails())
  }
  useEffect(() => {
    init()
  }, [])
  const handleEdit = (name) => {
    setEdit(name)
  }
  let onPlaceSelected = (place) => {
    setValues({ ...values, 'address': place.formatted_address })
  }

  const getVerificationOtp = async () => {
    const res = await dispatch(getVerificationMailCode({ "email": email }))
    if (res.status === true) {
      setVerificationCode(true)
    }
  }

  const verifiedYourOtp = async () => {
    const data = {
      "email": email,
      "otp": `${OTP}`
    }
    const res = await dispatch(matchotpCode(data))
    if (res.status === true) {
      await dispatch(Editcustomerdetails({ ...values, "email": email }))
      setEdit('')
      setVerificationCode(false)
    }
  }

  const handlechange = (name, val) => (event) => {
    console.log(val, name)
    let value = name === 'phone' ? val : event.target.value
    setValues({ ...values, [name]: value })
  }
  const handlepasschange = (name) => (event) => {
    let value = event.target.value
    setPassvalues({ ...passvalues, [name]: value })
  }
  const handlesubmit = async () => {
    await dispatch(Editcustomerdetails({ ...values, "phone": phoneNumber }))
    setEdit('')
  }
  const handlepasssubmit = async () => {
    let res = await dispatch(spResetPassword(passvalues))
    if (res.status === true) {
      setEdit('')
    }
    else setPasserror(res?.message)
    return res
  }
  const handleShowHide = () => {
    setShow(!show);
  }
  const handleShowHide2 = () => {
    setShow2(!show2);
  }
  return (
    <>
      <HeaderTop />
      <Maincontainer>
        <div>
          <Heading>Personal info</Heading>
          <br />
          <div className=' leftcontainer d-flex justify-content-between'>
            <div>
              <p className='head'>Legal name</p>
              <p className='subhead'>{edit === 'name' ? ' ' :
                customerdetails?.firstName && customerdetails?.lastName ?
                  customerdetails?.firstName + ' ' + customerdetails?.lastName
                  : 'Not provided'}</p>
              {edit === 'name' ?
                <>
                  <div className='d-flex'>
                    <div>
                      <Label >First name</Label>
                      <Input
                        type="text"
                        placeholder='First name'
                        defaultValue={customerdetails?.firstName}
                        onChange={handlechange('firstName')}
                      />
                    </div>
                    &nbsp;&nbsp;
                    <div>
                      <Label>Last name</Label>
                      <Input
                        type="text"
                        placeholder='Last name'
                        defaultValue={customerdetails?.lastName}
                        onChange={handlechange('lastName')}
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <Continue size='sm' variant="dark" onClick={() => handlesubmit()}>Save</Continue>
                  </div>
                </>
                : ''
              }
            </div>
            <div>{edit === 'name' ?
              <p className='edit' onClick={() => handleEdit('')}>Cancel</p>
              :
              <p className='edit' onClick={() => handleEdit('name')}>Edit</p>
            }
            </div>
          </div>
          <img src={Hr} className='hr' />
          <div className='leftcontainer d-flex justify-content-between'>
            <div >
              <p className='head'>Phone number</p>
              <p className='subhead'>{edit === 'number' ? 'For notifications, reminders, and help logging in' :
                customerdetails?.phone ? customerdetails?.phone : 'Not provided'}</p>
              {edit === 'number' ?
                <>
                  <div className='phone-input-owner'>
                    <PhoneNumber
                      name='phoneinput'
                      international
                      placeholder="Enter phone number"
                      focusInputOnCountrySelection='true'
                      defaultCountry="CA"
                      limitMaxLength='true'
                      onChange={(value) => {
                        setPhoneNumber(value)
                      }}
                      value={`+${customerdetails?.phone}`}
                    />
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <Continue size='sm' variant="dark" onClick={() => handlesubmit()}>Save</Continue>
                  </div>
                </>
                : ''
              }
            </div>
            <div>
              {edit === 'number' ?
                <p className='edit' onClick={() => handleEdit('')}>Cancel</p>
                :
                <p className='edit' onClick={() => handleEdit('number')}>Edit</p>
              }
            </div>
          </div>
          <img src={Hr} className='hr' />
          <div className='leftcontainer d-flex justify-content-between'>
            <div >
              <p className='head'>Address</p>
              <p className='subhead'>{edit === 'address' ? '' : customerdetails?.address ? customerdetails?.address : 'Not provided'}</p>
              {edit === 'address' ?
                <>
                  <Details className={'justify-content-start'}>
                    <div style={{ paddingLeft: '12px', paddingTop: '8px', color: 'black', fontSize: '14px', fontWeight: '500', fontFamily: 'Roobert-medium' }}>
                      <Place
                        apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                        types={['address', '(cities)', '(regions)']}
                        options={{
                          types: ["geocode", "establishment"],
                          componentRestrictions: {
                            country: 'ca'
                          }
                        }}
                        onPlaceSelected={onPlaceSelected}
                        placeholder='Home address'
                        className="form-control form-control-default"
                      />
                    </div>
                  </Details>
                  <div className="d-grid gap-2 mt-3">
                    <Continue size='sm' variant="dark" onClick={() => handlesubmit()}>Save</Continue>
                  </div>
                </>
                : ''
              }
            </div>
            <div>
              {edit === 'address' ?
                <p className='edit' onClick={() => handleEdit('')}>Cancel</p>
                :
                <p className='edit' onClick={() => handleEdit('address')}>Edit</p>
              }
            </div>
          </div>
          <img src={Hr} className='hr' />
          <div className='leftcontainer d-flex justify-content-between'>
            <div >
              <p className='head'>Email</p>
              <p className='subhead'>{edit === 'email' ? '' : customerdetails?.email}</p>
              {edit === 'email' ?
                <>
                  {verificationCode ? <>
                    <p >We sent an email to
                      <br/><span style={{ fontWeight: 'bold' }}>{email}</span></p>
                    <p>If you haven't received the verification email,
                      <br/>
                      <b> please check your spam folder.</b>
                      <br/>
                      Please verify your email then continue
                    </p>
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={6}
                      otpType="number"
                      inputStyles={{ borderRadius: '10px', height: '30px', width: '30px' }}
                      disabled={false}
                    />
                  </> : <Input
                    type="text"
                    placeholder='Email'
                    className='input'
                    defaultValue={customerdetails?.email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />}
                  <div className="d-grid gap-2 mt-3">
                    <Continue size='sm' variant="dark" onClick={() => verificationCode ? verifiedYourOtp() : getVerificationOtp()} style={{width:'300px'}}>Verify</Continue>
                  </div>
                </>
                : ''
              }
            </div>
            <div>
              {edit === 'email' ?
                <p className='edit' onClick={() => handleEdit('')}>Cancel</p>
                :
                <p className='edit' onClick={() => handleEdit('email')}>Edit</p>
              }
            </div>
          </div>
          <img src={Hr} className='hr' />
          <div className='leftcontainer d-flex justify-content-between'>
            <div>
              <p className='head'>Password</p>
              <p className='subhead'>{edit === 'password' ? '' : '********'}</p>
              {edit === 'password' ?
                <>
                  <div className='d-inline'>
                    <div>
                      <Label >Old password</Label>
                      <PasswordContainer className='d-flex'>
                        <PasswordStyledInput
                          type={show ? 'text' : 'password'}
                          placeholder='Old password'
                          autoComplete='off'
                          className='input'
                          onChange={handlepasschange('password')}
                        />
                        {show
                          ?
                          <h7 onClick={handleShowHide} className='showhide'>Hide</h7>
                          :
                          <h7 onClick={handleShowHide} className='showhide'>Show</h7>
                        }
                      </PasswordContainer>
                    </div>
                    &nbsp;&nbsp;
                    <div>
                      <Label>New password</Label>
                      <PasswordContainer className='d-flex'>
                        <PasswordStyledInput
                          type={show2 ? 'text' : 'password'}
                          placeholder='New password'
                          autoComplete='off'
                          className='input'
                          onChange={handlepasschange('newPassword')}
                        />
                        {show2
                          ?
                          <h7 onClick={handleShowHide2} className='showhide'>Hide</h7>
                          :
                          <h7 onClick={handleShowHide2} className='showhide'>Show</h7>
                        }
                      </PasswordContainer>
                    </div>
                  </div>
                  <p className='error'>{passerror}</p>
                  <div className="d-grid gap-2 mt-3">
                    <Continue size='sm' variant="dark" onClick={() => handlepasssubmit()}>Save</Continue>
                  </div>
                </>
                : ''
              }
            </div>
            <div>
              {edit === 'password' ?
                <p className='edit' onClick={() => handleEdit('')}>Cancel</p>
                :
                <p className='edit' onClick={() => handleEdit('password')}>Edit</p>
              }
            </div>
          </div>
        </div>
      </Maincontainer>
      <br />
      <br />
      <br />
      <Foot >
        <MainFooter/>
      </Foot>
    </>
  )
}

export default CustomerAccount

const Heading = styled.p`
font-family:Roobert-medium;
font-size: 36px;
`
const Foot = styled.div`
@media (min-height: 1000px) and (max-height:9999px)
{
position:absolute;
bottom: 0;
width:100%;
height:90px;
}
`
const Place = styled(Autocomplete)`
height:40px;
border-radius:15px;
border-width:0px;
margin-left:-12px;
margin-top:-8px;
&::placeholder {
  font-family: Inter;
  font-size:14px;
}
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:0px solid #190F0F;
background: #fff;
}
`
const Details = styled.div`
border-radius:8px;
border:1px solid lightgray;
width:400px;
@media (min-width: 260px) and (max-width: 1000px)
{
  width:260px;

}
`
const PasswordStyledInput = styled(Form.Control)`
          font-weight: 400;
         border:none;
         border-radius:8px;

          &:focus {
            outline: none;
          box-shadow: 0px 0px 0px white;
          border: 1px solid #fff;
          background: #fff;
        }
          `
const PasswordContainer = styled.div`
border: 1px solid #DDDDDD;
font-weight: 400;
border-radius:8px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border: 1px solid #190F0F;
}
.showhide{
  padding:9px;
}
`
const Maincontainer = styled.div`
padding-left:3rem;
padding-right:3rem;
padding-top:2rem;
display:flex;
justify-content:start;
.error{
  color:red;
  margin-top:5px;
}
.input{
  width:400px;
  @media (min-width: 260px) and (max-width: 1000px)
{
  width:260px;

}
}
.leftcontainer{
width:700px;
@media (min-width: 260px) and (max-width: 1000px)
{
  width:360px;

}
}
.hr{
width:100%;
height:1px;
}
.subhead{
color:#787373;
font-family:Inter;
margin-top:-10px;
}
.head{
  font-family:Roobert-medium;
}
.edit{
  font-weight:500;
  text-decoration:underline;
  font-family:Roobert-medium;
  cursor:pointer;
}
@media (min-width: 1800px) and (max-width: 2500px)
{
    padding-left:350px;
    padding-right:350px;
}
@media (min-width: 2501px) and (max-width:3000px)
{
    padding-left:450px;
    padding-right:450px;
}
@media (min-width: 3001px) and (max-width:4000px)
{
    padding-left:750px;
    padding-right:750px;
}
@media (min-width: 4001px) and (max-width:9999px)
{
    padding-left:1450px;
    padding-right:1450px;
}
@media (min-width: 260px) and (max-width:767px)
{
    padding-left:1rem;
    padding-right:1rem;
}
`
const Input = styled(Form.Control)`
border-radius:8px;
`

const Inputtext = styled.p`
color: #787373;
font-size: 12px;
margin-top:5px;
`
const Continue = styled(Button)`
background-color:black;
border:1px solid white;
border-radius:10px;
`

const PhoneNumber = styled(PhoneInput)`
  width: 100%;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #190F0F;
  background: #fff;
}


@media (min-width: 360px) and (max-width: 540px)
{
   .PhoneInputCountry{
    width: 7rem;
  }
  .PhoneInputCountryIcon{
    width: 1rem;
    height: 0.75rem;
  }
   .PhoneInputInput{
    width: 12rem;
  }
}

 .PhoneInputCountry{
  min-width: 30%;
  height: 45px;
  background: #fff;
  border: 1px solid #DDDDDD;
  justify-content: center;
}



 .PhoneInputInput{
  min-width: 69%;
  height: 45px;
  border: 1px solid #DDDDDD;
  background: #fff;
  flex: none;
  order: 1;
  flex-grow: 0;
  padding: 8px 10px;
  font-family: 'SF Pro Display';
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0.1rem;
  color: #787373;
}

.PhoneInputCountryIcon{
  width: 2rem;
  height: 1.5rem;
}

 .PhoneInputCountrySelectArrow{
  height: 0.5rem;
  width: 0.5rem;
  color: #000;
}
`
const Label = styled(Form.Label)`
font-size:14px;
`