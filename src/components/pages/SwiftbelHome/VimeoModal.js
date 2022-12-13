import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../layouts/Auth/modalStyles.css'
import IframePlayer from "player-iframe-video";
import "player-iframe-video/dist/index.css"
import styled from 'styled-components';
const VimeoModal = (props) => {
    const iFrame = <iframe width="100%" height="100%"
    src="https://player.vimeo.com/video/736253057?h=d178710954&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    frameBorder="0"
    allow="fullscreen; picture-in-picture;"
    allowFullScreen
    title="test player iframe vimeo" />
    return (
                <CustomModal
                    {...props}
                    dialogClassName="auth-verification-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={props?.show}
                    onHide={() =>props?.VimeoPopup(false)}
                >
                    <Modal.Body>
                        <div className='signup-modal-right'>
                        <IframePlayer  id={"iframe-vimeo-player-test"} iFrame={iFrame}  />
                        </div>
                    </Modal.Body>
                </CustomModal>
    )
}
export default VimeoModal;

const CustomModal=styled(Modal)`
.modal-content {
padding: 0rem;
height:300px;
}
`

