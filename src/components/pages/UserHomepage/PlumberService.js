import React, { useState } from 'react'
import { Button, Container,FloatingLabel,Form,Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { TimeList } from '../CompanyProfile/component/TimeList';
import Fadingcircles from '../../../assets/faded.gif';
import Calendar from 'react-calendar';
import { plumbers } from '../../../store/Actions/User.action';
import Hrimg from '../../../assets/hr.svg'
import moment from 'moment';
import uparrow from '../../../assets/open.png';
import downarrow from '../../../assets/close.png';
import infoLogo from '../../../assets/infologo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../UserHomepage/Calendar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function PlumberService(props){
const dispatch = useDispatch();
let location=useLocation();
let navigate=useNavigate();
const mql = window.matchMedia('(max-width: 600px)');
let mobileView = mql.matches;
const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time
    const [isModalloading,setIsModalloading]=useState(false)
    const [chargedyet,setChargedyet]=useState(false)
    const [isloading,setIsloading]=useState(false)
    const [conti,setConti]=useState(false);
const [view,setView]=useState(false)
const search = location.search;
    const address2 = new URLSearchParams(search).get('address');
    const date2 = new URLSearchParams(search).get('date');
    const time2 = new URLSearchParams(search).get('time');
    const estimatedHourOfWork = new URLSearchParams(search).get('estimatedHourOfWork');
//const [address,setAddress]=useState('')
const [values,setValues]=useState({
  "estimatedHourOfWork":estimatedHourOfWork||"2 to 3 hour",
  "address":address||address2||"",
  "date":date ||date2||"",
  "time":time ||time2||""
})
const [datecalendar,setDatecalendar]=useState(false);

useEffect(()=>{
  if(props.type==='profile'&&estimatedHourOfWork){
    dispatch(plumbers(values,1,50));
  }
},[estimatedHourOfWork])
const handlechange=(name)=>(event)=>{
let value=name==='date'? moment(event).format('DD MMM YYYY'):
name==='estimatedHourOfWork'?event.target.id:
event.target.value
setConti(true)
if(name==='date'){
    setDatecalendar(false)
  }
setValues({...values,[name]:value})
if(name==='estimatedHourOfWork'){
  setBool({...Bool,hour:!Bool.hour})
  }
}

let onPlaceSelected = (place) => {
    const address = place.formatted_address
    setValues({...values,'address':address})
}
const handledate=()=>{
    if(datecalendar===false){
      setDatecalendar(true)
    }
    else
    setDatecalendar(false)
  }
const Problems=[
     "Dripping faucets",
     "Slow draining sink",
     "Clogged bath ors howerdrain",
     "Clogged toilet",
     "Running toilet",
     "Faulty water heater",
     "Low water pressure",
     "Jammed garbage disposal. Illegal in many places",
     "Leaky pipes",
     "Sewer system backup"
]

const [errors,setErrors]=useState(
  {
    "hour":false,
   "address":false,
   "date":false,
   "time":false
})
const [Bool,setBool]=useState({
  "hour":false,
})
const handlebool=(type)=>{
  if(type==='hour'){
  setBool({...Bool,hour:!Bool.hour})
  }
}
const handleclose=async()=>{
  if(props.type==='profile'){
  navigate(`/business/${props.serviceprovider}`)
  }
  else
  {
    navigate(`/moving`)
  }
}
const isValid=()=>{
  if(!(values.address&&values.address.length>0)){
        setErrors({...errors,address:true})
        setTimeout(() => {
        setErrors({...errors,address:false})
        }, 3000);
        return false
    }
    else if(!(values.estimatedHourOfWork&&values.estimatedHourOfWork.length>0)){
        setErrors({...errors,hour:true})
        setTimeout(() => {
          setErrors({...errors,hour:false})
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

  const handleSubmit=async()=>{
    if(isValid()){
      setIsloading(true)
      setIsModalloading(true)
      setChargedyet(true)
      setConti(false)
      let res
      window.analytics.track("Search results Customer form",{values,color:'#000',form_side:'right'});
      res = await dispatch(plumbers(values,1,50));
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
    window.analytics.track("Search results Customer form",{values,color:'#000',form_side:'right'});
    res = await dispatch(plumbers(values,1,50));
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

return(
  <React.Fragment>
    <div className='d-inline'>
     <Heading>Instant Online  {props.type==='profile'?'Estimate':'Estimates'}</Heading>
    {view===false?
    <>
    <MainContainer>
        <ToastContainer/>
    <Form>
    <ServiceHeader>
        Tell us about your job
        </ServiceHeader>
        <Details className={errors?.address?' error justify-content-start mb-3':
              'justify-content-start mb-3'}>
        <div style={{paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'}}>
       Address
        <Place
              apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
              types={['address', '(cities)', '(regions)']}
              options={{types: ["geocode", "establishment"],
              componentRestrictions:{
                country: 'ca'
              }
            }}
            placeholder='Address'
            onPlaceSelected={onPlaceSelected}
            defaultValue={values?.address?values?.address:''}
            className="form-control form-control-default"
            />
            </div>
            </Details>
            <div className='d-flex mt-3' style={{borderRadius:'13px',border:'1px solid #F3F3F3'}}>
          <Dates onClick={()=>handledate()}
          className={errors?.date?' error':''}
          >
          Date <span style={{color:'#D81159'}}> * </span>
          <p style={{fontFamily:'Roobert-medium',fontSize:'14px',fontWeight:'500',color:'black'}}>
            {values?.date?values?.date:'Select date'}
            </p>
              </Dates>
        <DetailsDrop
        className={errors?.time?' error justify-content-start':'justify-content-start'}
        >
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
<CalendarStyle className='p-3 d-flex justify-content-center'>
<Calendar className='react-calendar' onChange={handlechange('date')}
minDate={new window.Date()}
/>
</CalendarStyle>
:''}
               <Hr src={Hrimg} alt='hr' className='mb-3 mt-3'/>
      <Form.Group className="mb-3">
  <Details onClick={()=>handlebool('hour')} className={ errors?.hour ?' error':
    ''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
            Estimated hours of work
            <Text>{values?.estimatedHourOfWork}</Text>
              </div>
              <div>
                <Img src={Bool.hour===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
    </Form.Group>
    {Bool.hour===true?
    <Details className='mb-3'>
    <Options onClick={handlechange('estimatedHourOfWork')}>
      <Text id={`less than 2 hours`}>{`less than 2 hours`} </Text>
      <Text id={`2 to 3 hour`}>{`2 to 3 hour`}</Text>
      <Text id={`3 hours +`} >{`3 hours +`}</Text>
    </Options>
    </Details>
    :''}

      <Details className='d-flex justify-content-between p-2'>
            <Info>
              <Smallfont>List of services that get resolved in
                <br/>1-2 hours</Smallfont>
                <Text2>Show more detail</Text2>
                </Info>
                &nbsp;
                <div>
                <img src={infoLogo} alt='info' onClick={()=>{setView(true)}}/>
                </div>
      </Details>
      <Hr src={Hrimg} alt='hr' className='mb-3 mt-3'/>
      <Search>
      <Continue size='md' variant="dark"
    style={{backgroundColor:isloading?'#DDDDDD':values.address&&values.time&&values.date?'#D81159':'#000'}}
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
    <br/>
    <br/>
    </>
    :
    <NextContainer>
        <h6>Ten most common plumbing problems:</h6>
        <br/>
        <ul>
            {Problems?.map((item,index)=>{return(
                <>
  <Items key={index}>{item}</Items>
  </>
            )})}
</ul>
<Hr src={Hrimg} alt='hr' className='mb-3 mt-3'/>
<Search>
      <Continue size='md' variant="dark" onClick={()=>{setView(false)}} >Back</Continue>
</Search>
    </NextContainer>
}
</div>

</React.Fragment>
)
}

export default PlumberService

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
const NextContainer=styled(Container)`
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

const Hr=styled.img`
width:100%;
`
const Text2=styled.p`
color:#787373 ;
margin-top:-15px;
font-size:14px;
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
const Search=styled.p`
display:flex;
justify-content:center;
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
const Innerdiv = styled.div`
padding-left:12px;
padding-right:15px;
padding-top:10px;
color:black;
font-size: 12px;
height:60px;
font-family:Inter;
`
const Charged = styled.p`
color:#787373;
margin-bottom:5px;
font-family: Inter;
font-size: 14px;
text-align:center;
`
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
const Text=styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
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