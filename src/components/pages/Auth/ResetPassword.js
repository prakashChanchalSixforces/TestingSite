import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Authleft from '../../../assets/authleft.webp';
import SwiftBellogo from '../../../assets/swiftbellogowhite.png';
import Closebutton from '../../../assets/closeBtn.png';

const Background = styled.div`
width: 100%;
height: 100%;
background: #000;
position: fixed;
display: flex;
align-items: center;
justify-content: center;


@media (max-width: 767px) {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    .signup-logo-top{
        position: absolute;
        top:25px;
        left: 25px;
    }
}

@media (min-width: 768px){
    .signup-logo-top{
        display: none;
    }
}
`

const ModalWrapper = styled.div`
width: 64.5rem;
height: 37.5rem;
box-shadow: 0 5px 16px rgba(0,0,0,0.2);
background: #fff;
color: #000;
display: grid;
grid-template-columns: 1fr 1fr;
position: relative;
z-index: 10;
border-radius: 25px;
.signup-logo{
    position: absolute;
    top:25px;
    left: 25px;
} 
@media (max-width: 767px) {
    width: 100%;
    height: auto;
    border-radius: 25px 25px 0px 0px;

    .signup-logo{
        display: none;
    }
}
    @media (max-height: 670px) {
        width: 100%;
        height: 85%;
        border-radius: 25px 25px 0px 0px;
    
        .signup-logo{
            display: none;
        }        
     }

     @media (min-width: 768px) and (max-width:1127px ) {
        width: 42rem;
    }     
`
const ModalImg = styled.img`
width: 25.75rem;
height: 37.5rem;
border-radius: 25px 0 0 25px;
background: #000;

@media (max-width: 767px) {
    display: none;
}
@media (min-width: 768px) and (max-width:1127px ) {
    width: 17rem;
}
`
const ModalContent = styled.div`
width: 38.75rem;
height: 37.5rem;
display: flex;
align-items: start;
justify-content: start;
flex-direction: column;
@media (min-width: 768px) and (max-width:1127px ) {
    width: 25rem;
}
`
const Heading = styled.div`
height: 6.25rem;
border-bottom: 1px solid #F3F3F3;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-start;
@media (max-width: 767px) {
    position: absolute;
}
@media (max-width: 767px) and (min-width: 574px)
{
   padding-left: 3rem;
}
`

const Header = styled.h1
  `
font-weight: 600;
font-size: 2rem;
line-height: 120%;
display: flex;
align-items: center;
letter-spacing: 0.01em;
background: linear-gradient(128.86deg, #D81159 11.42%, #EB873F 72%, #FFCF23 107.53%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
margin-left: 3rem;
`
const SetPass = styled.div`
width: 100%;
height: 25rem;
top: 6.25rem;
border-bottom: 1px solid #F3F3F3;
justify-content: flex-start;
display: flex;
align-items: flex-start;
flex-direction: column;

p{
    font-family: 'SF Pro Display';
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.02em;
    line-height: 150%;
    margin-left: 3rem;
    width: 80%;
  }

  .setPassword{
    width: 250px;
    height: 37px;
    border-radius: 10px;
    margin-top: 5rem;
    background: #D0CECE;
    border-radius: 10px;
    border: none;
    color: #fff;
    align-self: center;

    &:hover{
      color: #fff;
      border: 1px solid #F3F3F3;
   }
  
   &:active {
       border: 1px solid #F3F3F3;
       background: #F3F3F3;
   }
 }

@media (max-width: 767px) {
    position: absolute;
}

@media (max-width: 767px) and (min-width: 574px)
{
   padding-left: 3rem;
}

i{
  font-family: 'SF Pro Display';
  font-weight: 700;
  font-size: 14px;
  line-height: 120%;
  color: #190F0F;
  transform: translate(490px,-26px);
  position: absolute;
  cursor: pointer;
  }

  @media (min-width: 768px) and (max-width:1127px ) {
    i{
      transform: translate(290px,-26px);
    }
}

@media (min-width: 474px) and (max-width: 572px ) {
  i{
    transform: translate(390px,-26px);
  }
}

@media (min-width: 290px) and (max-width: 473px ) {
  i{
    transform: translate(290px,-26px);
  }
}
`
const StyledInput = styled(Form.Control)`
width: 500px;
font-weight: 400;
margin-left: 3rem;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #190F0F;
  background: #fff;
}

@media (max-width: 573px) and (min-width: 474px) {
   width: 400px;
}

@media (max-width: 474px) {
    width: 300px;
 }

 @media (min-width: 768px) and (max-width:1127px ) {
    width: 300px;
}
`


const Footer = styled.div`
width: 100%;
height: 6.25rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
h6,a{
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
  color: #190F0F;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 767px)
{
   position: absolute;
   bottom: 0;
}
`
const CloseModalButton = styled.img`
cursor: pointer;
position: absolute;
top: 20px;
right: 20px;
padding: 0;
width: 10px;
height: 10px;
z-index: 10;
`

const ResetPassword = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.registerEmail)
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

  const navigateLogin = () => {

    if (password !== confirmPassword) 
        return false
    

    dispatch({
      type: 'PASSWORD',
      payload: password
    });

    var data = JSON.stringify({
      "email": email,
      "password": password
    });

    var config = {
      method: 'post',
      url: 'https://prod.swiftbel.com/user/setPassword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('uniqueUrl', response.data.uniqueUrl);
        localStorage.setItem('isServiceProvider', response.data.data.isServiceProvider);
        localStorage.setItem('userName', response?.data?.data?.userName);
        if (response.data.data.isServiceProvider === true) {
          let uniqueUrl=localStorage.getItem('uniqueUrl')
          navigate(`/${'business'}/${uniqueUrl}`,{state:{uniqueUrl:uniqueUrl}});        }
        else
          navigate('/business/profiletemplate');
      
      })
      .catch(function (error) {
    
      });
    navigate('/welcome');
  }

  return (
    <Background >
      <ModalWrapper>
        <ModalImg src={Authleft} alt='camera'></ModalImg>
        <img src={SwiftBellogo} className='signup-logo' alt='logo' />
        <ModalContent>
          <Heading>
            <Header>Create Your Password</Header>
          </Heading>
          <SetPass>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <StyledInput
                type={show ? 'text' : 'password'}
                placeholder="Password"
                name='setpassword'
                className='emailInput'
                autoComplete='off'
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                style={{
                  borderColor: !passwordStrength && !eightCharacters && !numberSymbol && !nameEmail && passwordFocus ?
                    '#D81159' : '#787373'
                }}
              />
              {show
                ?
                <i onClick={handleShowHide}>Hide</i>
                :
                <i onClick={handleShowHide}>Show</i>
              }
            </Form.Group>
            {passwordStrength && eightCharacters && numberSymbol && nameEmail ? (
              <p style={{ color: '#EB873F' }}> Password strength: Good</p>
            ) : (
              passwordFocus &&
              <div>
                <p style={{ color: passwordStrength ? '#787373' : '#D81159', margin: '0', marginLeft: 50, paddingLeft: '10px' }}>Password strength: Weak</p>
                <p style={{ color: nameEmail ? '#787373' : '#D81159', margin: '0', marginLeft: 50, paddingLeft: '10px', width: '100%' }}>Can't contain your name or email address</p>
                <p style={{ color: eightCharacters ? '#787373' : '#D81159', margin: '0', marginLeft: 50, paddingLeft: '10px' }}>Atleast 8 characters with one uppercase</p>
                <p style={{ color: numberSymbol ? '#787373' : '#D81159', marginBottom: '1rem', marginLeft: 50, paddingLeft: '10px' }}>Contains a number and symbol</p>
              </div>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <StyledInput
                type={show ? 'text' : 'password'}
                placeholder="Confirm Password"
                name='setpassword'
                className='emailInput'
                autoComplete='off'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onFocus={handleConfirmPasswordFocus}
                onBlur={handleConfirmPasswordBlur}
                style={{
                  borderColor: confirmPasswordFocus && !passwordMatch ?
                    '#D81159' : '#787373'
                }}
              />
              {show
                ?
                <i onClick={handleShowHide}>Hide</i>
                :
                <i onClick={handleShowHide}>Show</i>
              }
            </Form.Group>
            {
              confirmPasswordFocus && (
                <div>
                  {
                    passwordMatch ?
                      <p style={{ color: '#EB873F', margin: '0', marginLeft: 50, padding: '0' }}>Password matched</p> :
                      <p style={{ color: '#D81159', margin: '0', marginLeft: 50, padding: '0' }}>Password doesn't match</p>
                  }
                </div>
              )
            }
            <Button style={{ backgroundColor: password && confirmPassword ? '#000000' : '#787373' }} className='setPassword' onClick={navigateLogin}>Continue</Button>
          </SetPass>
          <Footer>
            <h6>Already have an account?</h6>
            <a href='/' className='loginlink' style={{ color: '#D81159' }} 
            //onClick={() => navigate('/login')}
            >Log In</a>
          </Footer>
          <CloseModalButton src={Closebutton}
            aria-label='Close modal'
            onClick={() => navigate('/')}
          />
        </ModalContent>
      </ModalWrapper>
    </Background>
  )
}

export default ResetPassword;

