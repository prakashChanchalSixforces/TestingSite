import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import profiletemp from '../../../assets/profiletemp.png';
const TemplateProfile = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/business/signUp')
    }


    return (
        <TemplateBackground className='sp-profile'>
            <ProfileLeft/>
            <ProfileRight>
            <Styledh1 >Welcome to SwiftBel</Styledh1>
            <Styledh2 >Create a profile quickly</Styledh2>
                <FixedFooter>
                    <StyledButton
                        className='continue'
                        href='#'
                        variant='dark'
                        onClick={handleSubmit}
                    >Let's do it
                    </StyledButton>
                </FixedFooter>
            </ProfileRight>
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
position: relative;
background-position: center;
background-size: cover;
background-color: black;
position: relative;
background-image:url(${profiletemp});

@media (min-width: 240px) and (max-width: 766px){
    width: 100%;
    height: 100%;
    margin-top:-80px;
    background-size: fit;
}

`
const ProfileRight = styled.div`
width: 50%;
height: 100%;

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: #000;

@media (min-width: 240px) and (max-width: 766px){
    width: 100%;
    height: 22%;
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
        height: 9vh;
        background-color: #fff;
        justify-content: center;
        .continue{
            width: 120px;
            right: 2.2rem;
        }
        .back-link{
            left: 3rem;
        }
    }

`

const Styledh1 = styled.h1`
background: linear-gradient(128.86deg, #D81159, #EB873F, #FFCF23);
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;
font-family: 'Roobert-Medium';
font-style: normal;
font-weight: 500;
font-size: 58px;
line-height: 120%;
display: flex;
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
const Styledh2 = styled.h1`
font-family: 'Roobert-Medium';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 120%;
display: flex;
color:#fff;
align-items: center;
letter-spacing: 0.01em;
width:78%;
@media (min-width: 240px) and (max-width: 766px){
    font-family: 'Roobert TRIAL';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 150%;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content:center;
    color:#000;
flex: none;
order: 0;
flex-grow: 0;
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