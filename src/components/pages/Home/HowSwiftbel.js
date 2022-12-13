import React from 'react'
import styled from 'styled-components'
import {Stack } from 'react-bootstrap';
import work1 from '../../../assets/swiftbelwork_1.png';
import work2 from '../../../assets/swiftbelwork_2.png';
import work3 from '../../../assets/swiftbelwork_3.png';
import work4 from '../../../assets/swiftbelwork_4.png';


const HowSwiftbel = () => {
    return (
        <React.Fragment>
        <HowSwiftbelContainer>
            <h1 className='mb-5'>How SwiftBel works for Service Providers</h1>
              <div className='deskview'>
                <div className='inline-div'>
              <div className='description'>
              <div className='img-icon' >
              <img alt='' src={work1} style={{ width: '60px', height: '60px', marginBottom: '3.5rem' }} />
              </div>
              <div>
              <h6 className='mt-2'>Differentiate among competitors</h6>
               <p className='mt-2'>Win business online with no financial risk</p>
              </div>
            </div>
            <div className='description'>
              <div className='img-icon' >
              <img alt='' src={work3} style={{ width: '60px', height: '60px', marginBottom: '4.5rem' }} />
              </div>
              <div>
              <h6 className='mt-2'>Track travel time and job hours automatically</h6>
              <p className='mt-2' >SwiftBel does the tracking, so you don't have to.</p>
              </div>
            </div>
            </div>
            <div className='inline-div'>
              <div className='description'>
              <div className='img-icon' >
              <img alt='' src={work2} style={{ width: '60px', height: '60px', marginBottom: '3.5rem' }} />
              </div>
              <div>
              <h6 className='mt-2'>Assign employees to booked jobs</h6>
              <p className='mt-2' >Add your workers then assign, book, route and dispatch them.</p>
              </div>
            </div> 
            <div className='description'>
              <div className='img-icon' >
              <img alt='' src={work4} style={{ width: '60px', height: '60px', marginBottom: '6rem' }} />
              </div>
              <div>
              <h6 className='mt-2'>Eliminate unpaid work with automatic invoicing and payment</h6>
                                            <p className='mt-2' style={{ width: '100%' }}>Bill and get paid immediately, based on hours tracked. Just add materials.</p>
              </div>
            </div>
            </div>
                                </div>
                                <div className='mobview'>
                                    <Stack direction='vertical' gap={1} className='mt-5'>
                                        <img alt='' src={work1} style={{ width: '60px', height: '60px' }} />
                                        <Stack direction='vertical' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h6>Differentiate among competitors</h6>
                                            <p className='mt-2' style={{ width: '100%' }}>Win business online with no financial risk</p>
                                        </Stack>
                                    </Stack>
                                    <Stack direction='vertical' gap={1} className='mt-5'>
                                        <img alt='' src={work3} style={{ width: '60px', height: '60px' }} />
                                        <Stack direction='vertical' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h6>Track travel time and job hours automatically</h6>
                                            <p className='mt-2' style={{ width: '100%' }}>Swiftbel does the tracking, so you don't have to</p>
                                        </Stack>
                                    </Stack>
                                </div>
                                <div className='mobview'>
                                    <Stack direction='vertical' gap={1} className='mt-5'>
                                        <img alt='' src={work2} style={{ width: '60px', height: '60px' }} />
                                        <Stack direction='vertical'>
                                            <h6>Assign employees to booked jobs</h6>
                                            <p className='mt-2' style={{ width: '100%' }}>Add your workers then assign, book, route and dispatch them.</p>
                                        </Stack>
                                    </Stack>
                                    <Stack direction='vertical' gap={1} className='mt-5'>
                                        <img alt='' src={work4} style={{ width: '60px', height: '60px' }} />
                                        <Stack direction='vertical'>
                                            <h6>Eliminate unpaid work with automatic invoicing and payment</h6>
                                            <p className='mt-2' style={{ width: '100%' }}>
                                                Bill and get paid immediately, based on hours tracked. Just add materials.
                                            </p>
                                        </Stack>
                                    </Stack>
                                </div>
        </HowSwiftbelContainer>
        </React.Fragment>
    )
}

export default HowSwiftbel;

const HowSwiftbelContainer = styled.div`
width: 100%;
font-size: 2.75rem;
line-height: 120%;
color: var(--mainWhite);
backgroundColor: #190F0F;
background:#190F0F;
padding:3rem;
.inline-div{
    display:inline;
    margin-right:80px;
}
.description{
    display:flex;
  }
  .img-icon{
    margin-right:20px;
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
.mobview{
    display:none;
}
.deskview{
    display:flex;
    justify-content:space-between;
}
@media (min-width: 200px) and (max-width: 767px){
    padding:2rem;
    .mobview{
        display:inline
    }
    .deskview{
        display:none
    }
}

  @media (min-width: 1801px) and (max-width: 6200px){
    .inline-div{
        margin-right:0px;
    }
    h6{
        font-size: 39px;
      }
      
      p{
          font-size: 30px;
      }
    
}  
`
