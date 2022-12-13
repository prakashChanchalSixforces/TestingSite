import React, { useState } from 'react'
import { Button, Tooltip, Container, Row, OverlayTrigger } from 'react-bootstrap'
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import heart from '../../../assets/heart.svg'
import  Umbrella from '../../../assets/guaranteelogo.svg'
import infoLogo from '../../../assets/help.png'
import pinkheart from '../../../assets/pinkheart.png'
import Share from '../../../assets/share.svg'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAdminAuthenticated, isAuthenticated } from '../../layouts/Auth/Authentication';
import laptop from '../../../assets/laptop.png';
import callback from '../../../assets/callback.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ShareProfile from '../UserHomepage/components/ShareProfile';
import { addfavourite, search } from '../../../store/Actions/User.action';
import SignupModal from '../../layouts/Auth/SignupModal';
import Yelp from '../../../assets/yelp.png'
import Rating from '../../../assets/rating.png'
import CallBackModal from '../UserHomepage/components/CallBackModal';
import AdminEmailModal from '../UserHomepage/components/AdminEmailModal';
import ServiceModal from './ServiceModal';
import NewCardShimmer from '../UserHomepage/components/NewCardShimmer';


function LeftService(props) {
    const location = useLocation()
    const searchs = useSelector(state => state.customerReducer.search);
    const services = useSelector(state => state.customerReducer.service);
    const finaldata = useSelector(state => state.customerReducer.finaldata);

    const [share, setShare] = useState(false)
    const [isAdminModal, setIsAdminModal] = useState(false)
    const [adminData,setAdminData]=useState({})
    const [data, setData] = useState('')
    const [signUpModalShow, setSignUpModalShow] = React.useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [open, setOpen] = useState(false)
    const [servicemodal, setServiceModal] = useState(false||props?.setview)
    const renderTooltip = props => (
        <TooltipButton className="in" id="tooltip-top" styleName="tooltip" style={{ backgroundColor: 'white', color: 'black' }} {...props}>
            <p style={{ fontSize: '12px', marginBottom: 0 }}>
            {type ==='Moving'?'One ton truck with 2 movers':type==='Plumbers'||type==='Electricians'?'Service call is typically 1 hour long':''}</p></TooltipButton>
    );
    let uniquename = location.pathname.split('/');
    const servicenames = uniquename[1]
    console.log(servicenames,props?.setview,'servicenames')
    let type = props.type;
    let dispatch = useDispatch()
    // const init = async () => {
    //     await dispatch(search({
    //         "placeOfService": "Vancouver",
    //         "date": "15-Jul-2022",
    //         "time": "11:00"
    //         , servicesOffered: servicenames
    //     }, 1, 50));
    // }
    useEffect(()=>{
        setServiceModal(props?.view)
    },[props?.view])

    useEffect(()=>{
        if(servicemodal!==true)
        props?.setview(false)


    },[servicemodal])
    useEffect(() => {
        if( services?.length > 0 && services[0]?.finalPrice){
            setServiceModal(false)
        }
    }, [services])

    useEffect(()=>{
       // init();
    },[])

 const formatMobileNumber=(text)=> {
        var cleaned = ("" + text).replace(/\D/g, "");
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          var  number = ["(", match[2], ") ", match[3], "-", match[4]].join(
              ""
            );
          return number;
        }
        return text;
      }

    let navigate = useNavigate()
    console.log(finaldata,'typefinal')
    const viewprofileclick = async(uniqueUrl) => {
        //window.open(`/${usertype}/${uniqueUrl}`,'_blank',{ state: { uniqueUrl: uniqueUrl, customer: true } })}
        if(type === 'Pressure Washing' && finaldata){
         window.open(`/business/${uniqueUrl}?address=${finaldata?.address}&approxSizeInSqFt=${finaldata?.approxSizeInSqFt}&areasToBeCleaned=${finaldata?.areasToBeCleaned}&date=${finaldata?.date}&time=${finaldata?.time}`)
        }
        else if(type === 'Moving' && finaldata){
         window.open(`/business/${uniqueUrl}?approxSizeInSqFt=${finaldata?.approxSizeInSqFt}&fromAddress=${finaldata?.fromAddress}&elevatorAvailable=${finaldata?.elevatorAvailable}&numberOfRooms=${finaldata?.numberOfRooms}&toAddress=${finaldata?.toAddress}&typeofHouse=${finaldata?.typeofHouse}&date=${finaldata?.date}&time=${finaldata?.time}`)
        }
        else if(type === 'Electricians' && finaldata){
            window.open(`/business/${uniqueUrl}?address=${finaldata?.address}&estimatedHourOfWork=${finaldata?.estimatedHourOfWork}&date=${finaldata?.date}&time=${finaldata?.time}`)
           }
           else if(type === 'Plumbers' && finaldata){
            window.open(`/business/${uniqueUrl}?address=${finaldata?.address}&estimatedHourOfWork=${finaldata?.estimatedHourOfWork}&date=${finaldata?.date}&time=${finaldata?.time}`)
           }
        else window.open(`/business/${uniqueUrl}`)
    }
    const handlebooknow = (spId, item) => {
        localStorage.setItem('data', JSON.stringify(item))
        localStorage.setItem('type', type)
        localStorage.setItem('spId', spId)
    //    !isAdminAuthenticated()?
    //     !isAuthenticated() ?
    //         navigate(`/details`, { state: { servicename: type, spId: spId } })
    //         :
    //         navigate(`/payment`, { state: { servicename: type, spId: spId } })
    //         : setIsAdminModal(true)
     if(isAuthenticated()){
        navigate(`/payment`, { state: { servicename: type, spId: spId } })
     }
     else {
        navigate(`/details`, { state: { servicename: type, spId: spId } })
     }
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
                        <div className='d-flex justify-content-between mt-1'>
                            <Businessline>{item?.businessName}</Businessline>
                        </div>
                    </Content>
                    <Yelpdiv>
                     <div className='d-flex'>
                        <Yelpimg src={Yelp}/>
                        <p className='d-flex'><Ratingimg src={Rating}  />{item?.rating || "0"}</p>
                     </div>
                     <div className='d-flex'>
                     {type === 'Carpet Cleaning' || type === 'Pressure Washing' || type === 'Gutter Cleaning'?
                     <StartingPrice>{"Price for up to 1000 Sq.ft. is" }&nbsp;
                     <br/><span className='cad'>CAD $200</span>&nbsp; per hour</StartingPrice>
                     :
                     type === 'Electricians' || type === 'Plumbers'  ?
                     <StartingPrice>
                     <span className='cad'>CAD $
                     {item?.finalPrice
                     ?item?.hourlyRate
                     :Math.ceil(hourlyPrice?.hourlyRate)||Math.ceil(item?.estimatedHourlyPrice)||"0"}
                     </span>
                     &nbsp;per service call
                     <br/>
                     {item?.finalPrice?<><span className='cad'>CAD ${Math.ceil(item?.serviceCall)}</span> per hour</>:''}
                     </StartingPrice>
                     :
                        <StartingPrice>{item?.estimatedHourlyPrice? "Your price":"Starting at" }&nbsp;<span className='cad'>CAD ${Math.ceil(hourlyPrice?.HourlyCharge?.twoMoversOneTonTruck) || Math.ceil(hourlyPrice?.hourlyRate)||Math.ceil(item?.estimatedHourlyPrice)||"0"}</span>
                    &nbsp;per hour</StartingPrice>
                    }
                    {type==='Electricians'||type==='Plumbers'||type==='Moving'?
                      <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={renderTooltip()}
        >
                      <InfoImg src={infoLogo}/>
        </OverlayTrigger>
        :''}
                     </div>
                    </Yelpdiv>
                    {item?.finalPrice ?
                    <FooterContent>
                        <div >
                                <Freecancel className='mt-3'>Free cancellations up to 24 hours before the job</Freecancel>
                                <Freecancel style={{marginTop:'-7px'}}>Your booking is protected by &nbsp;
                                <UmbrellaImg src ={Umbrella}/></Freecancel>

                                {type === 'Carpet Cleaning' || type === 'Pressure Washing' || type === 'Gutter Cleaning' || type==='Electricians'|| type==='Plumbers' ?
                            <></>
                                :
                                <>
                                <Hr/>
                                <div className='d-flex justify-content-between p-2'>
                                 <div >
                                  <p className='heads'>Hourly price </p>
                                  <p className='heads'>Travel time</p>
                                  <p className='heads'>Total hours (Includes travel time)</p>
                                  <p className='heads2'>Total estimate</p>
                                 </div>
                                 <div >
                                  <p className='heads text-end'>${Math.ceil(item?.estimatedHourlyPrice)} per hour</p>
                                  <p className='heads text-end'>${Math.ceil(item?.travelCharge)} ({item?.travelTime})</p>
                                  <p className='heads text-end'>{item?.estimatedTime}</p>
                                  <p className='heads2 text-end'> ${Math.ceil(item?.finalPrice)}</p>
                                 </div>
                                </div>
                                </>
                            }
                                <div className='d-flex'>
                               {item?.phoneNumber?<CallBack variant="outline-dark" size='md' className='desk'>
                               <img className='img' src={callback}/>  {formatMobileNumber(item?.phoneNumber)||"_"}
                                </CallBack>:
                                 <CallBack variant="outline-dark" size='md'  onClick={()=>setOpen(true)} className='desk'>
                                 <div>
                                 <img className='img' src={callback}/>
                                 Request a call back
                                 </div>
                                 </CallBack>}
                                <Viewpricing variant="dark" size='md' onClick={() => {
                                window.analytics.track("Search results Reserve Now", {
                                    service_provider_id: item?.spId,
                                    final_price: `CAD ${Math.ceil(item?.finalPrice)}`,
                                    Estimated_price: `CAD ${Math.ceil(item?.estimatedHourlyPrice)}`,
                                    service: type,
                                    color: '#000',
                                    service_provider_name: item?.businessName
                                });
                                handlebooknow(item?.spId, item)
                            }}  className='reservenow' >Reserve now</Viewpricing>
                                </div>
                            </div>
                    </FooterContent>
                        :
                        <FooterContent>
                           <div >
                                <Freecancel className='mt-3'>Free cancellations up to 24 hours before the job</Freecancel>
                                <Freecancel style={{marginTop:'-7px'}}>Your booking is protected by &nbsp;<UmbrellaImg src ={Umbrella}/></Freecancel>
                                <div className='d-flex'>
                                {item?.phoneNumber?<CallBack variant="outline-dark" size='md' className='desk'>
                                <img className='img' src={callback}/> {formatMobileNumber(item?.phoneNumber)||"_"}
                                </CallBack>:
                                 <CallBack variant="outline-dark" size='md'  onClick={()=>setOpen(true)} className='desk'>
                                 <div>
                                 <img className='img' src={callback}/>
                                 Request a call back
                                 </div>
                                 </CallBack>}
                                <Viewpricing variant="dark" size='md' onClick={() => {
                                    window.analytics.track("Search results view pricing", {
                                        color: '#fff',
                                        service: type,
                                        service_provider_name: item?.data?.businessName
                                    });
                                    setServiceModal(true)
                                }} className='desk' >{type === 'Electricians' || type === 'Plumbers'  ? 'Get price':'Get online estimates'}</Viewpricing>
                                </div>
                                <Viewpricing variant="dark" size='md' onClick={() =>  setServiceModal(true)} className='mob' >{type === 'Electricians' || type === 'Plumbers'  ? 'Get price':'Get online estimates'}</Viewpricing>
                            </div>
                        </FooterContent>
                    }
                    <br />
                    <div  className='d-flex justify-content-center'>
                    {item?.phoneNumber?  <CallBack variant="outline-dark" size='md'   onClick={()=>window.open(`tel:${item?.phoneNumber}`)} className='mob '>
                    <img className='img' src={callback}/> {formatMobileNumber(item?.phoneNumber)||"_"}
                                </CallBack>:
                                  <CallBack variant="outline-dark" size='md'   onClick={()=>setOpen(true)} className='mob '>
                                 <div>
                                 <img className='img' src={callback}/>
                                 Request a call back
                                 </div>
                                 </CallBack>}
                    </div>
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
            <Tiles>
            {
                props?.loader?
                <NewCardShimmer/>
                :
                services?.length > 0 && services[0]?.finalPrice ?
                    services?.map((item, index) => {
                        return (
                        renderItem(item, index)
                        )}) :
                    services && services?.length === 0 ?
                    <>
                    <br />
                    <br />
                    <div className='d-inline justify-content-center ' style={{marginLeft:'-300px'}}>
                        <img alt='' src={laptop} style={{ height: '100%', width: '100%' }}></img>
                        <h2 style={{ textAlign: 'center' }}>Finding service providers</h2>
                        </div>
                     </>
                    :
                    searchs?.length > 0 ?
                        searchs?.map((item, index) => {
                        return (
                        renderItem(item?.data, index, item?.hourlyPrice,item?.fav)
                        )
                        }) :
                        <>
                        <br />
                        <br />
                        <div className='d-inline justify-content-center' style={{marginLeft:'-300px'}}>
                        <img alt='' src={laptop} style={{ height: '100%', width: '100%' }}></img>
                        <h2 style={{ textAlign: 'center' }}>Finding service providers</h2>
                        </div>
                    </>}
            {/* </Row> */}
            </Tiles>
            <Footer>
                <Viewpricing className='bottonfooter' variant="dark" size='md' onClick={() =>  setServiceModal(true)} >{type === 'Electricians' || type === 'Plumbers'  ? 'Get price':'Instant online estimates'}</Viewpricing>
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
                     onHide={() => setOpen(false)}
                />
                <ServiceModal
                     Servicemodal={setServiceModal}
                     show={servicemodal}
                     onHide={() => setServiceModal(false)}
                />
                 <AdminEmailModal
                     CallBackModal={setIsAdminModal}
                     show={isAdminModal}
                     data={adminData}
                     onHide={() => setIsAdminModal(false)}
                />
        </React.Fragment>
    )
}

export default LeftService
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
const Tiles = styled.div`
    display: grid;
    justify-content:center;
    grid-auto-rows: auto;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    @media (min-width: 260px) and (max-width: 800px){
        grid-template-columns: repeat(1, 1fr);
        }
    @media (min-width: 801px) and (max-width: 1199px){
        grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 1200px) and (max-width: 1360px){
            grid-template-columns: repeat(3, 1fr);
            }
            @media (min-width: 1300px) and (max-width:1361px)
        {
          padding-left:100px;
          padding-right:100px;
        }
        @media (min-width: 900px) and (max-width:1000px)
        {
          padding-left:100px;
          padding-right:100px;
        }
        @media (min-width: 1001px) and (max-width:1199px)
        {
          padding-left:200px;
          padding-right:200px;
        }
        @media (min-width: 1363px) and (max-width:1800px)
        {
          padding-left:350px;
          padding-right:350px;
        }
        @media (min-width: 1801px) and (max-width: 2700px)
      {
        padding-left:350px;
        padding-right:350px;
      }
      @media (min-width: 2701px) and (max-width:3000px)
      {
        padding-left:550px;
        padding-right:550px;
      }
      @media (min-width: 3001px) and (max-width:3501px)
      {
        padding-left:350px;
        padding-right:350px;
      }
      @media (min-width: 3502px) and (max-width:9999px)
      {
        padding-left:650px;
        padding-right:650px;
      }
`
const ProfileBanner = styled.div`
display:flex;
margin-bottom:35px;
`

const UmbrellaImg=styled.img`
width: 156px;
height: 21px;
`
const Yelpimg = styled.img`
height:24px;
margin-left:10px;
`
const InfoImg = styled.img`
height:15px;
width:15px;
margin-left:-8px;
margin-top:8px;
margin-right:16px;
@media (min-width: 260px) and (max-width: 767px){

    margin-top:0px;

}
`
const Hr = styled.hr`
width:100%;
height:1px;
`
const Freecancel=styled.p`
font-family:Inter;
font-size: 14px;
color: #787373;
margin-left:6px;
@media (min-width: 260px) and (max-width: 1360px){
    font-size: 12px;
    margin-left:10px;
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
const StartingPrice = styled.div`
margin-right:13px;
font-family:Roobert-medium;
font-weight: 500;
font-size: 14px;
color: #787373;
.cad{
font-weight: 500;
font-size: 18px;
color: #190F0F;
}
@media (min-width: 260px) and (max-width: 767px){
margin-top:-8px;
margin-left:10px;
}
`
const Ratingimg=styled.img`
height:20px;
width:20px;
margin-right:4px;
margin-left:7px;
`
const Viewpricing = styled(Button)`
width:422px;
height:44px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
margin-left:13px;
letter-spacing: 0.02em;
margin-bottom:1rem;
border-radius:8px;
@media (min-width: 260px) and (max-width: 767px){
    width:330px;
    margin-top:0px;
margin-bottom:20px;
margin-left:10px;
            }
            @media (min-width: 768px) and (max-width: 1360px){
                width:360px;
                margin-top:0px;
            margin-bottom:20px;
            margin-left:0px;
            }
`
const CallBack = styled(Button)`
width:422px;
height:44px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
border-radius:8px;
margin-bottom:1rem;
margin-left:5px;
.img{
width: 15px;
height: 15px;
margin-right:5px;
margin-top:-3px;
}
@media (min-width: 260px) and (max-width: 767px){
    width:330px;
    margin-top:0px;
margin-bottom:30px;
margin-left:-6px;
.img{
margin-top:2px;
}
            }
            @media (min-width: 768px) and (max-width: 1360px){
                .img{
                    margin-top:3px;
                }
            }

@media (min-width: 1361px) and (max-width: 9999px){
width:200px;
}
@media (min-width: 768px) and (max-width: 1360px){
    width:360px;
    margin-top:0px;
margin-bottom:30px;
margin-left:0px;
}
`

const Profile = styled(Container)`
display:flex;
width:637px;
border: 1px solid #F3F3F3;
border-radius:12px;
background-color:#FFFFFF;
margin-bottom:0px;
padding-top:0px;
padding-left:0px;
padding-bottom:0px;
margin-bottom:30px;
padding-right:0px;
@media (min-width: 768px) and (max-width: 1361px){
    width:380px;
    margin-bottom:0px;
    padding-top:0px;
    padding-left:0px;
    padding-bottom:0px;
    margin-bottom:30px;
    padding-right:0px;
}
@media (min-width: 100px) and (max-width: 1360px){
.desk{
    display:none;
    }
    .mob{
    display:flex;
    justify-content:center;
    padding-top:10px;
    }
}
@media (min-width: 1361px) and (max-width: 10000px){
    .mob{
    display:none;
    }
    .desk{
    display:inline;
    width:300px;
    }
    }
@media (min-width: 260px) and (max-width: 767px){
width:360px;
margin-bottom:0px;
padding-top:0px;
padding-left:0px;
padding-bottom:0px;
margin-bottom:30px;
padding-right:0px;
        }
`

const Segment = styled(Row)`
@media (min-width: 260px) and (max-width: 767px){
    padding:0px;
    border-outline:none;
    }

`
const Yelpdiv=styled.div`
display:flex;
justify-content:space-between;
@media (min-width: 260px) and (max-width: 767px){
display:inline;
}
`
const Content = styled.div`
margin-right:20px;
margin-left:10px;
`
const FooterContent = styled.div`
width:617px;
display:flex;
flex-direction:row;
border-top:1px solid #D0CECE;
justify-content:center;
margin-right:20px;
margin-left:20px;
padding-right:16px;
margin-top:10px;
@media (min-width: 260px) and (max-width: 767px){
    width:330px;
}
@media (min-width: 768px) and (max-width: 1360px){
    width:360px;
}
.reservenow{
    display:inline;
    width:300px;
    @media (min-width: 260px) and (max-width: 1360px){
       margin-left:3px;
       width:330px;
    }
    }
    .reserves{
        display:flex;
        @media (min-width: 260px) and (max-width: 1360px){
            display:inline
        }
    }
.heads{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    color: #787373;
    margin-top:-10px;
}
.heads2{
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    color: black;
    margin-top:-10px;
}
`
const Businessline = styled.h2`
font-weight: 500;
font-size: 24px;
font-family:Roobert-medium;
letter-spacing: 0.02em;

`
const Coverpic = styled.img`
cursor:pointer;
width:100%;
object-fit:cover;
height:176px;
`
const Profilepic = styled.img`
position:absolute;
margin-top:120px;
cursor:pointer;
margin-bottom:60px;
border-radius:100px;
margin-left:10px;
width:88px;
height:88px;
border:5px solid white;
`

const Fav = styled(Button)`
position:absolute;
margin-left:420px;
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
    margin-left:150px;
}
@media (min-width: 768px) and (max-width: 1361px){
    margin-left:170px;
}
`
const ShareButton = styled(Button)`
position:absolute;
margin-left:470px;
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
    margin-left:200px;
}
@media (min-width: 768px) and (max-width: 1361px){
    margin-left:220px;
}
`
const Viewp = styled(Button)`
position:absolute;
margin-left:520px;
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
    margin-left:250px;
}
@media (min-width: 768px) and (max-width: 1361px){
    margin-left:270px;
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