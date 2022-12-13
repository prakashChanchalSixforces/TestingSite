import React, { Component, useState } from 'react';
import { Container, Form, Button, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import Authleft from '../../../assets/authleft.webp';
import SwiftBellogo from '../../../assets/swiftbellogowhite.png';
import Closebutton from '../../../assets/closeBtn.png';
import Googleicon from '../../../assets/GoogleIcon.png';
import Appleicon from '../../../assets/appleIcon.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './fontStyles.css';
import initializeAuthentication from '../../../Firebase/firebase.init';
import { _googleSignUp, signupWithMail } from '../../../store/Actions/Auth.action'
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

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
const SignupForm = styled.div`
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

  .signupSubmit{
    width: 15.625rem;
    height: 2.3125rem;
    border-radius: 10px;
    font-family: 'SF Pro Display';
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    align-self: center;
    background: black;
    border: none;
 }

@media (max-width: 767px) {
    position: absolute;
}

@media (max-width: 767px)
{
  .signupSubmit{
    margin-left: 1rem;
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

const StyledLabel = styled(Form.Label)`
font-weight: 400;
font-size: 14px;
line-height: 120%;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.01em;
color: #190F0F;
margin-left: 3rem;
margin-top: 2rem;
`
const OauthButton = styled.button`
  width: 14rem;
  height: 2.25rem;
  border: 1px solid #F3F3F3;
  box-sizing: border-box;
  border-radius: 20px;
  color: black;
  background: #fff;
  margin-left: 3rem;

  &:hover{
    color: #000;
    border: 1px solid #F3F3F3;
 }

 &:active {
     border: 1px solid #F3F3F3;
     background: #F3F3F3;
 }

 @media (max-width: 573px) and (min-width: 474px) {
    width: 12rem;
 }
 
 @media (max-width: 474px) {
     width: 8rem;
  }

@media (min-width: 768px) and (max-width:1127px ) {
    width: 8rem;
}

font-family: 'SF Pro Display';
font-weight: 400;
font-size: 14px;
line-height: 150%;
letter-spacing: 0.02em;
color: #190F0F;
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


initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');


const handleAppleSignIn = () => {

  const auth = getAuth();
  signInWithPopup(auth, appleProvider)
    .then((result) => {
      const user = result.user;
      //console.log(user);
      const credential = OAuthProvider.credentialFromResult(result);

      const accessToken = credential.accessToken;

      const idToken = credential.idToken;

      const pendingToken = credential.pendingToken;

    })
    .catch((error) => {
      const errorMessage = error.message;
    });


}

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerEmail, setRegisterEmail] = useState('');
  const [googleUser, setGoogleUser] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [errormsg, setErrormsg] = useState('')

  const registerGoogleUser = async () => {
    const auth = getAuth();

    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user.accessToken;
        const res = dispatch(_googleSignUp(user))

        setGoogleUser(user);
      })


    // if(res.status===true)
    // {
    //   navigate('/login')
    // }
    // else{
    //   return alert(res.message)
    // }
    // var axios = require('axios');
    // var data = JSON.stringify({
    //   "tokenId": googleUser
    // });

    // var config = {
    //   method: 'post',
    //   url: 'https://prod.swiftbel.com/user/saveNewGoogleUser',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: data
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  const registerUser = async () => {
    dispatch({
      type: 'EMAIL',
      payload: registerEmail
    })
    var data = {
      "email": registerEmail
    }

    const res = await dispatch(signupWithMail(data))
    if (res.status) {
      const userId = res.data._id;
      dispatch({
        type: 'USERID',
        payload: userId
      })
      navigate('/signupmailverification')
    }
    else
      //alert(res.message)
      setErrormsg(res.message)
      console.log('')
  }

  const email_validation_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const handleEmailChange = (event) => {

    const text = event.target.value;
    setRegisterEmail(text);

    if (email_validation_regex.test(text)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  const handleEmailBlur = () => {
    if (!registerEmail) {
      setEmailFocus(false);
    }
  }

  const handleEmailFocus = () => {
    setEmailFocus(true);
  }

  return (
    <Background >
      <img src={SwiftBellogo} className='signup-logo-top' alt='logo' />
      <ModalWrapper>
        <ModalImg src={Authleft} alt='camera'>
        </ModalImg>
        <img src={SwiftBellogo} className='signup-logo' alt='logo' />
        <ModalContent>
          <Heading>
            <Header>Create an account</Header>
          </Heading>
          <SignupForm>
            <Form.Group className="mb-1 form-email" controlId="formBasicEmail">
              <StyledLabel>Email Sign up: </StyledLabel>
              <StyledInput
                type="email"
                placeholder="Email"
                name='email'
                className='emailInput'
                autoComplete='off'
                value={registerEmail}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
                style={{
                  borderColor: !validEmail && emailFocus ?
                    '#D81159' : '#787373'
                }}
              />
            </Form.Group>
            {emailFocus && !validEmail ? (
              <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}> Enter a valid email</p>
            ) : <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>{errormsg}</p>}
            <Form.Group className="mb-3 pb-3" controlId="formBasicEmail">
              <StyledLabel>Or Sign up with: </StyledLabel>
              <Stack direction="horizontal" gap={3}>
                <OauthButton onClick={registerGoogleUser}>
                  <img src={Googleicon} className="oauthIcon pb-1" alt="logo" />
                  <span className='oauthButtonLabel mt-2 ms-3'>Google</span>
                </OauthButton>

                <OauthButton onClick={handleAppleSignIn}>
                  <img src={Appleicon} className="oauthIcon pb-1" alt="logo" />
                  <span className='oauthButtonLabel mt-2 ms-3'>Apple</span>
                </OauthButton>
              </Stack>
            </Form.Group>
            <p style={{ width: '88%' }}>By selecting 'Agree and Continue', I agree to SwiftBel’s <span style={{ color: '#EB873F' }}> Terms of Service, Payments Terms of
              Service</span>, and acknowledge the <span style={{ color: '#EB873F' }}>Privacy Policy.</span></p>
            <Button
              // disabled={setButtonDisabled}
              type="submit"
              variant='dark'
              className='signupSubmit pl-5'
              onClick={registerUser}
            >
              Agree &amp; Continue</Button>
          </SignupForm>
          <Footer>
            <h6>Already have an account?</h6>
            <a className='loginlink' style={{ color: '#D81159' }} 
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

export default Signup;

