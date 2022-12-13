import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import { useLocation } from 'react-router-dom';
import uparrow from '../../../../assets/open.png';
import downarrow from '../../../../assets/close.png';
import '../../UserHomepage/components/styles.css'
import Calendar from 'react-calendar';
import moment from 'moment';
import '../../UserHomepage/Calendar.css'
import Fadingcircles from '../../../../assets/faded.gif';
import { moving } from '../../../../store/Actions/User.action';

function MovingSearch(props) {
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
    const approxSizeInSqFt = new URLSearchParams(search).get('approxSizeInSqFt');
    const fromAddress = new URLSearchParams(search).get('fromAddress');
    const date2 = new URLSearchParams(search).get('date');
    const time2 = new URLSearchParams(search).get('time');
    const elevatorAvailable = new URLSearchParams(search).get('elevatorAvailable');
    const typeofHouse = new URLSearchParams(search).get('typeofHouse');
    const toAddress = new URLSearchParams(search).get('toAddress');
    const numberOfRooms = new URLSearchParams(search).get('numberOfRooms');

    const [from, setFrom] = useState(fromAddress || location?.state?.address);
    const [to, setTo] = useState(toAddress);

    const [values, setValues] = useState({
        "typeofHouse":typeofHouse||"Condo",
        "approxSizeInSqFt":approxSizeInSqFt||"500 to 1,200 ",
        "numberOfRooms":numberOfRooms||"2",
        "elevatorAvailable":elevatorAvailable||"Shared elevator",
         "fromAddress":fromAddress||address||"",
         "date":date2||date || moment(new Date()).format('DD MMM YYYY'),
         "time":time2||time || "10:00AM",
          "toAddress":toAddress||""
    })
    const [Bool, setBool] = useState({
        "condo": false,
        "size": false,
        "rooms": false,
        "elevator": false,
    })
    const [errors, setErrors] = useState(
        {
            "condo": false,
            "size": false,
            "rooms": false,
            "elevator": false,
            "from": false,
            "to": false,
            "date": false,
            "time": false
        })
    const profileData = useSelector((state) => state.profileReducer)
    useEffect(() => {
        if (profileData?.movingData.length > 0) {
            setValues(profileData?.movingData)
        }
        if (props.type === 'profile' && numberOfRooms) {
            dispatch(moving(values, 1, 50));
        }
    }, [profileData, numberOfRooms])
    const handlebool = (type) => {
        if (type === 'condo') {
            setBool({ ...Bool, condo: !Bool.condo, size: false, rooms: false, elevator: false })
        }
        else if (type === 'size') {
            setBool({ ...Bool, size: !Bool.size, condo: false, rooms: false, elevator: false })
        }
        else if (type === 'rooms') {
            setBool({ ...Bool, rooms: !Bool.rooms, size: false, condo: false, elevator: false })
        }
        else if (type === 'elevator') {
            setBool({ ...Bool, elevator: !Bool.elevator, size: false, rooms: false, condo: false })
        }

    }

    const handlechange = (name, place) => (event, e) => {
        let value =
            name === 'numberOfRooms' ? parseInt(event.target.value) || 'Enter number of rooms' :
                name === 'date' ? moment(event).format('DD MMM YYYY') :
                    name === 'typeofHouse' || name === 'approxSizeInSqFt' || name === 'howHeavyBelongings' || name === 'elevatorAvailable' ? event.target.id
                        : event.target.value
        console.log(event, 'np')
        if (name === 'date') {
            setDatecalendar(false)
        }
        setValues({ ...values, [name]: value })
        //dispatch({ type: 'NEWVALUES', payload: { ...det?.newValues, [name]: value } })
        if (name === 'typeofHouse') {
            setBool({ ...Bool, condo: !Bool.condo })
        }
        else if (name === 'approxSizeInSqFt') {
            setBool({ ...Bool, size: !Bool.size })
        }
        else if (name === 'elevatorAvailable') {
            setBool({ ...Bool, elevator: !Bool.elevator })
        }

    }

    const isValid = () => {

        if (!(values.fromAddress && values.fromAddress.length > 0)) {
            setErrors({ ...errors, from: true })
            setTimeout(() => {
                setErrors({ ...errors, from: false })
            }, 3000);
            return false
        }
        else if (!(values.toAddress && values.toAddress.length > 0)) {
            setErrors({ ...errors, to: true })
            setTimeout(() => {
                setErrors({ ...errors, to: false })
            }, 3000);
            return false
        }
        else if (!(values.typeofHouse && values.typeofHouse.length > 0)) {
            setErrors({ ...errors, condo: true })
            setTimeout(() => {
                setErrors({ ...errors, condo: false })
            }, 3000);
            return false
        }
        else if (!(values.approxSizeInSqFt && values.approxSizeInSqFt.length > 0)) {
            setErrors({ ...errors, size: true })
            setTimeout(() => {
                setErrors({ ...errors, size: false })
            }, 3000);
            return false
        }
        else if (!(values.numberOfRooms || values.numberOfRooms === isNaN)) {
            setErrors({ ...errors, rooms: true })
            setTimeout(() => {
                setErrors({ ...errors, rooms: false })
            }, 3000);
            return false
        }
        else if (!(values.elevatorAvailable && values.elevatorAvailable.length > 0)) {
            setErrors({ ...errors, elevator: true })
            setTimeout(() => {
                setErrors({ ...errors, elevator: false })
            }, 3000);
            return false
        }
        else if (!(values.date && values.date.length > 0)) {
            setErrors({ ...errors, date: true })
            setTimeout(() => {
                setErrors({ ...errors, date: false })
            }, 3000);
            return false
        }
        else if (!(values.time && values.time.length > 0)) {
            setErrors({ ...errors, time: true })
            setTimeout(() => {
                setErrors({ ...errors, time: false })
            }, 3000);
            return false
        }
        else
            return true
    }

    const onfromPlaceSelected = (place) => {
        const address = place.formatted_address
        setFrom(address)
    }
    const ontoPlaceSelected = (place) => {
        const add = place.formatted_address
        setTo(add)
    }
    useEffect(() => {
        if (to || from) {
            setValues({ ...values, 'toAddress': to, 'fromAddress': from })
            //dispatch({ type: 'NEWVALUES', payload: { ...det?.newValues, 'toAddress': to, 'fromAddress': from } })
        }
    }, [to, from])
    const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
    let limit = mql===true? 9 :8
    console.log(values, 'values')
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
    const handleSubmit = async () => {
         gtag_report_conversion()
        if(isValid()){
            props?.setLoader(true)
            dispatch({ type: 'moving_data', payload: values })
            setIsloading(true)
            let res
            window.analytics.track("Search results Customer form", { values, color: '#000', form_side: 'right' });
            res = await dispatch(moving(values, 1, limit));
            props?.setLoader(false)
            setIsloading(false)
            setActive(true);
            if (window.innerWidth < 800) {
                props?.onHide()
            }
            else if (res.status === false) {
                //toast.error(res.message,{position: "top-right"});
            }
            else if (res.status === true && res.message !== 'Success') {
                //toast.info(res.message,{position: "top-right"});
            }
            localStorage.setItem('values', JSON.stringify(res?.finalData))
            localStorage.setItem('data', JSON.stringify(res?.data))
        }
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
    const handledate = () => {
        if (datecalendar === false) {
            setDatecalendar(true)
        }
        else
            setDatecalendar(false)

    }
    const handlefocusing=(name)=>{
        setFocusedname(name)
    }

    const houseoptions=['Condo','House','Townhouse']
    const SizeOptions=['Less than 500','500 to 1,200 ','1,200 to 2,000 ','2,000 to 3,000 ','3,000 to 4,000 ','4,000 to 5,000 ']

    return (
        <React.Fragment>
            <Card1Moving >
                <div >
                    <p className='text1'>Never overpay when you book high-quality movers on SwiftBel.</p>
                    <p className='text2'>Transparent pricing, fully-insured, and stress-free. Save an average of $145.</p>

                </div>
                <Tiles>
                    <Details className={errors?.from?' error justify-content-start':'justify-content-start'} onClick={()=>handlefocusing('from')}>
                        <div className='subdiv'>
                           {focusedname==='from' || values?.fromAddress?.length>0 ? ' Starting address':''}
                            <Place
                                apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                types={['address', '(cities)', '(regions)']}
                                options={{
                                    types: ["geocode", "establishment"],
                                    componentRestrictions: {
                                        country: 'ca'
                                    }
                                }}
                                placeholder='Where are you moving from ?'
                                onPlaceSelected={onfromPlaceSelected}
                                className={focusedname==='from' || values?.fromAddress?.length>0 ?"form-control form-control-default focused":"form-control form-control-default focusing"}
                                defaultValue={values?.fromAddress}
                            />
                        </div>
                    </Details>
                    <Form.Group >
      <Details className={errors?.to?' error justify-content-start':'justify-content-start'} onClick={()=>handlefocusing('to')}>
      <div className='subdiv'>
      {focusedname==='to' || values?.toAddress?.length>0? 'Destination address':''}
        <Place
            apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
            types={['address', '(cities)', '(regions)']}
            options={{types: ["geocode", "establishment"],
            componentRestrictions:{
              country: 'ca'
            }
          }}
          placeholder='Where are you moving to ? '
          onPlaceSelected={ontoPlaceSelected}
          className={focusedname==='to' || values?.toAddress?.length>0 ?"form-control form-control-default focused":"form-control form-control-default focusing"}
          defaultValue={values?.toAddress}
          />
          </div>
          </Details>
          </Form.Group>
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
                                Moving date
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
                        <Details onClick={() => handlebool('condo')} className={errors?.condo ? ' error' : ''}>
                            <Innerdiv className='d-flex justify-content-between'>
                                <div >
                                    Type of home you're moving from
                                    <Text>{values.typeofHouse}</Text>
                                </div>
                                <div>
                                    <Img src={Bool.condo === true ? uparrow : downarrow} />
                                </div>
                            </Innerdiv>
                        </Details>
                        {Bool.condo === true ?
                     <DetailsOptions className='mt-1'>
                        {houseoptions?.map((item,index)=>{
                                    return <Text id={item} key={index} onClick={handlechange('typeofHouse')} className='maintext'>{item} </Text>
                                })}
                     </DetailsOptions>
                     : ''}
                    </Form.Group>
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
              <DetailsOptions className='mt-3'>
              <div className='d-flex justify-content-between '>
                <p>Number of rooms</p>
                <input id="rangeV" value={values?.numberOfRooms} type='number' maxLength='1'
                onChange={handlechange('numberOfRooms')}
                style={{border:'1px solid grey',borderRadius:'6px',width: '56px',height: '32px',textAlign:'center',paddingTop:'3px',paddingBottom:'5px',marginRight:'10px'}}
                 />
              </div>
  <div className='d-flex p-3'>0<input id="range" type="range" min="0" max="4" step="1" value ={parseInt(values?.numberOfRooms)} onChange={()=>handlerange()}/>4</div>
  </DetailsOptions>
  :''}
      </Details>
    </Form.Group>

                    <Form.Group className="mb-1">
                        <Details onClick={() => handlebool('size')} className={errors?.size ? ' error' : ''}>
                            <Innerdiv className='d-flex justify-content-between'>
                                <div>
                                    Home size you're moving from (Sq.Ft.)
                                    <Text>{values.approxSizeInSqFt}</Text>
                                </div>
                                <div>
                                    <Img src={Bool.size === true ? uparrow : downarrow}  />
                                </div>
                            </Innerdiv>
                        </Details>
                        {Bool.size === true ?
                        <DetailsOptions className='mt-1'>
                                {SizeOptions?.map((item,index)=>{
                                    return <Text className='maintext' id={item} key={index} onClick={handlechange('approxSizeInSqFt')}>{item} </Text>
                                })}
                        </DetailsOptions>
                        : ''}
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
            </Card1Moving>
        </React.Fragment>
    )

}
export default MovingSearch
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

const Card1Moving = styled.div`
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
font-family:roobert-medium;
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