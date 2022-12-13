import React from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect ,useState} from 'react';
import moment from 'moment';
import { getuseraccountdetails } from '../../../../store/Actions/Dashboard.actions';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../../UserHomepage/components/styles.css'
import '../../UserHomepage/Calendar.css'
import Calendar from 'react-calendar';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();


function PersonalDetails(){
    const [useraddress,setUserAddress]=useState('');
    let userdetails=useSelector(state => state?.dashboardReducer?.useraccountdetails)

    const onaddressPlaceSelected = (place) => {
        const address = place.formatted_address
        setUserAddress(address)
      }
      let dispatch=useDispatch()
const init=async()=>{
await dispatch(getuseraccountdetails())
}
      useEffect(()=>{
        init()
        if(useraddress){
        //setValues({...values,'address':useraddress})
        }
        },[useraddress])

    return(
        <>
        <Maincontainer>
        <Heading>Personal details</Heading>
        <br/>
        <Form>
        <Label>Legal name</Label>
      <Input
        type="text"
        placeholder='Legal name'
      />
      <Inputtext>
      This is the name on your travel document, which could be a
      <br/>
      license or a passport.
      </Inputtext>
      {/* <div className="d-grid gap-2 mt-4">
      <Edit size='md' variant="secondary" >Edit</Edit>
      </div> */}
      <Label className='mt-4' >Owners’ Date of Birth </Label>
      <CalendarStyle>
    <div className='p-3 d-flex justify-content-center'>
      <Calendar className='react-calendar' minDate={new Date()}
        //onChange={handlebusiness('dateOfBirth')}
        pages={2} />
        </div>
        </CalendarStyle>
      <Label>Gender</Label>
      <Sel aria-label="Floating label select example">
      <option value="" >Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Others">Others</option>
      </Sel>
      {/* <div >
      <img src={Divider} />
      </div> */}
      <hr/>

     {/* <div >
      <img src={Divider} />
      </div>      */}
            {/* <hr/> */}
            <Label>Birth City</Label>
      <Input
        type="text"
        placeholder='Birth City'
      />
      <div className='d-flex'>
<div>
<Label className='mt-2' >Birth province (or state)</Label>
      <Input
        type="text"
        placeholder='Birth province (or state)'
      />
</div>
&nbsp;&nbsp;&nbsp;
<div>
<Label className='mt-2'>Birth Country</Label>
      <Input
        type="text"
        placeholder='Birth Country'
      />
</div>

      </div>
      <hr/>
       <Heading2>Home address</Heading2>

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
      />
</div>
&nbsp;&nbsp;&nbsp;
<div>
<Label className='mt-2'>Country</Label>
      <Input
        type="text"
        placeholder='Country'
      />
</div>

      </div>
      <div className='d-flex'>
<div>
<Label className='mt-2' >Province state </Label>
      <Input
        type="text"
        placeholder='Province State '
      />
</div>
&nbsp;&nbsp;&nbsp;
<div>
<Label className='mt-2'> Postal code </Label>
      <Input
        type="text"
        placeholder='Postal Code'
      />
</div>

      </div>
      </Form>
      <div className="d-grid gap-2 mt-4">
      <Continue size='md' variant="dark" >Edit</Continue>
      </div>
      <br/>
    </Maincontainer>
        </>
    )
}

export default PersonalDetails

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
const Edit=styled(Button)`
background-color: #F3F3F3;
border:1px solid white;
border-radius:10px;
color: #787373;
`
const Label = styled(Form.Label)`
font-size:14px;
`
