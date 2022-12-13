import React, { useState } from 'react'
import { Button, Container,Form, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { pressurewashing } from '../../../store/Actions/User.action';
import { ToastContainer, toast } from 'react-toastify';
import Hrimg from '../../../assets/hr.svg'
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from 'react-google-autocomplete';
import Calendar from 'react-calendar';
import { TimeList } from '../CompanyProfile/component/TimeList';
import Geocode from "react-geocode";
import '../UserHomepage/Calendar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Fadingcircles from '../../../assets/faded.gif';
import uparrow from '../../../assets/open.png';
import downarrow from '../../../assets/close.png';
import moment from 'moment';
import { useEffect } from 'react';

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function PressureWashing(props){
  const mql = window.matchMedia('(max-width: 600px)');
    const dispatch = useDispatch();
    let location=useLocation();
    let mobileView = mql.matches;
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time

    const search = location.search;
    const address2 = new URLSearchParams(search).get('address');
    const approxSizeInSqFt2 = new URLSearchParams(search).get('approxSizeInSqFt');
    const date2 = new URLSearchParams(search).get('date');
    const time2 = new URLSearchParams(search).get('time');
    const areasToBeCleaned2 = new URLSearchParams(search).get('areasToBeCleaned');
    console.log(address2,approxSizeInSqFt2,areasToBeCleaned2,date2,time2,'location in search')

    let arr=areasToBeCleaned2?.split(',')
    console.log(arr,'arr')
    const[val,setVal]=useState(arr||[])

const [values,setValues]=useState({
  areasToBeCleaned:arr||[],
  approxSizeInSqFt:approxSizeInSqFt2||'less than 1000 ',
  "address":address||address2||"",
   "date":date ||date2||"",
   "time":time ||time2||""

})
console.log(values,'values')
const [Bool,setBool]=useState({
  "areas":true,
  "size":false,
})
const [errors,setErrors]=useState(
  {
    "areas":false,
    "size":false,
   "address":false,
   "date":false,
   "time":false
})
const handlebool=(type)=>{
  if(type==='areas'){
  setBool({...Bool,areas:!Bool.areas,size:false})
  }
  else if(type==='size'){
    setBool({...Bool,size:!Bool.size,areas:false})
  }
}
function removeElement(arr,element){
  let index=-1
  for(let i in arr){
      if(arr[i]===element){
         index=i
         break
      }
  }
  arr.splice(index,1)
}

const handlemultiselect=(name)=>(event)=>{
  if(event.target.id===name&&event.target.checked===true){
  multivalues.push(name)
  setLength(length+1)
  }
  else if(event.target.id===name&&event.target.checked===false){
  removeElement(multivalues,name)
  setLength(length-1)
  }
  setVal(multivalues)
  setValues({...values,'areasToBeCleaned':multivalues})
  }


let navigate = useNavigate()
const [datecalendar,setDatecalendar]=useState(false);
const [isModalloading,setIsModalloading]=useState(false)
    const [chargedyet,setChargedyet]=useState(false)
    const [isloading,setIsloading]=useState(false)
    const [conti,setConti]=useState(false);
    const [length,setLength]=useState(0);
    const [living,setLiving]=useState()

    const [multivalues]=useState([])

const handlechange=(name)=>(event,e)=>{
let value=name==='date'? moment(event).format('DD MMM YYYY')
:name==='areasToBeCleaned'||name==='approxSizeInSqFt'?event.target.id
:event.target.value
setConti(true)
if(name==='date'){
  setDatecalendar(false)
}
setValues({...values,[name]:value})
if(name==='areasToBeCleaned'){
  setBool({...Bool,areas:!Bool.areas})
  }
  else if(name==='approxSizeInSqFt'){
    setBool({...Bool,size:!Bool.size})
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

let onPlaceSelected = (place) => {
    const address = place.formatted_address
    setLiving(address)
    setConti(true)
}
useEffect(()=>{
  if(living){
    setValues({...values,'address':living})
  }
  if(props.type==='profile'&&areasToBeCleaned2){
    dispatch(pressurewashing(values,1,8));
  }
},[living,areasToBeCleaned2])

const handledate=()=>{
  if(datecalendar===false){
    setDatecalendar(true)
  }
  else
  setDatecalendar(false)

}
// const handleSubmit=async()=>{
//     let res
//     if(isValid()){
//      res = await dispatch(pressurewashing(values,1,10));
//      localStorage.setItem('values',JSON.stringify(values))
//      localStorage.setItem('data',JSON.stringify(res?.data))
//      props?.onHide()
//      if(res.status===false){
//       props?.onHide()
//         toast.error(res.message,{position: "bottom-left"});
//      }
//      else if(res.status===true&&res.message!=='Success'){
//       props?.onHide()
//         toast.info(res.message,{position: "bottom-left"});
//      }
//     }
// }
const isValid=()=>{
if(!(values.address&&values.address.length>0)){
      setErrors({...errors,address:true})
      setTimeout(() => {
      setErrors({...errors,address:false})
      }, 3000);
      return false
  }
  else if(!(values.areasToBeCleaned&&values.areasToBeCleaned.length>0)){
      setErrors({...errors,areas:true})
      setTimeout(() => {
        setErrors({...errors,areas:false})
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
    res = await dispatch(pressurewashing(values,1,8));
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
  res = await dispatch(pressurewashing(values,1,10));
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
     <Heading>Check online {props.type==='profile'?'estimate':'estimates'}</Heading>
    <MainContainer>
        <ToastContainer/>
    <Form>
    <ServiceHeader>
        Tell us about your cleaning
        </ServiceHeader>
        {/* <Details className='d-flex justify-content-start'>
            <div style={{paddingLeft:'12px',paddingTop:'10px',fontFamily: 'Roobert-medium',color:'black',fontWeight:'500',fontSize:'14px'}}>
                Service
                <Text>Pressure Washing</Text>
                </div>
        </Details>
        <br/> */}
            <Details  className={errors?.address?' error justify-content-start mb-3':
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
          placeholder='Where do you live ? '
          onPlaceSelected={onPlaceSelected}
          className="form-control form-control-default"
          defaultValue={values?.address?values?.address:''}
          />
          </div>
   </Details>

<div className='d-flex mb-1' style={{borderRadius:'13px',border:'1px solid #F3F3F3'}}>
          <Dates onClick={()=>handledate()} className={ errors?.date?' error':
            ''}>
          Date
              <p style={{fontFamily:'Roobert-medium',fontSize:'14px',fontWeight:'500',color:'black'}}>
                {values?.date?values?.date:'Select date'}</p>
              </Dates>
      <DetailsDrop className={errors?.time?' error justify-content-start':
        'justify-content-start'} >
      <div className='substyle'>
      Preferred time
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

        <Hr src={Hrimg} alt='hr' className='mb-3 mt-3'/>
        {/* <Form.Group className="mb-3">
  <Details onClick={()=>handlebool('areas')} className={errors?.areas ?' error':
    ''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
            Areas to be cleaned
              <Text>{values.areasToBeCleaned}</Text>
              </div>
              <div>
                <Img src={Bool.areas===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
    </Form.Group>
    {Bool.areas===true?
    <Details className='mb-3'>
    <Options  onClick={handlechange('areasToBeCleaned')}>
    <Text id="Driveway" >Driveway</Text>
    <Text id="Patio" >Patio</Text>
    <Text id="House Wash">House Wash</Text>
    </Options>
    </Details>
    :''} */}
    <Form.Group className="mb-3">
    <Details onClick={()=>handlebool('areas')} className={errors?.areas ?' error':
    ''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
            Areas to be cleaned
              <Text>Selected({length})</Text>
              </div>
              <div>
                <Img src={Bool.areas===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
      </Form.Group>
      {Bool.areas===true?
      <Details className='d-flex justify-content-between mb-3 p-3'>
      <Form>
          <Form.Check
            inline
            label="Driveway"
            name="Driveway"
            type='checkbox'
            value="Driveway"
            id="Driveway"
            checked={val.includes('Driveway')}
            onClick={handlemultiselect('Driveway')}
          />
          <br/>
          <Form.Check
            inline
            label="Patio"
            name="Patio"
            type='checkbox'
            value="Patio"
            checked={val.includes('Patio')}
            onClick={handlemultiselect('Patio')}
            id="Patio"
          />
          <br/>
          <Form.Check
            inline
            label="House wash"
            name="House Wash"
            type='checkbox'
            value="House Wash"
            checked={val.includes('House Wash')}
            onClick={handlemultiselect('House Wash')}
            id="House Wash"
          />
    </Form>
        </Details>
        :''}
<Form.Group className="mb-3">
  <Details onClick={()=>handlebool('size')} className={ errors?.size ?' error':
    ''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
            Approx. area to be cleaned (sq. ft.)
            <Text>{values?.approxSizeInSqFt}</Text>
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
      <Text id={`less than 1000 `}>{`less than 1000`} </Text>
      <Text id={`1000 to 1,500 `}>{`1000 to 1,500 `}</Text>
      <Text id={`1,500 to 2000 `} >{`1,500 to 2000 `}</Text>
      <Text id={`2000 to 2,500 `}>{`2000 to 2,500 `} </Text>
      <Text id={`2,500 to 3000 `}>{`2,500 to 3000 `} </Text>
      <Text id={`3000 to 3,500 `}>{`3000 to 3,500 `} </Text>
      <Text id={`Greater than 3,500 `}>{`Greater than 3,500 `}</Text>
    </Options>
    </Details>
    :''}

      <>
      <Hr src={Hrimg} alt='hr' className='mb-3 mt-3'/>
      {
      props?.type==="profile"?
      props?.profileData?.finalPrice?
      <Estimated>Estimated price is CAD ${props?.profileData?.finalPrice}</Estimated>
      :null:null
    }
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
    <br/>
    <br/>
    </React.Fragment>
)
}

export default PressureWashing

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
const ServiceHeader=styled.p`
color:black ;
font-size:18px;
font-family: 'Roobert-medium';
font-style: normal;
font-weight: 500;
margin-left:1px;
`
const Heading=styled.div`
border-radius: 8px 8px 0px 0px;
color:white;
background-color:black;
background:black;
padding: 12px 34px;
width:100%;
text-align:center;
@media (min-width: 260px) and (max-width: 1115px){
  display:none;
  }
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
const Estimated = styled.p`
color:#190F0F;
margin-bottom:18px;
height: 20px;
font-family: Inter;
font-weight: 400;
font-size: 14px;
text-align:center;
`

const Text=styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
`

const Search=styled.p`
display:flex;
justify-content:center;
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
input[type='checkbox']:checked{
  background-color: #D81159;
  border: 2px solid #D81159;
  box-shadow: 0 0 1px 1px #D81159;
}
`
const Hr=styled.img`
width:100%;
`