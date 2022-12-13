import React, { useEffect, useState } from 'react'
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
import { pressurewashing } from '../../../../store/Actions/User.action';


function PressureForm(props) {
    const dispatch = useDispatch();
    let location = useLocation();
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time
    const [datecalendar, setDatecalendar] = useState(false);
    const [isloading, setIsloading] = useState(false)
    const [active,setActive]=useState(false);
    const [focusedname, setFocusedname] = useState('')

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
    const [loader, setLoader] = useState(false)
    const [values,setValues]=useState({
        areasToBeCleaned:arr||["Driveway"],
        approxSizeInSqFt:approxSizeInSqFt2||'less than 1,000 ',
        "address":address||address2||"",
        "date":date2||date || moment(new Date()).format('DD MMM YYYY'),
        "time":time2||time || "10:00AM",
      })

      const [Bool,setBool]=useState({
        "areas":false,
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
  if(areasToBeCleaned2){
    dispatch(pressurewashing(values,1,50));
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
        setLoader(true)
        setIsloading(true)
        let res
        window.analytics.track("Search results Customer form",{values,color:'#000',form_side:'right'});
        res = await dispatch(pressurewashing(values,1,limit));
        setLoader(false)
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


    const handlefocusing=(name)=>{
        setFocusedname(name)
    }

  const SizeOptions=['less than 1,000 ','1,000 to 1,500 ','1,500 to 2000 ','2,000 to 2,500 ','2,500 to 3000 ','3,000 to 3,500 ','Greater than 3,500 ']
    return (
        <React.Fragment>
            <Main >
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
                <WebView>

                <Placing >
                    <Details onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                    <Innerdiv className='d-flex justify-content-between'>
                                <div>
                                 Date
                        <p style={{ fontFamily: 'Roobert-medium', fontSize: '14px', fontWeight: '500', color: 'black' }}>
                        {values?.date?values?.date:'Select date'}
                        </p>
                                </div>
                                <div>
                                    <Img src={datecalendar === true ? uparrow : downarrow} />
                                </div>
                            </Innerdiv>
                    </Details>
                    <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start '} >
                        <div className='subdivtime'>
                            Preferred time
                            <Time aria-label="Floating label select example" onChange={handlechange('time')} >
                                <option>{values?.time ? values?.time : 'Select time'}</option>
                                {TimeList.map((item, index) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}

                            </Time>
                        </div>
                    </DetailsDrop>
                    </Placing>
                    <Placing>
                    <Form.Group className="mb-1">
                    <Details onClick={()=>handlebool('areas')} className={errors?.areas ?' error':''}>
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
                        {Bool.areas===true?
      <DetailsOptions className='d-flex justify-content-between mt-1 p-3'>
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
            className='formcheck'
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
            className='formcheck'
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
            className='formcheck'
            id="House Wash"
          />
    </Form>
                     </DetailsOptions>
                     : ''}
                    </Form.Group>
                    <Form.Group className="mb-1">
                    <Details onClick={()=>handlebool('size')} className={ errors?.size ?' error':''}>
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
                        {Bool.size===true?
    <DetailsOptions className='mt-1'>
    {SizeOptions?.map((item,index)=>{
    return <Text className='maintext' id={item} key={index} onClick={handlechange('approxSizeInSqFt')}>{item} </Text>
    })}
    </DetailsOptions>
    :''}
                    </Form.Group>
                    </Placing>
                </WebView>
                <Actions
                      style={{backgroundColor:isloading?'#DDDDDD':'#000'}}
                     variant='dark' onClick={()=>handleSubmit()} >
              {     isloading?<div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
        <img style={{width: '8%', alignSelf: 'center',objectFit:'cover'}} src={Fadingcircles} alt='loading.....' /></div>
      :
        "Get free estimates"
         }
        </Actions>
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
export default PressureForm

const Text = styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
color: black;
`
const WebView=styled.div`
display:inline;
@media (min-width: 260px) and (max-width: 969px){
    display:none;
  }
`
const Placing=styled.div`
display:flex;
@media (min-width: 260px) and (max-width: 969px){
    display:inline;
  }
`
const Main = styled.div`
padding-top:35px;
padding-bottom:30px;
width:100%
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
width: 556px;
height: 34px;
border-radius:10px;
border-width:0px;
margin-left:-12px;
font-size:16px;
font-family:roobert-medium;
font-weight:500;
@media (min-width: 260px) and (max-width: 969px){
    width:330px;
  }
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
width: 556px;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 969px){
   width:340px;
 }
`
const Time = styled(Form.Select)`
width: 265px;
color:gray;
border-radius:10px;
font-family:roobert-medium;
color:black;
border:none;
font-size:14px;
margin-top:-15px;
margin-left:-10px;
padding-top:10px;
height: 48px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:none;
background: #fff;
}
`

const CalendarStyle = styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
margin-top:-125px;
width:300px;
position:absolute;

`

const DetailsDrop = styled.div`
margin-right:15px;
background:white;
width: 270px;
background-color:white;
@media (min-width: 260px) and (max-width: 969px){
    width:340px;
    margin-bottom:10px;
  }
.subdivtime{
padding-left:12px;
padding-top:6px;
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
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
padding-bottom:5px;
@media (min-width: 260px) and (max-width: 969px){
    width:340px;
  }
.focused{
color:Black;
margin-bottom:5px;
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
input[type='checkbox']:checked{
         background-color: #D81159;
         border: 2px solid #D81159;
         box-shadow: 0 0 1px 1px #D81159;
       }
       .formcheck{
     font-size:14px;
     font-family: Roobert-medium;
     color: black;
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
width: 270px;
`
const Img = styled.img`
height:7px;
width:11px;
margin-top:18px;
margin-left:15px;
cursor:pointer;
`