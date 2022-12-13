import React, { useState } from 'react'
import styled from 'styled-components';
import { Row, Col, Container, Collapse, Modal } from 'react-bootstrap';
import SignupModal from '../../layouts/Auth/SignupModal';
import questionmark from '../../../assets/question-mark.png';
import homemainvideo from '../../../assets/homemainvideo.webp';
import homemainvideoSM from '../../../assets/homemainvideoSM.webp'
import Join from './Join';
import Openarrow from '../../../assets/open.png'
import Closearrow from '../../../assets/close.png'
import IframePlayer from "player-iframe-video";
import "player-iframe-video/dist/index.css"
const HomeMain = () => {

    const [ind, setInd] = useState();
    const [signUpModalShow, setSignUpModalShow] = React.useState(false);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const iFrame = <iframe width="956px" height="784px" style={{ borderRadius: '25px' }}
        src="https://player.vimeo.com/video/736253057?h=d178710954&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameBorder="0"
        allow="fullscreen; picture-in-picture"
        allowFullScreen
        title="test player iframe vimeo" />
    const data = [
        {
            que: 'How long does it take to become a service provider?',
            ans: ' It’s possible to become an SwiftBel partner in 48 hours and start accepting bookings in just a few days! You can begin the process by signing up here. We’re excited to hear from you!'
        },
        {
            que: 'Can Service Provider set up their own pricing?',
            ans: 'Yes'
        },
        {
            que: 'How much do Swiftbel Charge?',
            ans: ' It depends'
        },
        {
            que: 'What documents do i need to signup?',
            ans: 'It depends'
        },
        {
            que: 'Can service providers set up their own pricing?',
            ans: 'It depends'
        }
    ]
    const handleaccordian = (index) => {
        console.log(index)
        setInd(index)
        if (open === true) {
            setOpen(false)
        }
        else setOpen(true)
    }
    console.log(open, 'open')
    return (
        <React.Fragment>
            <HomeMainContainer fluid style={{ backgroundColor: '#fff' }}>
                <div className='mobview' onClick={handleShow}>
                    <img  src={homemainvideoSM} alt="Flowers" className='deskimg' />
                </div>
                <div className='deskview' onClick={handleShow}>
                    <img src={homemainvideo} alt="Flowers" className='deskimg' />
                </div>
                <br />
                <Modaldesign
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show} onHide={handleClose}
                    dialogClassName="custom-modal"
                >
                    <div style={{ borderRadius: '20px', height: '504px' }} className='d-flex justify-content-center'>

                        <IframePlayer id={"iframe-vimeo-player-test"} iFrame={iFrame} />
                    </div>
                </Modaldesign>
                <Join setsignup={setSignUpModalShow} customer={false} />
                <br />
                <Questions>
                    <h1 className='q-head'>Questions? We have answers.</h1>
                    <div className='deskquestions'>
                        <Row>
                            <Col lg={1} md={1} sm={2} className='d-flex justify-content-end'>
                                <img alt='' src={questionmark} style={{ width: '60px', height: '60px' }} />
                            </Col>
                            <Col lg={5} md={5} sm={10} className='d-flex justify-content-start flex-column' style={{ width: '40%' }}>
                                <h2 className='mt-5 pt-4'>How long does it take for me to join your service?</h2>
                                <p>You can join up now and start accepting bookings in just a few days!
                                    We validate your business credential, then you're ready to go.</p>
                            </Col>
                            <Col lg={1} md={1} sm={2} className='d-flex justify-content-end'>
                                <img alt='' src={questionmark} style={{ width: '60px', height: '60px' }} />
                            </Col>
                            <Col lg={5} md={5} sm={10} className='d-flex justify-content-start flex-column' style={{ width: '40%' }}>
                                <h2 className='mt-5 pt-4'>How much does SwiftBel charge?</h2>
                                <p>When a customer pays, SwiftBel retains 15% to cover payment processing, customer acquisition, customer service, and our fixed costs. We do deduct $20 from your first payment to cover the third-party background check on your company.</p>
                            </Col>
                        </Row>
                        <Row className='mb-5'>
                            <Col lg={1} md={1} sm={2} className='d-flex justify-content-end'>
                                <img alt='' src={questionmark} style={{ width: '60px', height: '60px' }} />
                            </Col>
                            <Col lg={5} md={5} sm={10} className='d-flex justify-content-start flex-column' style={{ width: '40%' }}>
                                <h2 className='mt-5 pt-4'>Do Service Providers set their own prices?</h2>
                                <p>Yes. Each Service Provider sets prices for their travel time, work hours, and minimum orders. In some cases, you may set a fixed price for a service.</p>
                            </Col>
                            <Col lg={1} md={1} sm={2} className='d-flex justify-content-end'>
                                <img alt='' src={questionmark} style={{ width: '60px', height: '60px' }} />
                            </Col>
                            <Col lg={5} md={5} sm={10} className='d-flex justify-content-start flex-column' style={{ width: '40%' }}>
                                <h2 className='mt-5 pt-4'>How do I sign up?</h2>
                                <p>Just visit our sign-up center and follow the instructions there or click here.</p>
                            </Col>
                        </Row>
                    </div>
                    <Container fluid className='mobquestions'>
                        <Row>
                            <Col xs={12} sm={12}>
                                {data?.map((x, index) => {
                                    return (
                                        <>
                                            <FeedbackButton
                                                key={index}
                                                onClick={() => handleaccordian(index)}
                                                aria-controls="example-collapse-text"
                                                aria-expanded={open}
                                            >
                                                <p style={{ textAlign: 'start', fontSize: '12px' }}> {x.que} </p>
                                                {open === true && data.indexOf(x) === ind ?
                                                    <Arrow src={Openarrow} />
                                                    :
                                                    <Arrow src={Closearrow} />
                                                }
                                            </FeedbackButton>
                                            <Collapse in={data.indexOf(x) === ind ? open : ''}>
                                                <div id="example-collapse-text">
                                                    <p style={{ fontSize: '12px' }}>{x.ans}</p>
                                                </div>
                                            </Collapse>
                                            <hr />
                                        </>
                                    )
                                })}

                            </Col>
                        </Row>
                        <Row>
                        </Row>
                    </Container>
                </Questions>
                <h2 className='helptext'>If you have more questions, you can find answers at our Service Provider <a href='/help/help-centre'>Help Centre</a></h2>
            </HomeMainContainer>
            <SignupModal
                signupModal={setSignUpModalShow}
                show={signUpModalShow}
                onHide={() => setSignUpModalShow(false)}
            />
        </React.Fragment>
    )
}

export default HomeMain;

const HomeMainContainer = styled(Container)`
width: 100%;
height: auto;
font-size: 2.75rem;
line-height: 120%;
.helptext{
    text-align:center;
    margin-top:90px;
    }
.deskview{
    display:flex;
    justify-content:center;
    padding-right:3rem;
padding-left:3rem;
cursor:pointer;

}
.deskimg{
    border-radius:20px;
    width: 100%;
}
.mobview{
    display:none;
    cursor:pointer;
}
img{
  margin-top: 5rem;
}

@media (min-width: 1801px) and (max-width: 6200px){
    .helptext{
        font-size:36px;
        }
}
@media (min-width: 360px) and (max-width: 1000px){
    .helptext{
        text-align:center;
        margin-top:0px;
        }
h2{
      font-size: 16px;
    line-height: 150%;
     letter-spacing: 0.02em;
     color: #190F0F;
     margin-top: 2rem;
     margin-bottom: 2rem;
 }
 .deskview{
     display:none;
 }
 .mobview{
     display:flex;
     justify-content:center;
 }
}
p{
font-size: 21px;
line-height: 150%;
letter-spacing: 0.02em;
color: #190F0F;
}
`
const Modaldesign = styled(Modal)`
.custom-modal{
   width:950px;

}
`

const FeedbackButton = styled.div`
display: none;
@media (min-width: 360px) and (max-width: 1000px){
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
background: #fff;
height: 54px;
color: #190F0F;

&:active{
background: #fff;
outline: none;
color: #190F0F;
}

&:hover{
    background: #fff;
    color: #190F0F; 
    outline: none;
}
}
`
const Questions = styled.div`
.deskquestions{
    display:inline;
}
.q-head{
    text-align:start;
    padding-left:3rem;
}
.mobquestions{
    display:none
}
@media(min-width: 360px) and (max-width: 1000px){
    .deskquestions{
        display:none
    }
    .mobquestions{
        display:inline;
        margin-top:200px;
    }
    .q-head{
        padding-left:1rem;
    }
}
`
const Arrow = styled.img`
width:12px;
margin-bottom:90px;
`