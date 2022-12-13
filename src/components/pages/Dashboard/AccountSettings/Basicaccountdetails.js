import React from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { getuseraccountdetails } from '../../../../store/Actions/Dashboard.actions';
import { useEffect } from 'react';
// import Divider from '../../../assets/devider.png'
function Basicaccountdetails(){
    let dispatch=useDispatch();
const init=async()=>{
await dispatch(getuseraccountdetails())
}
useEffect(()=>{
init()
},[])
let userdetails=useSelector(state => state?.dashboardReducer?.useraccountdetails)

    return(
        <>
        <Maincontainer>
        <Heading>Basic Account Details</Heading>
        <br/>
        <Form>
        <Label >Business name</Label>
      <Input
        type="text"
        placeholder='Business name'
        defaultValue={userdetails?.businessName}
      />
      <Inputtext>
      The name you provide must exacttly match the name
      <br/> associated with your business number (BN)
      </Inputtext>
      <Label >Business email address</Label>
      <Input
        type="text"
        placeholder='Business email address'
        defaultValue={userdetails?.email}
      />
      <Label className='mt-3'>Phone number</Label>
      <div className='phone-input-owner'>
      <PhoneNumber
        name='phoneinput'
        international
        placeholder="Enter phone number"
        focusInputOnCountrySelection='true'
        defaultCountry="CA"
        limitMaxLength='true'
        defaultvalue={userdetails?.phone}
      />
      </div>
      {/* <div >
      <img src={Divider} />
      </div>  */}
            <hr/>

      <Label >Business Number</Label>
      <Input
        type="text"
        placeholder='Business Number'
      />
            <br/>
      <div className='d-flex'>
<div>
<Label >Owner's first name</Label>
      <Input
        type="text"
        placeholder='Owner first name'
        defaultValue={userdetails?.firstName}
      />
</div>
&nbsp;&nbsp;
<div>
<Label>Owner's last name</Label>
      <Input
        type="text"
        placeholder='Owners last name'
      />
</div>

      </div>
      </Form>
      <div className="d-grid gap-2 mt-4">
      <Continue size='md' variant="dark" >Edit</Continue>
      </div>
    </Maincontainer>
        </>
    )
}

export default Basicaccountdetails

const Heading=styled.h1`
font-weight: 500;
font-size: 24px;
text-align:start;
`
const Maincontainer=styled.div`
padding-left:250px;
padding-right:450px;
margin-top:40px;
`
const Input=styled(Form.Control)`
border-radius:8px;
`

const Inputtext=styled.p`
color: #787373;
font-size: 12px;
margin-top:5px;
`
const Continue=styled(Button)`
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