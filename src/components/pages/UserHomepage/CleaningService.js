import React, { useState } from 'react'
import { Button, Container,FloatingLabel,Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import moment from 'moment';
import { housecleaning } from '../../../store/Actions/User.action';
import { ToastContainer, toast } from 'react-toastify';
import Hrimg from '../../../assets/hr.svg'
import { TimeList } from '../CompanyProfile/component/TimeList';
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../UserHomepage/Calendar.css'

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function CleaningService(){
    const dispatch = useDispatch();
const [values,setValues]=useState({
})
const [datecalendar,setDatecalendar]=useState(false);

const handlechange=(name)=>(event)=>{
let value= name === 'numberOfRoomsToBeCleaned'||name==='numberOfBathroomsToBeCleaned' ? parseInt(event.target.value):name==='date'?moment(event).format('LL'):event.target.value
if(name==='date'){
  setDatecalendar(false)
}
setValues({...values,[name]:value})
}
const handledate=()=>{
  if(datecalendar===false){
    setDatecalendar(true)
  }
  else
  setDatecalendar(false)

}
const isValid=()=>{

if(!(values.address&&values.address.length>0)){
    toast.error('Please enter your address')
    return false
}
else if(!(values.approxSizeInSqFt&&values.approxSizeInSqFt.length>0)){
    toast.error('Please select approx size')
    return false
}
else if(!(values.numberOfRoomsToBeCleaned||values.numberOfRoomsToBeCleaned===isNaN)){
    toast.error('Please select number of rooms to be cleaned')
    return false
}
else if(!(values.numberOfBathroomsToBeCleaned||values.numberOfBathroomsToBeCleaned===isNaN)){
    toast.error('Please select number of bathrooms to be cleaned')
    return false
}
else if(!(values.typeOfFloor&&values.typeOfFloor.length>0)){
    toast.error('Please select type of floor')
    return false
}
else if(!(values.selectWhichApply&&values.selectWhichApply.length>0)){
    toast.error('Please select which apply')
    return false
}

else
return true
}

let onPlaceSelected = (place) => {
    const address = place.formatted_address
    setValues({...values,'address':address})
}

const handleSubmit=async()=>{
    let res
    if(isValid()){
     res = await dispatch(housecleaning(values,1,10));
     if(res.status===false){
        toast.error(res.message);
     }
     else if(res.status===true&&res.message!=='Success'){
        toast.info(res.message);
     }
    }
}
return(
  <React.Fragment>
    <MainContainer>
        <ToastContainer/>
    <Form>
    <ServiceHeader>
        Tell us about your cleaning
        </ServiceHeader>
    <Details className='d-flex justify-content-start'>
            <div
            style={{
              paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'
              }}>
                Service
                <Text>Cleaning</Text>
                </div>
        </Details>

        <br/>
        <Details className='justify-content-start'>
        <div style={{paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'}}>
        Destination
        <Place
              apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
              types={['address', '(cities)', '(regions)']}
              options={{types: ["geocode", "establishment"],
            }}
            placeholder='Address'
            onPlaceSelected={onPlaceSelected}
            defaultValue={values?.address?values?.address:''}
            className="form-control form-control-default"
            />
            </div>
            </Details>
            <div className='d-flex mt-3' style={{borderRadius:'13px',border:'1px solid #F3F3F3'}}>
    <Dates onClick={()=>handledate()} >
        Date
        <h6 style={{fontFamily:'Open Sans'}}>
          {values?.date?values?.date:'Select date'}</h6>
        </Dates>
<FloatingLabel
controlId="floatingInput"
label="Time"

>

<Time aria-label="Floating label select example" onChange={handlechange('time')}>
<option>{values?.time?values?.time:'Select Time'}</option>
{TimeList.map((item,index) =>{
return(
<option value={item}>{item}</option>
)
})}

</Time>
</FloatingLabel>
</div>
{datecalendar === true ?
<CalendarStyle className='p-3 d-flex justify-content-center'>
<Calendar className='react-calendar' onChange={handlechange('date')}
minDate={new window.Date()}
/>
</CalendarStyle>
:''}
        <img src={Hrimg} alt ='hr' className='mb-3 mt-3'/>
      <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label >Approx. sq.ft of your house</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('approxSizeInSqFt')}>
      <option value="">Approx. sq.ft</option>
        <option value={`Up to 600 Sq.Ft`}>{`Up to 600 Sq.Ft`}</option>
        <option value={`600 Sq.Ft. - 1000 Sq.Ft.`}>{`600 Sq.Ft. - 1000 Sq.Ft.`} </option>
        <option value={`1000 Sq.Ft. - 1500 Sq.Ft.`}>{`1000 Sq.Ft. - 1500 Sq.Ft.`}</option>
        <option value={`1500 Sq.Ft. - 2000 Sq.Ft.`}>{`1500 Sq.Ft. - 2000 Sq.Ft.`} </option>
        <option value={`2000 Sq.Ft. - 2500 Sq.Ft.`}>{`2000 Sq.Ft. - 2500 Sq.Ft.`}</option>
        <option value={`2500 Sq.Ft. - 3000 Sq.Ft.`}>{`2500 Sq.Ft. -3000 Sq.Ft.`}</option>
        <option value={`3000 Sq.Ft. - 3500 Sq.Ft.`}>{`3000 Sq.Ft. - 3500 Sq.Ft.`} </option>
        <option value={`3500 Sq.Ft. - 4000 Sq.Ft`}>{`3500 Sq.Ft. - 4000 Sq.Ft.`}</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label>Number of rooms to be cleaned</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('numberOfRoomsToBeCleaned')}>
      <option value="">Number of rooms to be cleaned</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label>Number of bathrooms to be cleaned</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('numberOfBathroomsToBeCleaned')}>
      <option value="">Number of bathrooms to be cleaned</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label>Type of Floor</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('typeOfFloor')}>
      <option value="">Type of Floor</option>
      <option value="Tiles">Tiles</option>
        <option value="Wooden">Wooden</option>
        <option value="Laminate">Laminate</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label>Select which apply</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('selectWhichApply')}>
      <option value="">Select which apply</option>
      <option value="Deep clean">Deep clean</option>
        <option value="Oven cleaning">Oven cleaning</option>
        <option value="Fridge Clean">Fridge Clean</option>
        <option value="Move out cleaning">Move out cleaning</option>
        <option value="Pets">Pets</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <hr/>
      <Search>
      <Continue size='md' variant="dark"
      onClick={()=>handleSubmit()}
      >Search</Continue>
      </Search>
          </Form>
    </MainContainer>
    <br/>
    <br/>
    </React.Fragment>

)
}

export default CleaningService

const MainContainer=styled(Container)`
border-radius:18px;
border:1px solid #F3F3F3;
padding:20px;
background-color:#FFFFFF;
`

const Label=styled.h6`
color:	#000000 !important;
`
const Text=styled.p`
color:black ;
font-size:18px;
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
`
const Search=styled.p`
display:flex;
justify-content:center;
`
const Sel=styled(Form.Select)`
color:gray;
border-radius:13px;
font-family:Open Sans;
.placeholder {
  font-family: Open Sans;
}
`
const Details=styled.div`
border-radius:13px;
border:1px solid lightgray;
`
const Continue=styled(Button)`
background-color:black;
border:1px solid white;
border-radius:10px;
width: 360px

`
const Place=styled(Autocomplete)`
height:40px;
border-radius:15px;
border-width:0px;
margin-left:-12px;
margin-top:-8px;
&::placeholder {
  font-family: Open Sans;
}
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:0px solid #190F0F;
  background: #fff;
}
`
const Dropdwn=styled(FloatingLabel)`
color:black
`
const ServiceHeader=styled.p`
color:black ;
font-size:18px;
font-family: 'Roobert-medium';
font-style: normal;
font-weight: 500;
margin-left:1px;
`
const Dates=styled.div`
width:12rem;
margin-right:-25px;
border-radius:13px;
border:1px solid lightgray;
padding-left:6px;
padding-top:6px;
height:58px;
font-size:14px;
color:gray;
@media (min-width: 360px) and (max-width: 1399px){
  width:11rem;
}
`
const Time=styled(Form.Select)`
color:gray;
border-radius:13px;
font-family:Open Sans;
width:12rem;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:1px solid #190F0F;
  background: #fff;
}
@media (min-width: 360px) and (max-width: 1399px){
  width:11rem;
}
`

const CalendarStyle=styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
margin-top:10px;
`