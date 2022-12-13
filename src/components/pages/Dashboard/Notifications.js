
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Container, FormSelect, Modal,ModalBody } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import arrowaddpost from '../../../assets/arrowAddPosts.png'
import tick from '../../../assets/tick.png'
import styled from 'styled-components'
import { acceptJob, getNotificationData } from '../../../store/Actions/Dashboard.actions'
import { Calendar } from 'react-calendar'
import { TimeList } from '../CompanyProfile/component/TimeList'
import moment from 'moment'

function Notifications(){
  const {  notificationData } = useSelector(state => state.dashboardReducer)
  console.log(notificationData,'notifdata')
  const dispatch=useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [show, setShow] = useState(false);
  // const[timedetails,setTimedetails]=useState({'ampm':'AM'})
  const[refno,setRefno]=useState('')

  const [proposeval,setProposeval]=useState({
    "referenceNo": '',
    "bookingStatus": "confirmed",
    "newTime": "",
    "newDate": " "
  })

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setRefno(id)
  }
  useEffect(()=>{
    init()
  },[])
  const init=async()=>{
    await dispatch(getNotificationData())
  }
  console.log(proposeval,refno,'proposebal')


  const handleaccept=async(id)=>{
   let res = await dispatch(acceptJob({
    "referenceNo": id,
    "bookingStatus": "confirmed"
   },'notif'))
   if(res.message==='Success'){
    setModalShow(true)
}
  }
  const handledeclined=async(id)=>{
    await dispatch(acceptJob({
     "referenceNo": id,
     "bookingStatus": "Rejected"
    },'notif')
    )
   }

   const handlepropose=(name)=>(e)=>{
    let value = name==='newDate'?moment(e).format('LL')
    :e.target.value
    setProposeval({...proposeval,[name]:value})
    }

const proposesubmit= async()=>{
   let res= await dispatch(acceptJob({...proposeval,"referenceNo":refno}))
   if(res.message==='Success'){
    setShow(false)
   }
   return res
}
return(
    <Main>
        <SucessfulModal
                show={modalShow}
                size='md'
                onHide={() => {
                    setModalShow(false)
                }}
                centered
            >
                <Modal.Header style={{ height: "55px" }} closeButton={() => {
                    setModalShow(false)


                }} >
                    <img src={arrowaddpost} alt='back' onClick={() => {
                        setModalShow(false)
                    }}></img>

                </Modal.Header>
                <ModalBody style={{ alignItems: 'center' ,paddingTop:'40px',paddingBottom:'40px',}}>
                <div style={{justifyContent:'center',display:'flex'}}>
                    <img src={tick} alt='' style={{ width: '80px', height: '80px' }} />
                    </div>
                    <SuccesfulHeader>Booking accepted </SuccesfulHeader>
                    <Text>You can view the booking in upcoming jobs.</Text>
                    </ModalBody>
            </SucessfulModal >
        <Head>Notifications</Head>
        <br/>
    <Segment className='d-flex justify-content-between align-items-center p-2'>
    <Sort>Sort by recent</Sort>
    <Mark>Mark all as read</Mark>
    </Segment>
    <Day fluid >
        <Sort className='p-2' style={{marginLeft:'20px'}}>TODAY</Sort>
    </Day>

    {notificationData.map((item,index)=>{
        return(
            <>
    <Data>
        {/* <Head2>New payment method added</Head2>
        <SubText>You add a new payment method using card: 2244 5212 **** 5125</SubText> */}
        <div className='d-flex p-2'>
          <div>
          <Dot></Dot>
          <Table>
  <tr>
    <td>
      <Heading>Date and Time</Heading>
      <SubText2>{item?.data?.date||'--'}</SubText2>
    </td>
    <td>
      <Heading>Service</Heading>
      <SubText2>Moving</SubText2>
    </td>
    <td>
      <Heading>Price</Heading>
      <SubText2>{item?.amount||'--'}</SubText2>
    </td>
    <td>
      <Heading>Distance</Heading>
      <SubText2>{item?.data?.distance||'--'}</SubText2>
    </td>
    <td>
      <Heading>Customer's Name</Heading>
      <SubText2>{item?.customer||'--'}</SubText2>
    </td>
  </tr>
  <tr>
    <td>
      <Heading>Type of house</Heading>
      <SubText2>{item?.data?.typeOfHouse||'--'}</SubText2>
    </td>
    <td>
      <Heading>Number of rooms</Heading>
      <SubText2>{item?.data?.numberOfRooms||'--'}</SubText2>
    </td>
    <td>
      <Heading>Approx. size in ft2</Heading>
      <SubText2>{item?.data?.approxSizeInSqFt||'--'}</SubText2>
    </td>
    <td>
      <Heading>Item weight</Heading>
      <SubText2>{item?.data?.howHeavyBelongings||'--'}</SubText2>
    </td>
    <td>
      <Heading>Cupboard weight</Heading>
      <SubText2>{item?.data?.howHeavyCupboard||'--'}</SubText2>
    </td>
  </tr>
  <tr>
  <td>
      <Heading>Elevator availability?</Heading>
      <SubText2>{item?.data?.elevatorAvailable||'--'}</SubText2>
    </td>
    <td>
      <Heading>Destination</Heading>
      <SubText2>{item?.data?.toAddress||'--'}</SubText2>
    </td>
  </tr>
</Table>
          </div>
          <div>
          <SubText >{item?.data?.date}</SubText>
          </div>
        </div>
        <div className='d-flex p-4'>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>
            <div className='d-flex justify-content-between'>
            <p>Propose new time</p>
            <SubText2 style={{marginLeft:'100px',marginTop:'10px'}}>Current time: Thu, Dec 7 AM</SubText2>
            </div>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CalendarStyle>
    <div className='p-3 d-flex justify-content-center'>
    <Calendar className='react-calendar' minDate={new Date()}
    onChange={handlepropose('newDate')}
    pages={2} />
    </div>
    <br/>
    <br/>
          </CalendarStyle>
                      </Modal.Body>
            <br/>
        <Modal.Footer>
        <div className='d-flex justify-content-center'>
      <FormSelect placeholder='time'
    onChange={handlepropose('newTime')}
    style={{borderRadius:'30px',width:'140px'}}>
      <option value=''>Time</option>
      {TimeList.map((x,index)=>{
        return(
          <option value={x} key={index}>{x}</option>
        )
      })}
      </FormSelect>&nbsp;&nbsp;&nbsp;&nbsp;
      {/* <FormSelect placeholder='hours'
       onChange={handleData('hours')}
        style={{borderRadius:'30px',width:'100px'}}>
      <option value=''>to</option>
      {TimeList.map((x,index)=>{
        return(
          <option value={x} key={index}>{x}</option>
        )
      })}
      </FormSelect>&nbsp;&nbsp;&nbsp;&nbsp;
      */}
       <Modalrepropose variant='dark' onClick={proposesubmit} >
         propose
         </Modalrepropose>
      <Cancel variant='dark' onClick={handleClose} >
         Cancel
         </Cancel>
         &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
        </Modal.Footer>
      </Modal>

         <Repropose variant='dark' onClick={()=>handleShow(item?.bookingNo)}>
         Propose new time
         </Repropose>
         <Decline variant='dark' onClick={()=>{handledeclined(item?.bookingNo)}}>
         Decline
         </Decline>
         <Accept variant='dark' onClick={()=>{handleaccept(item?.bookingNo)}}>
            Accept
         </Accept>
        </div>
        <hr/>
    </Data>
    </>
        )
    })}
    </Main>
)
}
export default Notifications

const Sort = styled.h1`
font-size: 14px;
text-align: start;
font-family:Open Sans;
`
const SucessfulModal = styled(Modal)`
position: absolute;
top: 38%;
left: 50%;
transform: translate(-50%, -50%);
height: 70vh;
width: 50vw;
margin-right: -50%;
overflow: hidden;
border-radius:10px;
`

const Heading = styled.p`
font-size: 14px;
font-family:Open Sans;
`
const Data = styled.div`
margin-left:30px;
@media (min-width: 1250px) and (max-width: 1521px){
    margin-right:200px;
    }
`
const Repropose=styled(Button)`
border-radius: 50px;
padding: 8px 48px;
background-color:#F3F3F3;
background:#F3F3F3;
border:1px solid #F3F3F3;
margin-right:20px;
color:black;
font-size: 14px;
`
const Modalrepropose=styled(Button)`
border-radius: 50px;
padding: 5px 45px;
font-size: 14px;
`
const Cancel=styled(Button)`
border-radius: 50px;
padding: 5px 45px;
font-size: 14px;
background-color:#F3F3F3;
background:#F3F3F3;
border:1px solid #F3F3F3;
color:black;
`
const Decline=styled(Button)`
border-radius: 50px;
padding: 8px 48px;
background-color:white;
background:white;
border:1px solid black;
margin-right:20px;
color:black;
font-size: 14px;
`
const Accept=styled(Button)`
border-radius: 50px;
color:white;
padding: 8px 48px;
background-color:#D81159;
background:#D81159;
border:1px solid #D81159;
margin-right:20px;
font-size: 14px;
`
const Dot = styled.div`
background: #D81159;
background-color: #D81159;
border-radius:50%;
color:#D81159;
height:7px;
width:7px;
`
const Head = styled.h1`
font-size: 24px;
text-align: start;
padding-left:35px;
`
const Table = styled.table`
td{
    border:1px solid #F3F3F3;
    padding:10px;
    width:200px;
}
border:1px solid #F3F3F3;
padding:20px;
margin-left:20px;

`
const SubText = styled.h1`
font-size: 14px;
color: #787373;
padding-left:35px;
font-family:Open Sans;
`
const SubText2 = styled.h1`
font-size: 13px;
color: #787373;
font-family:Open Sans;
`
const Day = styled(Container)`
background-color:#F3F3F3;
background:#F3F3F3;
color:#190F0F;
font-family:Open Sans;
`
const Mark = styled.p`
font-size: 14px;
color: #D81159;
text-decoration-line: underline;
font-family:Open Sans;
`
const Segment = styled.div`
margin-left:30px;
margin-right:400px;
font-family:Open Sans;
`
const Main = styled.div`
margin-top:60px;
@media (min-width: 1250px) and (max-width: 1521px){
width:80%;
overflow-x:auto;   
 }
`
const SuccesfulHeader = styled.h1
    `
font-weight: 600;
font-size: 2rem;
line-height: 120%;
display: flex;
align-items: center;
letter-spacing: 0.01em;
justify-content:center;
display:flex;
margin-top: 2.25rem;
margin-bottom: 1.25rem;

`
const Text = styled.p
    `
    font-weight: 300;
    font-size: 1rem;
    line-height: 120%;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    justify-content:center;
    display:flex;
    margin-top: 0.30rem;


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
