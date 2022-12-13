import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap';
import competitors from '../../../assets/differentiateamongcompetitors.png';
import bookings from '../../../assets/getmorebookings.png';
import nomanual from '../../../assets/nomoremanualprocess.png';
const WhySwiftbel = () => {
  return (
    <React.Fragment>
    <WhySwiftbelContainer>
      <h1>Grow your business with SwiftBel</h1>
      <Row xs={1} md={2} lg={3}>
         <Col lg={4} md={4} sm={12}>
          <img alt='' src={competitors} style={{width: '60px', height: '60px', marginTop: '1rem'}}/>
          <h6 className='mt-4'>Be different</h6>
          <p className='mt-2'>Boost your sales with a SwiftBel digital presence. Win business with service <br/>and price!</p>
         </Col>
         <Col lg={4} md={4} sm={12}>
          <img alt='' src={bookings} style={{width: '60px', height: '60px', marginTop: '1rem'}}/>
          <h6 className='mt-4'>More bookings, fast</h6>
          <p className='mt-2'>Replace expensive leads, ads, and phone <br/>tag with income-generating work</p>
         </Col>
         <Col lg={4} md={4} sm={12}>
         <img alt='' src={nomanual} style={{width: '60px', height: '60px', marginTop: '1rem'}}/>
          <h6 className='mt-4'>Tools that work</h6>
          <p className='mt-2'>Tools that schedule, dispatch, route, track worker locations/time, and automatically invoice</p>
         </Col>
      </Row>
    </WhySwiftbelContainer>
    </React.Fragment>
  )
}

export default WhySwiftbel;

const WhySwiftbelContainer = styled.div`
width: 100%;
height: auto;
margin-top: 10rem;
margin-bottom: 4rem;
font-size: 2.75rem;
line-height: 120%;
backgroundColor: #190F0F;
background:#190F0F;
padding:3rem;
@media (min-width: 767px) and (max-width: 992px){
  margin-top: 4rem;

}

@media (min-width: 992px) and (max-width: 1212px){
  margin-top: 4rem;

}
h1{
color:white;
text-align:start;
}
h6{
  font-size: 24px;
  line-height: 150%;
  letter-spacing: 0.02em;
  color: #FFFFFF;  
}

p{
font-size: 21px;
line-height: 150%;
letter-spacing: 0.02em;
color: #FFFFFF;
}
@media(min-width: 200px) and (max-width: 767px){
  margin-top: 0%;
  padding:2rem;
}

@media (min-width: 1801px) and (max-width: 2300px){
  h6{
    font-size: 26px;
  }
  
  p{
  font-size: 23px;
  }

}
@media (min-width: 2301px) and (max-width: 6200px){
  h6{
    font-size: 34px;
  }
  
  p{
  font-size: 31px;
  }

}
`

