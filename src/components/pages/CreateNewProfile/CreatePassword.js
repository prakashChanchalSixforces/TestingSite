import React, { useState } from 'react'
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import '../../layouts/phonenumber/phonenostyles.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import singlelogowhite from '../../../assets/singlelogowhite.png';
import swiftbellogo from '../../../assets/Logo.png'
import './SPStyles/spStyles.css'
import { newPasswordSet } from '../../../store/Actions/Auth.action';

const CreateNewPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   // const email = useSelector(state => state.auth.registerEmail)
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(false);
    const [eightCharacters, setEightCharacters] = useState(false);
    const [numberSymbol, setNumberSymbol] = useState(false);
    const [nameEmail, setNameEmail] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({});

    var eightCharRegex = new RegExp("^(?=.{8,})");
    var email_validation_regex = new RegExp('^(?=.*[a-z])')
    var numberSymbolRegex = new RegExp("^(?=.*[!@#$%^&*])|(?=.*[0-9])");
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
    const onSubmit = async () => {
        const res=await dispatch(newPasswordSet(password))
        if(res.status===true)
        {
            navigate('/business/pricing')
        }
    }
    const handleBack = () => {
        navigate('/business/setservices')
    }
    return (
        <Container fluid className="sp-profile">
            <Row>
                <ProfileLeft>
                    <Col lg={6} md={12} sm={12} xs={12}  >
                        <div className='headerCreate'>
                            <Row xs={1} md={4} lg={3} style={{ marginLeft: 10 }}>
                                <Col lg={1} md={5} sm={5} xs={5}>
                                    <h6 style={{fontWeight:'600',fontFamily:'Roobert-medium'}} className='mt-3' onClick={handleBack}>Back</h6>
                                </Col>
                                <Col lg={4} md={7} sm={7} xs={7} >
                                    <h6 style={{fontWeight:'600',fontFamily:'Roobert-medium'}} className='mt-3'>Sign Up</h6>
                                </Col>
                            </Row>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                                <img src={swiftbellogo} alt='logo' className='mobileprofilelogo' />
                            </div>
                            <p > Create your password</p>
                        </div>

                        <h1> Create your password</h1>
                        <img src={singlelogowhite} alt='logo' className='profilelogos' />
                    </Col>
                </ProfileLeft>
                <Col lg={6} sm={12} className="profileRight" >
                    <Row className='owner-content'>
                        <InnerContent lg={12}>
                            <Form >
                                <Row className="mb-3 mt-5">
                                    <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                                        <StyledLabel>Password *</StyledLabel>
                                        <StyledSMInput
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
                                            <h4 onClick={handleShowHide}>Hide</h4>
                                            :
                                            <h4 onClick={handleShowHide}>Show</h4>
                                        }
                                    </Form.Group>
                                    {passwordStrength && eightCharacters && numberSymbol && nameEmail ? (
                                        <p style={{ color: '#EB873F' }}> Password strength: Good</p>
                                    ) : (
                                        passwordFocus &&
                                        <div>
                                            <p style={{ color: passwordStrength ? '#006400' : '#D81159', margin: '0', marginLeft: 10 }}>Password strength: Weak</p>
                                            <p style={{ color: nameEmail ? '#006400' : '#D81159', margin: '0', marginLeft: 10, width: '100%' }}>Can't contain your name or email address</p>
                                            <p style={{ color: eightCharacters ? '#006400' : '#D81159', margin: '0', marginLeft: 10, width: '100%' }}>At least 8 characters with one uppercase</p>
                                            <p style={{ color: numberSymbol ? '#006400' : '#D81159', marginBottom: '1rem', marginLeft: 10, width: '100%' }}>Contains a number and symbol</p>
                                        </div>
                                    )}

                                </Row>
                            </Form>

                        </InnerContent>
                    </Row>
                    <FixedFooter>
                        <a href="/business/setservices"
                            className="backlink"
                        >Back</a>
                        <Button
                            className='createProfile'
                            href='#'
                            variant='dark'
                          onClick={onSubmit}
                        > Set your prices
                        </Button>
                    </FixedFooter>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateNewPassword;

const InnerContent = styled(Col)`

width: 100%;
height: 75vh;


h4{
    font - family: 'SF Pro Display';
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    color: #190F0F;
    transform: translate(520px,-66px);
    position: absolute;
    cursor: pointer;
    }


    @media (min-width: 668px) and (max-width:777px ) {
        h4{
      transform: translate(405px,-66px);
       }
      }

    @media (min-width: 768px) and (max-width:868px ) {
        h4{
      transform: translate(310px,-66px);
       }
      }

    @media (min-width: 868px) and (max-width:968px ) {
        h4{
        transform: translate(330px,-66px);
         }
        }

     @media (min-width: 968px) and (max-width:1068px ) {
        h4{
          transform: translate(370px,-66px);
           }
          }
     @media (min-width: 1068px) and (max-width:1168px ) {
        h4{
          transform: translate(390px,-66px);
          }
      }

      @media (min-width: 1169px) and (max-width: 1269px ) {
        h4{
          transform: translate(450px,-66px);
          }
      }


      @media (min-width: 1270px) and (max-width: 1370px ) {
        h4{
          transform: translate(510px,-66px);
          }
      }

      @media (min-width: 1371px) and (max-width: 1471px ) {
        h4{
          transform: translate(550px,-66px);
          }
      }

      @media (min-width: 1472px) and (max-width: 1572px ) {
        h4{
          transform: translate(580px,-66px);
          }
      }

      @media (min-width: 1573px) and (max-width: 1673px ) {
        h4{
          transform: translate(650px,-66px);
          }
      }

      @media (min-width: 1674px) and (max-width: 1774px ) {
        h4{
          transform: translate(560px,-66px);
          }
      }


      @media (min-width: 1775px) and (max-width: 1875px ) {
        h4{
          transform: translate(580px,-66px);
          }
      }

      @media (min-width: 1876px) and (max-width: 1976px ) {
        h4{
          transform: translate(700px,-66px);
          }
      }

      @media (min-width: 1977px) and (max-width: 2077px ) {
        h4{
          transform: translate(780px,-66px);
          }
      }

      @media (min-width: 2078px) and (max-width: 2400px ) {
        h4{
          transform: translate(990px,-66px);
          }
      }

    @media (min-width: 360px) and (max-width: 389px ) {
        h4{
      transform: translate(220px,-66px);
       }
      }

      @media (min-width: 390px) and (max-width: 422px ) {
        h4{
        transform: translate(260px,-66px);
         }
        }

        @media (min-width: 422px) and (max-width: 480px ) {
            h4{
          transform: translate(290px,-66px);
           }
          }

          @media (min-width: 481px) and (max-width: 520px ) {
            h4{
            transform: translate(350px,-66px);
             }
            }
            @media (min-width: 521px) and (max-width: 560px ) {
                h4{
              transform: translate(370px,-66px);
               }
              }

              @media (min-width: 561px) and (max-width: 667px ) {
                h4{
                transform: translate(430px,-66px);
                 }
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
    align-items: center;
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
margin-top:10rem;
@media (min-width: 240px) and (max-width: 796px){
    margin-top:1rem;
}
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