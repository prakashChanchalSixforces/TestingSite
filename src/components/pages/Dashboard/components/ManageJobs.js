import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import '../../../layouts/Auth/modalStyles.css'
import { getmanageJob, getWorkerList } from '../../../../store/Actions/Dashboard.actions';
import { Modal } from 'react-bootstrap';
import closebuttn from '../../../../assets/cancel.png';
import ProfileMap from '../../../layouts/googlemap/profileMap';
const ManageJobs = (props) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const init = async () => {
    const data = {
      referenceNo: props?.refrenceId
    }
    const res = await dispatch(getmanageJob(data))
    await dispatch(getWorkerList());
    setData(res?.data[0])

  }
  useEffect(() => {
    console.log("hooooo")
    if(props?.type==='upcomingJob')
    {
      init()
    }
    else{
      setData(props?.details)
    }

  }, [])


  return (
    <React.Fragment>
      <Multiselect className='d-flex justify-content-center mt-1' onClick={() => open ? setOpen(false) : setOpen(true)}>
        <Text2 className='mt-2'>Manage</Text2>
      </Multiselect>
      <Modal
        {...props}

        dialogClassName="auth-verification-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={open}
        onHide={() => setOpen(false)}
      >
        <Modal.Body>
          <ManageForm>
          <Header className='d-flex justify-content-between'>
            <p className='mt-2'>date and time:</p>
            <p className='mt-2'>{data?.time||"--"}</p>
            <Cross fill="#FFFFFF" stroke="#000000" className='mt-2' src={closebuttn} onClick={()=>setOpen(false)}/>
          </Header>
          <Segment>
          <div className='d-flex justify-content-between mt-2'>
          <p className='mt-2'>Service:</p>
            <ServiceText >{data?.serviceName||"--"}</ServiceText>
          </div>
          <div className='d-flex justify-content-between'>
          <p className='mt-2'>Client name:</p>
            <Text className='mt-2'>{data?.customer||"--"}</Text>
          </div>
          <div className='d-flex justify-content-between'>
          <p className='mt-2'>Contacts:</p>
            <Text className='mt-2'>Group chat</Text>
          </div>
          <hr/>
          <div className='d-flex justify-content-between'>
          <p className='mt-2'>Worker:</p>
          <Text className='mt-2'>{data?.workers?.join(',' + ' ').toString()} </Text>
          </div>
          <ProfileMap
          zoom={10}
          center={{"lat": data?.location?.lat||0,
              "lng": data?.location?.long||0}}
          />
          <hr/>
          <Footer>
          <div className='d-flex justify-content-between'>
          <p className='mt-2'>Customer Distance:</p>
            <Text className='mt-2'>{data?.customerDistance||"__"}</Text>
          </div>
          <div className='d-flex justify-content-between'>
          <p className='mt-2'>Travel time:</p>
            <Text className='mt-2'>{data?.travelTime||"__"}</Text>
          </div>
          <div className='d-flex justify-content-between'>
          <p className='mt-2'>Estimated Hours:</p>
            <Text className='mt-2'>{data?.travelTime||"__"}</Text>
          </div>
          </Footer>
          </Segment>
          </ManageForm>
        </Modal.Body>
      </Modal>
    </React.Fragment>

  )
}
export default ManageJobs;

const Multiselect = styled.button`
height:2.5rem;
width: 160px;
background: #F3F3F3;
border: 1px solid #F1F1F1;
box-sizing: border-box;
border-radius 8px;
margin-bottom:0.5rem;

`
const Text2 = styled.p`
color:#000 ;
font-size:14px;
margin-left: 1rem;
`
const Text=styled.p`
font-family: 'Open Sans';
  font-weight: 400;
  font-size: 14px;
  text-align:flex-start;
  width:60%;
`
const ManageForm = styled.div`
width: 100%;

`
const ServiceText=styled.p`
font-family: 'Open Sans';
  font-weight: 400;
  font-size: 14px;
  text-align:flex-start;
  width:60%;
  background:#FBE8EA;
  color:#D81159;
  border-radius:8px;
  padding:5px;

`
const Header =styled.div`
background:#787373;
padding-left:1.5rem;
padding-right:1rem;
color:#fff;
`
const Segment =styled.div`
background:#fff;
padding-left:1.5rem;
padding-right:1.5rem;
p{
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 14px;
  text-align:flex-start;
}

`
const Cross = styled.img`
width:25px;
height:25px;
align-items:center;
filter: contrast(160%);
background-color:#fff;
border-radius:20px;
`
const Footer=styled.div`
background: #fff;
background-color:#fff;
border: 1px solid #F3F3F3;
border-radius: 8px;
margin-left:3px;
padding:20px;

`