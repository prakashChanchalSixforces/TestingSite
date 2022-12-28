import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Stack } from 'react-bootstrap'
import swiftbellogo from '../../../../assets/swiftbellogoprofile.png'
import Brandname from '../../../../assets/TestingImg/cover.png'
import instagram from '../../../../assets/instagramgray.png'
import facebook from '../../../../assets/facebookgray.png'
import linkedin from '../../../../assets/linkedingray.png'
import twitter from '../../../../assets/twittergray.png'
import { useSelector } from 'react-redux'
const FooterTop = (props) => {
    const profileData = useSelector((state) => state.profileReducer)
    const {profileDetails } = profileData
    useEffect(()=>{
        window.analytics.identify(profileDetails?._id,{
            "component":"Footer",
            "url":window.location?.pathname
        });
    },[profileDetails?._id])
    return (
        <React.Fragment>
        <FooterContainer style={props?.containerStyle}>
            <br/>
            <Container fluid >
                <Row>
                    <Col sm={6} lg={3} xl={2}>
                        <Stack direction='horizontal' gap={1}>
            <h2 className='home-swiftbel-brand'><img src={Brandname}  alt='Brandname'/></h2>
                        </Stack>
                    </Col>
                </Row>
                <Hr/>
                <Row xs={2} md={5} lg={5} className='d-flex justify-content-between'>
                    <div>
                        <h6 className='mt-4 heading'>Home</h6>
                    
                    </div>
                    <div  >
                        <h6 className='mt-4 heading'>Service</h6>
                     
                    </div>
                    <div >
                        <h6 className='mt-4 heading'>Price</h6>
                     
                    </div>
                    <div>
                        <h6 className='mt-4 heading'>About us</h6>
                       
                    </div>
                    <div>
                        <h6 className='mt-4 heading'>FAQ</h6>
                      
                    </div>
                </Row>
                <br/>
            </Container>
        </FooterContainer>
        </React.Fragment>

    )
}

export default FooterTop;

const FooterContainer = styled.div`
max-width: 100vw;
height: auto;
background-color:white;
background:white;
padding-top:1rem;
color:black;
width:1312px;
@media (min-width: 1170px) and (max-width: 1360px){
    width:1170px;
}
@media (min-width: 820px) and (max-width: 1199px){
    padding-left:50px;
}
.heading{
    font-family:Roobert-medium;
    font-size:18px;
}
.subheading{
 font-family : Inter;
 font-size:16px;
}
.home-icon{
    height:26px;
    width:26px;
    margin-top:3px;
  }
 h6{
    color: #190F0F;
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
 }

  ul li{
    color:#787373;
    font-size:14px;
    cursor:pointer;
    font:Inter;
  }

   ul li a{
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0.02em;
    padding-top: 10px;
  }
  ul li a:hover{
  }
  @media (min-width: 200px) and (max-width:1169px)

  {
     width:100%
      padding-left:20px;
      padding-right:20px;
  }
`
const Hr = styled.hr`
background-color:lightgray;
background:lightgray;
`