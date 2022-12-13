import React, { useState } from 'react'
import { Button, FormSelect, Modal, Row } from 'react-bootstrap'
import styled from 'styled-components'
import HeaderTop from '../../layouts/headerTop';
import Logo from '../../../assets/companyprofilelogo.png'
import box from '../../../assets/notifyBox.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { TimeList } from '../CompanyProfile/component/TimeList';
import { Calendar } from 'react-calendar';
import { acceptJob, getBookings } from '../../../store/Actions/Dashboard.actions';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import MainFooter from '../MainFooter/MainFooter';

// const Tab = styled.button`
//   font-size: 16px;
//   font-family:Roobert-medium;
//   padding: 7px 0px;
//   cursor: pointer;
//   opacity: 0.6;
//   background: transparent;
//   border: 0;
//   outline: 0;
//   margin-right:50px;
//   color:#787373;
//   ${({ active }) =>
//     active &&
//     `
//     color:black;
//     border-bottom: 2px solid black;
//     opacity: 1;
//   `}
// `;
// const ButtonGroup = styled.div`
//   display: flex;
//   width:100%;
//   border-bottom: 1px solid #D9D9D9;
// `;

function Booking(){
    //const types = ['Upcoming bookings', 'On-going bookings', 'Past bookings'];
    //const [active, setActive] = useState(types[0]);
    const [modifyshow, setModifyshow] = useState(false);
    const [cancelshow, setCancelshow] = useState(false);
    const[refno,setRefno]=useState('')
    const [proposeval,setProposeval]=useState({
        "referenceNo": '',
        "bookingStatus": "confirmed",
        "newTime": "",
        "newDate": " "
      })
    const handlepropose=(name)=>(e)=>{
        let value = name==='newDate'?moment(e).format('LL')
        :e.target.value
        setProposeval({...proposeval,[name]:value})
        }
        const proposesubmit= async()=>{
            let res= await dispatch(acceptJob({...proposeval,"referenceNo":refno},'bookings'))
            if(res.message==='Success'){
                handlemodify()
            }
            return res
         }
         const Confirmcancel=async()=>{
            let res=  await dispatch(acceptJob
                ({
                "referenceNo": refno,
                "bookingStatus": "Declined"
               }
               ,'bookings')
              )
              if(res.status===true){
                handlecancelclose()
                        }
            return res
         }
    const dispatch = useDispatch()
    const init = async () => {
        await dispatch(
            getBookings()
            )
    }
const handlemodify=()=>{
    setModifyshow(false)
}
const handlecancelclose=()=>{
    setCancelshow(false)
}
    useEffect(()=>{
    init()
    },[])
    const Bookings = useSelector(state => state.customerReducer.bookings.upcomingJobs);

const handlemodifybooking=(id)=>{
setModifyshow(true)
setRefno(id)
}
const navigate=useNavigate();
const handlecancel=(id)=>{
    setCancelshow(true)
     setRefno(id)
    }
    console.log(Bookings,'booking')

    const canceldetails = Bookings?.filter(x=>x.referenceNo===refno)
    console.log(canceldetails,'canceldetails')
return(
    <React.Fragment>
    <HeaderTop/>
    <Main>
    <Heading>Bookings</Heading>
    {/* <ButtonGroup>
        {types.map(type => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      <p /> */}
      {
      Bookings?.length>1?
      Bookings?.map((item,index)=>{
        return(
            <>
            <Segment key={index}>
       <div className='d-flex justify-content-between pb-3'>
<div className='d-flex justify-content-around'>
<div>
<Img src={item?.serviceProvider?.logoImage||Logo}/>
</div>
<div>
    <Title>{item?.serviceProvider?.businessName}</Title>
    <Subtitle>{item?.serviceProvider?.tagLine}</Subtitle>
</div>
</div>
<Statusdiv className='d-flex'>
<Dot className={item?.confirmation==='Accepted'?'confirmed':item?.confirmation==='Declined'?'declined':'pending'}></Dot><Status className={item?.confirmation==='Accepted'?'confirmedtext':item?.confirmation==='Declined'?'declinedtext':'pendingtext'}>{item?.confirmation}</Status>
</Statusdiv>
       </div>
       <br/>
       <div className='d-flex justify-content-between'>
<div className='d-flex justify-content-between'>
<Data>
    <p className='head'>Date</p>
    <p className='text'>{item?.date}</p>
</Data>

<Data >
<p className='head'>Time</p>
<p className='text'>{item?.time}</p>
</Data>
<Data >
<p className='head'>Location</p>
<p className='text'>{item?.location}</p>
</Data>
<Data >
<p className='head'>Service</p>
<p className='text'>{item?.service}</p>
</Data>
</div>
<div className='d-flex'>
<Modify variant={'light'}
onClick={()=>handlemodifybooking(item?.referenceNo)}
>Modify booking</Modify>
<Modify variant={'dark'} onClick={()=>handlecancel(item?.referenceNo)}>Cancel</Modify>
 </div>
       </div>
       <Modal
               size='md'
               show={modifyshow}
               dialogClassName="auth-verification-modal"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               onHide={handlemodify}
             >
               <Header closeButton={handlemodify}>
                 Modify booking
               </Header>
               <Modal.Body>
               <CalendarStyle>
    <div className='p-3 d-flex justify-content-center'>
    <Calendar
    className='react-calendar' minDate={new Date()}
    onChange={handlepropose('newDate')}
    pages={2} />
    </div>
    <br/>
    <br/>
          </CalendarStyle>
                      </Modal.Body>
            <br/>
        <Modal.Footer>
        <div className='d-flex justify-content-between'>
      <FormSelect
      placeholder='time'
      onChange={handlepropose('newTime')}
    style={{borderRadius:'8px',width:'140px'}}>
      <option value=''>Time</option>
      {TimeList.map((x,index)=>{
        return(
          <option value={x} key={index}>{x}</option>
        )
      })}
      </FormSelect>&nbsp;&nbsp;&nbsp;&nbsp;
       <Modify variant='dark'
        onClick={proposesubmit}
        >
         Modify
         </Modify>
      <Modify variant='light' onClick={handlemodify} >
         Cancel
         </Modify>
         &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      </Modal.Footer>
            </Modal>


            <Modal
        size='md'
        show={cancelshow}
        dialogClassName="auth-verification-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handlecancelclose}
      >
        <Header closeButton={handlecancelclose}>
          Confirm changes
        </Header>
          <CancelHead>You want to Cancel booking “{item?.service}” service.
Please confirm the action.</CancelHead>
<br/>
 <CancelData className='d-flex justify-content-around'>
<div>
<div className='data'>
<p className='head'>Date</p>
<p className='text'>{canceldetails[0]?.date}</p>
</div>
<div className='data'>
<p className='head'>Location</p>
<p className='text' style={{width:'150px'}}>{canceldetails[0]?.location}</p>
</div>
</div>
<div>
<div className='data'>
<p className='head'>Time</p>
<p className='text'>{canceldetails[0]?.time}</p>
</div>
<div className='data'>
<p className='head'>Service</p>
<p className='text'>{canceldetails[0]?.service}</p>
</div>
</div>
</CancelData>
<br/>
<br/>
<div className='d-flex justify-content-around'>
<Cancel variant={'light'}
 onClick={handlecancelclose}>Cancel</Cancel>
<Cancel variant={'dark'} onClick={Confirmcancel}>Confirm</Cancel>
 </div>
        <Modal.Footer className='d-flex justify-content-center'>
            <Foot className='d-flex justify-content-center'>
            <p>Сonditions of refunds</p>&nbsp;<p className='terms'>Payment Terms of Service</p>
            </Foot>
        </Modal.Footer>
      </Modal>
      </Segment>
      </>
       )
    })
:
<Headings className='mt-5'>
     <p className='d-flex justify-content-center nobook'>No Bookings Yet </p>
     <div className='d-flex justify-content-center'><Boximage src={box}/></div>
    <div className='d-flex justify-content-center mt-3'><StartBooking onClick={()=>navigate('/')} variant='dark'>Start Booking</StartBooking></div>
  </Headings>
}
            </Main>
    <br/>
    <br/>
    <br/>
    <div style={{position: Bookings?.length>3?'':'absolute',bottom: 0,width: '100%', height: '90px'}}>
   <MainFooter/>
   </div>
   </React.Fragment>
)
}
export default Booking


const Main = styled.div`
padding-left:3rem;
padding-right:3rem;
padding-top:3rem;
@media (min-width: 1800px) and (max-width: 2500px)
{
    padding-left:250px;
    padding-right:250px;
}
@media (min-width: 2501px) and (max-width:3000px)
{
    padding-left:350px;
    padding-right:350px;
}
@media (min-width: 3001px) and (max-width:4000px)
{
    padding-left:650px;
    padding-right:650px;
}
@media (min-width: 4001px) and (max-width:9999px)
{
    padding-left:1350px;
    padding-right:1350px;
}
`
const Foot=styled.div`
font-size: 14px;
font:Inter;
padding-top:30px;
.terms{
    color:#D81159;
}
`
const Cancel=styled(Button)`
border-radius: 8px;
padding: 5px 45px;
font-size: 14px;
width:208px;
height 44px;
border:1px solid #F3F3F3;
`

const CancelData=styled.div`
padding-right:70px;
margin-left:-30px;
.head{
    color: #787373;
    font-size: 12px;
    font:Inter;
}
.text{
    font-size: 16px;
    margin-top:-14px;
    font:Inter;
}
`
const Heading = styled.p`
font-family:Roobert-medium;
font-size: 36px;
width:200px;
.nobook{
font-size: 22px;
}
`
const Headings = styled.div`
font-family:Roobert-medium;
font-size: 36px;
border:1px solid lightgray;
padding:30px;
border-radius:8px;
width:300px;
.nobook{
font-size: 22px;
}
`
const Title = styled.p`
font-family:Roobert-medium;
font-size: 24px;
margin-left:10px;
`
const Subtitle = styled.p`
font:Inter;
font-size: 14px;
margin-top:-18px;
margin-left:10px;
`
const Boximage=styled.img`
height:100px;
width:100px;
`
const StartBooking=styled(Button)`
width: 206px;
height: 44px;
border-radius: 8px;
font-size: 14px;
`
const Segment = styled(Row)`
background: #FAFAFA;
background-color:#FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 8px;
margin-left:3px;
padding:20px;
margin-top:30px;
@media (min-width: 1500px) and (max-width: 9999px)
{
    width :1400px;
}
`
const Header = styled(Modal.Header)
  `
font-weight: 400;
font-size: 16px;
display: flex;
letter-spacing: 0.01em;
font-family:Open Sans;
color: #787373;
justify-content:center;
text-align:center;
margin-left:10px;
margin-right:10px;
`

const Img = styled.img`
border-radius:50%;
height:80px;
width:80px;
margin-right:15px;
`
const Dot = styled.div`
border-radius:50%;
height:7px;
width:7px;
`
const Status=styled.p`
font-size: 14px;
margin-top:-7px;
margin-left:5px;
font:Inter;
`
const Data=styled.div`
padding-right:60px;
.head{
    color: #787373;
    font-size: 12px;
    font:Inter;
}
.text{
    font-size: 16px;
    margin-top:-14px;
    font:Inter;
}

`
const Modify = styled(Button)`
font-family:Roobert-medium;
width:131px;
height:44px;
border:1px solid #F3F3F3;
font-size: 14px;
margin-right:10px;
border-radius: 8px;
`

const Statusdiv=styled.div`
.pending{
background:#FFCF23;
background-color:#FFCF23;
}
.confirmed{
background:#59D811;
background-color:#59D811;
}
.declined{
    background:red;
    background-color:red;
}
.pendingtext{
color:#FFCF23;
}
.confirmedtext{
color:#59D811;
}
.declinedtext{
    color:red;
}
`
const CalendarStyle=styled.div`
.react-calendar {
    max-width: 90%;
    background: white;
    border: 1px solid white;
    height:260px;
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
    color: black;
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
const CancelHead=styled.p`
font: 'Roobert Medium';
font-size: 18px;
font-weight: 500;
padding-left:28px;
padding-top:40px;
`