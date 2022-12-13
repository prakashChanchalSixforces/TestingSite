import React, { useState } from 'react'
import styled from 'styled-components'
import SignupModal from '../../../layouts/Auth/SignupModal';
import Starbucks from '../../../../assets/starbucks.png'
import { isAuthenticated } from '../../../layouts/Auth/Authentication';

function Discount(props) {
    const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
    return (
        <React.Fragment>
            <WebView>
                <Segment className='d-flex justify-content-center webbanner'>
                        <Text1>Get <span style={{ color: '#D81159' }}> $50</span> gift card for <img src={Starbucks} className='starbucks'/> when you book your first home service.
                        {isAuthenticated()?'': <span style={{cursor:'pointer',color: '#D81159'}} onClick={()=>setSignUpModalShow(true)}> Sign up now! </span>}
                        </Text1>
                        {/* <Text2>You can find out more by clicking on <span style={{ color: '#D81159' }}> Learn more</span></Text2> */}
                </Segment>
            </WebView>
            <MobileView>
            <Text1>Get <span style={{ color: '#D81159' }}> $50</span> gift card for <img src={Starbucks} className='starbucks'/> when you book your first home service&nbsp;.&nbsp;
            {isAuthenticated()?'': <span style={{cursor:'pointer',color: '#D81159'}} onClick={()=>setSignUpModalShow(true)} >Sign up now !</span>}
            </Text1>
            {/* <Text2>You can find out more by clicking on <span style={{ color: '#D81159' }}> Learn more</span></Text2> */}
            </MobileView>
            <SignupModal
              //email={email}
              signupModal={setSignUpModalShow}
              loginModal={setLoginModalShow}
              loginModalshow={loginModalShow}
              show={signUpModalShow}
              onHide={() => setSignUpModalShow(false)}
            />
        </React.Fragment>
    )
}
export default Discount

const Segment = styled.div`
background-color:#FAFAFA;
background:#FAFAFA;
font-size:16px;
height:60px;
font-family:Inter;
display:flex;
align-items:center;
padding-left:60px;
padding-top:16px;
.starbucks{
    width:160px;
}
`
const Text1 = styled.p`
font-family:Roobert-medium;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 24px;
text-align: center;
color: #190F0F;
margin-right:20px;
@media (min-width: 260px) and (max-width: 820px){
    text-align:center;
    margin-top:15px;
    margin-left:20px;
    font-size: 14px;
}
`

const MobileView = styled.div`
@media (min-width: 821px) and (max-width: 10000px){
    display:none;
    }
    .starbucks{
    width:120px;
    margin-top:-6px;
}
`
const WebView = styled.div`

@media (min-width: 260px) and (max-width: 820px){
    display:none;
    }

`