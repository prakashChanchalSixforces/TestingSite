import React, { useEffect, useState } from 'react'
import { Container, Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import '../../layouts/phonenumber/phonenostyles.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import singlelogowhite from '../../../assets/singlelogowhite.png';
import swiftbellogo from '../../../assets/Logo.png'
import './SPStyles/spStyles.css'
import { setNewServices } from '../../../store/Actions/Auth.action';
import { ToastContainer, toast } from 'react-toastify';
import { getServices } from '../../../store/Actions/serviceProvider.actions';
const SetServices = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const services = useSelector(state => state.serviceProvider.services);
    let ourservices = services?.map((x) => x.data)
    let service = ourservices[0]
    const [serviceData, setServicesData] = useState([])
    const init = async () => {
        await dispatch(getServices())
    }
    useEffect(() => {
        init()
    }, [])
    const addServices = (item) => {
        setServicesData([...serviceData, item])
    }

    const onRemoveServices = (character) => {
        const filteredList = serviceData?.filter(item => item !== character)
        setServicesData(filteredList)
    }
    const ifExist = (exist) => {
        if (serviceData?.filter(item =>
            item === exist).length > 0
        ) {
            return true;
        }
        return false
    }
    const onSubmit = async () => {

        const res = await dispatch(setNewServices(serviceData))
        if (res.status === true) {
            navigate('/business/password')
        }
        else {

            toast.error(`${res.message}`)
        }
    }
    const handleBack = () => {
        navigate('/business/signup')
    }

    return (
        <ServiceContainer fluid className="sp-profile">
            <ToastContainer />
            <Row>
                <ProfileLeft>
                    <Col lg={6} md={12} sm={12} xs={12}  >
                        <div className='headerCreate'>
                            <Row xs={1} md={4} lg={3} style={{ marginLeft: 10 }}>
                                <Col lg={1} md={5} sm={5} xs={5}>
                                    <h6 style={{ fontWeight: '600', fontFamily: 'Roobert-medium' }} onClick={handleBack} className='mt-3'>Back</h6>
                                </Col>
                                <Col lg={4} md={7} sm={7} xs={7} >
                                    <h6 style={{ fontWeight: '600', fontFamily: 'Roobert-medium' }} className='mt-3'>Sign Up</h6>
                                </Col>
                            </Row>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                                <img src={swiftbellogo} alt='logo' className='mobileprofilelogo' />
                            </div>
                            <p > Selecting the Services you offer</p>
                        </div>

                        <h1> Selecting the Services you offer</h1>
                        <img src={singlelogowhite} alt='logo' className='profilelogos' />
                    </Col>

                </ProfileLeft>

                <Col lg={6} sm={12} className="profileRight">

                    <Row style={{ marginBottom: '90px' }} >
                        <div className='serviceImage'>
                            <Images>
                                {service?.map((x, index) => {
                                    return (
                                        <div className='p-2' key={index} style={{}} >
                                            <Serviceimg style={{
                                                borderRadius: 15,
                                                border: ifExist(x.name) ? '5px solid #D81159' : 0,
                                                borderColor:
                                                    ifExist(x.name) ? '#E24F84' : '#F3F3F3',
                                            }}
                                                src={x.url} alt='url' onClick={() => {
                                                    ifExist(x.name) ?
                                                        onRemoveServices(x.name) :
                                                        addServices(x.name)
                                                }} />
                                        </div>
                                    )
                                })}
                            </Images>
                        </div>

                        <Services className='mt-3' >
                            <ModalTagLG>Services</ModalTagLG>
                            <Row className='mt-0'>
                                {service?.map((x, index) =>
                                    <Col lg={4} md={6} xs={6} className='mt-3'>
                                        {/* <Stack direction='horizontal' className='mt-1 mb-0' gap={5}> */}
                                        <ServicesButton
                                            style={{
                                                color: ifExist(x.name) ? '#ffffff' : '#000000',
                                                backgroundColor:
                                                    ifExist(x.name) ? '#E24F84' : '#F3F3F3',
                                            }}
                                            onClick={() => {
                                                ifExist(x.name) ?
                                                    onRemoveServices(x.name) :
                                                    addServices(x.name)
                                            }}
                                        >{x.name}</ServicesButton>
                                        {/* </Stack> */}
                                    </Col>
                                )}
                            </Row>
                        </Services>
                    </Row>
                    <FixedFooter>
                        <a href="/business/signup"
                            className="backlink"
                            onClick={handleBack}
                        >Back</a>
                        <Button
                            className='createProfile'
                            href='#'
                            variant='dark'
                            onClick={() => onSubmit()}
                        >Create a Profile
                        </Button>
                    </FixedFooter>
                </Col>
            </Row>
        </ServiceContainer>
    )
}

export default SetServices;
const ServiceContainer = styled(Container)`
@media (min-width: 793px) and (max-width: 8000px){
    .headerCreate{
        display:none;
    }
    .serviceImage{
        display:none;
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
        .serviceImage{
            display:none;
        }
       
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
const Services = styled.div`

flex-direction: column;
justify-content: start;
align-items: flex-start;
padding: 12px 30px 24px;
width: auto;
height: auto;
background: #FFFFFF;
 @media (min-width: 240px) and (max-width: 796px){
     display:none;
 } 

 @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: auto;
 } 
`
const ServicesButton = styled.button`

justify-content: center;
align-items: center;
padding: 0px 0px;
width: 180px;
height: 70px;
background: #F3F3F3;
border-radius: 10px;
font-family: 'Open Sans';
font-weight: 400;
font-size: 14px;
line-height: 120%;
letter-spacing: 0.01em;
color: #787373;
border: none;

&:hover{
    background: rgba(216, 17, 89, 0.74);
    color: #fff;
}

@media (min-width: 360px) and (max-width: 539px) {
    width: 120px;
    height: 40px;
 }
 @media (min-width: 540px) and (max-width: 767px) {
    width: 140px;
    height: 45px;
 }
 @media (min-width: 768px) and (max-width: 1086px) {
    width: 120px;
    
 } 
 @media (min-width: 1085px) and (max-width: 1312px){
    width: 140px;

 }

`
const ModalTagLG = styled.h5`
font-family: 'Open Sans';
font-weight: 400;
font-size: 16px;
line-height: 150%;
display: flex;
align-items: center;
letter-spacing: 0.02em;
color: #333333;
`
const Serviceimg = styled.img`
    height: 230px;
    width:170px; 
    display:flex;
`

const Images = styled.div`
display: flex;
flex-wrap:wrap;
justify-content:space-around;
overflow:auto;
`