import React from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { businessverification, getuseraccountdetails } from '../../../../store/Actions/Dashboard.actions';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../../UserHomepage/components/styles.css'
import '../../UserHomepage/Calendar.css'
import Calendar from 'react-calendar';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function BusinessVerification(){
const [businesstype,setBusinesstype]=useState('')
let userdetails=useSelector(state => state?.dashboardReducer?.useraccountdetails)
const [useraddress,setUserAddress]=useState('');
const [values,setValues]=useState({
    "city": "Vancouver",
    "postalCode": "V6C 1G8",
    "country": "CA",
    "provinceState": "BC",
})
const onaddressPlaceSelected = (place) => {
    const address = place.formatted_address
    setUserAddress(address)
  }
const handlebusiness=(name)=>(event)=>{
let value = name==='dateOfBirth'? moment(event).format('DD MMM YYYY'):
event.target.value
if(name==='business_type'){
setBusinesstype(event.target.value)
}
setValues({...values,[name]:value})
}
let dispatch=useDispatch()
const init=async()=>{
await dispatch(getuseraccountdetails())
}
useEffect(()=>{
init()
if(useraddress){
setValues({...values,'address':useraddress})
}
},[useraddress])

console.log(values,'values')
console.log(userdetails,'userdetails')
 const handlesubmit=async()=>{
    let res;
 res =await dispatch(businessverification(values))
 //if(res.)
 return res
 }
    return(
        <>
        <Maincontainer>
        <Heading>Business Verification</Heading>
        <br/>
        <Form>
        <Label>Business name</Label>
      <Input
        type="text"
        placeholder='Business name'
        onChange={handlebusiness('businessName')}
        defaultValue={userdetails?.businessName}
      />
      <Inputtext>
      The name you provide must exacttly match the name
      <br/> associated with your business number (BN)
      </Inputtext>
      <Label>Type of business</Label>
      <Sel aria-label="Floating label select example"
      onChange={handlebusiness('business_type')}
      >
      <option value="" >Type of business</option>
        <option value="Sole Proprietorship">Sole Proprietorship</option>
        <option value="Partnership">Partnership</option>
        <option value="Corporation">Corporation</option>

      </Sel>
{businesstype==="Sole Proprietorship"?
<>
      <Label className='mt-4' >Owners’ Date of Birth </Label>
      <CalendarStyle>
    <div className='p-3 d-flex justify-content-center'>
      <Calendar className='react-calendar' minDate={new Date()}
        onChange={handlebusiness('dateOfBirth')}
        pages={2} />
        </div>
        </CalendarStyle>

       {/* <div className='d-flex'>
<div>
      <Input
        type="text"
        placeholder='DD'
        onChange={handlebusiness('travelChargesPerHour')}
      />
</div>
&nbsp;&nbsp;&nbsp;
<div>
      <Input
        type="text"
        placeholder='MM'
        onChange={handlebusiness('travelChargesPerHour')}
      />
</div>
&nbsp;&nbsp;&nbsp;
<div>
      <Input
        type="text"
        placeholder='YY'
        onChange={handlebusiness('travelChargesPerHour')}
      />
</div> */}
      {/* </div> */}

      </> :''}
      {/* <div >
      <img src={Divider} />
      </div> */}
      {/* <hr/>
      <Label>Business Number (BN) or Québec Enterprice Number (NEQ)</Label>
      <Inputtext>
      incorporate.doc.pdf
      </Inputtext>
      <div className="d-grid gap-2 mt-4">
      <Edit size='md' variant="secondary" >Edit</Edit>
      </div> */}
     {/* <div >
      <img src={Divider} />
      </div>      */}
            <hr/>

       <Heading2>Registered business address</Heading2>

      <Label>Street address</Label>
      <Place
            apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
            types={['address', '(cities)', '(regions)']}
            options={{types: ["geocode", "establishment"],
            componentRestrictions:{
              country: 'ca'
            }
          }}
          placeholder='Address'
          onPlaceSelected={onaddressPlaceSelected}
          className="form-control form-control-default"
          />
      <div className='d-flex'>
<div>
<Label className='mt-2' >City</Label>
      <Input
        type="text"
        placeholder='City'
        onChange={handlebusiness('city')}
        defaultValue={values?.city}
      />
</div>
&nbsp;&nbsp;&nbsp;
<div>
<Label className='mt-2'>Country</Label>
      <Input
        type="text"
        placeholder='Country'
        onChange={handlebusiness('country')}
        defaultValue={values?.country}
      />
</div>

      </div>
      <div className='d-flex'>
<div>
<Label className='mt-2' >Province state </Label>
      <Input
        type="text"
        placeholder='Province State'
        onChange={handlebusiness('provinceState')}
        defaultValue={values?.provinceState}
      />
</div>
&nbsp;&nbsp;&nbsp;
<div>
<Label className='mt-2'> Postal code </Label>
      <Input
        type="text"
        placeholder='Postal Code'
        onChange={handlebusiness('postalCode')}
        defaultValue={values?.postalCode}
      />
</div>

      </div>
      </Form>
      <div className="d-grid gap-2 mt-4">
      <Continue size='md' variant="dark" onClick={()=>handlesubmit()}>Edit</Continue>
      </div>
      <br/>
    </Maincontainer>
        </>
    )
}

export default BusinessVerification

const Heading=styled.h1`
font-weight: 500;
font-size: 24px;
text-align:start;
`
const Heading2=styled.h1`
font-weight: 500;
font-size: 18px;
text-align:start;
`
const Sel=styled(Form.Select)`
color:gray;
border-radius:8px;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:1px solid #190F0F;
  background: #fff;
}
`
const CalendarStyle=styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
`
const Maincontainer=styled.div`
padding-left:250px;
padding-right:450px;
margin-top:40px;
`
const Input=styled(Form.Control)`
border-radius:8px;
`
const Place=styled(Autocomplete)`
height:40px;
border-radius:8px;
&::placeholder {
  font-family: Inter;
  font-size:14px;
}
&:focus {
outline: none;
border:1px solid gray;
}
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
// const Edit=styled(Button)`
// background-color: #F3F3F3;
// border:1px solid white;
// border-radius:10px;
// color: #787373;
// `
const Label = styled(Form.Label)`
font-size:14px;
`
