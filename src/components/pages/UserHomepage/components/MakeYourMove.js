import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap';
const MakeYourMove = () => {
    return (
      <React.Fragment>
        <MakeYourMoveContainer >
            <Row xs={1} md={4} lg={3} style={{ marginLeft: 30 }}>
                <Col lg={1} md={1} sm={0}></Col>
                <Col lg={4} md={4} sm={12} xs={12} >
                    <h6 className='mt-4'>
                        1. Tell us about
                        your move</h6>
                        <h7 className='mt-2' >
                        1. Tell us about your move</h7>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <h6 className='mt-4'>
                        2. Compare prices
                        without calling</h6>
                        <h7 className='mt-2'>
                        2. Compare prices without calling</h7>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                    <h6 className='mt-4'>3. Click to book</h6>
                    <h7 className='mt-3'>3. Click to book</h7>
                </Col>
            </Row>
        </MakeYourMoveContainer>
        </React.Fragment>
    )
}

export default MakeYourMove;

const MakeYourMoveContainer = styled.div`
width: 92%;
height: 80px;
margin-top: 1rem;
margin-bottom: 1rem;
margin-left:4rem;
margin-right:4rem;
font-size: 2.75rem;
line-height: 120%;
backgroundColor: #FAFAFA;
background:#FAFAFA;
border-radius: 64px;
@media (min-width: 1800px) and (max-width: 2500px)
  {
      padding-left:250px;
      padding-right:250px;
  }
  @media (min-width: 2501px) and (max-width:3000px)
  {
      padding-left:350px;
      padding-right:350px;
  }
  @media (min-width: 3001px) and (max-width:4000px)
  {
      padding-left:650px;
      padding-right:650px;
  }
  @media (min-width: 4001px) and (max-width:9999px)
  {
      padding-left:1350px;
      padding-right:1350px;
  }
@media (min-width: 767px) and (max-width: 992px){
  margin-top: 1rem;
  width: 86%;
  height: auto;
  
}

@media (min-width: 992px) and (max-width: 1212px){
  margin-top: 1rem;
  width: 90%;
}
h6{
font-style: normal;
font-weight: 500;
font-size: 18px;

  color: #000;  
  display: flex;
align-items: center;
text-align: center;
padding-top:7px;
}
@media (min-width: 767px) and (max-width: 8000px){
  h7{
    display:none;
  }
}
@media(min-width: 200px) and (max-width: 767px){
  padding:2rem;
  border-radius: 1px;
  width: 100%;
  margin-left:0rem;
  height:auto;
  h7{
font-style: normal;
font-weight: 500;
font-size: 18px;
  color: #000;  
align-items: center;
text-align: center;
self-align:center;
  }
  h6{
    display:none;
  }
}

@media (min-width: 1801px) and (max-width: 2300px){
  h6{
    font-size: 26px;
  }
  

}
@media (min-width: 2301px) and (max-width: 6200px){
  h6{
    font-size: 34px;
  }


}
`

