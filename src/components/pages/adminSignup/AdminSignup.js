import React, { useState } from 'react'
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import '../../layouts/phonenumber/phonenostyles.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import singlelogowhite from '../../../assets/singlelogowhite.png';
import swiftbellogo from '../../../assets/Logo.png'
import './SPStyles/spStyles.css'
import { adminSignup } from '../../../store/Actions/Auth.action';
import { ToastContainer, toast } from 'react-toastify';
const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState('')
    const [password, setPassword] = useState('')

    const [submit, setSubmit] = useState(false)
    const onSubmit = async () => {
        const details=  {
            "adminEmail":`${values}`,
            "adminPassword":password

        }
        if(isValid()){
            console.log(values,"value")
        const res = await dispatch(adminSignup(details))
        if (res.status === true) {
            navigate(`/business/signup`,{ state: values })
        }
        else
        {
            
            toast.error(`${res.message}`)
        }
    }
    else{
        setSubmit(true)
    }
    }
    const isValid=()=>{
        if(!values){
         return false
        }
        else if(!password){
            return false
           }
      
        else return true
     }
    return (
        <Container fluid className="sp-profile">
             <ToastContainer/>
            <Row>
                <ProfileLeft>
                    <Col lg={6} md={12} sm={12} xs={12}  >
                        <div className='headerCreate'>
                            <Row xs={1} md={4} lg={3} style={{ marginLeft: 10 }}>
                                <Col lg={1} md={5} sm={5} xs={5}>
                                    <h6 style={{fontWeight:'600',fontFamily:'Roobert-medium'}}  className='mt-3'>Back</h6>
                                </Col>
                                <Col lg={4} md={7} sm={7} xs={7} >
                                    <h6 style={{fontWeight:'600',fontFamily:'Roobert-medium'}} className='mt-3'>Sign Up</h6>
                                </Col>
                            </Row>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                                <img src={swiftbellogo} alt='logo' className='mobileprofilelogo' />
                            </div>
                            <p > Admin Signup</p>
                        </div>

                        <h1> Admin Signup</h1>
                        <img src={singlelogowhite} alt='logo' className='profilelogos' />
                    </Col>
                </ProfileLeft>
                <Col lg={6} sm={12} className="profileRight">
                    <Row className='owner-content'>
                        <InnerContent lg={12}>
                            <Form >
                                <Row className="mb-3 mt-5">
                                    <Form.Group controlId="formGridEmail">
                                        <StyledLabel>Admin Email *</StyledLabel>
                                        <StyledSMInput
                                            type="text"
                                             value={values}
                                            onChange={(e)=>setValues(e.target.value)}
                                            placeholder="Admin Email"
                                            autoComplete='new-off'
                                        />
                                          { !values && submit ? (
                                                   <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>Admin Email required</p>
                                                    ) : ''}
                                     <StyledLabel>Admin Password *</StyledLabel>
                                        <StyledSMInput
                                            type="text"
                                             value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                            placeholder="Admin Password"
                                            autoComplete='new-off'
                                        />
                                          { !password && submit ? (
                                                   <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>Admin Password required</p>
                                                    ) : ''}
                                       
                                    </Form.Group>
                                </Row>
                            </Form>

                        </InnerContent>
                    </Row>
                    <FixedFooter>
                        <a href="/"
                            className="backlink"
                        // onClick={handleBack}
                        >Back</a>
                        <Button
                            className='createProfile'
                            href='#'
                            variant='dark'
                            onClick={() => onSubmit()}
                        >Signup
                        </Button>
                    </FixedFooter>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminLogin;

const InnerContent = styled(Col)`
overflow-y: scroll;
width: 100%;
height: 88vh;
-ms-overflow-style: none;  /* IE and Edge */
scrollbar-width: none;
-ms-overflow-style: none;  /* IE and Edge */
scrollbar-width: none;

&::-webkit-scrollbar {
    display: none;
}
`
const ProfileLeft = styled(Col)`
background: #190F0F;
display: flex;
align-items: center;
justify-content: center;
h1 {
    font-weight: 600;
    font-size: 40px;
    line-height: 120%;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #FFFFFF;
    margin-left: 0.5rem;
    font-style:Roobert-medium;
  }
  .profilelogos {
    position: absolute;
    bottom: 1rem;
    left: 40rem;
  }

@media (min-width: 240px) and (max-width: 796px){
    background: #fff;
    align-items: center8
    justify-content: center;
   
   h1{
     display:none;
   }
   .profilelogos{
       display:none;
   }
    .headerCreate{
        align-items: center;
justify-content: center;
    h6{
        font-family: 'Roobert TRIAL';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 120%;
    }
    p{
        font-family:Roobert-medium;
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 136%;
        align-self:center;
        text-align:center;
    }
    .mobileprofilelogo{
        width: 25%;
        display:flex;
        align-items: center;
justify-content: center;
    }
    }
}
    @media (min-width: 793px) and (max-width: 8000px){
        .headerCreate{
            display:none;
        }
       
    }
`
const StyledLabel = styled(Form.Label)`
font-weight: 400;
font-size: 16px;
line-height: 120%;
display: flex;
align-items: center;
letter-spacing: 0.01em;
color: #190F0F;
`
const StyledSMInput = styled(Form.Control)`
height: 70px;
margin-bottom:20px;
background: #F3F3F3;
border-radius: 10px;
padding: 12px 12px 12px 12px;
border: none;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 2px solid #000000;
  background: #F3F3F3;
}
`
const FixedFooter = styled.div`
position: absolute;
bottom: 0;
left: 0;
height: 10vh;
width: 50vw;
border-top: 2px solid rgba(120, 115, 115, 0.16);
display: flex;
align-items: center;
justify-content: space-around;
flex-direction: row;
background-color: #fff;
.backlink {
    font-family: 'SF Pro Display';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    top: 1.5rem;
    left: 3.25rem;
    color: #190F0F;
    text-decoration: none;
    position: absolute;
  }
  .createProfile {
    top: 1rem;
    right: 4rem;
    position: absolute;
    border-radius: 10px;
    height: 40px;
    width: 150px;
    padding: 15px, 15px, 15px, 15px;
    font-family: 'SF Pro Display';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.02em;
    text-align: center;
  }
  @media (min-width: 240px) and (max-width: 796px){
    width: 100%;
    justify-content:center;
    .backlink {
        display:none;
    }
    .createProfile{
        justify-content:center;
        position: relative;
        margin-bottom:2.5rem;
        padding: 0px, 0px, 0px, 0px;
        margin-left:8rem;
        border-radius: 30px;
    }
  }

`