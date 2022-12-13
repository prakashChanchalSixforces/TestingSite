import React, {useState } from 'react'
import {Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Hrimg from '../../../assets/hr.svg'
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import { useLocation } from 'react-router-dom';
import uparrow from '../../../assets/open.png';
import downarrow from '../../../assets/close.png';
import '../UserHomepage/components/styles.css'
import Calendar from 'react-calendar';
import { TimeList } from '../CompanyProfile/component/TimeList';
import moment from 'moment';
import '../UserHomepage/Calendar.css'
import Fadingcircles from '../../../assets/faded.gif';
import {plumbers } from '../../../store/Actions/User.action';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function PlumbersService(props){
    const dispatch = useDispatch();
    let location = useLocation();
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time
    const [datecalendar,setDatecalendar]=useState(false);
    const [isloading,setIsloading]=useState(false)
    const search = location.search;
    const address2 = new URLSearchParams(search).get('address');
    const date2 = new URLSearchParams(search).get('date');
    const time2 = new URLSearchParams(search).get('time');
    const estimatedHourOfWork = new URLSearchParams(search).get('estimatedHourOfWork');
    const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
    let limit = mql===true? 9 :8
//const [address,setAddress]=useState('')
const [values,setValues]=useState({
  "estimatedHourOfWork":estimatedHourOfWork||"2 to 3 hour",
  "address":address||address2||"",
  "date":date2||date || moment(new Date()).format('DD MMM YYYY'),
  "time":time2||time || "10:00AM",
})
const handlechange=(name)=>(event)=>{
    let value=name==='date'? moment(event).format('DD MMM YYYY'):
    name==='estimatedHourOfWork'?event.target.id:
    event.target.value
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
            let res
            window.analytics.track("Search results Customer form",{values,color:'#000',form_side:'right'});
            res = await dispatch(plumbers(values,1,limit));
            setIsloading(false)
            props.Servicemodal(false)
           if(window.innerWidth<800){
            props?.onHide()
           }
           else if(res.status===false){
           }
           else if(res.status===true&&res.message!=='Success'){
           }
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
const HourOptions=['less than 2 hours','2 to 3 hour','3 hours +']

    return(
        <>
        <script src="https://www.googleoptimize.com/optimize.js?id=OPT-KK9WKZM"></script>
        {/* {props?.active==='GI'?
        <GeneralInfo>
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
    <Options>
    {HourOptions?.map((item,index)=>{
    return <Text className='maintext' id={item} key={index} onClick={handlechange('estimatedHourOfWork')}>{item} </Text>
    })}
    </Options>
    </Details>
    :''}
        </GeneralInfo>
        : */}
        <DTDinfo>
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
      {/* <img src={Hrimg} alt='hr' className='mb-1' style={{width:'100%'}}/> */}
      <div className='d-flex mb-3 mt-1' style={{borderRadius:'13px',border:'1px solid #F3F3F3'}}>
          <Dates onClick={()=>handledate()} className={errors?.date?' error':''}>
          Date <span style={{color:'#D81159'}}> * </span>
          <p style={{fontFamily:'Roobert-medium',fontSize:'14px',fontWeight:'500',color:'black'}}>
            {values?.date?values?.date:'Select date'}
            </p>
              </Dates>
      <DetailsDrop className={errors?.time?' error justify-content-start':'justify-content-start'} >
      <div style={{paddingLeft:'12px',paddingTop:'5px',color:'black',fontSize:'12px',fontFamily:'Inter'}}>
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
  <div className='d-flex justify-content-center'>
                    <Actions variant="outline-dark" onClick={()=>props?.setActiveinfo('GI')}>Back</Actions>
                    &nbsp;&nbsp;&nbsp;
                     <Actions
                      style={{backgroundColor:isloading?'#DDDDDD':'#000'}}
                     variant='dark' onClick={()=>handleSubmit()} >
              {     isloading?<div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
        <img style={{width: '13%', alignSelf: 'center',objectFit:'cover'}} src={Fadingcircles} alt='loading.....' /></div>
      :
        "Get price"}
        </Actions>
                </div>
        </DTDinfo>
{/* } */}
        </>
    )
}
export default PlumbersService

const GeneralInfo=styled.div`
padding:20px;
.error{
    border:3px solid red;
    }
`
const DTDinfo=styled.div`
padding:20px;
.error{
    border:3px solid red;
    }
`

const Text=styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
`

const Place=styled(Autocomplete)`
height:40px;
border-radius:15px;
border-width:0px;
margin-left:-12px;
margin-top:-8px;
font-family:roobert-medium;
font-size:14px;
font-weight:500;
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
const Actions=styled(Button)`
width: 215px;
height: 44px;
border-radius: 8px;
font-size: 14px;
font-family:Roobert-medium;
`
const Dates=styled.div`
width:15rem;
margin-right:-25px;
border-radius:13px;
border:1px solid lightgray;
padding-left:8px;
padding-top:4px;
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
width:15rem;
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
margin-top:5px;
`

const DetailsDrop=styled.div`
border-radius:13px;
border:1px solid lightgray;
height:58px;
background:white;
background-color:white;
`
const Details=styled.div`
border-radius:13px;
border:1px solid lightgray;
.maintext{
  &:hover {
      color: #D81159;
  }
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