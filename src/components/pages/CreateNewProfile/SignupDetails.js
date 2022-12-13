import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import singlelogowhite from '../../../assets/singlelogowhite.png';
import PhoneInput from '../../layouts/phonenumber/Phonenumber';
import '../../layouts/phonenumber/phonenostyles.css';
import { Form, Button } from 'react-bootstrap';
const TemplateProfile = () => {

    const navigate = useNavigate();

    return (
        <TemplateBackground className='sp-profile'>
            <ProfileLeft>
                <Styledh1 >Create your profile</Styledh1>
                <img src={singlelogowhite} alt='logo' className='singlelogowhite' />
            </ProfileLeft>
            <ProfileRight className="mb-3 mt-5">

                <Form>
                    <Form.Group  controlId="formGridEmail">
                        <StyledLabel>Business name*</StyledLabel>
                        <StyledSMInput
                            type="text"
                            // value={owner.firstName}
                            // onChange={(e) => firstNameChangeHandler(e, i)}
                            placeholder="Business name"
                            autoComplete='new-off'
                        />
<PhoneInput
                    placeholder="Enter phone number"
                    //value={value}
                    //onChange={setValue}
                    name='phoneinput'
                    international
                    focusInputOnCountrySelection='true'
                    defaultCountry="CA"
                    limitMaxLength='true'
                    autoComplete='off'
                />
                 <StyledLabel>Business address</StyledLabel>
                        <StyledSMInput
                            type="text"
                            // value={owner.firstName}
                            // onChange={(e) => firstNameChangeHandler(e, i)}
                            placeholder="First Name"
                            autoComplete='new-off'
                        />
                         <StyledLabel>Business address</StyledLabel>
                        <StyledSMInput
                            type="text"
                            // value={owner.firstName}
                            // onChange={(e) => firstNameChangeHandler(e, i)}
                            placeholder="Owner Name"
                            autoComplete='new-off'
                        />
                         <StyledLabel>Email</StyledLabel>
                        <StyledSMInput
                            type="text"
                            // value={owner.firstName}
                            // onChange={(e) => firstNameChangeHandler(e, i)}
                            placeholder="Email"
                            autoComplete='new-off'
                        />
                    </Form.Group>

                </Form>
            </ProfileRight>
            <FixedFooter>
            <a href="#"
                            className="back-link"
                           // onClick={handleBack}
                        >Back</a>
                        <Button
                            className='continue'
                            href='#'
                            variant='dark'
                            //onClick={handleSubmit}
                        >Continue
                        </Button>
                </FixedFooter>
        </TemplateBackground>
    )
}

export default TemplateProfile;

const TemplateBackground = styled.div`
width: 100%;
height: 100%;
background: #fff;
position: fixed;
display: flex;
align-items: center;
justify-content: center;
`
const ProfileLeft = styled.div`
width: 50%;
height: 100%;

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: #190F0F;
.singlelogowhite {
    position: absolute;
    bottom: 4rem;
    left: 40rem;
}
@media (min-width: 240px) and (max-width: 766px){
    width: 100%;
    height: 30%;
    margin-top:-80px;
    background-size: fit;
}

`
const ProfileRight = styled.div`
width: 50%;
height: 100%;
padding-left:60px;

padding-top:30px;
justify-content:center;
background: #fff;

@media (min-width: 240px) and (max-width: 766px){
    width: 100%;
    height: 80%;
    position: absolute;
    bottom: 0;
    padding-bottom: 5rem;
    padding-top: 2rem;
    border-radius: 25px 25px 0  0;
    background: #fff;

    &::-webkit-scrollbar {
        display: none;
      }
    
    -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */   
}
`

const FixedFooter = styled.div`
    position: absolute;
    bottom: 0;
    height: 12vh;
    width: 50vw;
    border-top: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    background-color: #000;
   
    
    @media (min-width: 240px) and (max-width: 766px){
        height: 10vh;
        background-color: #fff;
        justify-content: center;
        .continue{
            width: 120px;
            right: 3rem;
        }
        .back-link{
            left: 3rem;
        }
    }

`

const Styledh1 = styled.h1`

font-family: 'Roobert-Medium';
font-style: normal;
font-weight: 500;
font-size: 58px;
line-height: 120%;
display: flex;
color:#fff;
align-items: center;
letter-spacing: 0.01em;
width: 80%;
@media (min-width: 240px) and (max-width: 766px){
    font-family: 'Roobert TRIAL';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content:center;
    color: #190F0F;
    background: linear-gradient(128.86deg, #000, #000, #000);
    -webkit-text-fill-color: transparent;
-webkit-background-clip: text;
flex: none;
order: 0;
flex-grow: 0;
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
width:90%;
background: #F3F3F3;
justify-content:center;
border-radius: 10px;
padding: 12px 12px 12px 12px;
border: none;
margin-bottom:30px;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 2px solid #000000;
  background: #F3F3F3;
}
`

const StyledButton = styled.button`
width: 150px;
height: 34px;
background: #FFFFFF;
border-radius: 12px;
color: #190F0F;
display: flex;
align-items: center;
justify-content: center;
margin-right:2rem;
border: none;

&:hover{
    background :white;
    color: black;
}
@media (min-width: 240px) and (max-width: 766px){
    background: #000;
    color: #fff;
    margin-right:0;
    height: 44px;
    align-items: center;
    border-radius: 40px;
justify-content: center;
align-self:center;
}
`