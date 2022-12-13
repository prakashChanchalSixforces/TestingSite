import React, { useEffect, useState } from 'react'
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
import { pressurewashing } from '../../../store/Actions/User.action';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function PressurewashingService(props){
    const dispatch = useDispatch();
    let location = useLocation();
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time
    const [datecalendar,setDatecalendar]=useState(false);
    const [isloading,setIsloading]=useState(false)
    const search = location.search;
    const address2 = new URLSearchParams(search).get('address');
    const approxSizeInSqFt2 = new URLSearchParams(search).get('approxSizeInSqFt');
    const date2 = new URLSearchParams(search).get('date');
    const time2 = new URLSearchParams(search).get('time');
    const areasToBeCleaned2 = new URLSearchParams(search).get('areasToBeCleaned');
    let arr=areasToBeCleaned2?.split(',')
    const[val,setVal]=useState(arr||['Driveway'])
    const [length,setLength]=useState(val?.length);
    const [living,setLiving]=useState()
    const [multivalues]=useState(['Driveway'])
    const [values,setValues]=useState({
        areasToBeCleaned:arr||["Driveway"],
        approxSizeInSqFt:approxSizeInSqFt2||'less than 1,000 ',
        "address":address||address2||"",
        "date":date2||date || moment(new Date()).format('DD MMM YYYY'),
        "time":time2||time || "10:00AM",
      })
      const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
      let limit = mql===true? 9 :8
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

        const handlechange=(name)=>(event,e)=>{
            let value=name==='date'? moment(event).format('DD MMM YYYY')
            :name==='areasToBeCleaned'||name==='approxSizeInSqFt'?event.target.id
            :event.target.value
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

let onPlaceSelected = (place) => {
    const address = place.formatted_address
    setLiving(address)
}
useEffect(()=>{
  if(living){
    setValues({...values,'address':living})
  }
  if(props.type==='profile'&&areasToBeCleaned2){
    dispatch(pressurewashing(values,1,limit));
  }
},[living,areasToBeCleaned2])

const handledate=()=>{
  if(datecalendar===false){
    setDatecalendar(true)
  }
  else
  setDatecalendar(false)
}

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
        let res
        window.analytics.track("Search results Customer form",{values,color:'#000',form_side:'right'});
        res = await dispatch(pressurewashing(values,1,limit));
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
    const SizeOptions=['less than 1,000 ','1,000 to 1,500 ','1,500 to 2000 ','2,000 to 2,500 ','2,500 to 3000 ','3,000 to 3,500 ','Greater than 3,500 ']

    return(
        <>
        <script src="https://www.googleoptimize.com/optimize.js?id=OPT-KK9WKZM"></script>
        {props?.active==='GI'?
        <GeneralInfo>
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
    <Options>
    {SizeOptions?.map((item,index)=>{
    return <Text className='maintext' id={item} key={index} onClick={handlechange('approxSizeInSqFt')}>{item} </Text>
    })}
    </Options>
    </Details>
    :''}
        </GeneralInfo>
        :
        <DTDinfo>
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
   <img src={Hrimg} alt='hr' className='mb-3 mt-1' style={{width:'100%'}}/>
   <div className='d-flex mb-3' style={{borderRadius:'13px',border:'1px solid #F3F3F3'}}>
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
        "Check"}
        </Actions>
                </div>
        </DTDinfo>
}
        </>
    )
}
export default PressurewashingService

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
input[type='checkbox']:checked{
    background-color: #D81159;
    border: 2px solid #D81159;
    box-shadow: 0 0 1px 1px #D81159;
  }
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
cursor:pointer;
`