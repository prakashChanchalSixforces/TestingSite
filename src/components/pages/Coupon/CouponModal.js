import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import '../../layouts/Auth/modalStyles.css'
import styled from 'styled-components';
import Close from '../../../assets/serviceclose.png';
import starbuckglass from '../../../assets/starbuckglass.png'
import SignupModal from '../../layouts/Auth/SignupModal';

const CouponModal = (props) => {
    const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = mql.matches;
    const [signUpModalShow, setSignUpModalShow] = React.useState(false);
    const [loginModalShow, setLoginModalShow] = React.useState(false);
    const handlesignup=()=>{
        setSignUpModalShow(true)
        props?.Couponmodal(false)
    }
    const handleclose=()=>{
    localStorage.setItem('close', true)
    props?.Couponmodal(false)
    }
    const renderitem=()=>{
        return(
            <>
            <div className='d-flex'>
             <Img src={starbuckglass}/>
             <div className='mt-2'>
              <Text1>Get <span style={{color:'#D81159'}}>$50</span> gift card</Text1>
              <Text2>for Starbucks, when you book
                your first home service</Text2>
                <Sign variant='dark' onClick={()=>handlesignup()} >Sign up now!</Sign>
             </div>
            </div>
            </>
        )
    }
    return (
        <div>
                <Modal
                    {...props}
                    centered
                    show={props?.show}
                    onHide={() =>props?.Couponmodal(false)}
                    size={mobileView ? 'sm' : 'md'}
                >
                    <Header
                    >
                    <p></p>
                    <div className='closediv' onClick={()=>handleclose()}>
                    <img src={Close} className='close' />
                    </div>
                    </Header>
                    <Modal.Body>
                        <div className='signup-modal-right'>
                          {renderitem()}
                        </div>
                    </Modal.Body>
                </Modal>
                <SignupModal
              //email={email}
              signupModal={setSignUpModalShow}
              loginModal={setLoginModalShow}
              loginModalshow={loginModalShow}
              show={signUpModalShow}
              onHide={() => setSignUpModalShow(false)}
            />
               </div>
    )
}
export default CouponModal;


const Text1=styled.p`
font-family: Roobert-medium;
font-weight: 500;
font-size: 36px;
margin-left:-40px;
@media (min-width: 260px) and (max-width: 768px){
    font-size: 23px;
}
`
const Text2=styled.p`
font-family: Roobert-medium;
font-weight: 500;
font-size: 22px;
margin-left:-40px;
margin-top:-15px;
@media (min-width: 260px) and (max-width: 768px){
    font-size: 16px;
}
`
const Img = styled.img`
margin-top:-30px;
margin-left:-40px;
`
const Sign=styled(Button)`
font-family: Roobert-medium;
font-weight: 400;
font-size: 14px;
margin-left:-40px;
border-radius:8px;
@media (min-width: 260px) and (max-width: 768px){
    width:120px;

}
`
const Header = styled.div
`
display:flex;
justify-content:space-between;
margin-left:10px;
margin-right:10px;
font-family:Roobert-medium;
font-weight: 500;
font-size: 18px;
padding:12px;
.closediv{
    background:#ECEDEF;
    background-color:#ECEDEF;
    border-radius:50%;
    padding-left:10px;
    padding-right:10px;
    cursor:pointer;
}
.close{
    height:10px;
    width:10px;
}
`
