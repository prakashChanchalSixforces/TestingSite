import React, { useState } from 'react'
import { Button, Container,FloatingLabel,Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import moment from 'moment';
import { handyman } from '../../../store/Actions/User.action';
import Hrimg from '../../../assets/hr.svg'
import infoLogo from '../../../assets/infologo.png'
import { TimeList } from '../CompanyProfile/component/TimeList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../UserHomepage/Calendar.css'

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function Handymen(){
const dispatch = useDispatch();
const [view,setView]=useState(null)
const [values,setValues]=useState({
})
const [datecalendar,setDatecalendar]=useState(false);

const handlechange=(name)=>(event)=>{
let value=name==='date'?moment(event).format('LL'):event.target.value
if(name==='date'){
    setDatecalendar(false)
  }
setValues({...values,[name]:value})
}
let onPlaceSelected = (place) => {
    const address = place.formatted_address
    setValues({...values,'address':address})
}
const hvacProblems=[
"System requires maintence",
"Dirty filters",
"Pilot or ignition problem",
"Thermostat malfunction",
"Mechanical problems (belts, bearings and motors wear out)",
"Furnace noises",
"Blow fuses and tripped circuit breakers",
"Dirty condenser or evaporator coils (AC) ",
"Blower runs continupusly",
"Water leaks (tends to be AC but can be high efficiency furnace)",
]

const airProblems=[
"Heat pump/AC not working",
"Condensing unit fan running; the indoor fan not working",
"Heat pump/AC not cooling as expected",
"The furnace or air handler is leaking water",
"Air conditioner indoor coil freeze-ups",
"Heat pump outdoor coil freeze-ups",
"The AC is over-cooling your home",
"System making unusual noise",
"Heat pump not heating",
"AC/heat pump outside unit not running",
"AC smells like chemicals"
]

const isValid=()=>{
if(!(values.address&&values.address.length>0)){
    toast.error('Please enter your address')
    return false
}
else if(!(values.estimatedHourOfWork&&values.estimatedHourOfWork.length>0)){
    toast.error('Please enter estimated hours of work')
    return false
}
else
return true
}
const handledate=()=>{
    if(datecalendar===false){
      setDatecalendar(true)
    }
    else
    setDatecalendar(false)
  }
const handleSubmit=async()=>{
    let res
    if(isValid()){
     res = await dispatch(handyman(values,1,10));
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
    {view===null?
    <>
    <MainContainer>
        <ToastContainer/>
    <Form>
    <ServiceHeader>
        Tell us about your job
        </ServiceHeader>
    <Details className='d-flex justify-content-start'>
            <div
            style={{
              paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'
              }}>
                Service
                <Text>Handyman</Text>
                </div>
        </Details>
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
        <img src={Hrimg} alt='hr' className='mb-3 mt-3'/>
    <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label >Estimated hours of work</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('estimatedHourOfWork')}  value={values?values?.estimatedHourOfWork:''}>
        <option>Estimated hours of work</option>
        <option value="less than 2 hours">less than 2 hours</option>
        <option value="2 to 3 hour">2 to 3 hour</option>
        <option value="3 hours +">3 hours +</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <Details className='d-flex justify-content-between p-2'>
            <Info>
              <Smallfont>List of services that get resolved in 1-2 hours</Smallfont>
                <Text2>More Details</Text2>
                </Info>
                <div>
                <img src={infoLogo} alt='info'
                //onClick={()=>{setView('hvac')}}
                />
                </div>
      </Details>
      <Details className='d-flex justify-content-between p-2'>
            <Info>
              <Smallfont>List of services that get resolved 3+ hours</Smallfont>
                <Text2>More Details</Text2>
                </Info>
                <div>
                <img src={infoLogo} alt='info'
                //onClick={()=>{setView('air')}}
                />
                </div>
      </Details>
      <hr/>
      <Search>
      <Continue size='md' variant="dark" onClick={()=>handleSubmit()} >Search</Continue>
      </Search>
          </Form>
    </MainContainer>
    <br/>
    <br/>
    </>
    :
    view==='hvac'?
    <NextContainer>
        <h6>Top 10 HVAC problems (summary):</h6>
        <br/>
        <ul>
            {hvacProblems?.map((item,index)=>{return(
                <>
  <Items key={index}>{item}</Items>
  </>
            )})}
</ul>
<Hr/>
<Search>
      <Continue size='md' variant="dark" onClick={()=>{setView(null)}} >Back</Continue>
</Search>
    </NextContainer>
    :
    view==='air'?
    <NextContainer>
        <h6>Top 10 air conditioner problems:</h6>
        <br/>
        <ul>
            {airProblems?.map((item,index)=>{return(
                <>
  <Items key={index}>{item}</Items>
  </>
            )})}
</ul>
<Hr/>
<Search>
      <Continue size='md' variant="dark" onClick={()=>{setView(null)}} >Back</Continue>
</Search>
    </NextContainer>
    :
''
}
</React.Fragment>
)
}

export default Handymen

const MainContainer=styled(Container)`
border-radius:18px;
border:1px solid #F3F3F3;
padding:20px;
background-color:#FFFFFF;
`
const NextContainer=styled(Container)`
border-radius:18px;
border:1px solid #F3F3F3;
background-color:#FFFFFF;
padding:10px
`

const Info=styled.div`
padding-left:2px;
padding-top:2px
`
const Smallfont=styled.p`
font-size:13px;
`
const Items=styled.li`
color:gray;
margin-bottom:14px
`
const Label=styled.h6`
color:	#000000 !important;
`
const Hr=styled.hr`
margin-top:25px;
margin-bottom:25px;
`
const Text2=styled.p`
color:#787373 ;
margin-top:-15px;
font-size:14px;
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
margin-bottom:13px;
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