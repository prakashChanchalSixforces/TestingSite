import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import './modalStyles.css';
import Authleft from '../../../assets/authleft1.webp';
import SwiftBellogo from '../../../assets/swiftbellogowhite.png';
import Closebutton from '../../../assets/closeBtn.png'
import welcombrand from '../../../assets/welcomebrand.png'

const ModalContent = styled.div`
width: 38.75rem;
height: 37.5rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
@media (min-width: 768px) and (max-width:1127px ) {
    width: 25rem;
    display: flex;
   align-items: center;
  justify-content: center;
}

@media (max-width: 767px)
{
  width: 100%;
  transform: translateX(50%)
}
`
const Welcome = styled.div`
width: 100%;
height: 600px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

h1{
  font-weight: 400;
  font-size: 44px;
  line-height: 120%;
  letter-spacing: 0.01em;
  color: #190F0F;
}
`
const CloseModalButton = styled.img`
cursor: pointer;
position: absolute;
top: 20px;
right: 20px;
padding: 0;
width: 10px;
height: 10px;
z-index: 10;
`

const WelcomeModal = (props) => {

   
    return (
        <div>
            <Modal
                {...props}
                dialogClassName="auth-verification-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className='signup-modal-left'>
                        <img alt='' src={Authleft} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        <img src={SwiftBellogo} className='signup-logo' alt='logo' />
                    </div>
                    <ModalContent>
                        <Welcome>
                            <h1>Welcome <br /> to <b>SwiftBel</b></h1>
                            <img src={welcombrand} alt='welcome logo' />
                        </Welcome>
                        <CloseModalButton src={Closebutton}
                            aria-label='Close modal'
                        />
                    </ModalContent>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default WelcomeModal;