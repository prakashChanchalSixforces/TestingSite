import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { useLocation } from 'react-router-dom';
import uparrow from '../../../../../assets/open.png';
import downarrow from '../../../../../assets/close.png';
import '../../../UserHomepage/components/styles.css'
import Calendar from 'react-calendar';
import { TimeList } from '../../../CompanyProfile/component/TimeList';
import moment from 'moment';
import '../../../UserHomepage/Calendar.css'
import Fadingcircles from '../../../../../assets/faded.gif';
import PhoneInput from 'react-phone-number-input';
import { moving } from '../../../../../store/Actions/User.action';
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
    const [count, setCount] = useState(2);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
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
    const [index, setIndex] = useState(0);
    const MoveArray = [
        'Movers with a truck', 'Movers only', 'Long distance'
    ]
    const [values, setValues] = useState({
        "typeofHouse": typeofHouse || "Condo",
        "approxSizeInSqFt": approxSizeInSqFt || "500 to 1,200 ",
        "numberOfRooms": numberOfRooms || "2",
        "elevatorAvailable": elevatorAvailable || "Shared elevator",
        "fromAddress": fromAddress || address || "",
        "date": date2 || date || moment(new Date()).format('DD MMM YYYY'),
        "time": time2 || time || "10:00 AM",
        "toAddress": toAddress || "",
        "movers": 129,
        "typeOfMove":'twoMoverthreeTonTruck'
    })
    const [secondFormValue, setSeconDformValue] = useState({
        "name": "",
        "phone": "",
        "numberOfMovers": `${count}`
    })

    const [Bool, setBool] = useState({
        "condo": false,
        "size": false,
        "rooms": false,
        "elevator": false,
    })
    const trucktypes = [
        { title: '1  Mover with a truck ', value: 95,label:'oneMoverWithTruck' },
        { title: '2 Movers with 3 ton truck ', value: 129,label:'twoMoverthreeTonTruck'  },
        { title: '3 Movers with 5 ton truck ', value: 169, recommended: true ,label:'threeMoverFiveTonTruck' },
        { title: '4 Movers with 5 ton truck ', value: 210,label:'fourMoverFiveTonTruck'  }
    ]
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
    const SecondHandleChange = (name, place) => (event, e) => {
        let value =
            name === 'phone' ? place : event.target.value
        setSeconDformValue({ ...secondFormValue, [name]: value })
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
        props?.fromAddres(place.formatted_address)
        setFrom(address)
    }
    const ontoPlaceSelected = (place) => {
        const add = place.formatted_address
        props?.toAddres(place.formatted_address)
        setTo(add)
    }
    useEffect(() => {
        if (to || from) {
            setValues({ ...values, 'toAddress': to, 'fromAddress': from })
        }
    }, [to, from])
    const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
    let limit = mql === true ? 10 : 10
    let dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    function gtag_report_conversion(url) {
        var callback = function () {
            if (typeof (url) != 'undefined') { window.location = url; }
        };
        gtag('event', 'conversion', { 'send_to': 'AW-10955203557/v9raCNSviYMYEOXH7Oco', 'event_callback': callback });
        return false;
    }
    const handleSubmit = async () => {

        const moverOnlyData = {
            "fromAddress": values.fromAddress,
            "numberOfMovers": count,
            "date": values.date,
            "time": values.time
        }
        gtag_report_conversion()
        if (isValid()) {
            setLoader(true)
            dispatch({ type: 'moving_data', payload: values })
            setIsloading(true)
            let res
            window.analytics.track("Search results Customer form", { values, color: '#000', form_side: 'right' });
            if (index === 1) {
                res = await dispatch(moving(moverOnlyData, 1, limit));
                props?.handleSubmit(values?.movers)
            }
            else if (index === 2) {
                res = await dispatch(moving({ ...values, "phone": phone, "name": name }, 1, limit));
                props?.requestCallback();
            }
            else {
                res = await dispatch(moving(values, 1, limit));
                props?.handleSubmit(values?.movers)
            }
            localStorage.setItem('values', JSON.stringify(res?.finalData))
            localStorage.setItem('data', JSON.stringify(res?.data))
            setLoader(false)
            setIsloading(false)

            if (window.innerWidth < 800) {
                props?.onHide()
            }
            else if (res.status === false) {
            }
            else if (res.status === true && res.message !== 'Success') {
            }

           
        }
    }
    const handledate = () => {
        if (datecalendar === false) {
            setDatecalendar(true)
        }
        else
            setDatecalendar(false)

    }
    const handlefocusing = (name) => {
        setFocusedname(name)
    }
    const houseoptions = ['Condo', 'House', 'Townhouse']
    const SizeOptions = ['Less than 500', '500 to 1,200 ', '1,200 to 2,000 ', '2,000 to 3,000 ', '3,000 to 4,000 ', '4,000 to 5,000 ']

    const renderItemMoverTruck = () => {
        return (
            <Webview>
                <Placing >
                    <div className='d-flex mb-3' style={{ borderRadius: '13px', border: '1px solid #F3F3F3' }}>
                        <Dates onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                            Moving date 
                            <p style={{ fontFamily: 'Roobert-medium', fontSize: '16px', fontWeight: '500', color: 'black' }}>
                                {values?.date ? values?.date : 'Select date'}
                            </p>
                        </Dates>
                        <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start'} >
                            <div className='substyle'>
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
                    </div>

                </Placing>

                <Placing>
                    <Details className={errors?.from ? ' error justify-content-start' : 'justify-content-start'} onClick={() => handlefocusing('from')}>
                        <div className='subdiv'>
                            {focusedname === 'from' || values?.fromAddress?.length > 0 ? ' Starting address' : ''}
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
                                className={focusedname === 'from' || values?.fromAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                defaultValue={values?.fromAddress}
                            />
                        </div>
                    </Details>
                    <Details className={errors?.to ? ' error justify-content-start ' : 'justify-content-start'} onClick={() => handlefocusing('to')}>
                        <div className='subdiv'>
                            {focusedname === 'to' || values?.toAddress?.length > 0 ? 'Destination address' : ''}
                            <Place
                                apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                types={['address', '(cities)', '(regions)']}
                                options={{
                                    types: ["geocode", "establishment"],
                                    componentRestrictions: {
                                        country: 'ca'
                                    }
                                }}
                                placeholder='Where are you moving to ? '
                                onPlaceSelected={ontoPlaceSelected}
                                className={focusedname === 'to' || values?.toAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                defaultValue={values?.toAddress}
                            />
                        </div>
                    </Details>
                </Placing>

                <Placing>
                    <Form.Group className="mb-1">
                        <Details onClick={() => handlebool('condo')} className={errors?.condo ? ' error' : ''}>
                            <Innerdiv className='d-flex justify-content-between'>
                                <div >
                                    Type of home
                                    <Text>{values.typeofHouse}</Text>
                                </div>
                                <div>
                                    <Img src={Bool.condo === true ? uparrow : downarrow} />
                                </div>
                            </Innerdiv>
                        </Details>
                        {Bool.condo === true ?
                            <DetailsOptions className='mt-1'>
                                {houseoptions?.map((item, index) => {
                                    return <Text id={item} key={index} onClick={handlechange('typeofHouse')} className='maintext'>{item} </Text>
                                })}
                            </DetailsOptions>
                            : ''}
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Details onClick={() => handlebool('size')} className={errors?.size ? ' error' : ''}>
                            <Innerdiv className='d-flex justify-content-between'>
                                <div>
                                    Approx. size in square feet
                                    <Text>{values.approxSizeInSqFt}</Text>
                                </div>
                                <div>
                                    <Img src={Bool.size === true ? uparrow : downarrow} />
                                </div>
                            </Innerdiv>
                        </Details>
                        {Bool.size === true ?
                            <DetailsOptions className='mt-1'>
                                {SizeOptions?.map((item, index) => {
                                    return <Text className='maintext' id={item} key={index} onClick={handlechange('approxSizeInSqFt')}>{item} </Text>
                                })}
                            </DetailsOptions>
                            : ''}
                    </Form.Group>

                </Placing>
                {datecalendar === true ?
                    <CalendarStyle style={{ zIndex: 10000 }} className='p-3 d-flex justify-content-center'>
                        <Calendar className='react-calendar' onChange={handlechange('date')}
                            minDate={new window.Date()}
                        />
                    </CalendarStyle> : ''}
                <Placing>
                    <Details className='d-flex justify-content-between' onClick={() => handlebool('rooms')} className={errors?.rooms ? ' error' : ''}>
                        <Innerdiv className='d-flex justify-content-between' onClick={() => handlebool('rooms')}>
                            <div>
                                Number of bedrooms
                                <Text>{values?.numberOfRooms}</Text>
                            </div>
                            <div>
                                <Img src={Bool.rooms === true ? uparrow : downarrow} />
                            </div>
                        </Innerdiv>
                    </Details>
                    {index !== 0 ? <Details>
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
                </Placing>
                {Bool.rooms === true ?
                    <>
                        <DetailsOptions style={{ width: '400px' }} className='mt-1'>
                            <div className='d-flex justify-content-between p-3'>
                                <p>Number of rooms</p>
                                <input id="rangeV" value={values?.numberOfRooms} type='number' maxLength='1'
                                    onChange={handlechange('numberOfRooms')}
                                    style={{ border: '1px solid grey', borderRadius: '6px', width: '56px', height: '32px', textAlign: 'center', paddingTop: '3px', paddingBottom: '5px' }}
                                />
                            </div>
                            <div className='d-flex p-3'>0<input id="range" type="range" min="0" max="4" step="1" value={parseInt(values?.numberOfRooms)} onChange={() => handlerange()} />4</div>
                        </DetailsOptions>
                    </>

                    : ''}

                {index !== 0 ? <div className='phone-input-owner'>
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

                {index === 0 ? <div>
                    <p style={{ fontSize: '18px', fontWeight: '500' }}>Select truck size and number of movers:</p>

                    <Radios key='radio' className="mb-4">
                        {trucktypes?.map((item) => {
                            return (
                                <div style={{ paddingRight: '15px' }} className='d-flex justify-content-between'>

                                    <Form.Check
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
                </div> : null}

            </Webview>
        )
    }
    const LocalMoving = () => {
        return (
            <Webview>
                <Placing >
                    <div className='d-flex mb-3' style={{ borderRadius: '13px', border: '1px solid #F3F3F3' }}>
                        <Dates onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                            Moving date <span style={{ color: '#D81159' }}> * </span>
                            <p style={{ fontFamily: 'Roobert-medium', fontSize: '14px', fontWeight: '500', color: 'black' }}>
                                {values?.date ? values?.date : 'Select date'}
                            </p>
                        </Dates>
                        <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start'} >
                            <div className='substyle'>
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

                </Placing>
                <Placing>
                    <Details className={errors?.from ? ' error justify-content-start' : 'justify-content-start'} onClick={() => handlefocusing('from')}>
                        <div className='subdiv'>
                            {focusedname === 'from' || values?.fromAddress?.length > 0 ? ' Starting address' : ''}
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
                                className={focusedname === 'from' || values?.fromAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                defaultValue={values?.fromAddress}
                            />
                        </div>
                    </Details>
                    <Details className='d-flex justify-content-between' className={errors?.rooms ? ' error' : ''}>
                        <NumofMovInnerdiv className=' justify-content-between' >
                            <div>
                                Number of movers
                            </div>
                            <div >
                                <div style={{ justifyContent: 'center' }} className='d-flex'>
                                <IncButton variant={"light"} size='md' onClick={decrement}>-</IncButton>
                                    <p style={{ alignSelf: 'center' }}>{count}</p>
                                    <IncButton variant={"light"} size='md' onClick={increment}>+</IncButton>
                                </div>
                            </div>
                        </NumofMovInnerdiv>
                    </Details>

                </Placing>
                {Bool.rooms === true ?
                    <>
                        <DetailsOptions style={{ width: '400px' }} className='mt-1'>
                            <div className='d-flex justify-content-between p-3'>
                                <p>Number of rooms</p>
                                <input id="rangeV" value={values?.numberOfRooms} type='number' maxLength='1'
                                    onChange={handlechange('numberOfRooms')}
                                    style={{ border: '1px solid grey', borderRadius: '6px', width: '56px', height: '32px', textAlign: 'center', paddingTop: '3px', paddingBottom: '5px' }}
                                />
                            </div>
                            <div className='d-flex p-3'>0<input id="range" type="range" min="0" max="4" step="1" value={parseInt(values?.numberOfRooms)} onChange={() => handlerange()} />4</div>
                        </DetailsOptions>
                    </>

                    : ''}
            </Webview>
        )
    }
    return (
        <React.Fragment>
            <Card1Moving >
                <div className='d-flex'>
                    {MoveArray.map((item, indexs) =>
                        <MovingButton className={index === indexs ? 'button' : ''} onClick={() => {
                            setIndex(indexs)
                            props?. setIndex(indexs)
                            }} variant={index === indexs ? "dark" : "light"} size='md'>
                            {item}
                        </MovingButton>
                    )}
                </div>
                <MobileView>
                    <Placing>
                        <Details className={errors?.from ? ' error justify-content-start' : 'justify-content-start'} onClick={() => handlefocusing('from')}>
                            <div className='subdiv'>
                                {focusedname === 'from' || values?.fromAddress?.length > 0 ? ' Starting address' : ''}
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
                                    className={focusedname === 'from' || values?.fromAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                    defaultValue={values?.fromAddress}
                                />
                            </div>
                        </Details>
                       {index!==1? <Details className={errors?.to ? ' error justify-content-start ' : 'justify-content-start'} onClick={() => handlefocusing('to')}>
                            <div className='subdiv'>
                                {focusedname === 'to' || values?.toAddress?.length > 0 ? 'Destination address' : ''}
                                <Place
                                    apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                    types={['address', '(cities)', '(regions)']}
                                    options={{
                                        types: ["geocode", "establishment"],
                                        componentRestrictions: {
                                            country: 'ca'
                                        }
                                    }}
                                    placeholder='Where are you moving to ? '
                                    onPlaceSelected={ontoPlaceSelected}
                                    className={focusedname === 'to' || values?.toAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                    defaultValue={values?.toAddress}
                                />
                            </div>
                        </Details>:null}
                    </Placing>
                </MobileView>

                {index === 1 ? LocalMoving() : renderItemMoverTruck()}

                <Actions
                    style={{ backgroundColor: isloading ? '#DDDDDD' : '#000' }}
                    variant='dark' onClick={() => handleSubmit()} >
                    {isloading ? <div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                        <img style={{ width: '8%', alignSelf: 'center', objectFit: 'cover' }} src={Fadingcircles} alt='loading.....' /></div>
                        :
                        "Get an estimate"
                    }
                </Actions>


            </Card1Moving>
        </React.Fragment>
    )

}
export default MovingForm

const Text = styled.p`
font-size:16px;
font-family: Inter;
font-style: normal;
font-weight: 400;
cursor:pointer;
color: black;
`
const Webview = styled.div`
display:inline;
@media (min-width: 260px) and (max-width: 969px){
    display:none;
  }
`
const MobileView = styled.div`
display:inline;
@media (min-width: 970px) and (max-width: 10000px){
    display:none;
  }
`
const Placing = styled.div`
display:flex;
@media (min-width: 260px) and (max-width: 969px){
    display:inline;
  }
`
const Card1Moving = styled.div`
padding-top:15px;
padding-bottom:30px;
width:100%;
background-color:#fff;
border-radius:8px;
@media (min-width: 821px) and (max-width: 10000px){
padding-left:10px;
}
.button{
    background-color:#D81159;
    border:1px solid #D81159;
    color:#fff;
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
height: 26px;
border-radius:10px;
border-width:0px;
margin-left:-12px;
font-family:Inter;
font-style: normal;
font-weight: 400;
color: #190F0F;
font-size: 14px;
width:228px;
@media (min-width: 260px) and (max-width: 1115px){
    width:330px;
  }

&::placeholder {
  font:Roobert-medium;
  font-size:14px;
  font-family:Inter;
font-style: normal;
font-weight: 400;
color: #190F0F;
}
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:0px solid #190F0F;
background: transparent;
}
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
const Actions = styled(Button)`
width: 97%;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 969px){
   width:340px;
 }
`
const Time = styled(Form.Select)`
color:gray;
border-radius:8px;
font-family:roobert-medium;
width:258px;
color:black;
border:none;
font-size:16px;
margin-top:-12px;
margin-left:-10px;
padding-top:13px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:none;
background: #fff;
}
@media (min-width: 360px) and (max-width: 820px){
width:11rem;
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
border-radius:8px;
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
const Details = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
width:240px;
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
width: 240px;
`
const NumofMovInnerdiv = styled.div`
padding-left:12px;
padding-right:10px;
padding-top:6px;
padding-bottom:10px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;
width: 240px;
`
const Img = styled.img`
height:7px;
width:11px;
margin-top:18px;
margin-left:15px;
cursor:pointer;
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
const IncButton = styled(Button)`
width:35px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
margin-left:7px;
margin-right:7px;
border-radius:25px;
margin-bottom:1rem;
color:#787373;
border:1px solid #D0CECE;
box-shadow: 0px 0px 0px white;
@media (min-width: 260px) and (max-width: 820px){
    font-size: 10px;
 }
`
const Dates = styled.div`
width:258px;
margin-right:-25px;
border-radius:8px;
border:1px solid lightgray;
padding-left:6px;
padding-top:6px;
height:58px;
font-size:12px;
color:#787373;
color:black;
@media (min-width: 360px) and (max-width: 820px){
width:11rem;
}
`
const PhoneNumber = styled(PhoneInput)`
  width: 97%;
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