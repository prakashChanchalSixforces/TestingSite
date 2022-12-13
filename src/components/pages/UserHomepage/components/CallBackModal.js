import React, { useState, useEffect } from 'react'
import { Modal, Form, Col, Button, Row, Container, Offcanvas } from 'react-bootstrap'
import '../../../layouts/Auth/modalStyles.css'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {  sendRequest } from '../../../../store/Actions/Dashboard.actions';
import MobileNumber from '../../../layouts/phonenumber/MobileNumber';
import infoLogo from '../../../../assets/infologo.png'
import moment from 'moment';
const CallBackModal = (props) => {
    const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = mql.matches;
    const [phoneNumber, setPhoneNumber] = useState('')
   const [values,setValues]=useState({

   })

   const handlechange = (name,text) => (event, e) => {
    let value = name==="phone"?text:event.target.value
    setValues({...values,[name]:value})
    console.log(values,text, "value")
}
    const dispatch = useDispatch()

    const onSentInvite = async () => {
        const data={...values,"phone":phoneNumber,"businessName":props?.serviceName}
        const res = await dispatch(sendRequest(data))

        console.log(res)
       props?.CallBackModal(false)

    }
    const renderitem=()=>{
        return(
            <MemberForm>
            <Container>
                <Row>
                    <Col sm={11} lg={11} md={11} xs={11}>
                        <br />
                        <StyledLabel>First Name </StyledLabel>
                        <StyledInput
                            type="text"
                            placeholder="First Name"
                            name='Name'
                            required
                            autoComplete='off'
                            onChange={handlechange('firstName')}
                            value={values?.firstName}
                        />
                        <br />
                        <StyledLabel>Last Name </StyledLabel>
                        <StyledInput
                            type="text"
                            placeholder="Last Name"
                            name='Name'
                            required
                            autoComplete='off'
                            onChange={handlechange('lastName')}
                            value={values?.lastName}
                        />
                        <br />
                        <StyledLabel>Mobile Number </StyledLabel>
                        <div>
                            <MobileNumber
                                name='phoneinput'
                                international
                                className='li'
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                focusInputOnCountrySelection='true'
                                defaultCountry="CA"
                                onChange={(value) => {
                                    setPhoneNumber(value)
                                  }}
                                limitMaxLength='true'
                            />
                        </div>
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
                        <div className='d-flex justify-content-center'>
                        <img className='img mt-2' src={infoLogo} alt='' />
                        <p className='mt-2'>{moment(new Date()).format("HH:mm")>"18:00"?"Estimated call back time: Tomorrow at 9:00 AM":"Estimated call back time - 2 minutes"} </p>
                   
                        </div>
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
                        Call back request
                    </Header>
                    <Modal.Body>
                        <div className='signup-modal-right'>
                          {renderitem()}
                        </div>
                    </Modal.Body>
                </Modal>

                <MobileModal show={props?.show} onHide={() => props?.CallBackModal(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => props?.CallBackModal(false)}>
                    <Offcanvas.Title> Call back request</Offcanvas.Title>
                </Offcanvas.Header>
                {renderitem()}
            </MobileModal>

               </Form.Group></div>
    )
}
export default CallBackModal;
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