import React, { useEffect, useState } from 'react'
import { Button, Col, Row, FormSelect, Dropdown } from 'react-bootstrap'
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { Searchservice } from '../../../store/Actions/User.action';
import './components/styles.css'
import SearchIcon from '../../../assets/search2.png'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
    import Lv from '../../../assets/lv.png'
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import { useNavigate } from 'react-router-dom';

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function Search(){
    const[searching,setSearching]=useState(false);
    const[activetype,setActivetype]=useState('')
    const [activeService,setActiveservice]=useState('')
    const[address,setAddress]=useState('')
    const[trackingAdress,setTrackingAdress]=useState('')
    const[date,setDate]=useState('')
    const[time,setTime]=useState('')
    const[timedetails,setTimedetails]=useState({'ampm':'AM'})

    const[values,setValues]=useState({
      servicesOffered:"Moving"
    })
    const handleClickAwayEvent=()=>{
      setSearching(false
        )
    }
    const OpenedServices=[
      'Pressure Washing',
      'Moving',
      'Electricians',
      'Plumbers',
      //'Cleaning'
    ]

    console.log(new Date())
    //let service=['Pressure Washing','Carpet Cleaning','Moving','Mattress Cleaning','Gutter Cleaning','Window Cleaning']
    const hours=['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00']
    const services = useSelector(state => state.serviceProvider.services);
    let ourservices = services?.map((x)=>x.data)
    let service = ourservices[0]
    const DateFormat = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const FinalDate = day + '-' + month + '-' + year;
      return FinalDate;
  };
let dispatch = useDispatch();
let navigate  = useNavigate();
  const handlesubmit=async()=>{
    window.analytics.track("Homepage search bar",{...values,"address":trackingAdress});
    let res
    //if(isValid()){
     res = await dispatch(Searchservice(values));
     if(res.status===false){
        //toast.error(res.message);
        console.log(res.message)
     }
     else if(res.status===true&&res.message==='Success'){
        //toast.info(res.message);
        navigate(`/${activeService.toLowerCase().split(" ").join("")||'moving'}`,{state:{data:res.data,name: decodeURI(activeService)||'Moving',address:address,date:date,time:time}})

     }
    //}
  }
  const handleactiveservice=(name)=>{
    setActiveservice(name)
    setValues({...values,'servicesOffered':name})
  }
    const handleData=(name)=>(e)=>{
 if(name==='address'){
 setAddress(e.target.value)
 setValues({...values,'placeOfService':e.target.value})
 }
 else if (name==='date'){
  setDate(DateFormat(new Date(e)))
  setValues({...values,'date':DateFormat(new Date(e))})

 }
 else if (name==='hours'){
  setTimedetails({...timedetails,'hour':e.target.value})
 }
 else if (name==='ampm'){
  setTimedetails({...timedetails,'ampm':e.target?.innerHTML})
 }
    }

    let onPlaceSelected = (place) => {
      setTrackingAdress(place)
      const address = place.formatted_address
      setAddress(address)
      //setValues({...values,'placeOfService':address})
  }

    useEffect(()=>{
if(timedetails?.hour?.length>0&&timedetails?.ampm?.length>0){
  setTime(timedetails?.hour+''+timedetails?.ampm)
  setValues({...values,'time':timedetails?.hour+''+timedetails?.ampm})
}
    },[timedetails,values])
    console.log('searchvalues',values)
return(
    <React.Fragment>
    {searching===true?
    <>
        <ClickAwayListener onClickAway={handleClickAwayEvent}>

    <MainSearch>
    <div className='d-flex justify-content-center'>
    <AfterSearch >
      <div className={activetype==='service'?'activemodule':'service'} onClick={()=>setActivetype('service')} >
       <Head> Service </Head>
       <Desc> {activeService?activeService:'Select service you need'}</Desc>
        </div>
        {activetype!=='service'&&activetype!=='address'?
        <img src={Lv} alt='lv' className='module'/>
        :''}
      <div className={activetype==='address'?'activemodule':'module'} onClick={()=>setActivetype('address')}>
      <Head> Address </Head>
       <Desc> {address?.length>0?address?.slice(0,55):'Enter your address'} </Desc>
        </div>
        {activetype!=='address'&&activetype!=='dateandtime'?
        <img src={Lv} alt='lv' className='module'/>
        :''}
      <div className={activetype==='dateandtime'?'activemodule':'datetime'} onClick={()=>setActivetype('dateandtime')}>
      <Head> Date and time </Head>
       <Desc> {date&&time?`Date : ${date}  ,  Time: ${time}`:'Enter date and time'} </Desc>
       </div>
      <Rightsearch onClick={()=>handlesubmit()}>
        <h5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>&nbsp;Search</h5>
        {/* <SearchTextImage src={Searchbuttontext} className='searchbuttonstyle'/> */}
        </Rightsearch>
    </AfterSearch>
    </div>
    <div className='d-flex justify-content-center mt-4 '>
     {activetype==='service'?
      <DropdownMenu show={true}
      style={{backgroundColor:'transparent',padding:'0px',
      borderRadius:'32px'}} >
    <Inputs className='p-2'>
    {/* <Servicesearch placeholder='Search Service' /> */}
    <Row md={4} className='p-3'>
        {service?.map((x,index)=>{
            return(
              OpenedServices.includes(x?.name)?
     <Col className={activeService===x?.name?'activeservice mb-3':' service mb-3'}
     key={index} onClick={()=>{handleactiveservice(x?.name)}}>
       {x?.name}
        </Col>:null
        )})}
     </Row>
    </Inputs>
    </DropdownMenu>
    :
    activetype==='address'?
    <Address className='d-flex justify-content-center mt-2 '>
       <Place
              apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
              types={['address', '(cities)', '(regions)']}
              options={{types: ["geocode", "establishment"],
              componentRestrictions:{
                country: ['ca']
              }
            }}
            placeholder='Please enter your address'
            onPlaceSelected={onPlaceSelected}
            defaultValue={address?address:''}
            className="form-control form-control-default"
            />
        {/* <Address placeholder='Please enter your address' onChange={handleData('address')}/> */}
    </Address>
    :
    activetype==='dateandtime'?
    <DropdownMenu show={true} style={{backgroundColor:'transparent',padding:'0px',width: '560px',
    height:'400px',
    borderRadius:'32px'}} >
  <CalendarStyle>
    <div className='p-3 d-flex justify-content-center'>
    <Calendar className='react-calendar' minDate={new Date()} onChange={handleData('date')} pages={2} />
    </div>
    <br/>
    <br/>
      <div className='d-flex justify-content-center' >
      <b className='mt-2'>Time :</b> &nbsp;&nbsp;&nbsp;
      <FormSelect placeholder='hours' onChange={handleData('hours')} style={{borderRadius:'30px',width:'190px'}}>
      <option value=''>Hours</option>
      {hours.map((x,index)=>{
        return(
          <option value={x} key={index}>{x}</option>
        )
      })}
      </FormSelect>&nbsp;&nbsp;&nbsp;&nbsp;
      <Toggle className='d-flex'>
      <div
      className={timedetails?.ampm==='AM'?'activeclass':'class'}
      >
        <p id='AM' onClick={handleData('ampm')}>AM</p>
        </div>
        <div className={timedetails?.ampm==='PM'?'activeclass':'class'}
        >
        <p  id='PM' onClick={handleData('ampm')}>PM</p>
        </div>
      </Toggle>

      </div>
          </CalendarStyle>
  </DropdownMenu>
    :''}
    </div>
    </MainSearch>

    </ClickAwayListener>
    </>
    :
    <Searchbutton variant="light" onClick={()=>setSearching(true)}> Service &nbsp;&nbsp;&nbsp; |&nbsp; &nbsp;&nbsp;Address &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date and time &nbsp;
           <SearchImage src={SearchIcon} />
    </Searchbutton>
    }
    </React.Fragment>
)
}
export default Search

const MainSearch=styled.div`
@media (min-width: 200px) and (max-width: 1000px){
  display:none
}

  `
const Searchbutton=styled(Button)`
border-radius:28px;
align-items:center;
border:1px solid #D9D9D9;
padding:8px 5px 8px 44px;
font-weight:400;
font-size: 16px;
line-height: 150%;
letter-spacing:0.01em;
cursor:pointer;
width:400px;
`
const DropdownMenu = styled(Dropdown.Menu)`
animation-name: stretch;
  animation-duration: 0.7s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-direction: initial	;
  animation-fill-mode: none;
  animation-play-state: running;
  @keyframes stretch {
    0% {
      transform: scale(.9);
    }
`
const Address = styled.div`
animation-name: stretch;
  animation-duration: 0.7s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-direction: initial	;
  animation-fill-mode: none;
  animation-play-state: running;
  @keyframes stretch {
    0% {
      transform: scale(.9);
    }
`
const Rightsearch=styled.div`
background:#D81159;
background-color:#D81159;
width:150px;
border-radius:0px 45px 45px 0px;
color:white;
text-align:center;
padding-top:25px;
`
const SearchImage = styled.img`
height:35px;
width:35px;
`

const AfterSearch = styled.div`
width: 990px;
height: 80px;
background: #FAFAFA;
border: 1px solid #D9D9D9;
border-radius: 56px;
display:flex;
justify-content:space-between;
cursor:pointer;

.activemodule{
box-sizing: border-box;
width: 268px;
height: 80px;
background: #FFFFFF;
border: 1px solid #D9D9D9;
box-shadow: 0px 2px 6px rgba(25, 15, 15, 0.08);
border-radius: 56px;
padding-left:50px;
padding:13px;
}
.module{
padding:13px;
padding-left:50px;
}
.service{
  padding:13px;
  padding-left:80px;
  }
  .datetime{
    padding:13px;
    padding-right:30px;

    }
.searchbuttonstyle{
height:100%;
width:100%;
}
animation-name: stretch;
  animation-duration: 0.7s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-direction: initial	;
  animation-fill-mode: none;
  animation-play-state: running;
  @keyframes stretch {
    0% {
      transform: scale(.9);
    }
`
const Head = styled.p`
text-align:center;
margin-bottom:10px;
font-size:16px;
color:#190F0F;
font-weight: 500;
`
const Desc = styled.h6`
text-align:center;
color:gray;
margin-top:-10px;
font-size:14px;
font-weight: 400;
`
const Inputs=styled.div`
box-sizing: border-box;
width: 967px;
background: #FFFFFF;
border: 1px solid #D9D9D9;
box-shadow: 0px 2px 6px rgba(25, 15, 15, 0.08);
border-radius: 32px;

.activeservice{
padding: 8px;
width: 155px;
height: 40px;
border: 3px solid #D81159;
border-radius: 32px;
color:black;
margin-right:10px;
font-size:13px;
text-align:center;
}
.service{
cursor:pointer;
padding: 9px;
width: 155px;
height: 40px;
background: white;
border: 1px solid lightgray;
border-radius: 32px;
color:black;
margin-right:10px;
font-size:13px;
text-align:center;
}
`
const Place=styled(Autocomplete)`
width: 967px;
height: 56px;
background: #FFFFFF;
border: 1px solid #D9D9D9;
box-shadow: 0px 2px 6px rgba(25, 15, 15, 0.08);
border-radius: 32px;
padding:20px

&::placeholder {
  font-family: Roobert-medium;
}
`
const CalendarStyle=styled.div`
box-sizing: border-box;
width: 560px;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
height:400px;
.react-calendar {
    max-width: 90%;
    background: white;
    border: 1px solid white;
    height:250px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    padding-bottom:15px;
    padding-top:0;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile:disabled {
    color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
    border-radius: 26px;
  }
  .react-calendar__tile--hasActive {
    background: #D81159;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
    border-radius: 26px;
  }
  .react-calendar__tile--active {
    background: #D81159;
border: 1px solid #D81159;
border-radius: 26px;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #D81159;
border: 1px solid #D81159;
border-radius: 26px;
    color: white;
  }
`

const Toggle = styled.div`
background-color:#F3F3F3;
border-radius:26px;
.activeclass{
  color:#ffffff;
  background-color:#000;
  font-size:15;
  border-radius:26px;
  width:77px;
  text-align:center;
  padding-top:10px;
}
.class{
  color:#000;
  background-color:#F3F3F3;
  font-size:15;
  border-radius:26px;
  width:77px;
  text-align:center;
  padding-top:10px;
}
`