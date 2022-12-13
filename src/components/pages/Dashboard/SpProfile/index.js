import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Moving1 from '../../../../assets/graybackground.jpg'
import edit from '../../../../assets/editphoto.png';
import propic from '../../../../assets/graybackground.jpg'
import { Button, Modal } from 'react-bootstrap'
import './components/profileModal.css'
import { useState } from 'react'
import Languages from './Languages'
import Posts from './Posts'
import Services from './Services'
import Reviews from './Reviews'
import About from './About'
import { Link } from 'react-scroll'
import { useDispatch, useSelector } from 'react-redux'
import { getBannerDetails, getProfileDetails, UploadBannerImage } from '../../../../store/Actions/serviceProvider.actions'
import emptylogo from '../../../../assets/emptylogo.png';
import { getCroppedImg, getRotatedImage } from './components/CropImage';
import Cropper from 'react-easy-crop';
import { Slider, Typography } from '@material-ui/core';
import { getOrientation } from 'get-orientation/browser';
import AddNewPostComponent from './components/AddNewPost';
import EditProfile from '../EditProfile';

const Tab = styled.li`
  font-size: 14px;
  font-family: 'Inter';
  padding: 7px 0px;
  cursor: pointer;
  opacity: 0.6;
  background: transparent;
  border: 0;
  outline: 0;
  margin-right:70px;
  color:#787373;
  @media (min-width: 200px) and (max-width:970px)
{
margin-right:25px;
padding: 3px 0px;
font-size: 13px;
}
  ${({ active }) =>
        active &&
        `
  color:black;
  border-bottom: 3px solid black;
  opacity: 1;
`}
`;
const ButtonGroup = styled.ul`
  display: flex;
  width:100%;
  border-bottom: 1px solid #F3F3F3;
  list-style: none;
  text-align:start;
`;

function SpProfile(props) {
    const types = ['About', 'Languages', 'Posts', 'Services', 'Reviews'];
    const [active, setActive] = useState(types[0]);
    const inputRef = React.useRef();
    const inputRefBanner = React.useRef();
    const profileData = useSelector((state) => state.profileReducer)
    const { profileDetails, servicesPhoto } = profileData
    const [logoImage, setLogoImage] = useState(emptylogo);
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [logoShow, setlogoShow] = useState(false);
    const [isNewPost, setisNewPost] = useState(false);
    const [rotation, setRotation] = useState(0)
    const [croppedImage, setCroppedImage] = useState('')
    const triggerFileSelectPopup = () => inputRef.current.click();
    const triggerBannerFileSelectPopup = () => inputRefBanner.current.click();
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [bannerImage, setbannerImage] = useState(emptylogo);
    const [bannerShow, setbannerShow] = useState(false);
    const [editProfile,setEditProfile]=useState(false)
    const dispatch = useDispatch();
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const ORIENTATION_TO_ANGLE = {
        '3': 180,
        '6': 90,
        '8': -90,
    }

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const uniqueUrl = localStorage.getItem('uniqueUrl');
        await dispatch(getProfileDetails(uniqueUrl))

    }
    //..........Select banner_Image...............//
    const onChangeBanner = async (e) => {
        setZoom(1)
        setRotation(0)
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }
            setbannerImage(imageDataUrl);
        }

        setbannerShow(true);
    }

    const handleclick = (type) => {
        setActive(type)
    }
    ///..........uploading Banner.............//
    const onSubmitBaneer = async () => {
        try {
            const croppedImages = await getCroppedImg(
                bannerImage,
                croppedAreaPixels,
                rotation
            )
            setCroppedImage(croppedImage)
            const res = await dispatch(UploadBannerImage(croppedImages, 'banner'))
            if (res.status === true) {
                await dispatch(getBannerDetails());
            }
        }
        catch (e) {
            console.error(e)
        }
        setbannerShow(false)
    }

    //readingFile...........
    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }
    const onSelectFile = async (e) => {
        setZoom(1)
        setRotation(0)
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }
            console.log(imageDataUrl, "data")
            setLogoImage(imageDataUrl)
        }
        setlogoShow(true);

    }
    ///.....uploading Logo............./
    const onSubmitLogo = async () => {
        try {
            const croppedImages = await getCroppedImg(
                logoImage,
                croppedAreaPixels,
                rotation
            )
            setCroppedImage(croppedImage)
            const res = await dispatch(UploadBannerImage(croppedImages, 'logo'))
            if (res.status === true) {
                await dispatch(getBannerDetails());
            }
        }
        catch (e) {
            console.error(e)
        }
        setlogoShow(false)
    }

    ///.......render logo Modal body.........../////
    const renderLogoData = () => {
        return (
            <React.Fragment>

                <CropperModal >
                    <div style={{ position: 'relative',width: '50%',height: '100%',background: '#333',display: 'flex',}} >
                        <Cropper
                            style={{
                                containerStyle: {
                                    backgroundColor: '#fff',
                                    fill: '#fff'
                                },
                                mediaStyle: {
                                    backgroundColor: '#fff',
                                    fill: '#fff'
                                }
                            }}
                            image={logoImage}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={3 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropShape={'round'}
                            onRotationChange={setRotation}

                        />
                    </div>
                    <div style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginLeft: 30, width: '40%' }}>
                        <Typography variant="overline"style={{ fontFamily: 'Open Sans' }}>
                            Zoom
                        </Typography>
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            style={{
                                padding: '22px 0px',
                                marginLeft: 16,
                                color: '#E24F84'
                            }}
                            onChange={(e, zoom) => setZoom(zoom)}
                        />

                        <div >
                            <Typography
                                variant="overline"
                                style={{ fontFamily: 'Open Sans' }}
                            //classes={{ root: classes.sliderLabel }}
                            >
                                Straighten
                            </Typography>
                            <Slider
                                style={{
                                    padding: '22px 0px',
                                    marginLeft: 16,
                                    color: '#E24F84'
                                }}
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                aria-labelledby="Rotation"
                                //classes={{ root: classes.slider }}
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </div>
                        <p style={{ fontFamily: 'Open Sans' }}>Drag to reposition photo</p>
                    </div>
                </CropperModal>
            </React.Fragment>
        )
    }

    ///.......render banner Modal body.........../////
const renderBannerData=()=>{
    return(
    <React.Fragment>
                <CropperModal >
                    <div style={{ position: 'relative',width: '50%',height: '100%',background: '#333',display: 'flex',}} >
                        <Cropper
                            style={{
                                containerStyle: {
                                    backgroundColor: '#fff',
                                    fill: '#fff'
                                },
                                mediaStyle: {
                                    backgroundColor: '#fff',
                                    fill: '#fff'
                                }
                            }}
                            image={bannerImage}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={5 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropShape={'rect'}
                            onRotationChange={setRotation}
                        />
                    </div>
                    <div style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginLeft: 30, width: '40%' }}>
                        <Typography variant="overline"style={{ fontFamily: 'Open Sans' }}>
                            Zoom
                        </Typography>
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            style={{
                                padding: '22px 0px',
                                marginLeft: 16,
                                color: '#E24F84'
                            }}
                            onChange={(e, zoom) => setZoom(zoom)}
                        />

                        <div >
                            <Typography
                                variant="overline"
                                style={{ fontFamily: 'Open Sans' }}
                            //classes={{ root: classes.sliderLabel }}
                            >
                                Straighten
                            </Typography>
                            <Slider
                                style={{
                                    padding: '22px 0px',
                                    marginLeft: 16,
                                    color: '#E24F84'
                                }}
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                aria-labelledby="Rotation"
                                //classes={{ root: classes.slider }}
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </div>
                        <p style={{ fontFamily: 'Open Sans' }}>Drag to reposition photo</p>
                    </div>
                </CropperModal>
            </React.Fragment>
    )
}
    return (

        editProfile?<EditProfile/>:
        <React.Fragment>
             <br/>
        <br/>
            <Main>
                <input
                    type='file'
                    accept='image/*'
                    ref={inputRef}
                    onChange={onSelectFile}
                    style={{ display: "none" }}
                    onClick={(event) => {
                        event.target.value = null
                    }}
                />
                   <input
                        type='file'
                        accept='image/*'
                        ref={inputRefBanner}
                        onChange={onChangeBanner}
                        style={{ display: "none" }}
                        onClick={(event) => {
                            event.target.value = null
                        }}
                    />
                <div>
                    <div style={{ justifyContent: 'flex-start', display: 'flex' }}>
                    <Banner onClick={triggerBannerFileSelectPopup} src={profileDetails?.bannerImage || Moving1} />
                    <BannerEdit onClick={triggerBannerFileSelectPopup}>
                        <img  className='bannerimg'  src={edit} alt='bannerimg'/>
                    </BannerEdit>
                    </div>
                    <div style={{ display: 'flex',justifyContent: 'flex-start',  }}>
                    <Propic onClick={triggerFileSelectPopup} src={profileDetails?.logoImage || propic} />
                    <LogoEdit onClick={triggerFileSelectPopup}>
                        <img  className='logoImg'src={edit} alt='logoImg'/>
                    </LogoEdit>
                    </div>
                </div>
                {/* <Headings> */}
                <Headings>
                    <div>
                        <Title>{profileDetails?.businessName || "--"}</Title>
                    </div>
                    <div className='mt-4'>
                        <Subtitle className='d-flex '>
                            <div className='description'>
                                <p className='d-flex text '><p className='num'>{profileDetails?.rating || "0"}</p>&nbsp; Rating</p>
                            </div>
                            <div className='description'>
                                <p className='d-flex text'><p className='num'>{profileDetails?.review?.length || "0"}</p>&nbsp;Reviews</p>
                            </div>
                            <div className='description'>
                                <p className='d-flex text'><p className='num'>{profileDetails?.moves || "0"}</p>&nbsp; {'Moves'}</p>
                            </div>
                        </Subtitle>
                    </div>

                </Headings>
                <div className='d-flex justify-content-between'>
                    <Headings/>
                    <div className=' d-flex'>
                        <AddNewPost variant='dark' onClick={()=>setisNewPost(true)}>
                            Add new post
                        </AddNewPost>
                        <div className='d-inline'>
                            <Edit variant='light'  onClick={()=>setEditProfile(true)}>
                                <img alt='' src={edit} className='dots' />
                                <p className=' mt-3'>Edit</p>
                            </Edit>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <ButtonGroup>
                    <div style={{ marginLeft: '-30px', display: 'flex' }}>
                        {types.map(type => (
                                <Tab active={active === type}>
                                    <Link
                                        key={type}
                                        onClick={() => handleclick(type)}

                                        to={type}
                                        spy={true}
                                        smooth={true}
                                    >
                                        {type}
                                    </Link>
                                </Tab>
                        ))}
                    </div>
                </ButtonGroup>
                <br />
                <div>
                    <div id="About" className='mt-1'>
                        <About
                            data={profileDetails}
                        />
                    </div>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <div id="Languages" >
                        <Languages
                            data={profileDetails?.languagesSupported}
                        />
                    </div>
                    <br />
                    <hr />
                    <div id="Posts" className='mt-5' >
                        <>
                            <Posts
                                post={profileDetails?.post}
                            />
                            <hr />
                        </>

                    </div>
                    <div id="Services" className='mt-5'>
                        <Services
                            service={servicesPhoto}
                        />
                    </div>
                    <br />
                    <hr />
                    <div id="Reviews" className='mt-5'>
                        <Reviews
                            review={profileDetails?.review}
                        />
                    </div>
                </div>
                {logoShow && logoImage ? <Modal
                    show={logoShow}
                    size='sm'
                    onHide={() => {
                        setlogoShow(false)
                    }}
                    dialogClassName="crop-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Header >
                        Logo Image
                        <Save  variant='light' onClick={() => onSubmitLogo()}
                        >{"Save"}</Save>
                    </Header>
                    <Modal.Body>
                        {renderLogoData()}
                    </Modal.Body>
                </Modal> : null}
                {
                bannerShow && bannerImage ?
                <Modal
                show={bannerShow}
                size='sm'
                onHide={() => {
                    setbannerShow(false)
                }}
                dialogClassName="crop-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Header >
                    Banner Image
                    <Save  variant='light' onClick={() => onSubmitBaneer()}
                    >{"Save"}</Save>
                </Header>
                <Modal.Body>
                    {renderBannerData()}
                </Modal.Body>
            </Modal>:null
                }
                <AddNewPostComponent
                forgotPasswordModal={setisNewPost}
                show={isNewPost}
                onHide={() => setisNewPost(false)}
                />
            </Main>
        </React.Fragment>
    )
}
export default SpProfile

const LogoEdit = styled.div`
position: absolute;
margin-bottom:90px;
.logoImg{
    width: 30px;
    height: 30px;
    margin-left:85px;
    margin-top: -30px;
}
`
const BannerEdit = styled.div`
position: absolute;
right:70px;
margin-top:190px;
.bannerimg{
    width: 30px;
    height: 30px;
}
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
const Main = styled.div`
margin-right:32px;
@media (min-width: 200px) and (max-width:970px)
{
  margin-right:0px;
}
.dots{
  height:30px;
  width:30px;
  }
  .edit{
      margin-top:12px;
  text-align:center;
  }
`
const CropperModal = styled.div`
width: 100%;
height: 100%;
background:#fff;
display:flex;
`
const Headings = styled.div`
display:flex;
justify-content:space-between;
@media (min-width: 200px) and (max-width:970px)
{
display:inline;
}
.mobbook{
display:none;
@media (min-width: 200px) and (max-width:1115px)
{
display:inline;
}
}
.webbook{
    display:inline;
    @media (min-width: 200px) and (max-width:1115px)
    {
    display:none;
    }
    }
`
const Banner = styled.img`
width:100%;
height: 240px;
object-fit:cover;
border-radius: 10px 1em 1em 11em;
position:relative;
@media (min-width: 200px) and (max-width:970px)
{
border-radius: 10px 10px 10px 3em;
height:150px;
}
`
const Propic = styled.img`
border-radius: 50%;
width:128px;
height:128px;
position:relative;
margin-top:-100px;
border:6px solid white;
object-fit:cover;
@media (min-width: 200px) and (max-width:970px)
{
  width:110px;
  height:110px;
}
`
const Title = styled.p`
font-family:Roobert-medium;
font-size: 32px;
font-weight:500;
@media (min-width: 200px) and (max-width:970px)
{
font-size: 18px;
}
`
const Subtitle = styled.div`
margin-top:-15px;
font-size: 12px;
font-family: 'Inter';
@media (min-width: 200px) and (max-width:970px)
{
font-size: 14px;
}
.num{
color:black;
font-weight: 500;
}
.text{
color:#787373;
font-size: 16px;
}
.description{
    margin-right:15px;
}
`

const AddNewPost = styled(Button)`
width: 150px;
height: 40px;
border-radius: 8px;
margin:3px;
font-size: 14px;
background-color:#000;
background:#000;
border:1px solid #000;
margin-left:10px;
@media (min-width: 200px) and (max-width:970px)
{
margin-right:20px;
}
`
const Edit = styled(Button)`
border:1px solid #000;
border-radius: 8px;
width: 150px;
height: 40px;
background: #FFFFFF;
margin:3px;
display:flex;
padding-left:30px;
align-items:center;
@media (min-width: 200px) and (max-width:970px)
{
margin-right:20px;
}
`
const Save=styled(Button)`
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
