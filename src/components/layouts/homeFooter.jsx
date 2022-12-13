import React from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Stack } from 'react-bootstrap'
import footerlogo from '../../assets/footerlogowhite.svg'
import { useNavigate } from 'react-router-dom'
import instagram from '../../assets/instagramwhite.png'
import facebook from '../../assets/facebookwhite.png'
import linkedin from '../../assets/linkedinwhite.png'
import twitter from '../../assets/twitterwhite.png'
const HomeFooter = () => {
    const navigate=useNavigate()
    return (
        <FooterContainer>
            <Container fluid >
                <Row>
                    <Col sm={6} lg={3} xl={2}>
                        <Stack direction='horizontal' gap={1}>
                            <Img alt='' src={footerlogo} />
                            <SwiftbelBrand>SwiftBel</SwiftbelBrand>
                        </Stack>
                    </Col>
                </Row>
                <Row xs={2} md={6} lg={6} className='d-flex justify-content-between'>
                    <div>
                        <h6 className='mt-4'>Company</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-2'>About us</li>
                            <li className='mt-2'>Careers</li>
                            <li className='mt-2'>Media</li>
                            <li className='mt-2'>Investors</li>
                        </ul>
                    </div>
                    <div  >
                        <h6 className='mt-4'>Service Provider</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-2'>Login</li>
                            <li className='mt-2'>Signup</li>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>navigate('/')}>Why SwiftBel?</li>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>window.open('/resources/help-center/service-provider-privacy-standards','_blank')}>Resources</li>
                        </ul>
                    </div>
                    <div >
                        <h6 className='mt-4'>Legal</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-2' onClick={()=>navigate('/resources/help-center/terms-of-service')}>Terms of Service</li>
                            <li className='mt-2'>Payment Terms of Service</li>
                            <li className='mt-2'>Privacy Policy</li>

                            {/* <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>navigate('/business')}>Sign up and try Swiftbel</li>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>window.open('/resources/help-center/service-provider-privacy-standards','_blank')}>Service provider resources</li>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=> window.open('https://apps.apple.com/in/app/swiftbel-business/id1641328821')}>Download the SwiftBel Business app</li> */}
                        </ul>
                    </div>
                    <div>
                        <h6 className='mt-4'>Support</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>window.open('/resources/help-center','_blank')}>Help Centre</li>
                            {/* <li className='mt-2'>Safety Information</li>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>window.open('/resources/help-center/cancellation-and-refund-policy','_blank')}>Cancellation policy</li> */}
                        </ul>
                    </div>
                    <div>
                        <h6 className='mt-4'>Follow Us</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>window.open('https://www.facebook.com/swiftbel','_blank')}>
                            <img alt='' src={facebook} />&nbsp;
                            Facebook</li>
                            <li className='mt-2' style={{cursor:'pointer'}}  onClick={()=>window.open('http://instagram.com/swiftbel_official/','_blank')} ><img alt='' src={instagram} /> &nbsp;Instagram</li>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>window.open('https://www.linkedin.com/company/swiftbel','_blank')} ><img alt='' src={linkedin} /> &nbsp;Linkedin</li>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>window.open('http://www.twitter.com/swiftbel_HQ','_blank')} ><img alt='' src={twitter} /> &nbsp;Twitter</li>

                            {/* <li className='mt-2'>Safety Information</li>
                            <li className='mt-2' style={{cursor:'pointer'}} onClick={()=>window.open('/resources/help-center/cancellation-and-refund-policy','_blank')}>Cancellation policy</li> */}
                        </ul>
                    </div>
                </Row>
            </Container>
        </FooterContainer>
    )
}

export default HomeFooter;

const FooterContainer = styled.div`
max-width: 100vw;
height: auto;
background-color: #190F0F;
padding-left: 8vw;
padding-right: 8vw;
padding-top:2rem;

 h6{
    color: var(--mainWhite);
    font-weight: 500;
    font-size: 19px;
    line-height: 120%;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
 }

  ul li{
    color: var(--mainWhite);
    font:Inter;
    font-size:16px;
  }

   ul li a{
    color: var(--mainWhite);
    font-family: 'SF Pro Display';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.02em;
    padding-top: 10px;
  }
  ul li a:hover{
      color: var(--mainLightGrey);
  }

`
const SwiftbelBrand = styled.div`
background: #fff;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
border-radius: 0px;
font-weight: 600px;
font-size: 40px;
`
const Img = styled.img`
    height: 38.37766647338867px;
    width: 38.622623443603516px;
    border-radius: 0px;
`