import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Form, Row, Col, Offcanvas } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './modalStyles.css';
import invalidCross from '../../../assets/invalidCross.png'
import validSign from '../../../assets/validSign.png'
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from '../../../store/Actions/Auth.action';
import MobileNumber from '../phonenumber/MobileNumber';
const SetPassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.registerEmail)
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [eightCharacters, setEightCharacters] = useState(false);
  const [numberSymbol, setNumberSymbol] = useState(false);
  const [nameEmail, setNameEmail] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({});
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [checkbox,setCheckBox]=useState(false)
  var eightCharRegex = new RegExp("^(?=.{8,})");
  var email_validation_regex = new RegExp('^(?=.*[a-z])')
  var numberSymbolRegex = new RegExp("^(?=.*[!@#$%^&*])|(?=.*[0-9])");
  const navigateToHome = () => {
    props.setPasswordModal(false);
  }
  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  }


  const handlePasswordChange = (event) => {
    var text = event.target.value;
    setPassword(text);
    setValues({ ...values, 'password': text })
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


  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordFocus(false);
    }
  }

  const handleShowHide = () => {
    setShow(!show);
  }
  let location = useLocation();
  const navigateLogin = async () => {
    var data = {
      "email": email,
      "password": password,
      "phone": phoneNumber,
      "firstName": firstName,
      "lastName": lastName,
    };
    const res = await dispatch(registerUser(data))
    window.analytics.identify(res?.data?._id,
      {
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "phone_number": phoneNumber,
        "subscribed":checkbox?false:true
      });
    if (res.status === true) {
      props.setPasswordModal(false);
      if (location?.state?.from) {
        navigate(location?.state?.from)

      }
      if (location.pathname === "/details") {
        navigate(`/payment`)
      }
      else if (location.pathname === "/") {
        window.location.reload()
      }
    }
    else
      toast.error(res.message);

  }
  const mql = window.matchMedia('(max-width: 600px)');

  let mobileView = mql.matches;

  const renderData = () => {
    return (
      <SetPass>
        <Container>
          <Row>
            <Col sm={11} xs={11} md={11} lg={11} style={{ margin: '0', padding: '0' }}>
              <Form.Group className="mb-1 form-email" controlId="formBasicEmail">
                <Heading>
                  <SwiftbelHeader>Personal info</SwiftbelHeader>
                </Heading>
                <StyledLabel style={{ marginTop: '10px' }}>Your first name </StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="First name"
                  name='First name'
                  className='emailInput'
                  required
                  autoComplete='off'
                  onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={firstName}
                />

                <StyledLabel >Your last name </StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Last name"
                  name='Last name'
                  className='Last name mt-2'
                  autoComplete='off'
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={lastName}
                  required
                />
                <StyledLabel>Business phone number* </StyledLabel>
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
                <p style={{ color: 'gray', textAlign: 'start' }}></p>
                <StyledLabel>Your email</StyledLabel>
                <StyledInput
                  type="Email"
                  placeholder="Email"
                  name='Email'
                  className='Email'
                  autoComplete='off'
                  value={props?.email}
                  disabled={true}
                />
                <StyledLabel>Enter your password </StyledLabel>
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
                    <h7 className='mt-3' onClick={handleShowHide}>Hide</h7>
                    :
                    <h7 className='mt-3' onClick={handleShowHide}>Show</h7>
                  }
                </PasswordContainer>
                {passwordStrength && eightCharacters && numberSymbol && nameEmail ? (
                  <p style={{ color: '#EB873F', marginLeft: 30, }}> Password strength: Good</p>
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
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <p style={{ fontFamily: 'Inter' }}>By sumbiting Continue, I agree to SwiftBel’s <span style={{ color: '#D81159' }}> <a style={{ cursor: 'pointer' }} href='https://www.swiftbel.com/help/legal/terms-of-service' target='_blank' rel="noreferrer">Terms of Service</a>,<a style={{ cursor: 'pointer' }} href='https://www.swiftbel.com/help/legal/payments-terms' target='_blank' rel="noreferrer"> Payments Terms of
          Service</a></span>, and acknowledge the <span style={{ color: '#D81159' }}><a style={{ cursor: 'pointer' }} href='https://www.swiftbel.com/help/legal/privacy-policy' target='_blank' rel="noreferrer">Privacy Policy</a>.</span></p>
        <div className='btn-container'>
          <button className='setPassword' onClick={navigateLogin}>Continue</button>
        </div>
        <Text>
          SwiftBel will send you members-only deals, inspiretion, marketing emails,
          and push notifications. You can opt out of receiving these at any time in your account settings or directly from the marketing notification.
        </Text>
        <Form.Check
          style={{ alignSelf: 'flex-start', marginLeft: '22px', fontSize: '12px', font: 'Inter' }}
          inline
          label="I don’t want to receive marketing messages from SwiftBel"
          name="I don’t want to receive marketing messages from SwiftBel"
          type='checkbox'
          value="I don’t want to receive marketing messages from SwiftBelr"
          checked={checkbox}
          onClick={(value)=>checkbox?setCheckBox(false):setCheckBox(true)}
          id="New Westminister"
        />
      </SetPass>
    )
  }

  return (
    <div>
      <ToastContainer />
      <Modal
        size='md'
        {...props}
        show={mobileView ? false : props?.show}
        dialogClassName="auth-personalinfo-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Header closeButton={navigateToHome}>
          Finish signing up
        </Header>
        <Modal.Body>
          <div className='personalinfo-modal-right' >
            {renderData()}
          </div>
        </Modal.Body>
      </Modal>
      <MobileModal show={props?.show} onHide={() => props.setPasswordModal(false)} placement={'bottom'} style={{ height: '650px' }}>
        <Offcanvas.Header closeButton={() => props.setPasswordModal(false)}>
          <Offcanvas.Title>Finish signing up</Offcanvas.Title>
        </Offcanvas.Header>
        {renderData()}
      </MobileModal>

      {/* <WelcomeModal
        setWelcomeModal={setWelcomeModalShow}
        show={welcomeModalShow}
        onHide={() => setWelcomeModalShow(false)}
      /> */}
    </div>
  )
}

export default SetPassword;

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
const Text = styled.p`
border-top: 1px solid #F3F3F3;
  color: #787373;
  fontFamily: Inter;      
  font-weight: 400;
  font-size: 14px;
  margin-top:10px;
  letter-spacing: 0.02em;
  width: 83%; 
  marginLeft: 10px; 
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
const Header = styled(Modal.Header)`
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
const SwiftbelHeader = styled.h1`
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

width: 89%;
}
.btn-container{
 margin-bottom:10px;
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
const StyledInput = styled(Form.Control)`
font-weight: 400;
margin-left: 1.3rem;
border-radius: 10px;
margin-bottom:10px;
height: 44px;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #190F0F;
  background: #fff;
}
@media (max-width: 530px) {
  margin-left:1.1rem;
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