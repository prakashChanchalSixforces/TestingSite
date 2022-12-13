import React, { useState } from 'react'
import styled from 'styled-components'
import './profileModal.css'
import tray from '../../../../../assets/tray.png'
import { Button, Carousel, Modal, Stack } from 'react-bootstrap'
import { UploadPost } from '../../../../../store/Actions/serviceProvider.actions'
import { useDispatch } from 'react-redux'
function AddNewPostComponent(props) {
    const dispatch=useDispatch()
    const [selectedImage, setSelectedImage] = useState([]);
    const [postData, setpostData] = useState([]);
    const [caption, setcaption] = useState('');
    const imageHandleChange = (e) => {
        const FileList = e.target.files
        const imageList = []

        Object.keys(FileList).map((item, index) => {
            const fileURL = URL.createObjectURL(FileList[item])
            imageList.push(fileURL)

        })
        setpostData(FileList)
        setSelectedImage(imageList)
    }
    const onAddNewPost = async () => {
        const res = await dispatch(UploadPost(postData, caption));
        if (res.status === true) {
            props?.onHide(false)
            setSelectedImage([])
        }
    }
    return (
        <React.Fragment>
            <Modal
                show={props?.show}
                size='sm'
                onHide={() => {
                    props?.onHide(false)
                    setSelectedImage([])
                }}
                dialogClassName="crop-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Header >
                    Post
                    <Save variant='light' onClick={()=>onAddNewPost()}
                    >{"Save"}</Save>
                </Header>
                <ModalBody>
                    {selectedImage.length > 0 ?  <div className='d-flex'>
                        <div style={{ height: '40vh', width: '40vw' }}>
                            <Carousel>
                                {
                                    selectedImage.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img

                                                src={image}
                                                alt="First slide"
                                                style={{ height: '40vh', width: '20vw', objectFit: 'cover' }}
                                            />
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </div>
                        <CaptionBody
                            onChange={(e) => setcaption(e.target.value)}
                            rows="20" placeholder='Write a caption'>
                        </CaptionBody>
                    </div>: <PostsUploadStack gap={2}>
                        <Label for='file'> <img src={tray} style={{ width: '18.05px', height: '17.95px' }} alt='file upload'></img></Label>
                        <StyledDocUploadInput
                            name='docupload'
                            type='file'
                            multiple={true}
                            id='file'
                            accept="image/*"
                            onChange={imageHandleChange}
                        />
                        <Label for='file'>Select from device</Label>
                    </PostsUploadStack> }
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
export default AddNewPostComponent

const CaptionBody = styled.textarea`
width: 100%;
height: 30vh;
padding: 1rem;
font-family: 'SF Pro Display';
font-weight: 400;
font-size: 14px;
line-height: 150%;
letter-spacing: 0.02em;
background: #fff;
color: #190F0F;
border: none;
&:focus {
    outline: none;
    box-shadow: 0px 0px 0px white;
    border: none;
  }
}
`
const ModalBody = styled(Modal.Body)`
display: flex;
align-items: center;
justify-content: flex-end;

`
const PostsUploadStack = styled(Stack)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
align-self:center;
`
const Header = styled(Modal.Header)
    `
font-weight: 400;
font-size: 16px;
display: flex;
letter-spacing: 0.01em;
font-family:Open Sans;
color: #787373;
justify-content:space-between;
text-align:center;
margin-left:10px;
margin-right:10px;
`

const StyledDocUploadInput = styled.input`
display: none;
`

const Label = styled.label`
font-family: SF Pro Display;
font-size: 16px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0.02em;
text-align: left;
`
const Save = styled(Button)`
border:1px solid #F3F3F3;
border-radius: 8px;
width: 100px;
height: 40px;
background: #FFFFFF;
background-color:#FFFFFF;
color:#D81159;
margin:3px;
display:flex;
padding-left:30px;
align-items:center;
@media (min-width: 200px) and (max-width:970px)
{
margin-right:20px;
}
`