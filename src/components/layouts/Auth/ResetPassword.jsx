import React, { useState } from 'react';
import { Button, Form, Modal, Col, Row, Container, Offcanvas } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './modalStyles.css';
import invalidCross from '../../../assets/invalidCross.png'
import validSign from '../../../assets/validSign.png'
import { SubmitResetPassword } from '../../../store/Actions/Auth.action';


const ResetPassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [eightCharacters, setEightCharacters] = useState(false);
  const [numberSymbol, setNumberSymbol] = useState(false);
  const [nameEmail, setNameEmail] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [show, setShow] = useState(false);

  var eightCharRegex = new RegExp("^(?=.{8,})");
  var email_validation_regex = new RegExp('^(?=.*[a-z])')
  var numberSymbolRegex = new RegExp("^(?=.*[!@#$%^&*])|(?=.*[0-9])");

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  }

  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordFocus(true);
  }

  const handlePasswordChange = (event) => {
    var text = event.target.value;
    setPassword(text);

    if (/[a-zA-Z]/g.test(text) && /[0-9]/g.test(text)) {
      setPasswordStrength(true);
    } else {
      setPasswordStrength(false);
    }

    if (eightCharRegex.test(text)) {
      setEightCharacters(true);
    } else {
      setEightCharacters(false);
    }

    if (email_validation_regex.test(text)) {
      setNameEmail(true);
    } else {
      setNameEmail(false);
    }

    if (numberSymbolRegex.test(text)) {
      setNumberSymbol(true);
    }
    else {
      setNumberSymbol(false);
    }
  }

  const navigateToHome = () => {
    navigate('/business');
    props.setVerificationModal(false);
  }

  const handleConfirmPasswordChange = (event) => {
    var text = event.target.value;
    setConfirmPassword(text);
    if (password === event.target.value) {
      setPasswordMatch(true);
    }
  }

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordFocus(false);
    }
  }

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) {
      setConfirmPasswordFocus(false);
    }
  }

  const handleShowHide = () => {
    setShow(!show);
  }

  const navigateLogin = async () => {


    if (password !== confirmPassword)
      return false

    dispatch({
      type: 'PASSWORD',
      payload: password
    });

    const data = {
      "email": props?.email,
      "password": password
    };
    const res = await dispatch(SubmitResetPassword(data))

    if (res.status === true) {
      props?.setResetPasswordModel(false);
    }


    // navigate('/welcome');
  }
  const renderData = () => {
    return (
      <SetPass>
        <Container>
          <Row>
            <Col sm={11} xs={11} md={11} lg={11} style={{ margin: '0', padding: '0' }}>
              <Form.Group controlId="formBasicEmail">
                <Heading>
                  <SwiftbelHeader>Reset Your Password</SwiftbelHeader>
                </Heading>
                <StyledLabel>Password </StyledLabel>
                <PasswordContainer className='d-flex' style={{
                  borderColor: !passwordStrength && !eightCharacters && !numberSymbol && !nameEmail && passwordFocus ?
                    '#D81159' : '#787373'
                }}>
                  <PasswordStyledInput
                    type={show ? 'text' : 'password'}
                    placeholder="Password"
                    name='setpassword'
                    className='emailInput'
                    autoComplete='off'
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                  />
                  {show
                    ?
                    <h7 onClick={handleShowHide}>Hide</h7>
                    :
                    <h7 onClick={handleShowHide}>Show</h7>
                  }
                </PasswordContainer>
              </Form.Group>
              {passwordStrength && eightCharacters && numberSymbol && nameEmail ? (
                <p style={{ color: '#EB873F' }}> Password strength: Good</p>
              ) : (
                passwordFocus &&
                <div>
                  <div style={{ alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
                    <img src={passwordStrength ? validSign : invalidCross} style={{ width: '15px', height: '15px', justifyContent: 'center', marginLeft: '22px', marginRight: -10 }} className="oauthIcon " alt="logo" />
                    <p style={{ color: passwordStrength ? '#006400' : '#D81159', margin: '0', marginLeft: 10, paddingLeft: '10px', font: 'Inter' }}>Password strength: Weak</p>
                  </div>
                  <div style={{ alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
                    <img src={nameEmail ? validSign : invalidCross} style={{ width: '15px', height: '15px', justifyContent: 'center', marginLeft: '22px', marginRight: -10 }} className="oauthIcon " alt="logo" />
                    <p style={{ color: nameEmail ? '#006400' : '#D81159', margin: '0', marginLeft: 10, paddingLeft: '10px', width: '100%', font: 'Inter' }}>Can't contain your name or email address</p>
                  </div>
                  <div style={{ alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
                    <img src={eightCharacters ? validSign : invalidCross} style={{ width: '15px', height: '15px', justifyContent: 'center', marginLeft: '22px', marginRight: -10 }} className="oauthIcon " alt="logo" />
                    <p style={{ color: eightCharacters ? '#006400' : '#D81159', margin: '0', marginLeft: 10, paddingLeft: '10px', width: '100%', font: 'Inter' }}>At least 8 characters with one uppercase</p>
                  </div>
                  <div style={{ alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
                    <img src={numberSymbol ? validSign : invalidCross} style={{ width: '15px', height: '15px', justifyContent: 'center', marginLeft: '22px', marginTop: -16, marginRight: -10 }} className="oauthIcon " alt="logo" />
                    <p style={{ color: numberSymbol ? '#006400' : '#D81159', marginBottom: '1rem', marginLeft: 10, paddingLeft: '10px', width: '100%', font: 'Inter' }}>Contains a number and symbol</p>
                  </div>
                </div>
              )}
              <StyledLabel>Confirm Password </StyledLabel>
              <PasswordContainer className='d-flex' style={{
                borderColor: confirmPasswordFocus && !passwordMatch ?
                  '#D81159' : '#787373'
              }}
              >
                <PasswordStyledInput
                  type={show ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name='setpassword'
                  className='emailInput'
                  autoComplete='off'
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onFocus={handleConfirmPasswordFocus}
                  onBlur={handleConfirmPasswordBlur}

                />
                {show
                  ?
                  <h7 onClick={handleShowHide}>Hide</h7>
                  :
                  <h7 onClick={handleShowHide}>Show</h7>
                }
              </PasswordContainer>
              {
                confirmPasswordFocus && (
                  <div>
                    {
                      passwordMatch ?
                        <p style={{ color: '#EB873F', margin: '0', marginLeft: 30, padding: '0' }}>Password matched</p> :
                        <p style={{ color: '#D81159', margin: '0', marginLeft: 30, padding: '0' }}>Password doesn't match</p>
                    }
                  </div>
                )
              }
            </Col>
          </Row>
        </Container>
        <br />
        <Button type="submit"
          variant='dark'
          className='setPassword'
          onClick={navigateLogin}>Continue</Button>
      </SetPass>

    )
  }

  return (
    <div>
      <Modal
        {...props}
        dialogClassName="auth-verification-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Header closeButton={navigateToHome}>
          Reset Your Password
        </Header>
        <Modal.Body>
          {renderData()}
        </Modal.Body>
      </Modal>
      <MobileModal show={props?.show} onHide={() => props?.setResetPasswordModel(false)} placement={'bottom'} style={{ height: '650px' }}>
        <Offcanvas.Header closeButton={() => props?.setResetPasswordModel(false)}>
          <Offcanvas.Title> Reset Your Password</Offcanvas.Title>
        </Offcanvas.Header>
        {renderData()}
      </MobileModal>
    </div>
  )
}

export default ResetPassword;
const Heading = styled.div`
margin-top:20px;
margin-bottom:20px;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-start;
          `

const MobileModal = styled(Offcanvas)`
          @media (min-width: 768px) and (max-width: 3000px){
            display:none;
          `
const StyledLabel = styled(Form.Label)`
font-weight: 500;
font-size: 18px;
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
const SwiftbelHeader = styled.h1
  `
  font-weight: 500;
  font-size: 2rem;
  font-family:Roobert-medium;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color:#000;
  margin-left:  1.3rem;
  @media (min-width: 360px) and (max-width: 540px){
    font-size: 1.5rem;
    font-weight: 400px;
  }
`
const SetPass = styled.div`
width: 100%;
height:85%;
top: 6.25rem;
justify-content: flex-start;
display: flex;
align-items: center;
flex-direction: column;
overflow-y:scroll;
p{
  fontFamily:Inter;
font-weight: 400;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.01em;
line-height: 150%;
margin-left: 1.1rem;
width: 90%;
}
.btn-container{
width: 100%;
  height: 3rem;
        display: flex;
        justify-content: center;
         align-items: center;
       }
          .setPassword{
            width: 92%;
            height: 44px;
            display:flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            font-family:Roobert-medium;
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
            text-align: center;
            letter-spacing: 0.02em;
            color: #FFFFFF;
            background: black;
            border: none;

          &:active {
            border: 1px solid #F3F3F3;
          background: #000;
          color: #fff;
          }
          &:hover{
            color: #fff;
          border: 1px solid #F3F3F3;
          background: #000;
         }
      }
      @media (max-width: 767px) {
        padding: 0;
        width: 100%;
        top: 5%;
        position: absolute;
      }
          @media (max-width: 767px) and (min-width: 574px)
          {
            padding - left: 3rem;
          }
          h7{
          font - family: 'Open Sans';
          font-weight: 700;
          self-align:center;
          align-items:center;
          font-size: 14px;
          line-height: 120%;
          color: #190F0F;
          cursor: pointer;
          margin-right:10px;
          margin-top:10px;
          }
  `
const PasswordStyledInput = styled(Form.Control)`
          font-weight: 400;
         border:none;
         border-radius:10px;
     
          &:focus {
            outline: none;
          box-shadow: 0px 0px 0px white;
          border: 1px solid #fff;
          background: #fff;
        }

          @media (min-width: 360px) and (max-width: 480px){
          margin-left: 1.25rem;
          }
          `
const PasswordContainer = styled.div`
 border: 1px solid #DDDDDD;
font-weight: 400;
margin-left:  1.3rem;
border-radius:10px;
width:100%;
height: 44px;
margin-bottom:20px;
margin-bottom:10px;
&:focus {
  outline: none;
box-shadow: 0px 0px 0px white;
border: 1px solid #190F0F;
background: #fff;
}

@media (min-width: 360px) and (max-width: 480px){
margin-left: 1.25rem;
}
@media (max-width: 530px) {
  margin-left:0.8rem;
}
`


