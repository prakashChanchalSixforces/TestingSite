import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import Geocode from "react-geocode";
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
import { moving } from '../../../../store/Actions/User.action';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function MovingForm(props) {
    const dispatch = useDispatch();
    let location = useLocation();
    const address = location?.state?.address
    const date = location?.state?.date
    const time = location?.state?.time
    const [datecalendar, setDatecalendar] = useState(false);
    const [isloading, setIsloading] = useState(false)
    const [focusedname, setFocusedname] = useState('')
    const [loader, setLoader] = useState(false)
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
        if (numberOfRooms) {
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
        console.log(place)
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
        }
    }, [to, from])
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
    const handleSubmit = async () => {
         gtag_report_conversion()
        if(isValid()){
            setLoader(true)
            dispatch({ type: 'moving_data', payload: values })
            setIsloading(true)
            let res
            window.analytics.track("Search results Customer form", { values, color: '#000', form_side: 'right' });
            res = await dispatch(moving(values, 1, limit));
            setLoader(false)
            setIsloading(false)
            props?.handleSubmit()
            if (window.innerWidth < 800) {
                props?.onHide()
            }
            else if (res.status === false) {
            }
            else if (res.status === true && res.message !== 'Success') {
            }
           
            localStorage.setItem('values', JSON.stringify(res?.finalData))
            localStorage.setItem('data', JSON.stringify(res?.data))
        }
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
      <Details className={errors?.to?' error justify-content-start mt-1':'justify-content-start mt-1'} onClick={()=>handlefocusing('to')}>
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
          <Webview>
                            <Placing >
                    <Details onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                    <Innerdiv className='d-flex justify-content-between'>
                                <div>
                                Moving date
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
                   
                    </Placing>
                    <Details style={{width:'270px'}} className='d-flex justify-content-between' onClick={()=>handlebool('rooms')} className={errors?.rooms ? ' error' : ''}>
                    <Innerdiv className='d-flex justify-content-between' onClick={()=>handlebool('rooms')}>
                    <div>
            Number of bedrooms
            <Text>{values?.numberOfRooms}</Text>
              </div>
              <div>
                <Img src={Bool.rooms===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
              </Details>
              {Bool.rooms===true?
              <>
              <div className='d-flex justify-content-between p-3'>
                <p>Number of rooms</p>
                <input id="rangeV" value={values?.numberOfRooms} type='number' maxLength='1'
                onChange={handlechange('numberOfRooms')}
                style={{border:'1px solid grey',borderRadius:'6px',width: '56px',height: '32px',textAlign:'center',paddingTop:'3px',paddingBottom:'5px'}}
                 />
              </div>
  <div className='d-flex p-3'>0<input id="range" type="range" min="0" max="4" step="1" value ={parseInt(values?.numberOfRooms)} />4</div>
  </>
  :''}
                   

                    </Webview>
                    {/* <div style={{display:'inline'}}>
                    <label>
        <input type="radio" value="option3" />
        Option 3
      </label>
      <label>
        <input type="radio" value="option3" />
        Option 3
      </label>
      <label>
        <input type="radio" value="option3" />
        Option 3
      </label>
      <label>
        <input type="radio" value="option3" />
        Option 3
      </label>
      </div> */}
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
    <CalendarStyle style={{zIndex:10000}} className='p-3 d-flex justify-content-center'>
  <Calendar className='react-calendar' onChange={handlechange('date')}
  minDate={new window.Date()}
   />
  </CalendarStyle> :''}
            </Card1Moving>
        </React.Fragment>
    )

}
export default MovingForm

const Text = styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
color: black;
`
const Webview=styled.div`
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
const Card1Moving = styled.div`
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