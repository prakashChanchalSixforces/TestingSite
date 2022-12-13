import React, { useState } from 'react'
import { Button, Tooltip, Container, Row, OverlayTrigger, Offcanvas } from 'react-bootstrap'
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import heart from '../../../assets/heart.png'
import pinkheart from '../../../assets/pinkheart.png'
import Share from '../../../assets/share.png'
import  Umbrella from '../../../assets/pinkumbrella.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAdminAuthenticated, isAuthenticated } from '../../layouts/Auth/Authentication';
import laptop from '../../../assets/laptop.png';
import callback from '../../../assets/callback.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import DontStress from '../DontStress/DontStress';
import infoLogo from '../../../assets/infologo.png'
import ShareProfile from './components/ShareProfile';
import { addfavourite, search } from '../../../store/Actions/User.action';
import SignupModal from '../../layouts/Auth/SignupModal';
import Rightside from './components/RightComponent';
import CardShimmer from './components/CardSimmer';
import CallBackModal from './components/CallBackModal';
import AdminEmailModal from './components/AdminEmailModal';
import Yelp from '../../../assets/yelp.png'
import Rating from '../../../assets/rating.png'

function LeftService(props) {
    const location = useLocation()
    const searches = useSelector(state => state.customerReducer.search);
    const services = useSelector(state => state.customerReducer.service);
    const finaldata = useSelector(state => state.customerReducer.finaldata);
    const [type,setType]=useState(props?.type)
    const [share, setShare] = useState(false)
    const [isAdminModal, setIsAdminModal] = useState(false)
    const [adminData,setAdminData]=useState({})
    const [data, setData] = useState('')
    const [signUpModalShow, setSignUpModalShow] = React.useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [showSearch,setShowSearch]=useState(false)
    const [open, setOpen] = useState(false)
    const [serviceName,setServiceName]=useState('')
    let uniquename = location.pathname.split('/');
    const servicenames = uniquename[1]
    console.log(servicenames,'servicenames')
    const searchs = decodeURI(servicenames)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    console.log(finaldata?.typeofHouse,'typefinal')
    const init = async () => {
        await dispatch(search({
            "placeOfService": "Vancouver",
            "date": "15-Jul-2022",
            "time": "11:00"
            , servicesOffered: "Moving"
        }, 1, 50));
    }
    useEffect(()=>{
        init()
    },[])
    const viewprofileclick = async(uniqueUrl) => {
        //window.open(`/${usertype}/${uniqueUrl}`,'_blank',{ state: { uniqueUrl: uniqueUrl, customer: true } })}
        if(type === 'Pressure Washing' && finaldata){
         window.open(`business/${uniqueUrl}?address=${finaldata?.address}&approxSizeInSqFt=${finaldata?.approxSizeInSqFt}&areasToBeCleaned=${finaldata?.areasToBeCleaned}&date=${finaldata?.date}&time=${finaldata?.time}`)
        }
        else if(type === 'Moving' && finaldata){
         window.open(`/business/${uniqueUrl}?approxSizeInSqFt=${finaldata?.approxSizeInSqFt}&fromAddress=${finaldata?.fromAddress}&elevatorAvailable=${finaldata?.elevatorAvailable}&numberOfRooms=${finaldata?.numberOfRooms}&toAddress=${finaldata?.toAddress}&typeofHouse=${finaldata?.typeofHouse}&date=${finaldata?.date}&time=${finaldata?.time}`)
        }
        else if(type === 'Electricians' && finaldata){
            window.open(`/business/${uniqueUrl}?address=${finaldata?.address}&estimatedHourOfWork=${finaldata?.estimatedHourOfWork}&date=${finaldata?.date}&time=${finaldata?.time}`)
           }
        else window.open(`/business/${uniqueUrl}`)
    }
    const handlebooknow = (spId, item) => {
        localStorage.setItem('data', JSON.stringify(item))
       !isAdminAuthenticated()?
        !isAuthenticated() ?
            navigate(`/details`, { state: { servicename: type, spId: spId } })
            :
            navigate(`/payment`, { state: { servicename: type, spId: spId } })
            : setIsAdminModal(true)
        localStorage.setItem('type', type)
        localStorage.setItem('spId', spId)

    }
    const handlefavourite=async(id)=>{
        if (!isAuthenticated()) {
            setSignUpModalShow(true)
          }
          else{
      let res = await dispatch(addfavourite({"serviceProviderId":id},type))
      return res
          }
    }
    const renderTooltip = props => (
        <TooltipButton className="in" id="tooltip-top" styleName="tooltip" style={{ backgroundColor: 'white', color: 'black' }} {...props}>
            <p style={{ fontSize: '12px', marginBottom: 0 }}>One ton truck with 2 movers</p></TooltipButton>
    );


    const renderItem = (item, index, hourlyPrice,fav) => {
        return (
            <Profile key={index}>
                <Segment >
                    <ProfileBanner sm={5} >
                        <Coverpic style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} src={item?.bannerImage ? item?.bannerImage : './dummyprofile.png'} onClick={() => viewprofileclick(item?.uniqueUrl)}/>
                        <Profilepic src={item?.logoImage ? item?.logoImage : '../../../assets/propic.png'} onClick={() => viewprofileclick(item?.uniqueUrl)} />
                        <Fav variant='light' onClick={()=>handlefavourite(item?._id)} ><img alt='' src={fav===true?pinkheart:heart} className='heart' /></Fav>
                        <ShareButton variant='light' onClick={() => {
                            setShare(true)
                            setData(item)
                        }}><img alt='' src={Share} className='heart' /></ShareButton>
                        <Viewp  variant='light' onClick={() => {
                                window.analytics.track("Search results view profile", {
                                    url: location.pathname,
                                    service: type,
                                    service_provider_name: item?.businessName
                                });
                                viewprofileclick(item?.uniqueUrl)
                            }}>View Profile</Viewp>
                    </ProfileBanner>
                    <Content>
                        <div className='d-flex justify-content-between'>
                            <Businessline>{item?.businessName}</Businessline>
                        </div>
                    </Content>
                    <div className='d-flex justify-content-between'>
                     <div className='d-flex'>
                        <Yelpimg src={Yelp}/>
                        <p className='d-flex'><Ratingimg src={Rating}  />{item?.rating || "0"}</p>
                     </div>
                     <div>
                     {type === 'Carpet Cleaning' || type === 'Pressure Washing' || type === 'Gutter Cleaning'?'':
                        <StartingPrice>Starting at &nbsp;<span className='cad'>CAD ${Math.ceil(hourlyPrice?.HourlyCharge?.twoMoversOneTonTruck) || Math.ceil(hourlyPrice?.hourlyRate)||Math.ceil(item?.estimatedHourlyPrice)||"0"}</span></StartingPrice>
                    }
                     </div>
                    </div>
                  
                    <br />
                </Segment>
                <ToastContainer
                    position="bottom-left" />
            </Profile>
        )
    }
    return (
        <React.Fragment>
            <br/>
            <br/>
            <br/>
            <Row  >
            {
                props?.loader?<CardShimmer/>:
                services?.length > 0 && services[0]?.finalPrice ?
                    services?.map((item, index) => {
                        return (
                        renderItem(item, index)
                        )}) :
                    services && services?.length === 0 ?
                    <>
                    <br />
                    <br />
                    <div className='d-flex justify-content-center'>
                        <div>
                        <img alt='' src={laptop} style={{ height: '100%', width: '100%' }}></img>
                        </div>
                    </div>
                        <h2 style={{ textAlign: 'center' }}>Finding service providers</h2>
                     </>
                    :
                    searches?.length > 0 ?
                        searches?.map((item, index) => {
                        return (
                        renderItem(item?.data, index, item?.hourlyPrice,item?.fav)
                        )
                        }) :
                        <>
                        <br />
                        <br />
                        <div className='d-flex justify-content-center'>
                        <div>
                        <img alt='' src={laptop} style={{ height: '100%', width: '100%' }}></img>
                         </div>
                        </div>
                        <h2 style={{ textAlign: 'center' }}>
                        Finding service providers
                        </h2>
                    </>}
            </Row>
            <Footer>
                <Viewpricing className='bottonfooter' variant="outline-dark" size='md' onClick={() =>  setShowSearch(true)} >Instant online estimates</Viewpricing>
            </Footer>
            <ShareProfile
                show={share}
                data={data}
                onHide={() => setShare(false)}
            />
              <SignupModal
              signupModal={setSignUpModalShow}
              loginModal={setLoginModalShow}
              loginModalshow={loginModalShow}
              show={signUpModalShow}
              onHide={() => setSignUpModalShow(false)}
            />
            <CallBackModal
                     CallBackModal={setOpen}
                     show={open}
                     serviceName={serviceName}
                     onHide={() => setOpen(false)}
                />
                 <AdminEmailModal
                     CallBackModal={setIsAdminModal}
                     show={isAdminModal}
                     data={adminData}
                     onHide={() => setIsAdminModal(false)}
                />
               <MobileModal show={showSearch} onHide={() => setShowSearch(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => setShowSearch(false)}>
                    <Offcanvas.Title>Instant Online Estimates</Offcanvas.Title>
                </Offcanvas.Header>
                <div style={{overflow:'scroll'}}>
                    <Rightside
                    searchs={searchs}
                    onHide={()=>setShowSearch(false)}
                />
                </div>
            </MobileModal>

        </React.Fragment>
    )
}

export default LeftService
const MobileModal = styled(Offcanvas)`
border-radius:15px;
background-color:#FAFAFA;
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
`

const Yelpimg = styled.img`
height:24px;
margin-left:20px;
`
const Hr = styled.hr`
width:100%;
height:1px;
`
const ProfileBanner = styled.div`
display:flex;
margin-bottom:35px;
`
const Freecancel=styled.p`
font-family:Inter;
font-size: 14px;
color: #787373;
margin-left:10px;
@media (min-width: 260px) and (max-width: 1000px){
    font-size: 13px;
     }
.guarantee{
    font-weight:600;
    color:#D81159;
    }
    .subguarantee{
    font-weight:600;
    color:black;
    }
`
const Img=styled.img`
height:20px;
width:20px;
margin-right:5px;
`
const Ratingimg=styled.img`
height:20px;
width:20px;
margin-right:4px;
margin-left:7px;
`
const Viewpricing = styled(Button)`
width:232px;
height:44px;
font: Roobert-medium;
font-weight: 500;
font-size: 14px;
letter-spacing: 0.02em;
margin-bottom:1rem;
border-radius:8px;
@media (min-width: 260px) and (max-width: 1000px){
    width:360px;
    margin-top:0px;
margin-bottom:20px;
            }
@media (min-width: 1110px) and (max-width: 1380px){
    width:202px;

            }
`
const CallBack = styled(Button)`
width:192px;
height:44px;
font: Roobert-medium;
font-weight: 500;
font-size: 14px;
margin-bottom:1rem;
margin-left:13px;
border-radius:8px;
.img{
    width: 15px;
height: 15px;
margin-right:5px;
}
@media (min-width: 260px) and (max-width: 1000px){
    width:360px;
    margin-top:0px;
margin-left:8px;
            }
@media (min-width: 1110px) and (max-width: 1380px){
    width:192px;
}
`

const Profile = styled(Container)`
display:flex;
width:372px;
border: 1px solid #F3F3F3;
border-radius:12px;
background-color:#FFFFFF;
margin-bottom:0px;
padding-top:0px;
padding-left:0px;
padding-bottom:0px;
margin-bottom:30px;
padding-right:0px;
@media (min-width: 1110px) and (max-width: 1380px){
    width:430px;
    }
@media (min-width: 100px) and (max-width: 1000px){
.desk{
    display:none;
    }
    .mob{
    display:flex;
    justify-content:center;
    margin-left:8px;
    margin-top:-10px;
    }
}
@media (min-width: 1001px) and (max-width: 10000px){
    .mob{
    display:none;
    }
    .desk{
    display:inline;
    }
    }
    @media (min-width: 260px) and (max-width: 767px){
     width:380px;
margin-bottom:0px;
padding-top:0px;
padding-left:0px;
padding-bottom:0px;
margin-bottom:30px;
padding-right:0px;
        }
`
const TooltipButton = styled(Tooltip)`
#tooltip-top > .tooltip-inner {
    background-color: #fff;
    color: #000;
    border: 1px solid #062e56;
  }
  #tooltip-top > .tooltip-arrow {
    border-top: 5px solid #062e56;
  }
`
const StartingPrice = styled.div`
margin-right:10px;
font-family:Roobert-medium;
font-weight: 500;
font-size: 14px;
color: #787373;
.cad{
font-weight: 500;
font-size: 18px;
color: #190F0F;
}
`

const ViewProfile = styled.p`
color:#190F0F;
text-align:center;
cursor:pointer;
font-family:Roobert-medium;
font-weight: 500;
font-size: 14px;
letter-spacing: 0.02em;
margin-right:30px;

`
const Segment = styled(Row)`
@media (min-width: 260px) and (max-width: 767px){
    padding:0px;
    border-outline:none;
    }
`
const Content = styled.div`
margin-right:20px;
margin-left:20px;
`
const FooterContent = styled.div`
width:352px;
display:flex;
flex-direction:row;
border-top:1px solid #D0CECE;
justify-content:center;
margin-right:20px;
margin-left:20px;
@media (min-width: 1110px) and (max-width: 1380px){
    width:410px;
}
@media (min-width: 260px) and (max-width: 767px){
    width:360px;
}
.reservenow{
margin-top:5px;
@media (min-width: 260px) and (max-width: 767px){
   margin-top:-28px;
   margin-left:7px;
}
}
.reserves{
    display:flex;
    @media (min-width: 260px) and (max-width: 767px){
        display:inline
    }
}
.heads{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    color: #787373;
}
.heads2{
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    color: black;
}
`
const Businessline = styled.h2`
font-weight: 500;
font-size: 24px;
font-family:Roobert-medium;
letter-spacing: 0.02em;
@media (min-width: 260px) and (max-width: 767px){
width:252px;
}
@media (min-width: 768px) and (max-width: 9999px){
width:252px;
}
`
const Coverpic = styled.img`
cursor:pointer;
width:100%;
object-fit:cover;
height:100px;
`
const Profilepic = styled.img`
position:absolute;
margin-top:70px;
cursor:pointer;
margin-bottom:60px;
border-radius:100px;
margin-left:10px;
width:72px;
height:72px;
border:5px solid white;
`

const Fav = styled(Button)`
position:absolute;
margin-left:220px;
margin-top:10px;
border: 1px solid #F3F3F3;
border-radius: 8px;
width: 40px;
height: 40px;
background: #FFFFFF;
display:flex;
justify-content:center;
.heart{
padding-top:5px;
}
@media (min-width: 260px) and (max-width: 767px){
    margin-left:170px;
}
@media (min-width: 1110px) and (max-width: 1380px){
    margin-left:220px;
}
`
const ShareButton = styled(Button)`
position:absolute;
margin-left:240px;
margin-top:10px;
border: 1px solid #F3F3F3;
border-radius: 8px;
width: 40px;
height: 40px;
background: #FFFFFF;
display:flex;
justify-content:center;
.dots{
padding-top:10px;
}
@media (min-width: 260px) and (max-width: 767px){
    margin-left:220px;
}
@media (min-width: 1110px) and (max-width: 1380px){
    margin-left:270px;
}
`
const Viewp = styled(Button)`
position:absolute;
margin-left:280px;
margin-top:10px;
border: 1px solid #F3F3F3;
border-radius: 8px;
background: #FFFFFF;
color:black;
font-size: 14px;
font-family: Roobert-medium;
font-weight: 500;
height: 40px;
@media (min-width: 260px) and (max-width: 767px){
    margin-left:270px;
}
@media (min-width: 1110px) and (max-width: 1380px){
    margin-left:320px;
}
`

const Footer = styled.div`
display:flex;
position: fixed;
bottom: 0;
height:100px;
background-color:#fff;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
width:100%;
justify-content:center;
align-items:center;
margin-left:-10px;
.bottonfooter{
    background-color:#000;
    border-color:#000;
    color:#fff;
    margin-right:10px;
    margin-bottom:0px;
    marginTop:0;
}
@media (min-width: 746px) and (max-width: 10000px){
    display:none;
}
`
