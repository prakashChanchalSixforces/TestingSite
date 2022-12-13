import React, { useState, useEffect } from 'react'
import { Modal, Form, Col, Button, Row, Container, Offcanvas } from 'react-bootstrap'
import '../../../layouts/Auth/modalStyles.css'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {  sendAdminEmail, sendRequest } from '../../../../store/Actions/Dashboard.actions';
import MobileNumber from '../../../layouts/phonenumber/MobileNumber';
import infoLogo from '../../../../assets/infologo.png'
const AdminEmailModal = (props) => {
    const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = mql.matches;
    const [phoneNumber, setPhoneNumber] = useState('')
   const [values,setValues]=useState('')

   const handlechange = (name,text) => (event, e) => {
    setValues(event.target.value)
    console.log(values,text, "value")
}
    const dispatch = useDispatch()

    const onSentInvite = async () => {
        let data = localStorage.getItem('data')
        let details = localStorage.getItem('values')
        let type = localStorage.getItem('type')
        let val=JSON.parse(details)
        let spval=JSON.parse(data)
        console.log(spval)
        const dat={
            "email": values,
            "objectId": val?._id,
            "serviceName":type,
            "serviceProviderId": spval?.spId,
            "finalPrice":spval?.finalPrice||"",
            "estimatedPrice":spval?.estimatedHourlyPrice||"",
        }
        const res=await dispatch(sendAdminEmail(dat))
          //const [secretKey] = useState('')
          console.log(JSON.parse(details))
          props?.CallBackModal(false)

    }
    const renderitem=()=>{
        return(
            <MemberForm>
            <Container>
                <Row>
                    <Col sm={11} lg={11} md={11} xs={11}>      
                        <br />
                        <StyledLabel>Email </StyledLabel>
                        <StyledInput
                            type="text"
                            placeholder="Email"
                            name='Email'
                            required
                            autoComplete='off'
                            onChange={handlechange('email')}
                            value={values?.email}
                        />
                    
                        <br/>
                        <SelectButton
                       
                            href='#'
                            variant='dark'
                            onClick={() => onSentInvite()}
                        >Send request
                        </SelectButton>
                       
                    </Col>
                </Row>
            </Container>
        </MemberForm> 
        )
    }
    return (
        <div>
            <Form.Group>
                <Modal
                    {...props}
                    dialogClassName="auth-verification-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={mobileView ? false : props?.show}
                    onHide={() =>props?.CallBackModal(false)}
                  
                >
                    <Header closeButton={() =>props?.CallBackModal(false)}  >
                       Send request
                    </Header>
                    <Modal.Body>
                        <div className='signup-modal-right'>
                          {renderitem()}
                        </div>
                    </Modal.Body>
                </Modal>

                <MobileModal show={props?.show} onHide={() => props?.CallBackModal(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => props?.CallBackModal(false)}>
                    <Offcanvas.Title>Send request</Offcanvas.Title>
                </Offcanvas.Header>
                {renderitem()}
            </MobileModal>

               </Form.Group></div>
    )
}
export default AdminEmailModal;
const MobileModal = styled(Offcanvas)`
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
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
const MemberForm = styled.div`
width: 100%;
top: 6.25rem;
justify-content: flex-start;
display: flex;
align-items: center;
flex-direction: column;
p{
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.02em;
  }
  .img{
    width: 18px;
height: 18px;
margin-left:20px;
margin-right:5px;
}
`
const SelectButton = styled(Button)`
height:50px;
justify-content:center;
align-items:center;
border-radius:10px;
display:flex;
margin-left:3rem;
margin-top:10px;
`
const StyledInput = styled(Form.Control)`
font-weight: 400;
margin-left:1.3rem;
border-radius: 8px;
height: 44px;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #F3F3F3;
  background: #fff;
}
@media (max-width: 530px) {
  margin-left:1.1rem;
}
`
const StyledLabel = styled(Form.Label)`
font-weight: 500;
font-size: 16px;
font-family:Roobert-medium;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.01em;
color: #190F0F;
margin-left: 1.3rem;
@media (max-width: 500px) {
  margin-left:1.1rem;
}
`