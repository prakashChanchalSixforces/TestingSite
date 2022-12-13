import React, { useState } from 'react'
import HeaderTop from '../../layouts/headerTop'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import swiftbellogo from '../../../assets/swiftbellogoprofile.png'
import ServiceBanner from '../../../assets/serviceBanner.webp'
function CreateNewProfile() {
    const location = useLocation()
    const search = location?.state?.name
    // const address = location?.state?.address
    // const date = location?.state?.date
    // const time = location?.state?.time
const Rightside=()=>{
return(
    <div>
        hello
    </div>
)
}

    return (

        <Segment  style={{ backgroundColor: '#FAFAFA' }}>
            <div className='headerCreate'>
            <Row xs={1} md={4} lg={3} style={{ marginLeft: 10 }}>
                <Col lg={1} md={1} sm={4} xs={4}>
                    <h6 className='mt-3'>Back</h6>
                    </Col>
                <Col lg={4} md={4} sm={8} xs={8} >
                    <h6 className='mt-3'>Sign Up</h6>
                </Col>
                </Row>
            </div>
            <br />
            <ProfileHead>

            <img src={swiftbellogo} className='mobileprofilelogo'></img>
            </ProfileHead>
            {/* <ServiceHead fluid>
                <ServiceSet>
                    <h1 className='mt-3'>Search moving 
                    <br /> companies, compare 
                    <br /> prices and book
                    <br />in minutes, not hours.
                    </h1>
                </ServiceSet>
                <ServicesBanner src={ServiceBanner}></ServicesBanner>
                <img src={ServiceBanner} className='mobileservicesbanner'></img>
            </ServiceHead> */}
           
            {/* <MainContainer fluid >
                <div className='d-flex '>
                    <Rightdiv className='p-2'>
                        <Rightside />
                    </Rightdiv>
                </div>
            </MainContainer> */}
            <br />
            <br />
           
        </Segment>
    )
}

export default CreateNewProfile

const MainContainer = styled(Container)`
padding-left:50px;
padding-Right:50px;
@media (min-width: 260px) and (max-width: 820px){
    padding-left:0px;
    padding-Right:0px;
    }
`
const Header=styled.div`

`
const Segment = styled.div`
background-color:#FAFAFA;
padding:0px;
@media (min-width: 440px) and (max-width: 766px){
    .headerCreate{
    display:flex;
    .h6{
    font-family:Roobert-medium;
    font-style: normal;
    font-weight: 600;
    font-size: 38px;
    line-height: 136%;
    }
    }
 
    }
    @media (min-width: 767px) and (max-width: 8000px){
        .headerCreate{
            display:none;
        }
    }

`

const ProfileHead = styled(Container)`
display:flex;
justify-content: center;
align-items: center;
padding:0;
h1{
font-family:Roobert-medium;
font-style: normal;
font-weight: 600;
font-size: 38px;
line-height: 136%;
color: #000000; 
padding-bottom: 1rem;
  }

@media (min-width: 767px) and (max-width: 8000px){
    .mobileprofilelogo{
      display:none
    }
  }
  @media (min-width: 200px) and (max-width: 539px){
   
    .mobileprofilelogo{
    width: 15%;
    border-radius: 0px;
}
    h1{
        display: none;
      }
   
  }
  @media (min-width: 540px) and (max-width: 767px){
    .mobileservicesbanner{
      position: absolute;
    top: 100px;
    width: 100%;
    border-radius: 0px;
    object-fit: fill;
    transform: translateX(10%);
  height: 299px;
  right: 10vw;
}
    h1{
        display: none;
      }
  }
@media (min-width: 900px) and (max-width: 1200px){
    h1{
       
        font-weight: 500;
        font-size: 34px;
        font-family:Roobert-medium;
        font-style: normal;
        font-weight: 600;
      
        
      }  
}
@media (min-width: 767px) and (max-width: 900px){
    h1{
        font-weight: 500;
        font-size: 25px;
      }
}
@media (min-width: 1700px) and (max-width: 1800px){
    h1{
        font-weight: 500;
        font-size: 34px;
        margin-left:3rem;
      } 
}

@media (min-width: 1801px) and (max-width: 2400px){
    h1{
        font-weight: 500;
        font-size: 34px;
        margin-left:6rem;

      }
}
@media (min-width: 2401px) and (max-width: 6200px){
    h1{
        font-weight: 500;
        font-size: 34px;
       margin-left:6rem;
      }
}
@media (min-width: 2700px) and (max-width: 5000px){
  padding-bottom:200px;
}
`

// const ServiceSet = styled.div`
// padding-left:40px;

// @media (min-width: 200px) and (max-width: 767px){
//     top: 0px;

//     height: 400px;
//     .h1{
//       text-align:center;
//     }
//   }
 
// `
// const ServicesBanner = styled.img`

// width: 786px;
// height:213px;
// padding-right: 4vw;
// border-radius: 20px;
// align-self:center;
// @media (min-width: 200px) and (max-width: 767px){
//     display:none
// }
//   @media (min-width: 767px) and (max-width: 992px){
//     height:145px;
//     width:55%;
//     padding-right: 7vw;
//   }
  
  
//   @media (min-width: 992px) and (max-width: 1212px){
//     height:190px;
//     width:55%
//   }
//   `

// const SignupButton = styled.button`
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 14px 44px;
// width: 420px;
// height: 55px;
// background: #000000;
// border-radius: 50px;
// color: #fff;

// @media (min-width: 200px) and (max-width: 767px){
//   width: 291px;
//   height: 44px;
//   position: absolute;
//   top: 333px;
//   z-index: 10;
// }

// @media (min-width: 1267px) and (max-width: 1491px){
// width: 320px;
// }
// @media (min-width: 1059px) and (max-width: 1266px){
//   width: 270px;
//   }
// @media (min-width: 901px) and (max-width: 1058px){
//   width: 220px;
// }
// @media (min-width: 756px) and (max-width: 900px){
//   width: 170px;
// }
// @media (min-width: 1801px) and (max-width: 2300px){
//     width: 570px;
//     height: 85px;
//     font-size: 29px;

// }
// @media (min-width: 2301px) and (max-width: 6200px){
//     width: 570px;
//     height: 85px;
//     font-size: 29px;

// }
// `