import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import { useLocation } from 'react-router-dom';
import uparrow from '../../../../assets/open.png';
import downarrow from '../../../../assets/close.png';
import '../../UserHomepage/components/styles.css'
import Calendar from 'react-calendar';
import { TimeList } from '../../CompanyProfile/component/TimeList';
import moment from 'moment';
import '../../UserHomepage/Calendar.css'
import Fadingcircles from '../../../../assets/faded.gif';
import { electricians } from '../../../../store/Actions/User.action';


function ElectriciansSearch(props) {
    const dispatch = useDispatch();
    let location = useLocation();
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time
    const [datecalendar, setDatecalendar] = useState(false);
    const [isloading, setIsloading] = useState(false)
    const [active,setActive]=useState(false);
    const [focusedname, setFocusedname] = useState('')

    console.log(address, date, time, 'yes data')
    const search = location.search;
    const address2 = new URLSearchParams(search).get('address');
    const date2 = new URLSearchParams(search).get('date');
    const time2 = new URLSearchParams(search).get('time');
    const estimatedHourOfWork = new URLSearchParams(search).get('estimatedHourOfWork');
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
          const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
    let limit = mql===true? 9 :8
          let dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          function gtag_report_conversion(url) {
            var callback = function ()
            {
            if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', { 'send_to': 'AW-10955203557/v9raCNSviYMYEOXH7Oco', 'event_callback': callback });
            return false;
            }
        const handleSubmit=async()=>{
          gtag_report_conversion()
          if(isValid()){
            props?.setLoader(true)
            setIsloading(true)
            let res
            window.analytics.track("Search results Customer form",{values,color:'#000',form_side:'right'});
            res = await dispatch(electricians(values,1,limit));
            props?.setLoader(false)
            setIsloading(false)
            setActive(true);
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
    const handlefocusing=(name)=>{
        setFocusedname(name)
    }

    const HourOptions=['less than 2 hours','2 to 3 hour','3 hours +']

    return (
        <React.Fragment>
            <Main >
                <div >
                    <p className='text1'>Never overpay when you book high-quality electricians on SwiftBel.</p>
                    <p className='text2'>Transparent pricing, fully-insured, and stress-free. Save an average of $45.</p>

                </div>
                <Tiles>
                <Details className={errors?.address?' error justify-content-start':'justify-content-start'} onClick={()=>handlefocusing('address')}>
                        <div className='subdiv'>
                           {focusedname==='address' || values?.address?.length>0 ? 'Address':''}
                            <Place
                                apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                types={['address', '(cities)', '(regions)']}
                                options={{
                                    types: ["geocode", "establishment"],
                                    componentRestrictions: {
                                        country: 'ca'
                                    }
                                }}
                                placeholder='Where do you live ? '
                                onPlaceSelected={onPlaceSelected}
                                className={focusedname==='address' || values?.address?.length>0 ?"form-control form-control-default focused":"form-control form-control-default focusing"}
                                defaultValue={values?.address?values?.address:''}
                            />
                        </div>
                    </Details>
                 {active!==true?   <Actions
                      style={{backgroundColor:isloading?'#DDDDDD':'#000'}}
                     variant='dark' onClick={()=>handleSubmit()} >
              {     isloading?<div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
        <img style={{width: '13%', alignSelf: 'center',objectFit:'cover'}} src={Fadingcircles} alt='loading.....' />
        </div>
      :
        "Get free estimates"}
        </Actions>:null}
        <MobileView>
        <MobileActions
                      style={{backgroundColor:isloading?'#DDDDDD':'#000'}}
                     variant='dark' onClick={()=>handleSubmit()} >
              {     isloading?<div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
        <img style={{width: '13%', alignSelf: 'center',objectFit:'cover'}} src={Fadingcircles} alt='loading.....' />
        </div>
      :
        "Get free estimates"}
        </MobileActions>
        </MobileView>

                </Tiles>
                {active===true?
                <WebView>

                    <Details onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                    <Innerdiv className='d-flex justify-content-between'>
                                <div>
                                Date
                        <p style={{ fontFamily: 'Roobert-medium', fontSize: '14px', fontWeight: '500', color: 'black' }}>
                        {values?.date?values?.date:'Select date'}
                        </p>
                                </div>
                                <div>
                                    <Img src={Bool.condo === true ? uparrow : downarrow} />
                                </div>
                            </Innerdiv>
                    </Details>
                    <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start '} >
                        <div className='subdivtime'>
                            Preferred time
                            <Time aria-label="Floating label select example" onChange={handlechange('time')}>
                                <option>{values?.time ? values?.time : 'Select time'}</option>
                                {TimeList.map((item, index) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}

                            </Time>
                        </div>
                    </DetailsDrop>
                    <Form.Group className="mb-1">
                    <Details onClick={()=>handlebool('hour')} className={ errors?.hour ?' error':''}>
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
                        {Bool.hour===true?
                          <DetailsOptions className='mt-1'>
                            {HourOptions?.map((item,index)=>{
                                    return <Text className='maintext' id={item} key={index} onClick={handlechange('estimatedHourOfWork')}>{item} </Text>
                                })}
                          </DetailsOptions>
                        :''}
                    </Form.Group>
   <Actions
                      style={{backgroundColor:isloading?'#DDDDDD':'#000'}}
                     variant='dark' onClick={()=>handleSubmit()} >
              {     isloading?<div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
        <img style={{width: '13%', alignSelf: 'center',objectFit:'cover'}} src={Fadingcircles} alt='loading.....' /></div>
      :
        "Get free estimates"}
        </Actions>
                </WebView>:null
}

                {datecalendar === true ?
    <CalendarStyle style={{zIndex:10000}} className='p-3 d-flex justify-content-center mb-3'>
  <Calendar className='react-calendar' onChange={handlechange('date')}
  minDate={new window.Date()}
   />
  </CalendarStyle> :''}
            </Main>


        </React.Fragment>
    )

}
export default ElectriciansSearch
const Tiles = styled.div`
display:flex;
flex-wrap:wrap;
@media (min-width: 260px) and (max-width: 820px){
    display:inline;
 }

`
const WebView=styled.div`
display:flex;
flex-wrap:wrap;
@media (min-width: 260px) and (max-width: 820px){
    display:none;
 }
`
const MobileView=styled.div`
@media (min-width: 821px) and (max-width: 10000000px){
    display:none;
 }
`
const Text = styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
color: black;
`

const Main = styled.div`
background:#FFFFFF;
padding-top:35px;
padding-bottom:30px;
width:1312px;
@media (min-width: 260px) and (max-width: 820px){
width:100%;
padding-left:20px;
padding-right:20px;
}
@media (min-width: 1200px) and (max-width: 1360px){
    width:1170px;
}
@media (min-width: 820px) and (max-width: 1199px){
    padding-left:50px;
}
.error{
    border:3px solid red;
    }
.text1{
font-family:Roobert-medium;
font-weight: 500;
font-size: 32px;
color: #190F0F;
@media (min-width: 260px) and (max-width: 820px){
font-size: 21px;
}
}
.text2{
    font-family:Roobert-medium;
    font-size: 18px;
    color: #787373;
    margin-top:-6px;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 14px;
    }
}


`
const Place = styled(Autocomplete)`
height:32px;
width:300px;
border-radius:10px;
border-width:0px;
margin-left:-12px;
margin-top:-8px;
font-size:16px;
font-weight:500;
&::placeholder {
  font:Roobert-medium;
  font-size:16px;
  color:gray;
}
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:0px solid #190F0F;
background: transparent;
}
`
const Actions = styled(Button)`
width:208px;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 820px){
    display:none;
 }
`
const MobileActions = styled(Button)`
width:97%;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
`
const Time = styled(Form.Select)`
color:gray;
border-radius:10px;
font-family:roobert-medium;
width:100%;
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

const CalendarStyle = styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
margin-top:-15px;
width:300px;
position:absolute;

`

const DetailsDrop = styled.div`
width:190px;
margin-right:15px;
height:50px;
background:white;
background-color:white;
.subdivtime{
padding-left:12px;
padding-top:8px;
color:#787373;
font-family:Inter;
font-size:12px;
border:1px solid lightgray;
border-radius:8px;
}
`
const Details = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
color:#787373;
font-family:Inter;
font-size:12px;
height:54px;
padding-bottom:5px;
focused{
color:Black;
margin-bottom:5px;
margin-top:10px;
font-size:16px;
}
.focusing{
color:#787373;
margin-top:3px;
padding-left:-12px;
font-family:Inter;
}

.subdiv{
padding-left:12px;
padding-top:6px;
}

`
const DetailsOptions = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
color:#787373;
font-family:Inter;
font-size:12px;
padding-bottom:5px;
z-index:10000;
position:absolute;
background:#fff;
width:200px;
margin-top:-15px;
.subdiv{
padding-left:12px;
padding-top:6px;
}
padding-left:12px;
padding-top:15px;
.maintext{
    &:hover {
        color: #D81159;
    }
}
`
const Innerdiv = styled.div`
padding-left:12px;
padding-right:15px;
padding-top:6px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;
`

const Img = styled.img`
height:7px;
width:11px;
margin-top:18px;
margin-left:15px;
cursor:pointer;
`