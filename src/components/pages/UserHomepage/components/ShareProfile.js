import React from 'react'
import styled from 'styled-components'
import { Modal, Offcanvas } from 'react-bootstrap';
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton
} from "react-share";
import  whatsapp from '../../../../assets/whatsappshare.png'
import  twitter from '../../../../assets/twittershare.jpg'
import  facebook from '../../../../assets/fbshare.png'
import  fbmessenger from '../../../../assets/FbMessanger.webp'
import  email from '../../../../assets/emailshare.png'


const ShareProfile = (props) => {
    const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = mql.matches;
    const renderItem = () => {
        return (
            <React.Fragment>
                <div>
                <Header className='mb-4 mt-2'>Share this company with friends and family</Header>
                <ProfileBanner sm={5} className='mb-4'>
                    <Profilepic src={props?.data?.logoImage ? props?.data?.logoImage : './propic.png'} />
                    <Businessline >{props?.data?.businessName}</Businessline>
                </ProfileBanner>
                <MainBody >
                    <Container >
                        <FacebookShareButton  className='d-flex butn' url={`https://www.swiftbel.com/business/${props?.data.uniqueUrl}`}>
                            <Icons src={facebook}  />
                            <p className='pt-1' style={{ marginLeft: '10px' }}>Facebook</p>
                        </FacebookShareButton>
                    </Container>
                    <Container >
                        <WhatsappShareButton className='d-flex butn' url={`https://www.swiftbel.com/business/${props?.data.uniqueUrl}`}>
                            <Icons src={whatsapp} />
                            <p className='pt-1' style={{ marginLeft: '10px' }}>Whatsapp</p>
                        </WhatsappShareButton>
                    </Container>
                </MainBody>
                <br />
                <MainBody >
                    <Container >
                        <TwitterShareButton className='d-flex butn' url={`https://www.swiftbel.com/business/${props?.data.uniqueUrl}`}>
                            <Icons src={twitter} />
                            <p className='pt-1' style={{ marginLeft: '10px' }}>Twitter</p>
                        </TwitterShareButton>
                    </Container>
                    <Container >
                        <EmailShareButton className='d-flex butn' url={`https://www.swiftbel.com/business/${props?.data.uniqueUrl}`}>
                            <Emailicon src={email} />
                            <p className='pt-1' style={{ marginLeft: '10px' }}>Email</p>
                        </EmailShareButton>
                    </Container>
                </MainBody>
                <br />
                <MainBody >
                    <Container >
                        <FacebookMessengerShareButton className='d-flex butn' url={`https://www.swiftbel.com/business/${props?.data.uniqueUrl}`}>
                            <Fbmessengericon src={fbmessenger} />
                            <p className='pt-1' style={{ marginLeft: '10px' }}>Messanger</p>
                        </FacebookMessengerShareButton>
                    </Container>
                </MainBody>
                <br/>
                <br/>
                </div>
            </React.Fragment>
        )
    }
    return (
        <>
            <Modal
                {...props}
                dialogClassName="auth-verification-modal"
                show={mobileView ? false : props?.show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                  <Cross onClick={()=>props?.onHide(false)}>╳</Cross>
                <Modal.Body>
                    {renderItem()}
                </Modal.Body>
            </Modal>
            <MobileModal show={props?.show} onHide={() => props?.onHide(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => props?.onHide(false)}>
                    <Offcanvas.Title>Share</Offcanvas.Title>
                </Offcanvas.Header>
                {renderItem()}
            </MobileModal>
        </>
    )
}

export default ShareProfile
const MainBody = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-start;
`
const Header = styled.h1`
font-weight: 500;
font-size: 20px;
font-family:Roobert-medium;
line-height: 100%;
letter-spacing: 0.02em;
padding-left:20px;
padding-right:10px;
@media (min-width: 260px) and (max-width: 767px){
   text-align:center;
            }
`
const Icons=styled.img`
height:30px;
width:30px;
border-radius:8px;
margin-right:3px;
`
const Emailicon=styled.img`
height:30px;
width:30px;
margin-right:3px;
`
const Fbmessengericon=styled.img`
height:30px;
width:27px;
border-radius:8px;
margin-right:3px;
`
const Cross= styled.p`
font-size:14px;
float:left;
padding-left:15px;
padding-top:15px;
cursor:pointer;
`
const Container = styled.div`
    width: 200px;
    height: 70px;
    background: white;
    align-items:center;
    display:flex;
    border: 1px solid #D0CECE;
    box-sizing: border-box;
    border-radius: 8px;
    margin-left:20px;
    margin-right:20px;
    padding:10px;
    .butn{
        margin-left:10px;
        margin-right:10px;
        margin-top:10px;
        width: 100px;
    }
`
const MobileModal = styled(Offcanvas)`
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
`
const Businessline = styled.p`
font-weight: 500;
font-size: 18px;
font-family:Inter;
margin-top:25px;
margin-left:10px;
line-height: 100%;
letter-spacing: 0.02em;
@media (min-width: 260px) and (max-width: 767px){
   text-align:center;
            }
`
const Profilepic = styled.img`

border-radius:15px;
margin-left:20px;
width:72px;
height:72px;
border:5px solid white;
`
const ProfileBanner = styled.div`
display:flex;
margin-bottom:15px;

`