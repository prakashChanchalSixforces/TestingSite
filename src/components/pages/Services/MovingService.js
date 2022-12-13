import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import Hrimg from '../../../assets/hr.svg'
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import { useLocation } from 'react-router-dom';
import uparrow from '../../../assets/open.png';
import downarrow from '../../../assets/close.png';
import '../UserHomepage/components/styles.css'
import PhoneInput from 'react-phone-number-input';
import Calendar from 'react-calendar';
import { TimeList } from '../CompanyProfile/component/TimeList';
import moment from 'moment';
import '../UserHomepage/Calendar.css'
import Fadingcircles from '../../../assets/faded.gif';
import { moving } from '../../../store/Actions/User.action';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function MovingService(props) {
  const dispatch = useDispatch();
  let location = useLocation();
  const address = location?.state?.address
  const date = location?.state?.date
  const time = location?.state?.time
  const [datecalendar, setDatecalendar] = useState(false);
  const [isModalloading, setIsModalloading] = useState(false)
  const [chargedyet, setChargedyet] = useState(false)
  const [isloading, setIsloading] = useState(false)
  const [conti, setConti] = useState(false);
  const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
  let limit = mql === true ? 9 : 8
  const search = location.search;
  const approxSizeInSqFt = new URLSearchParams(search).get('approxSizeInSqFt');
  const fromAddress = new URLSearchParams(search).get('fromAddress');
  const date2 = new URLSearchParams(search).get('date');
  const time2 = new URLSearchParams(search).get('time');
  const elevatorAvailable = new URLSearchParams(search).get('elevatorAvailable');
  const typeofHouse = new URLSearchParams(search).get('typeofHouse');
  const toAddress = new URLSearchParams(search).get('toAddress');
  const numberOfRooms = new URLSearchParams(search).get('numberOfRooms');
  const [count, setCount] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [from, setFrom] = useState(fromAddress || location?.state?.address);
  const [to, setTo] = useState(toAddress);
  const [index, setIndex] = useState(0);
  const MoveArray = [
      'Movers with a truck', 'Movers only', 'Long distance'
  ]

  const trucktypes = [
    { title: '1  Mover with a truck ', value: 95,label:'oneMoverWithTruck' },
    { title: '2 Movers with 3 ton truck ', value: 129,label:'twoMoverthreeTonTruck'  },
    { title: '3 Movers with 5 ton truck ', value: 169, recommended: true ,label:'threeMoverFiveTonTruck' },
    { title: '4 Movers with 5 ton truck ', value: 210,label:'fourMoverFiveTonTruck'  }
]

  const [values, setValues] = useState({
    "typeofHouse": typeofHouse || "Condo",
    "approxSizeInSqFt": approxSizeInSqFt || "500 to 1,200 ",
    "numberOfRooms": numberOfRooms || "2",
    "elevatorAvailable": elevatorAvailable || "Shared elevator",
    "fromAddress": fromAddress || address || "",
    "date": date2 || date || moment(new Date()).format('DD MMM YYYY'),
    "time": time2 || time || "10:00AM",
    "toAddress": toAddress || "",
    "movers": '129'
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
    //    if(!(errors?.condo||errors?.size||errors?.rooms||errors?.elevator)){
    //     props?.setContbutton(true)
    //     console.log('yesworking')
    //    }
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
  function increment() {
    //setCount(prevCount => prevCount+=1);
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
  }

  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 0);
      }
    });
  }

  const handlechange = (name, place) => (event, e) => {
    let value =
      name === 'numberOfRooms' ? parseInt(event.target.value) || 'Enter number of rooms' :
        name === 'date' ? moment(event).format('DD MMM YYYY') :
          name === 'typeofHouse' || name === 'approxSizeInSqFt' || name === 'howHeavyBelongings' || name === 'elevatorAvailable' ? event.target.id
            : event.target.value
    setConti(true)
    if (name === 'date') {
      setDatecalendar(false)
    }
    setValues({ ...values, [name]: value })
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
    setConti(true)
  }
  const ontoPlaceSelected = (place) => {
    const add = place.formatted_address
    setTo(add)
    setConti(true)
  }
  useEffect(() => {
    if (to || from) {
      setValues({ ...values, 'toAddress': to, 'fromAddress': from })
    }
  }, [to, from])



  const handleSubmit = async () => {
    const moverOnlyData = {
      "fromAddress": values.fromAddress,
      "numberOfMovers": count,
      "date": values.date,
      "time": values.time
  }
    if (isValid()) {
      dispatch({ type: 'moving_data', payload: values })
      setIsloading(true)
      setIsModalloading(true)
      setChargedyet(true)
      setConti(false)
      let res
      window.analytics.track("Search results Customer form", { values, color: '#000', form_side: 'right' });
      if (index === 1) {
        res = await dispatch(moving(moverOnlyData, 1, limit));
        props?.handleSubmit()
    }
    else if (index  === 2) {
        res = await dispatch(moving({ ...values, "phone": phone, "name": name }, 1, limit));
      //  props?.requestCallback();
    }
    else {
        res = await dispatch(moving(values, 1, limit));
        props?.handleSubmit()
    }
      setIsloading(false)
      setIsModalloading(false)
      props.Servicemodal(false)
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


  const handledate = () => {
    if (datecalendar === false) {
      setDatecalendar(true)
    }
    else
      setDatecalendar(false)

  }

  const handlerange = () => {
    const
      range = document.getElementById('range'),
      rangeV = document.getElementById('rangeV'),
      setValue = () => {
        const
          newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
          newPosition = 10 - (newValue * 0.2);
        rangeV.innerHTML = `<span>${range.value}</span>`;
        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
      };
    document.addEventListener("DOMContentLoaded", setValue);
    range.addEventListener('input', setValue);
    setValues({ ...values, numberOfRooms: parseInt(range.value) })
  }

  const ElevatorOptions = ['Shared elevator', 'Dedicated elevator', 'Stairs', 'Ground floor']
  const houseoptions = ['Condo', 'House', 'Townhouse']
  const SizeOptions = ['Less than 500', '500 to 1,200 ', '1,200 to 2,000 ', '2,000 to 3,000 ', '3,000 to 4,000 ', '4,000 to 5,000 ']

  const renderItem = () => {
    console.log(props?.setIndex,"index")
    return (
      <>
        <script src="https://www.googleoptimize.com/optimize.js?id=OPT-KK9WKZM"></script>
        {props?.active === 'GI' ?
          <GeneralInfo>
            <Form.Group className="mb-3">
              <Details onClick={() => handlebool('condo')} className={errors?.condo ? ' error' : ''}>
                <Innerdiv className='d-flex justify-content-between'>
                  <div>
                    Type of home you're moving from
                    <Text>{values.typeofHouse}</Text>
                  </div>
                  <div>
                    <Img src={Bool.condo === true ? uparrow : downarrow} />
                  </div>
                </Innerdiv>
              </Details>
            </Form.Group>
            {Bool.condo === true ?
              <Details className='mb-3'>
                <Options>
                  {houseoptions?.map((item, index) => {
                    return <Text id={item} key={index} onClick={handlechange('typeofHouse')} className='maintext'>{item} </Text>
                  })}
                </Options>
              </Details>
              : ''}

            <Form.Group className="mb-3">
              <Details onClick={() => handlebool('size')} className={errors?.size ? ' error' : ''}>
                <Innerdiv className='d-flex justify-content-between'>
                  <div>
                    Home size you're moving from (Sq.Ft.)
                    <Text>{values.approxSizeInSqFt}</Text>
                  </div>
                  <div>
                    <Img src={Bool.size === true ? uparrow : downarrow} />
                  </div>
                </Innerdiv>
              </Details>
            </Form.Group>
            {Bool.size === true ?
              <Details className='mb-3'>
                <Options>
                  {SizeOptions?.map((item, index) => {
                    return <Text className='maintext' id={item} key={index} onClick={handlechange('approxSizeInSqFt')}>{item} </Text>
                  })}
                </Options>
              </Details>
              : ''}

            <Form.Group className="mb-3">
              <Details className={errors?.rooms ? ' error' : ''}>
                <Innerdiv className='d-flex justify-content-between' onClick={() => handlebool('rooms')}>
                  <div>
                    Number of bedrooms
                    <Text>{values?.numberOfRooms}</Text>
                  </div>
                  <div>
                    <Img src={Bool.rooms === true ? uparrow : downarrow} />
                  </div>
                </Innerdiv>
                {Bool.rooms === true ?
                  <>
                    <div className='d-flex justify-content-between p-3'>
                      <p>Number of rooms</p>
                      <input id="rangeV" value={values?.numberOfRooms} type='number' maxLength='1'
                        onChange={handlechange('numberOfRooms')}
                        style={{ border: '1px solid grey', borderRadius: '6px', width: '56px', height: '32px', textAlign: 'center', paddingTop: '3px', paddingBottom: '5px' }}
                      />
                    </div>
                    <div className='d-flex p-3'>0<input id="range" type="range" min="0" max="4" step="1" value={parseInt(values?.numberOfRooms)} onChange={() => handlerange()} />4</div>
                  </>
                  : ''}
              </Details>
            </Form.Group>

            <Form.Group className="mb-3">
              <Details onClick={() => handlebool('elevator')} className={errors?.elevator ? ' error' : ''}>
                <Innerdiv className='d-flex justify-content-between'>
                  <div>
                    Dedicated elevator ?
                    <Text>{values.elevatorAvailable}</Text>
                  </div>
                  <div>
                    <Img src={Bool.elevator === true ? uparrow : downarrow} />
                  </div>
                </Innerdiv>
              </Details>
            </Form.Group>
            {Bool.elevator === true ?
              <Details className='mb-3'>
                <Options>
                  {ElevatorOptions?.map((item, index) => {
                    return <Text id={item} key={index} onClick={handlechange('elevatorAvailable')} className='maintext'>{item} </Text>
                  })}
                </Options>
              </Details>
              : ''}
          </GeneralInfo>
          :
          <DTDinfo>
            <Details className={errors?.from ? ' error justify-content-start' : 'justify-content-start'}>
              <div style={{ paddingLeft: '12px', paddingTop: '10px', color: 'black', fontSize: '14px', fontWeight: '500', fontFamily: 'Roobert-medium' }}>
                Starting address <span style={{ color: '#D81159' }}> * </span>
                <Place
                  apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                  types={['address', '(cities)', '(regions)']}
                  options={{
                    types: ["geocode", "establishment"],
                    componentRestrictions: {
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
              <Details className={errors?.to ? ' error justify-content-start' : 'justify-content-start'}>
                <div style={{ paddingLeft: '12px', paddingTop: '10px', color: 'black', fontSize: '14px', fontWeight: '500', fontFamily: 'Roobert-medium' }}>
                  Destination address <span style={{ color: '#D81159' }}> * </span>
                  <Place
                    apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                    types={['address', '(cities)', '(regions)']}
                    options={{
                      types: ["geocode", "establishment"],
                      componentRestrictions: {
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
            <img src={Hrimg} alt='hr' className='mb-3 mt-3' style={{ width: '100%' }} />
            <div className='d-flex mb-3' style={{ borderRadius: '13px', border: '1px solid #F3F3F3' }}>
              <Dates onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                Moving date <span style={{ color: '#D81159' }}> * </span>
                <p style={{ fontFamily: 'Roobert-medium', fontSize: '14px', fontWeight: '500', color: 'black' }}>
                  {values?.date ? values?.date : 'Select date'}
                </p>
              </Dates>
              <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start'} >
                <div style={{ paddingLeft: '12px', paddingTop: '5px', color: 'black', fontSize: '12px', fontFamily: 'Inter' }}>
                  Preferred time <span style={{ color: '#D81159' }}> * </span>
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
            </div>
            {datecalendar === true ?
              <CalendarStyle className='p-3 d-flex justify-content-center mb-3'>
                <Calendar className='react-calendar' onChange={handlechange('date')}
                  minDate={new window.Date()}
                />
              </CalendarStyle>
              : ''}
            {index!== 2 ?<div>
              <p style={{ fontSize: '18px', fontWeight: '500' }}>Select truck size and number of movers:</p>

              <Radios key='radio' className="mb-4">
                {trucktypes?.map((item) => {
                  return (
                    <div style={{ paddingRight: '15px',fontSize:'12px' }} className='d-flex justify-content-between'>

                      <Form.Check
                      style={{fontSize:'12px'}}
                        className='rads'
                        reverse
                        label={`${item.title} ${item?.recommended === true ? ' (Recommended) ' : ''}`}
                        type='radio'
                        checked={item.value === values.movers ? true : false}
                        onClick={() => setValues({ ...values, ["movers"]: item.value ,["typeOfMove"]: item.label})}
                      />
                      {`$ ${item.value} per hour`}

                    </div>
                  )
                })}
              </Radios>
              <br />
            </div>:null}
            {index === 2 ? <Details>
                        <Innerdiv className='d-flex justify-content-between'>
                            <div>
                                Name
                                <Input
                                    type="text"
                                    placeholder='Name'
                                    className='input'
                                    defaultValue={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </Innerdiv>
                    </Details> : null}
                    <br/>
                    {index=== 2 ? <div className='phone-input-owner'>
                    <PhoneNumber
                        name='phoneinput'
                        international
                        placeholder="Enter phone number"
                        focusInputOnCountrySelection='true'
                        defaultCountry="CA"
                        limitMaxLength='true'
                        onChange={(value) => {
                            setPhone(value)
                        }}
                    // value={`+${phone}`}
                    />
                    <br />

                </div> : null}
                <br/>
            <div className='d-flex justify-content-center'>
              <Actions variant="outline-dark" onClick={() => {
                props?.setValue(props?.setIndex)
                props?.setActiveinfo('GI')}}>Back</Actions>
              &nbsp;&nbsp;&nbsp;
              <Actions
                style={{ backgroundColor: isloading ? '#DDDDDD' : '#000' }}
                variant='dark' onClick={() => handleSubmit()} >
                {isloading ? <div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                  <img style={{ width: '13%', alignSelf: 'center', objectFit: 'cover' }} src={Fadingcircles} alt='loading.....' /></div>
                  :
                  "Check"}
              </Actions>
            </div>
          </DTDinfo>
        }
      </>
    )
  }
  const renderMoverOnly = () => {
    return (
      <DTDinfo>
        <Details className={errors?.from ? ' error justify-content-start' : 'justify-content-start'}>
          <div style={{ paddingLeft: '12px', paddingTop: '10px', color: 'black', fontSize: '14px', fontWeight: '500', fontFamily: 'Roobert-medium' }}>
            Starting address <span style={{ color: '#D81159' }}> * </span>
            <Place
              apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
              types={['address', '(cities)', '(regions)']}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: {
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

        <img src={Hrimg} alt='hr' className='mb-3 mt-3' style={{ width: '100%' }} />
        <div className='d-flex mb-3' style={{ borderRadius: '13px', border: '1px solid #F3F3F3' }}>
          <Dates onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
            Moving date <span style={{ color: '#D81159' }}> * </span>
            <p style={{ fontFamily: 'Roobert-medium', fontSize: '14px', fontWeight: '500', color: 'black' }}>
              {values?.date ? values?.date : 'Select date'}
            </p>
          </Dates>
          <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start'} >
            <div style={{ paddingLeft: '12px', paddingTop: '5px', color: 'black', fontSize: '12px', fontFamily: 'Inter' }}>
              Preferred time <span style={{ color: '#D81159' }}> * </span>
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
        </div>
        {datecalendar === true ?
          <CalendarStyle className='p-3 d-flex justify-content-center mb-3'>
            <Calendar className='react-calendar' onChange={handlechange('date')}
              minDate={new window.Date()}
            />
          </CalendarStyle>
          : ''}
        <Details className='d-flex justify-content-between' className={errors?.rooms ? ' error' : ''}>
        <Innerdiv className='d-flex justify-content-between'>
            <div>
              Number of movers required
            </div>
            <div>
              <div style={{ justifyContent: 'center' }} className='d-flex'>
                <IncButton variant={"light"} size='md' onClick={increment}>+</IncButton>
                <p style={{ alignSelf: 'center' }}>{count}</p>

                <IncButton variant={"light"} size='md' onClick={decrement}>-</IncButton>
              </div>
            </div>
          </Innerdiv>
        </Details>
        <br/>
        <div className='d-flex justify-content-center'>
          <Actions variant="outline-dark" onClick={() => {
             props?.setValue(props?.setIndex)
            props?.setActiveinfo('GI')}}>Back</Actions>
          &nbsp;&nbsp;&nbsp;
          <Actions
            style={{ backgroundColor: isloading ? '#DDDDDD' : '#000' }}
            variant='dark' onClick={() => handleSubmit()} >
            {isloading ? <div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
              <img style={{ width: '13%', alignSelf: 'center', objectFit: 'cover' }} src={Fadingcircles} alt='loading.....' /></div>
              :
              "Check"}
          </Actions>
        </div>
      </DTDinfo>
    )
  }
  return (
    <>
     <div className='d-flex'>
                    {MoveArray.map((item, indexs) =>
                        <MovingButton className={index === indexs ? 'button' : ''} onClick={() => {
                            setIndex(indexs)
                            props?.setValue(indexs)
                            }} variant={index === indexs ? "dark" : "light"} size='md'>
                            {item}
                        </MovingButton>
                    )}
                </div>:
      {index === 1 ? renderMoverOnly() : renderItem()}
    </>
  )
}
export default MovingService

const GeneralInfo = styled.div`
padding:20px;
padding-top:-20px;
.error{
    border:3px solid red;
    }
`
const DTDinfo = styled.div`
padding:20px;
.error{
    border:3px solid red;
    }
`

const Text = styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
`

const Place = styled(Autocomplete)`
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
const Actions = styled(Button)`
width: 215px;
height: 44px;
border-radius: 8px;
font-size: 14px;
font-family:Roobert-medium;
`
const Dates = styled.div`
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
const Time = styled(Form.Select)`
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

const CalendarStyle = styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
margin-top:5px;
`

const DetailsDrop = styled.div`
border-radius:13px;
border:1px solid lightgray;
height:58px;
background:white;
background-color:white;
`
const Details = styled.div`
border-radius:13px;
border:1px solid lightgray;
.maintext{
    &:hover {
        color: #D81159;
    }
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
const Radios = styled.div`
color:#787373;
display:inline ;
flex-wrap:wrap;
.rads{
margin-right:20px;
}
input[type='radio']:checked{
    background-color: #D81159;
    border: 2px solid #D81159;
    box-shadow: 0 0 1px 1px #D81159;
  }
`
const IncButton = styled(Button)`
width:40px;
height:40px
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
margin-left:7px;
margin-right:7px;
border-radius:40px;
margin-bottom:1rem;
color:#787373;
border:1px solid #D0CECE;
box-shadow: 0px 0px 0px white;

`
const PhoneNumber = styled(PhoneInput)`
  width: 100%;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #190F0F;
  background: #fff;
}


@media (min-width: 360px) and (max-width: 540px)
{
   .PhoneInputCountry{
    width: 7rem;
  }
  .PhoneInputCountryIcon{
    width: 1rem;
    height: 0.75rem;
  }
   .PhoneInputInput{
    width: 12rem;
  }
}

 .PhoneInputCountry{
     margin-top:2px;
  min-width: 30%;
  height: 60px;
  background: #fff;
  border: 1px solid #DDDDDD;
  justify-content: center;
}



 .PhoneInputInput{
  min-width: 68%;
  height: 60px;
  border: 1px solid #DDDDDD;
  background: #fff;
  flex: none;
  order: 1;
  flex-grow: 0;
  padding: 9px 10px;
  font-family: 'SF Pro Display';
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0.1rem;
  color: #787373;
}

.PhoneInputCountryIcon{
  width: 2rem;
  height: 1.5rem;
}

 .PhoneInputCountrySelectArrow{
  height: 0.5rem;
  width: 0.5rem;
  color: #000;
}
`
const Input = styled(Form.Control)`
height: 24px;
border: 0px solid #fff;
margin-left:-10px;
font-family:Inter;
font-style: normal;
font-weight: 400;
color: #190F0F;
font-size: 14px;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 0px solid #fff;
  background: #fff;
}
`
const MovingButton = styled(Button)`

height:32px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
margin-right:13px;
border-radius:8px;
margin-bottom:1rem;
color:#787373;
border:1px solid #D0CECE;
border-radius:8px;
box-shadow: 0px 0px 0px white;
@media (min-width: 260px) and (max-width: 820px){
    height:40px;
    font-size: 10px;
 }
`