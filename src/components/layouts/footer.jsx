import React from 'react'
import styled from 'styled-components'
import {Row, Col, Container, Stack } from 'react-bootstrap'
import swiftbellogo from '../../assets/swiftbellogoprofile.png'
import { useNavigate } from 'react-router-dom'
const Footer = ()=>{
  const navigate=useNavigate()
    return(
     <FooterContainer>
       <Container fluid >
        <Row>
            <Col sm={6} lg={3} xl={3}>
                 <Stack direction='horizontal' gap={2}>
                   <Img src={swiftbellogo} alt='' />
                    <SwiftbelBrand>SwiftBel</SwiftbelBrand>
                  </Stack>
            </Col>
        </Row>
        <Row>
          <Col sm={6} lg={3} xl={3}>
          <h6 className='mt-5'>About</h6>
              <ul className='list-unstyled'>
                <li className='mt-2'>About</li>
                <li className='mt-2'>Careers</li>
                <li className='mt-2'>Media</li>
                <li className='mt-2'>Investors</li>
              </ul>
          </Col>
          <Col sm={6} lg={3} xl={3}>
            <h6 className='mt-5'>Customers</h6>
              <ul className='list-unstyled'>
                <li className='mt-2'>How to use SwiftBel?</li>
                <li className='mt-2'>Signup</li>
                <li className='mt-2'>Download the App</li>
              </ul>
          </Col>
          <Col>
            <h6 className='mt-5'>Service Providers</h6>
              <ul className='list-unstyled'>
                <li className='mt-2'>Why SwiftBel?</li>
                <li className='mt-2'>Sign up and try Swiftbel</li>
                <li className='mt-2'>Service provider resources</li>
                <li className='mt-2'>Download the SwiftBel Business app</li>
              </ul>
          </Col>
          <Col>
            <h6 className='mt-5'>Support</h6>
              <ul className='list-unstyled'>
                <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>navigate('/resource/help-center')}>Help Centre</li>
                <li className='mt-2'>Safety Information</li>
                <li className='mt-2'>Cancellation policy</li>
              </ul>
          </Col>
        </Row>
       </Container>
     </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled.div`
max-width: 100vw;
height: 50vh;
padding-top: 5rem;
background-color: #FAFAFA;

 h6{
    color: var(--mainPink);
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
 }

   ul li a{
    color: var(--mainGrey);
    font-family: 'SF Pro Display';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.02em;
    color: #190F0F;
    padding-top: 10px;
  }
  ul li a:hover{
      color: var(--mainLightGrey);
  }

`
const SwiftbelBrand = styled.div`
background: linear-gradient(128.86deg, #D81159 11.42%, #EB873F 72%, #FFCF23 107.53%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
border-radius: 0px;
font-weight: 600px;
font-size: 40px;
`
const Img = styled.img`
    height: 42.37766647338867px;
    width: 41.622623443603516px;
    border-radius: 0px;
`
 