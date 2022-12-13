import React from 'react'
import {Col} from 'react-bootstrap'
import styled from 'styled-components'
import Step1 from '../../../assets/step1.webp'
import Step2 from '../../../assets/step2.webp'
import Step3 from '../../../assets/step3.webp'
import mobStep1 from '../../../assets/mobilestep1.webp'
import mobStep2 from '../../../assets/mobilestep2.webp'
import mobStep3 from '../../../assets/mobilestep3.webp'

function Steps(){
return(
    <React.Fragment>
    <Main>
    <div >
        <Col className='col-design'>
        <Title>Booking and managing home service providers in 3 steps</Title>
        </Col>
        </div>
      <Stepstyle >
        <div>
           <img src={mobStep1} alt="Flowers" className='mob-step-image mb-3' />
            <img src={Step1} alt="Flowers" className='step-image mb-5'/>
            <Description className='mt-2 mb-2' >
          Discover service providers and Compare Pricing </Description>
               <SubDescription>
               Search service providers, check profiles and reviews, compare pricing, all under 60 secs
               </SubDescription>
        </div>
        <div>
            <img src={mobStep2} alt="Flowers" className='mob-step-image mb-3' />
            <img src={Step2} alt="Flowers" className='step-image mb-5' />
            <Description className='mt-2 mb-2' >
         Click book and get confirmation  </Description>
               <SubDescription>
               One click checkouts and service provider can choose to accept, decline or propose a different time within 5 minutes
               </SubDescription>
        </div>
        <div>
            <img src={mobStep3} alt="Flowers" className='mob-step-image mb-3' />
            <img src={Step3} alt="Flowers" className='step-image mb-5'/>
            <Description className='mt-2 mb-2' >
           Automatic location tracking and hours of work
          </Description>
               <SubDescription>
               SwiftBel app automatically tracks service provider travel time, location, hours of work, leaving no room for inconsistencies
               </SubDescription>
        </div>
        </Stepstyle>
        </Main>

    </React.Fragment>
)
}
export default Steps

const Main = styled.div`
background-color: #190F0F;
padding:2rem;
margin-top:-28px;
@media (min-width: 360px) and (max-width: 1145px)
{
    background-color: white;
    padding:0rem;
    margin-top:30px;


}
.col-design{
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
}
`
const Title = styled.h2`
color:white;
text-align:center;
font-family:Roobert-medium;
margin-bottom:2rem;
@media (min-width: 360px) and (max-width: 1145px)
 {
    color:black;
    margin-bottom:0rem;

 }
`
const Stepstyle=styled.div`
display:flex;
justify-content:space-between;
padding-left: 3rem;
.mob-step-image{
  display:none;
}
.step-image{
  height:600px;
  border-radius:50px;s
}
@media (min-width: 360px) and (max-width: 1145px)
 {
  display: inline;
  .step-image{
    display:none
  }
  .mob-step-image{
    display:flex;
    width:101%;
    padding-left:1rem;
    padding-right:1rem;
  }
 }
 @media (min-width: 1801px) and (max-width: 2300px){
  margin-left:250px;
  margin-right:250px;
}
@media (min-width: 2301px) and (max-width: 3200px){
  margin-left:250px;
  margin-right:250px;
}
`

const Description = styled.h5`
color:black;
margin-left:30px;
font-family:Roobert-medium;
@media (min-width: 1145px) and (max-width: 6000px)
{
    color:white;
    width:350px;
    font-weight:500;
    margin-bottom:35px;
    margin-left:0px;
    font-size:23px;

}
`
const SubDescription = styled.p`
color:black;
font-weight: 400;
margin-left:30px;
margin-bottom:50px;
font-family:Roobert-medium;
@media (min-width: 1145px) and (max-width: 6000px)
{
    color:white;
    width:300px;
    margin-left:0px;
    font-size:17px;

}
`