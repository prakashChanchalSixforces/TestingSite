import React, { useEffect, useState } from 'react'
import { Button, Container,FloatingLabel,Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Hrimg from '../../../assets/hr.svg'
import Openarrow from '../../../assets/open.png'
import Closearrow from '../../../assets/close.png'
import Calendar from 'react-calendar';
import infoLogo from '../../../assets/infologo.png'
import moment from 'moment';
import {windowcleaning } from '../../../store/Actions/User.action';
import { TimeList } from '../CompanyProfile/component/TimeList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../UserHomepage/Calendar.css'

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function WindowCleaning(){
    const dispatch = useDispatch();
    const [open,setOpen]=useState(false)
    const [insidecleaning,setInsidecleaning]=useState('')
    const [quantity,setQuantity]=useState('')
    const [stormwindows,setStormwindows]=useState('')
    const [screen,setScreen]=useState('')
    const [datecalendar,setDatecalendar]=useState(false);

const [values,setValues]=useState({
  "regularWindows": "yes"
})
const [regularwindows,setRegularwindows]=useState({
  "small": 0,
  "medium": 0,
  "large": 0
})
const [numberofscreens,setNumberofscreens]=useState({
  "small": 0,
  "medium": 0,
  "large": 0
})
const [numberofstormwindows,setNumberofstormwindows]=useState({
  "small": 0,
  "medium": 0,
  "large": 0
})
const [numberofinsidecleaning,setNumberofinsidecleaning]=useState({
  "small": 0,
  "medium":0,
  "large": 0
})

const handlechange=(name,place)=>(event)=>{
let value= name === 'numberOfRooms' ? parseInt(event.target.value):name==='date'?moment(event).format('LL'):event.target.value
if(name==='date'){
  setDatecalendar(false)
}
setValues({...values,[name]:value})
}
const handleregularwindows=(name)=>(event)=>{
  let value=parseInt(event.target.value)
  setRegularwindows({...regularwindows,[name]:value})
  }

  const handlenumberofscreens=(name)=>(event)=>{
    let value=parseInt(event.target.value)
    setNumberofscreens({...numberofscreens,[name]:value})
    }
    const handlenumberofstormwindow=(name)=>(event)=>{
      let value=parseInt(event.target.value)
      setNumberofstormwindows({...numberofstormwindows,[name]:value})
      }
      const handleinsidecleaning=(name)=>(event)=>{
        let value=parseInt(event.target.value)
        setNumberofinsidecleaning({...numberofinsidecleaning,[name]:value})
        }

const handleInsideclean=(y)=>{
    setInsidecleaning(y)
    setValues({...values,'insideCleaning':y})
}
const handleQuantity=(y)=>{
    setQuantity(y)
    if(y==='All Windows'){
    setNumberofinsidecleaning(regularwindows)
    }
    else {
      setNumberofinsidecleaning(numberofinsidecleaning)
    }
   // setValues({...values,'anyPets':y})
}
const handleStormwindows=(y)=>{
    setStormwindows(y)
    setValues({...values,'stormWindows':y})
}
const handleScreens=(y)=>{
    setScreen(y)
    setValues({...values,'screensPresent':y})
}

const isValid=()=>{

if(!(values.fromAddress&&values.fromAddress.length>0)){
    toast.error('Please enter your starting address')
    return false
}
else if(!(values.toAddress&&values.toAddress.length>0)){
    toast.error('Please enter your destination')
    return false
}
else if(!(values.typeofHouse&&values.typeofHouse.length>0)){
    toast.error('Please select your type of house')
    return false
}
else if(!(values.approxSizeInSqFt&&values.approxSizeInSqFt.length>0)){
    toast.error('Please select approx size')
    return false
}
else if(!(values.howHeavyBelongings&&values.howHeavyBelongings.length>0)){
    toast.error('Please select how heavy are your belongings')
    return false
}
else if(!(values.numberOfRooms||values.numberOfRooms===isNaN)){
    toast.error('Please select number of rooms')
    return false
}
else if(!(values.howHeavyCupboard&&values.howHeavyCupboard.length>0)){
    toast.error('Please select how heavy is your cupboard')
    return false
}
else if(!(values.elevatorAvailable&&values.elevatorAvailable.length>0)){
    toast.error('Please select elevator availbility')
    return false
}

else
return true
}


useEffect(()=>{
  setValues({...values,"numberOfRegularWindows":regularwindows})
  if(values?.insideCleaning==='yes'){
    setValues({...values,"windowInsideCleaning":numberofinsidecleaning})
  }
  if(values?.stormWindows==='yes'){
    setValues({...values,"numberOfStormWindows":numberofstormwindows})
  }
  if(values?.screensPresent==='yes'){
    setValues({...values,"numberOfScreens":numberofscreens})
  }
},[
  regularwindows,values?.insideCleaning,values?.stormWindows,values?.screensPresent,numberofinsidecleaning,numberofstormwindows,numberofscreens,values])

console.log(values,quantity,'values')

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
const handleOpen=()=>{
    if(open===true){
        setOpen(false)
    }
    else
    setOpen(true)
}



const handleSubmit=async()=>{
    let res
    if(isValid()){
     res = await dispatch(windowcleaning(values,1,10));
     if(res.status===false){
        toast.error(res.message);
     }
     else if(res.status===true&&res.message!=='Success'){
        toast.info(res.message);
     }
    }
}
return(
    <React.Fragment>
    <MainContainer>
        <ToastContainer/>
    <Form>
    <ServiceHeader>
        Tell us about your cleaning
        </ServiceHeader>
    <Details className='d-flex justify-content-start'>
            <div
            style={{
              paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'
              }}>
                Service
                <Text>Window Cleaning</Text>
                </div>
        </Details>
        <br/>
        <Details className='justify-content-start'>
        <div style={{paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'}}>
        Destination
        <Place
              apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
              types={['address', '(cities)', '(regions)']}
              options={{types: ["geocode", "establishment"],
            }}
            placeholder='Address'
            onPlaceSelected={onPlaceSelected}
            defaultValue={values?.address?values?.address:''}
            className="form-control form-control-default"
            />
            </div>
            </Details>
            <div className='d-flex mt-3' style={{borderRadius:'13px',border:'1px solid #F3F3F3'}}>
    <Dates onClick={()=>handledate()} >
        Date
        <h6 style={{fontFamily:'Open Sans'}}>
          {values?.date?values?.date:'Select date'}</h6>
        </Dates>
<FloatingLabel
controlId="floatingInput"
label="Time"

>

<Time aria-label="Floating label select example" onChange={handlechange('time')}>
<option>{values?.time?values?.time:'Select Time'}</option>
{TimeList.map((item,index) =>{
return(
<option value={item}>{item}</option>
)
})}

</Time>
</FloatingLabel>
</div>
{datecalendar === true ?
<CalendarStyle className='p-3 d-flex justify-content-center'>
<Calendar className='react-calendar' onChange={handlechange('date')}
minDate={new window.Date()}
/>
</CalendarStyle>
:''}
        <img src={Hrimg} alt='hr' className='mb-3 mt-3'/>
    <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label >Type of house</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('typeOfHouse')}>
        <option >Select your type of house</option>
        <option value="House">House</option>
        <option value="Condo">Condo</option>
        <option value="Apartment">Apartment</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <Form.Group className="mb-3">
      <Multiselect className=' p-2' >
        <div className='d-flex justify-content-between' onClick={()=>handleOpen()}>
        <Info>
            <Smallfont>Number of regular windows</Smallfont>
            <Text2>S({regularwindows?.small}), M({regularwindows?.medium}), L({regularwindows?.large})</Text2>
            </Info>
            <div>     {open===true?
                <Arrow src={Openarrow} />
                :
                <Arrow src={Closearrow} />
        }
                </div>
        </div>
        {open===true?
        <>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handleregularwindows('small')} >
      <option value="">Small</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handleregularwindows('medium')}>
      <option value="">Medium</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handleregularwindows('large')}>
      <option value="">Large</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      </>
      :''}
      </Multiselect>
      </Form.Group>
      <Details className='d-flex justify-content-between p-2 mb-3'>
            <Info>
              <Smallfont>Would you like your windows cleaned from the inside?</Smallfont>
                <div className='d-flex justify-content-start'>
                <Yesno
                 size='md'
                 variant={values?.insideCleaning==='yes'?'dark':'outline-dark'} onClick={()=>{handleInsideclean('yes')}}>Yes</Yesno>
                 &nbsp;&nbsp;
                  <Yesno
                 size='md'
                 variant={values?.insideCleaning==='no'?'dark':'outline-dark'} onClick={()=>{handleInsideclean('no')}}>No</Yesno>
                </div>
                </Info>
                <div>
                <img src={infoLogo} alt='info' />
                </div>
      </Details>
      {insidecleaning==='yes'?
      <>
      <Details className='d-flex justify-content-between p-2 mb-3'>
            <Info>
              <Smallfont>Would you like your windows cleaned from the inside?</Smallfont>
                <div className='d-flex justify-content-start'>
                 <Yesno size='md' variant={quantity==='All Windows'?'dark':'outline-dark'} onClick={()=>{handleQuantity('All Windows')}}>All Windows</Yesno> &nbsp;&nbsp;
                 <Yesno size='md' variant={quantity==='Partial'?'dark':'outline-dark'} onClick={()=>{handleQuantity('Partial')}} >Partial</Yesno> &nbsp;&nbsp;

                </div>
                </Info>
                <div>
                <img src={infoLogo} alt='info' />
                </div>
      </Details>
      {quantity==='All Windows' ? '':
      <Multiselect className=' p-2 mb-3' >
        <div className='d-flex justify-content-between' onClick={()=>handleOpen()}>
        <Info>
            <Smallfont>Number of windows</Smallfont>
            <Text2>S({numberofinsidecleaning?.small}), M({numberofinsidecleaning?.medium}), L({numberofinsidecleaning?.large})</Text2>
            </Info>
            <div>     {open===true?
                <Arrow src={Openarrow} />
                :
                <Arrow src={Openarrow} />
        }
                </div>
        </div>
        {open===true?
        <>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handleinsidecleaning('small')}>
      <option value="">Small</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handleinsidecleaning('medium')}>
      <option value="">Medium</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handleinsidecleaning('large')}>
      <option value="">Large</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      </>
      :''}
      </Multiselect>
}
      </>
      :''}
      <Details className='p-2 mb-3'>
        <div className='d-flex justify-content-between p-2 mb-3'>
            <Info>
              <Smallfont>Do you have Storm windows?</Smallfont>
                <div className='d-flex justify-content-start'>
                    <Yesno
                 size='md'
                 variant={values?.stormWindows==='yes'?'dark':'outline-dark'} onClick={()=>{handleStormwindows('yes')}}>Yes</Yesno>
                 &nbsp;&nbsp;
                  <Yesno
                 size='md'
                 variant={values?.stormWindows==='no'?'dark':'outline-dark'} onClick={()=>{handleStormwindows('no')}}>No</Yesno>  
                </div>
                </Info>
                <div>
                <img src={infoLogo} alt='info' />
                </div>
                </div>
                {stormwindows==='yes'?
                <>
        <Info>
            <Smallfont>Number of windows</Smallfont>
            <Text2>S({numberofstormwindows?.small}), M({numberofstormwindows?.medium}), L({numberofstormwindows?.large})</Text2>
            <Sel aria-label="Floating label select example" className='mb-3' onChange={handlenumberofstormwindow('small')}>
      <option value="">Small</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handlenumberofstormwindow('medium')}>
      <option value="">Medium</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handlenumberofstormwindow('large')}>
      <option value="">Large</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
            </Info>
            </>
            :''}
      </Details>
      {stormwindows==='yes'?
      <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label>Select size of storm windows</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('howHeavyCupboard')}>
      <option value="">Select size of storm windows</option>
      <option value="Light">Light</option>
        <option value="Medium">Medium</option>
        <option value="Heavy">Heavy</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      :''}
      <Details className='p-2 mb-3'>
        <div className='d-flex justify-content-between p-2 mb-3'>
            <Info>
              <Smallfont>Do you have Screens?</Smallfont>
                <div className='d-flex justify-content-start'>
                {/* {screens.map((x,index)=>{return(
                    <>
                 <Yesno size='md' variant={values?.screensPresent==={x}?'dark':'outline-dark'} onClick={()=>{handleScreens(x)}} key={index}>{x}</Yesno> &nbsp;&nbsp;
                 </>
                    )})} */}
                     <Yesno
                 size='md'
                 variant={values?.screensPresent==='yes'?'dark':'outline-dark'} onClick={()=>{handleScreens('yes')}}>Yes</Yesno>
                 &nbsp;&nbsp;
                  <Yesno
                 size='md'
                 variant={values?.screensPresent==='no'?'dark':'outline-dark'} onClick={()=>{handleScreens('no')}}>No</Yesno>  
                </div>
                </Info>
                <div>
                <img src={infoLogo} alt='info' />
                </div>
                </div>
                {screen==='yes'?
        <Info>
            <Smallfont>Number of windows</Smallfont>
            <Text2>S({numberofscreens?.small}), M({numberofscreens?.medium}), L({numberofscreens?.large})</Text2>
            <Sel aria-label="Floating label select example" className='mb-3' onChange={handlenumberofscreens('small')}>
      <option value="">Small</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handlenumberofscreens('medium')}>
      <option value="">Medium</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
      <Sel aria-label="Floating label select example" className='mb-3' onChange={handlenumberofscreens('large')}>
      <option value="">Large</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
            </Info>
            :''}
      </Details>
      {screen==='yes'?
      <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label>Number of Screens</Label>} >
      <Sel aria-label="Floating label select example" onChange={handlechange('numberOfRooms')}>
      <option value="">Number of Screens</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      :''}
      <hr/>
      <Search>
      <Continue size='md' variant="dark" onClick={()=>handleSubmit()} >Search</Continue>
      </Search>
          </Form>
    </MainContainer>
    <br/>
    <br/>
    </React.Fragment>
)
}

export default WindowCleaning

const MainContainer=styled(Container)`
border-radius:18px;
border:1px solid #F3F3F3;
padding:20px;
background-color:#FFFFFF;
`

const Label=styled.h6`
color:	#000000 !important;
`
const Multiselect=styled.div`
border-radius:13px;
border:1px solid lightgray;
`
const Text2=styled.p`
color:#787373 ;
margin-top:-15px;
font-size:14px;
`
const Text=styled.p`
color:black ;
font-size:18px;
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
`
const Arrow=styled.img`
width:12px;
`
const Search=styled.p`
display:flex;
justify-content:center;
`

const Place=styled(Autocomplete)`
height:40px;
border-radius:15px;
border-width:0px;
margin-left:-12px;
margin-top:-8px;
&::placeholder {
  font-family: Open Sans;
}
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:0px solid #190F0F;
  background: #fff;
}
`

const Sel=styled(Form.Select)`
color:gray;
border-radius:13px;
font-family:Open Sans;
.placeholder {
  font-family: Open Sans;
}
`
const Yesno = styled(Button)`
padding-left:20px;
padding-right:20px;
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
const Info=styled.div`
padding-left:2px;
padding-top:2px
`
const Smallfont=styled.p`
font-size:13px;
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
width:12rem;
margin-right:-25px;
border-radius:13px;
border:1px solid lightgray;
padding-left:6px;
padding-top:6px;
height:58px;
font-size:14px;
color:gray;
@media (min-width: 360px) and (max-width: 1399px){
  width:11rem;
}
`
const Time=styled(Form.Select)`
color:gray;
border-radius:13px;
font-family:Open Sans;
width:12rem;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:1px solid #190F0F;
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