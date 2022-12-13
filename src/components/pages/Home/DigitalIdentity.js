import React from 'react'
import styled from 'styled-components';
import {Col } from 'react-bootstrap';
import Dip9 from '../../../assets/DIP9.webp'
import Dip10 from '../../../assets/DIP10.webp'
import DIP10SM from '../../../assets/DIP10SM.webp'
import DIP11SM from '../../../assets/DIP11SM.webp'
import DIP12SM from '../../../assets/DIP12SM.webp'
import Dip11 from '../../../assets/DIP11.webp'
import Dip12 from '../../../assets/DIP12.webp'
import digitalidentity2 from '../../../assets/digitalidentity_2.png'
import digitalidentity1 from '../../../assets/mobile-digitalidentity_1.png'
import HowSwiftbel from './HowSwiftbel';
const DigitalIdentity = () => {

  return (
    <React.Fragment>
    <DigitalIdentityContainer style={{ backgroundColor: '#fff' }}>
      <Heading className='pb-5'>Create your digital identity</Heading>
      <Identity>
        <div>
            <img src={digitalidentity1} alt="Flowers" className='mob-image' />
            <img src={Dip9} alt="Flowers" className='img-left' />
        </div> 
        <div className='right-side'>            
            <div className='description'>
              <div className='img-icon' >
              <img alt='' src={digitalidentity2}  />
              </div>
              <div>
              <h5>Automatic tracking of travel and work time</h5>
              <p>Accurate billing increases your profits</p>
              </div>
            </div>
          <div className='description'>
            <div  className='img-icon'>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M51.6751 50.763H8.82681C8.20438 50.763 7.69922 50.2578 7.69922 49.6354C7.69922 49.013 8.20438 48.5078 8.82681 48.5078H51.6751C52.2975 48.5078 52.8027 49.013 52.8027 49.6354C52.8027 50.2578 52.2975 50.763 51.6751 50.763Z" fill="black" />
              <path d="M23.8391 46.2509C22.3935 46.2509 20.9502 45.7006 19.8497 44.6024L7.09441 31.8448C4.89561 29.6461 4.89561 26.0693 7.09441 23.8706L24.6351 6.32982C25.0749 5.89006 25.7898 5.89006 26.2296 6.32982L45.3647 25.465C45.5767 25.6769 45.6939 25.9634 45.6939 26.2633C45.6939 26.5632 45.5744 26.8496 45.3647 27.0616L27.824 44.6024C26.7279 45.7006 25.2824 46.2509 23.8391 46.2509ZM21.4463 43.008C22.7656 44.3227 24.908 44.3272 26.2318 43.008L42.9765 26.2655L25.4335 8.72256L8.68881 25.465C7.36954 26.7842 7.36954 28.9312 8.68881 30.2504L21.4463 43.008Z" fill="black" />
              <path d="M47.1653 46.2516C44.0554 46.2516 41.5273 43.7213 41.5273 40.6137C41.5273 37.9075 45.4513 32.0914 46.2384 30.9525C46.6579 30.3414 47.6749 30.3414 48.0922 30.9525C48.8792 32.0914 52.8032 37.9075 52.8032 40.6137C52.8032 43.7213 50.2752 46.2516 47.1653 46.2516ZM47.1653 33.6317C45.5416 36.1687 43.7825 39.3823 43.7825 40.6137C43.7825 42.4787 45.3002 43.9964 47.1653 43.9964C49.0303 43.9964 50.548 42.4787 50.548 40.6137C50.548 39.3801 48.789 36.1665 47.1653 33.6317Z" fill="black" />
              <path d="M43.7603 28.2122H6.66274C6.04032 28.2122 5.53516 27.707 5.53516 27.0846C5.53516 26.4622 6.04032 25.957 6.66274 25.957H43.7603C44.3828 25.957 44.8879 26.4622 44.8879 27.0846C44.8879 27.707 44.385 28.2122 43.7603 28.2122Z" fill="black" />
            </svg>
            </div>
            <div>
              <h5>Automatic invoicing</h5>
              <p>Spend less time billing and more time working</p>
            </div>
          </div>
        </div>
      </Identity>
      <br/>
      <br/>
      <HowSwiftbel />
      <div className='mt-5 mb-3'>
        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <h3>It's this simple!</h3>
        </Col>
        </div>
      <Steps >
        <div>
           <img src={DIP10SM} alt="Flowers" className='mob-step-image' />
            <img src={Dip10} alt="Flowers" className='step-image'/>
            <Titles><b>Sign up</b></Titles>
        </div>
        <div>
            <img src={DIP11SM} alt="Flowers" className='mob-step-image' />
            <img src={Dip11} alt="Flowers" className='step-image'/>
            <Titles><b>Set your price</b></Titles>
        </div>
        <div>
            <img src={DIP12SM} alt="Flowers" className='mob-step-image'/>
            <img src={Dip12} alt="Flowers" className='step-image'/>
            <Titles><b>Confirm bookings</b></Titles>
        </div>
        </Steps>

    </DigitalIdentityContainer>
    </React.Fragment>
  )
}

export default DigitalIdentity;

const DigitalIdentityContainer = styled.div`

          h1{
          font-weight: 500;
          font-size: 44px;
          line-height: 120%;
             }

          h3{
          font-weight: 500;
          font-size: 34px;
          line-height: 120%;    
            }

   @media (min-width: 360px) and (max-width: 800px){
    padding-left: 0rem;
    padding-right: 0rem;
     h1{
      font-weight: 500;
      font-size: 21px;
      line-height: 120%;
     }
     .img-left{
      display:none
     }
   }
    
    @media (min-width: 1600px) and (max-width: 1800px){
      .img-left{
      width:130%;
      padding-right:3rem;
      }
  }
    @media (min-width: 1900px) and (max-width: 2400px){
      .img-left{
      width:150%;
      padding-right:3rem;
      }
  }
  @media (min-width: 2401px) and (max-width: 3200px){ 
    .img-left{
    width:190%;
    padding-right:3rem;
    }
  }
`
const Steps=styled.div`
display:flex;
justify-content:space-between;
padding-left: 4rem;
padding-right: 4rem;
.mob-step-image{
  display:none
}
.step-image{
  height:600px
}
@media (min-width: 360px) and (max-width: 912px)
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
@media (min-width: 2301px) and (max-width: 6200px){
  margin-left:250px;
  margin-right:250px;
}
`
const Identity=styled.div`
display:flex;
justify-content:space-between;
padding-left: 3rem;
padding-right: 3rem;
.right-side{
  padding:3rem
}
.description{
  display:flex;
}
.img-icon{
  margin-right:20px;
}
.mob-image{
  display:none;
}
@media (min-width: 800px) and (max-width: 1200px){
  display:inline;
.img-left{
  padding-left: 3rem;

}
}

@media (min-width: 360px) and (max-width: 800px)
 {
  display:inline;
  .description{
    display:inline;
  }
  .mob-image{
    display:flex;
    width:101%;
    padding-left:1rem;
    padding-right:1rem;
  }
  .img-icon{
    margin-right:0px;
  }
 }
 @media (min-width: 2101px) and (max-width: 3200px){ 
  h5{
font-size:34px
  }
  p{
font-size:30px
  }
  .right-side{
    padding-top:8rem
  }
}

@media (min-width: 1900px) and (max-width: 2400px){
  h5{
    font-size:24px
      }
      p{
    font-size:20px
      }
}
`
const Heading = styled.h1`
font-size: 21px;
margin-bottom:-20px;
padding-left: 3rem;
padding-right: 3rem;
@media (min-width: 360px) and (max-width: 912px)
{
  
  text-align:center
}
`
const Titles = styled.p`
font-size: 21px;
text-align : center !important ;
margin-top:10px;
margin-bottom:40px;
`

