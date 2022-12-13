import React, { useEffect, useState } from 'react'
import { Button,FormSelect, Dropdown, Offcanvas } from 'react-bootstrap'
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { Searchservice } from '../../../store/Actions/User.action';
import '../UserHomepage/components/styles.css'
import SearchIcon from '../../../assets/search2.png'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
    import Lv from '../../../assets/lv.png'
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import { useNavigate } from 'react-router-dom';
import '../UserHomepage/Calendar.css'
import MobileSearch from '../UserHomepage/MobileSearch';

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function ServiceSearch(){
    const[searching,setSearching]=useState(false);
    const[searchingmob,setSearchingmob]=useState(false);

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
    const handleShowmodal = () =>{
    setSearching(true)
    }
    const handleShowmodalmob = () =>{
      setSearchingmob(true)
      }

    const handleClickAwayEvent=()=>{
      setSearching(false
        )
    }
    const OpenedServices=[
      'Pressure Washing',
      'Moving',
      'Electricians',
      'Plumbers',
      //'Cleaning',
    ]

    console.log(new Date())
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
     res = await dispatch(Searchservice(values));
     if(res.status===false){
        console.log(res.message)
     }
     else if(res.status===true&&res.message==='Success'){
        navigate(`/${activeService.toLowerCase().split(" ").join("")||'moving'}`,{state:{data:res.data,name: decodeURI(activeService)||'Moving',address:address,date:date,time:time}})

     }
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
  }

    useEffect(()=>{
if(timedetails?.hour?.length>0&&timedetails?.ampm?.length>0){
  setTime(timedetails?.hour+''+timedetails?.ampm)
  setValues({...values,'time':timedetails?.hour+''+timedetails?.ampm})
}
    },[timedetails,values])

const Parameters=[
{
title:'Service',
activeClass:'activemodule',
class:'service',
type:'service',
description:'Select service you need',
vr:true
},
{
title:'Address',
activeClass:'activemodule',
class:'module',
type:'address',
description:'Enter your address',
vr:true
},
{
title:'Date and time',
activeClass:'activemodule',
class:'datetime',
type:'dateandtime',
description:'Enter date and time',
vr:false
},
]

function controlDescription(itemtype,itemdescription){
if(activetype&&itemtype==='service'){
if(activeService){
return activeService
}
else return itemdescription
}
else if(activetype&&itemtype==='address'){
if(address?.length>0){
return address?.slice(0,55)
}
else return itemdescription
}
else if(activetype&&itemtype==='dateandtime'){
if(date&&time){
return `Date : ${date}  ,  Time: ${time}`
}
else return itemdescription
}
else return itemdescription
}
return(
    <React.Fragment>
    {searching===true?
    <>
    <ClickAwayListener onClickAway={handleClickAwayEvent}>
    <Main>
    <div className='d-flex justify-content-center'>
    <AfterSearch className='animationclass'>
    {Parameters?.map((item,index)=>{
            return(<>
      <div className={
      activetype===item?.type ?
      item?.activeClass:
      item?.class
      } onClick={()=>setActivetype(item?.type)} key={index} >
       <Head> {item?.title} </Head>
       <Desc>
       {controlDescription(item?.type,item?.description)}
       </Desc>
        </div>
        {activetype!==item?.type &&
        item?.vr===true?
        <img src={Lv} alt='lv' className='module'/>
        :''}
        </>
            )})}
      <Rightsearch onClick={()=>handlesubmit()}>
        <h5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>&nbsp;Search</h5>
        </Rightsearch>
    </AfterSearch>
    </div>
    <div className='d-flex justify-content-center'>
     {activetype==='service'?
      <DropdownMenu show={true}
      className='animationclass'>
    <Inputs className='p-2'>
    <div md={4} className=' servicesdiv p-3'>
        {service?.map((x,index)=>{
            return(
              OpenedServices.includes(x?.name)?
     <div className={activeService===x?.name?'activeservice mb-3':' service mb-3'}
     key={index} onClick={()=>{handleactiveservice(x?.name)}}>
       {x?.name}
        </div>:null
        )})}
     </div>
    </Inputs>
    </DropdownMenu>
    :
    activetype==='address'?
     <DropdownMenu show={true}
     className='animationclass'>
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
    </DropdownMenu>

    :
    activetype==='dateandtime'?
    <DropdownMenu show={true}
    className='animationclass'>
  <CalendarStyle>
    <div className='p-3 d-flex justify-content-center'>
    <Calendar className='react-calendar' minDate={new Date()} onChange={handleData('date')} pages={2} />
    </div>
      <div className='d-flex justify-content-center' >
      <b className='mt-2'>Time :</b> &nbsp;&nbsp;&nbsp;
      <FormSelect placeholder='hours' onChange={handleData('hours')} className='hoursselect'>
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
    </Main>
    </ClickAwayListener>
    </>
    :
    <Searchbutton variant="light" onClick={()=>handleShowmodal()}>
    Service<span className='greyvr'>|</span>Address<span className='greyvr'>|</span>Date and time
           <SearchImage src={SearchIcon} />
    </Searchbutton>
    }
    <Searchbuttonmob variant="light" onClick={()=>handleShowmodalmob()}>
    Service<span className='greyvr'>|</span>Address<span className='greyvr'>|</span>Date and time
           <SearchImage src={SearchIcon} />
    </Searchbuttonmob>
    <MobileModal show={searchingmob} onHide={() => setSearchingmob(false)} placement={'bottom'} style={{ height: '650px' }}>
     <Offcanvas.Header closeButton={() => setSearchingmob(false)}>
         <Offcanvas.Title>Search</Offcanvas.Title>
     </Offcanvas.Header>
     <MobileSearch/>
 </MobileModal>
    </React.Fragment>
)
}
export default ServiceSearch

const Main=styled.div`
@media (min-width: 200px) and (max-width: 1000px){
  display:none
}
display:flex;
.animationclass{
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
}
  `
const Searchbutton=styled(Button)`
border-radius: 50px;
border:1px solid #F3F3F3;
position:absolute;
background: #FFFFFF;
cursor:pointer;
display:flex;
justify-content:center;
padding-top:12px;
padding-bottom:8px;
padding-left:20px;
font-family:Inter;
font-weight: 400;
font-size: 14px;
.greyvr{
  color:lightgray;
  margin-left:16px;
  margin-right:16px;
}
@media (min-width: 200px) and (max-width: 1000px){
  display:none;
}
`
const Searchbuttonmob=styled(Button)`
border-radius: 50px;
border:1px solid #F3F3F3;
background: #FFFFFF;
cursor:pointer;
display:flex;
justify-content:center;
padding-top:12px;
padding-bottom:8px;
padding-left:20px;
font-family:Inter;
font-weight: 400;
font-size: 14px;
.greyvr{
  color:lightgray;
  margin-left:16px;
  margin-right:16px;
}
@media (min-width: 1001px) and (max-width: 9999px){
  display:none;
}
`
const MobileModal = styled(Offcanvas)`
border-radius:15px;
background-color:#FAFAFA;
@media (min-width: 1001px) and (max-width: 9999px){
  display:none;
}
`

const DropdownMenu = styled(Dropdown.Menu)`
position:absolute;
background-color:transparent;
padding:0px;
border-radius:32px;
margin-top:100px;
`

const Rightsearch=styled.div`
background:#D81159;
background-color:#D81159;
width:150px;
border-radius:0px 45px 45px 0px;
color:white;
text-align:center;
padding-top:25px;
margin-top:-0.5px;
font-family:Roobert-medium;
`
const SearchImage = styled.img`
height:32px;
width:32px;
margin-left:10px;
margin-top:-5px;
`

const AfterSearch = styled.div`
height: 80px;
border: 1px solid #D9D9D9;
border-radius: 56px;
display:flex;
justify-content:space-between;
cursor:pointer;
position:absolute;
.activemodule{
box-sizing: border-box;
height: 80px;
border: 1px solid #D9D9D9;
box-shadow: 0px 2px 6px rgba(25, 15, 15, 0.08);
border-radius: 56px;
padding-left:50px;
padding:13px;
width:290px;
margin:-0.5px;
}
.module{
padding:13px;
padding-left:50px;
}
.service{
padding:13px;
padding-left:80px;
width:300px;
}
.datetime{
padding:13px;
padding-right:30px;
width:300px;
}

`
const Head = styled.p`
text-align:center;
margin-bottom:10px;
font-size:16px;
color:#190F0F;
font-weight: 500;
font-family:Roobert-medium;
`
const Desc = styled.h6`
text-align:center;
color:gray;
margin-top:-10px;
font-size:14px;
font-weight: 400;
font-family:Inter;
`
const Inputs=styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
box-shadow: 0px 2px 6px rgba(25, 15, 15, 0.08);
border-radius: 32px;
margin:-0.5px;
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
.servicesdiv{
display:flex;
flex-wrap:wrap;
justify-content:evenly;
}
`
const Place=styled(Autocomplete)`
width: 967px;
height: 56px;
margin:-0.5px;
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
margin:-0.5px;
padding-bottom:30px;
.hoursselect{
border-radius:30px;
width:190px;
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