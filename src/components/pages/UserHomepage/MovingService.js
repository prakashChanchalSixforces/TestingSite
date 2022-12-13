import React, { useEffect, useState } from 'react'
import { Button, Container,Form, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { moving } from '../../../store/Actions/User.action';
import { ToastContainer, toast } from 'react-toastify';
import Hrimg from '../../../assets/hr.svg'
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import { useLocation, useNavigate } from 'react-router-dom';
import closeBtn from '../../../assets/closeBtn.png';
import uparrow from '../../../assets/open.png';
import downarrow from '../../../assets/close.png';
import Fadingcircles from '../../../assets/faded.gif';
import './components/styles.css'
import Calendar from 'react-calendar';
import { TimeList } from '../CompanyProfile/component/TimeList';
import moment from 'moment';
import '../UserHomepage/Calendar.css'
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();


function MovingService(props){
  const mql = window.matchMedia('(max-width: 600px)');
  const profileData = useSelector((state) => state.profileReducer)
    let mobileView = mql.matches;
    const dispatch = useDispatch();
    let location = useLocation();
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time

    const [datecalendar,setDatecalendar]=useState(false);
    const [isModalloading,setIsModalloading]=useState(false)
    const [chargedyet,setChargedyet]=useState(false)
    const [isloading,setIsloading]=useState(false)
    const [conti,setConti]=useState(false);

    console.log(address,date,time,'yes data')
    const search = location.search;
    const approxSizeInSqFt = new URLSearchParams(search).get('approxSizeInSqFt');
    const fromAddress = new URLSearchParams(search).get('fromAddress');
    const date2 = new URLSearchParams(search).get('date');
    const time2 = new URLSearchParams(search).get('time');
    const elevatorAvailable = new URLSearchParams(search).get('elevatorAvailable');
    const typeofHouse = new URLSearchParams(search).get('typeofHouse');
    const toAddress = new URLSearchParams(search).get('toAddress');
    const numberOfRooms = new URLSearchParams(search).get('numberOfRooms');

    const [from,setFrom]=useState(fromAddress||location?.state?.address);
    const [to,setTo]=useState(toAddress);

    console.log(toAddress,'toadd')
const [values,setValues]=useState({
  "typeofHouse":typeofHouse||"Condo",
  "approxSizeInSqFt":approxSizeInSqFt||"500 to 1,200 ",
  "numberOfRooms":numberOfRooms||"2",
  "elevatorAvailable":elevatorAvailable||"Shared elevator",
   "fromAddress":fromAddress||address||"",
   "date":date2||date || moment(new Date()).format('DD MMM YYYY'),
   "time":time2||time || "10:00AM",
    "toAddress":toAddress||""
})
const [Bool,setBool]=useState({
  "condo":false,
  "size":false,
  "rooms":false,
  // "heavy":false,
  "elevator":false,
})
const [errors,setErrors]=useState(
  {
  "condo":false,
  "size":false,
  "rooms":false,
  // "heavy":false,
  "elevator":false,
   "from":false,
   "to":false,
   "date":false,
   "time":false
})
const allservices = useSelector(state => state.customerReducer.service);

useEffect(()=>{
  if(profileData?.movingData.length>0)
  {
    setValues(profileData?.movingData)
  }
  if(props.type==='profile'&&numberOfRooms){
    dispatch(moving(values,props?.activepage,8));
  }
  if(props?.activepage>1&&allservices){
  dispatch(moving(values,props?.activepage,8))
  }
},[profileData,numberOfRooms,props?.activepage])
const handlebool=(type)=>{
  if(type==='condo'){
  setBool({...Bool,condo:!Bool.condo,size:false,rooms:false,elevator:false})
  }
  else if(type==='size'){
    setBool({...Bool,size:!Bool.size,condo:false,rooms:false,elevator:false})
  }
  else if(type==='rooms'){
    setBool({...Bool,rooms:!Bool.rooms,size:false,condo:false,elevator:false})
  }
  // else if(type==='heavy'){
  //   setBool({...Bool,heavy:!Bool.heavy,size:false,rooms:false,condo:false,elevator:false})
  // }
  else if(type==='elevator'){
    setBool({...Bool,elevator:!Bool.elevator,size:false,rooms:false,condo:false})
  }

}

const handlechange=(name,place)=>(event,e)=>{
let value=
name === 'numberOfRooms' ? parseInt(event.target.value)||'Enter number of rooms':
name==='date'? moment(event).format('DD MMM YYYY'):
name==='typeofHouse'||name==='approxSizeInSqFt'||name==='howHeavyBelongings'||name==='elevatorAvailable'?event.target.id
:event.target.value
console.log(event,'np')
setConti(true)
if(name==='date'){
  setDatecalendar(false)
}
setValues({...values,[name]:value})
if(name==='typeofHouse'){
  setBool({...Bool,condo:!Bool.condo})
  }
  else if(name==='approxSizeInSqFt'){
    setBool({...Bool,size:!Bool.size})
  }
  // else if(name==='howHeavyBelongings'){
  //   setBool({...Bool,heavy:!Bool.heavy})
  // }
  else if(name==='elevatorAvailable'){
    setBool({...Bool,elevator:!Bool.elevator})
  }

}

const isValid=()=>{

if(!(values.fromAddress&&values.fromAddress.length>0)){
    setErrors({...errors,from:true})
    setTimeout(() => {
    setErrors({...errors,from:false})
    }, 3000);
    return false
}
else if(!(values.toAddress&&values.toAddress.length>0)){
    setErrors({...errors,to:true})
    setTimeout(() => {
      setErrors({...errors,to:false})
    }, 3000);
    return false
}
else if(!(values.typeofHouse&&values.typeofHouse.length>0)){
    setErrors({...errors,condo:true})
    setTimeout(() => {
      setErrors({...errors,condo:false})
    }, 3000);
    return false
}
else if(!(values.approxSizeInSqFt&&values.approxSizeInSqFt.length>0)){
    setErrors({...errors,size:true})
    setTimeout(() => {
      setErrors({...errors,size:false})
    }, 3000);
    return false
}
else if(!(values.numberOfRooms||values.numberOfRooms===isNaN)){
    setErrors({...errors,rooms:true})
    setTimeout(() => {
      setErrors({...errors,rooms:false})
    }, 3000);
    return false
}
// else if(!(values.howHeavyCupboard&&values.howHeavyCupboard.length>0)){
//     setErrors({...errors,heavy:true})
//     setTimeout(() => {
//       setErrors({...errors,heavy:false})
//     }, 3000);
//     return false
// }
else if(!(values.elevatorAvailable&&values.elevatorAvailable.length>0)){
    setErrors({...errors,elevator:true})
    setTimeout(() => {
      setErrors({...errors,elevator:false})
    }, 3000);
    return false
}
else if(!(values.date&&values.date.length>0)){
  setErrors({...errors,date:true})
  setTimeout(() => {
    setErrors({...errors,date:false})
  }, 3000);
  return false
}
else if(!(values.time&&values.time.length>0)){
 setErrors({...errors,time:true})
 setTimeout(() => {
  setErrors({...errors,time:false})
}, 3000);
  return false
}
else
return true
}

const onfromPlaceSelected = (place) => {
  const address = place.formatted_address
  setFrom(address)
  setConti(true)
}
const ontoPlaceSelected = (place) => {
  const add = place.formatted_address
  setTo(add)
  setConti(true)
}
useEffect(()=>{
  if(to||from){
setValues({...values,'toAddress':to,'fromAddress':from})
  }
},[to,from])

console.log(values,'values')

const handleSubmit=async()=>{
    if(isValid()){
      dispatch({type:'moving_data',payload:values})
      setIsloading(true)
      setIsModalloading(true)
      setChargedyet(true)
      setConti(false)
      let res
      window.analytics.track("Search results Customer form",{values,color:'#000',form_side:'right'});
     res = await dispatch(moving(values,props?.activepage,8));
     setIsloading(false)
     setIsModalloading(false)
     if(window.innerWidth<800){
      props?.onHide()
     }
     else if(res.status===false){
        toast.error(res.message,{position: "top-right"});
     }
     else if(res.status===true&&res.message!=='Success'){
        toast.info(res.message,{position: "top-right"});
     }
     localStorage.setItem('values',JSON.stringify(res?.finalData))
     localStorage.setItem('data',JSON.stringify(res?.data))
    }
}

const handledetails=async()=>{
  if(isValid()){
    setConti(false)
    setIsloading(true)
    setChargedyet(true)
    let res
    window.analytics.track("SP profile Customer form",
    {values,color:'#000',form_side:'right'});
   res = await dispatch(moving(values,1,8));
   setIsloading(false)
   if(res.status===false){
      toast.error(res.message,{position: "top-right"});

   }
   else if(res.status===true&&res.message!=='Success'){
      toast.info(res.message,{position: "top-right"});
   }
   handleclose();
   localStorage.setItem('values',JSON.stringify(res?.finalData))
   localStorage.setItem('data',JSON.stringify(res?.data))

  }
}

const handledate=()=>{
  if(datecalendar===false){
    setDatecalendar(true)
  }
  else
  setDatecalendar(false)

}

const handlerange=()=>{
  const
  range = document.getElementById('range'),
  rangeV = document.getElementById('rangeV'),
  setValue = ()=>{
    const
      newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
      newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);
setValues({...values,numberOfRooms:parseInt(range.value)})
console.log(range.value,'ranging')
}
console.log(values,'values')

let navigate=useNavigate();

const handleclose=async()=>{
  if(props.type==='profile'){
  navigate(`/business/${props.serviceprovider}`)
  }
  else
  {
    navigate(`/moving`)
  }
}



return(
  <React.Fragment>
    <script src="https://www.googleoptimize.com/optimize.js?id=OPT-KK9WKZM"></script>
     <div className='d-inline'>
     <Heading>Instant Online  {props.type==='profile'?'Estimate':'Estimates'}</Heading>

  <MainContainer>
    {location.pathname==='/search'?

  <img alt='' src={closeBtn} style={{height:'15px',width:'15px',marginLeft:'10px',marginBottom:'25px'}} onClick={()=>handleclose()}/>
  :''}

      <ToastContainer/>
  <Form>
      <ServiceHeader >
      Tell us about your move
      </ServiceHeader>
      <Details  className={errors?.from?' error justify-content-start':'justify-content-start'}>
      <div style={{paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'}}>
      Starting address <span style={{color:'#D81159'}}> * </span>
       <Place
            apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
            types={['address', '(cities)', '(regions)']}
            options={{types: ["geocode", "establishment"],
            componentRestrictions:{
              country: 'ca'
            }
          }}
          placeholder='Where are you moving from?'
          onPlaceSelected={onfromPlaceSelected}
          className="form-control form-control-default"
          defaultValue={values?.fromAddress}
          />
          </div>
   </Details>
   <Form.Group className="mt-3">
      <Details className={errors?.to?' error justify-content-start':'justify-content-start'}>
      <div style={{paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'}}>
      Destination address <span style={{color:'#D81159'}}> * </span>
        <Place
            apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
            types={['address', '(cities)', '(regions)']}
            options={{types: ["geocode", "establishment"],
            componentRestrictions:{
              country: 'ca'
            }
          }}
          placeholder='Where are you moving to? '
          onPlaceSelected={ontoPlaceSelected}
          className="form-control form-control-default"
          defaultValue={values?.toAddress}
          />
          </div>
          </Details>
          </Form.Group>
      <img src={Hrimg} alt='hr' className='mb-3 mt-3' style={{width:'100%'}}/>
      <div className='d-flex mb-3' style={{borderRadius:'13px',border:'1px solid #F3F3F3'}}>
          <Dates onClick={()=>handledate()} className={errors?.date?' error':''}>
          Moving date <span style={{color:'#D81159'}}> * </span>
          <p style={{fontFamily:'Roobert-medium',fontSize:'14px',fontWeight:'500',color:'black'}}>
            {values?.date?values?.date:'Select date'}
            </p>
              </Dates>
      <DetailsDrop className={errors?.time?' error justify-content-start':'justify-content-start'} >
      <div className='substyle'>
      Preferred time <span style={{color:'#D81159'}}> * </span>
      <Time aria-label="Floating label select example" onChange={handlechange('time')}>
      <option>{values?.time?values?.time:'Select time'}</option>
      {TimeList.map((item,index) =>{
return(
      <option value={item}>{item}</option>
)
      })}

    </Time>
    </div>
    </DetailsDrop>
    </div>
    {datecalendar === true ?
    <CalendarStyle className='p-3 d-flex justify-content-center mb-3'>
  <Calendar className='react-calendar' onChange={handlechange('date')}
  minDate={new window.Date()}
   />
  </CalendarStyle>
  :''}

  <Form.Group className="mb-3">
  <Details onClick={()=>handlebool('condo')} className={errors?.condo ?' error':''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
          Type of home you're moving from
              <Text>{values.typeofHouse}</Text>
              </div>
              <div>
                <Img src={Bool.condo===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
    </Form.Group>
    {Bool.condo===true?
    <Details className='mb-3'>
    <Options onClick={handlechange('typeofHouse')}>
    <Text id="Condo" >Condo / Apartment </Text>
    <Text id="House" >House</Text>
    <Text id="Townhouse">Townhouse</Text>
    </Options>
    </Details>
    :''}

<Form.Group className="mb-3">
  <Details onClick={()=>handlebool('size')} className={errors?.size?' error':''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
            Home size you're moving from (Sq.Ft.)
            <Text>{values.approxSizeInSqFt}</Text>
              </div>
              <div>
                <Img src={Bool.size===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
    </Form.Group>
    {Bool.size===true?
    <Details className='mb-3'>
    <Options onClick={handlechange('approxSizeInSqFt')}>
      <Text id={`Less than 500`}>{`Less than 500`} </Text>
      <Text id={`500 to 1,200 `}>{`500 to 1,200 `}</Text>
      <Text id={`1,200 to 2,000 `} >{`1,200 to 2,000 `}</Text>
      <Text id={`2,000 to 3,000 `}>{`2,000 to 3,000 `} </Text>
      <Text id={`3,000 to 4,000  `}>{`3,000 to 4,000  `}</Text>
      <Text id={`4,000 to 5,000 `}>{`4,000 to 5,000 `}</Text>

    </Options>
    </Details>
    :''}

<Form.Group className="mb-3">
  <Details className={errors?.rooms?' error':''}>
          <Innerdiv className='d-flex justify-content-between' onClick={()=>handlebool('rooms')}>
            <div>
            Number of bedrooms
            <Text>{values?.numberOfRooms}</Text>
              </div>
              <div>
                <Img src={Bool.rooms===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
              {Bool.rooms===true?
              <>
              <div className='d-flex justify-content-between p-3'>
                <p>Number of rooms</p>
                <input id="rangeV" value={values?.numberOfRooms} type='number' maxLength='1'
                onChange={handlechange('numberOfRooms')}
                style={{border:'1px solid grey',borderRadius:'6px',width: '56px',height: '32px',textAlign:'center',paddingTop:'3px',paddingBottom:'5px'}}
                 />
              </div>
  <div className='d-flex p-3'>0<input id="range" type="range" min="0" max="4" step="1" value ={parseInt(values?.numberOfRooms)} onChange={()=>handlerange()}/>4</div>
  </>
  :''}
      </Details>
    </Form.Group>
{/* <Form.Group className="mb-3">
  <Details onClick={()=>handlebool('heavy')} className={errors?.heavy?' error':''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
            How heavy are your belongings ?
            <Text>{values.howHeavyBelongings}</Text>
              </div>
              <div>
                <Img src={Bool.heavy===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
    </Form.Group>
    {Bool.heavy===true?
    <Details className='mb-3'>
    <Options onClick={handlechange('howHeavyBelongings')}>
      <Text id="Light">Light</Text>
      <Text id="Medium">Medium</Text>
      <Text id="Heavy">Heavy</Text>
    </Options>
    </Details>
    :''} */}

<Form.Group className="mb-3">
  <Details onClick={()=>handlebool('elevator')} className={errors?.elevator?' error':''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
            Dedicated elevator ?
            <Text>{values.elevatorAvailable}</Text>
              </div>
              <div>
                <Img src={Bool.elevator===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
    </Form.Group>
    {Bool.elevator===true?
    <Details className='mb-3'>
    <Options onClick={handlechange('elevatorAvailable')}>
      <Text id="Shared elevator">Shared elevator</Text>
      <Text id="Dedicated elevator">Dedicated elevator</Text>
      <Text id="Stairs">Stairs</Text>
      <Text id="Ground floor">Ground floor</Text>

    </Options>
    </Details>
    :''}
    <>
     <hr/>
     {
      props?.type==="profile"?
      props?.profileData?.finalPrice?
      <Estimated>Estimated price is CAD ${props?.profileData?.finalPrice}</Estimated>
      :null:null
    }
     <Search>
    <Continue size='md' variant="dark"
    style={{backgroundColor:isloading?'#DDDDDD':to&&from&&values.time&&values.date?'#D81159':'#000'}}
    onClick={()=>
    props.type==='profile'&&props.profileData?.estimatedHourlyPrice ?conti?handledetails():
    props?.reserveNow()
    :props.type==='profile'? handledetails()
    :handleSubmit()} >
      {
        isloading?<div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
        <img style={{width: '13%', alignSelf: 'center',objectFit:'cover'}} src={Fadingcircles} alt='loading.....' /></div>
      :  props.type==='profile'?props.profileData?.estimatedHourlyPrice?conti?"Continue":`Reserve now CAD $ ${Math.ceil(props.profileData?.estimatedHourlyPrice)} per hour`:'Continue':'Continue'
      }
      </Continue>
    </Search>
    </>
    {chargedyet===true?
   <Charged> You won’t be charged yet </Charged>
   :''}
        </Form>
        <div>
        <LoaderModal 
        centered  
        show={mobileView?isModalloading:false}>
        <div style={{ alignItems: 'center', justifyContent: 'center',display:'flex', width: '100%' }}>
        <img style={{width: '13%', alignSelf: 'center',objectFit:'cover'}} src={Fadingcircles} alt='loading.....' /></div>
        </LoaderModal>
        </div>
  </MainContainer>
  </div>
 
  </React.Fragment>
)
}

export default MovingService

const LoaderModal =styled(Modal)`
.modal-backdrop{
  opacity:0.5 !important;
}
.modal-content {
  background:transparent;
  border:0px solid transparent;
}
@media (min-width: 767px) and (max-width: 100000px){
  display:none;
}
`
const MainContainer=styled(Container)`
padding:20px;
border-radius: 0px 0px 8px 8px;
border:2px solid black;
background-color:#FFFFFF;
width:304px;
.error{
  border:3px solid red;
  }
  @media (min-width: 260px) and (max-width: 1115px){
    border-radius:8px;
    border:2px solid #F3F3F3;
    width:100%;
    }
`

const Heading=styled.div`
border-radius: 8px 8px 0px 0px;
color:white;
background-color:black;
background:black;
padding: 12px 34px;
text-align:center;
@media (min-width: 260px) and (max-width: 1115px){
  display:none;
  }
`
const Text=styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
`
const ServiceHeader=styled.p`
color:black ;
font-size:18px;
font-family: 'Roobert-medium';
font-style: normal;
font-weight: 500;
margin-left:1px;
margin-bottom:10px;
display:none;
@media (min-width: 260px) and (max-width: 1115px){
  display:flex;
  }
`
const Search=styled.p`
display:flex;
justify-content:center;
`
const Place=styled(Autocomplete)`
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
const Estimated = styled.p`
color:#190F0F;
margin-bottom:18px;
height: 20px;
font-family: Inter;
font-weight: 400;
font-size: 14px;
text-align:center;
`
const Charged = styled.p`
color:#787373;
margin-bottom:5px;
font-family: Inter;
font-size: 14px;
text-align:center;
`
const Dates=styled.div`
width:15rem;
margin-right:-25px;
border-radius:13px;
border:1px solid lightgray;
padding-left:6px;
padding-top:6px;
height:58px;
font-size:12px;
color:black;
@media (min-width: 360px) and (max-width: 1399px){
width:11rem;
}
`
const Time=styled(Form.Select)`
color:gray;
border-radius:13px;
font-family:roobert-medium;
width:9rem;
color:black;
border:none;
font-size:14px;
margin-top:-15px;
margin-left:-10px;
padding-top:13px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:none;
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

const DetailsDrop=styled.div`
border-radius:13px;
border:1px solid lightgray;
height:58px;
background:white;
background-color:white;
.substyle{
padding-left:12px;
padding-top:5px;
color:black;
font-size:12px;
font-family:Inter;
}
`
const Details=styled.div`
border-radius:13px;
border:1px solid lightgray;
input[type=range] {
-webkit-appearance: none;
width:100%;
padding:15px;
margin-bottom:10px;
}
input[type=range]:focus {
outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
height: 2px;
cursor: pointer;
animate: 0.2s;
background: #190F0FA3;
border-radius: 25px;
}
input[type=range]::-webkit-slider-thumb {
height: 20px;
width: 20px;
border-radius: 50%;
background: #fff;
box-shadow: 0 0 4px 0 rgba(0,0,0, 1);
cursor: pointer;
-webkit-appearance: none;
margin-top: -8px;
border:1px solid black;
}
input[type=range]:focus::-webkit-slider-runnable-track {
background: #190F0FA3;
}
.range-wrap{
position: relative;
}
.range-value{
position: absolute;
}
.range-value span{
width: 30px;
height: 24px;
line-height: 24px;
text-align: center;
background: #03a9f4;
color: #fff;
font-size: 12px;
display: block;
position: absolute;
left: 50%;
transform: translate(-50%, 0);
border-radius: 6px;
}
.range-value span:before{
content: "";
position: absolute;
width: 0;
height: 0;
border-top: 10px solid #03a9f4;
border-left: 5px solid transparent;
border-right: 5px solid transparent;
top: 100%;
left: 50%;
margin-left: -5px;
margin-top: -1px;
}

`

const Continue=styled(Button)`
background-color:black;
border:1px solid white;
border-radius:10px;
width: 360px;
font-size: 14px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:none;
background: #fff;
}
`
const Innerdiv = styled.div`
padding-left:12px;
padding-right:15px;
padding-top:10px;
color:black;
font-size: 12px;
height:60px;
font-family:Inter;
`
const Options = styled.div`
padding-left:12px;
padding-top:15px;
color:black;
font-size:14px;
`
const Img = styled.img`
height:7px;
width:11px;
margin-top:15px;
`