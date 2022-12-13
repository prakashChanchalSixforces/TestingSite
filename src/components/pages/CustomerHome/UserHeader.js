import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Container, Dropdown, Stack  } from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Search from '../UserHomepage/Search'
import logo from '../../../assets/swiftbelwhitelogo.png'
import hamburger from '../../../assets/whiteburger.png'
import Banner from '../../../assets/UserBanner.webp'
import BrandName from '../../../assets/mailtempbrandname.png'
import SearchIcon from '../../../assets/search2.png'
import Mobbanner from '../../../assets/mobbanner.png'
import SignupModal from '../../layouts/Auth/SignupModal';
import { isAuthenticated,isSPAuthenticated } from '../../layouts/Auth/Authentication';
import swiftbellogo from '../../../assets/swiftbellogoprofile.png'
import Brandname from '../../../assets/Brandname.svg'
import blackburger from '../../../assets/blackburger.png';
import { dark } from '@material-ui/core/styles/createPalette';
import MobileSearch from '../UserHomepage/MobileSearch';
import homeicon from '../../../assets/homeicon.png';
const UserHeader = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showoffc, setShowoffc] = useState(false);
  const [showServiceprovider,setShowServiceprovider]=useState(false)
  const [showSearch,setShowSearch]=useState(false)
  const handleClose = () => setShow(false);
  const handleServiceModalClose = () => setShowServiceprovider(false);
  const handleCloseOffc = () => setShowoffc(false);
  const handleShow = () => {
    window.analytics.track("Burger menu",{
      "component ":"header"
  });
    if(show===false){
    setShow(true)
    }
    else {
      setShow(false)
    }
  }
  const handleShowOffc = () => {
    if(show===false){
    setShowoffc(true)
    }
    else {
      setShowoffc(false)
    }
  }

  const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('isServiceProvider');
    localStorage.removeItem('userName');
    localStorage.clear();
    sessionStorage.clear();
    navigate('/')
    window.location.reload();
  }
  let location = useLocation();
  const handleShowmodal = () =>setShowSearch(true)
  let authenticate = isAuthenticated()
  const [signUpModalShow, setSignUpModalShow] = React.useState(location?.state?.loginmodal&&authenticate===false?location?.state?.loginmodal:false);
  const [header, setHeader] = useState('')
  const [loginModalShow, setLoginModalShow] = useState(false);

const listenScrollEvent = (event) => {
  if (window.scrollY < 73) {
    return setHeader(false)
  } else if (window.scrollY > 600) {
    return setHeader(true)
  }
}
useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);
  const trackingEvent=(name)=>{
    window.analytics.track("tab",{
      "button":name,
      "url":window.location?.pathname
  });
  }
    return(
        <React.Fragment>
        <HomeHeader fluid >
        <div className='home-nav' style={{background:`${header===true?'white':''}`,backgroundColor:`${header===true?'white':''}`}}>
             <Stack direction='horizontal' gap={5}>
             <div className='d-flex mb-1 subdiv'>
            {header===true?
             <>
             <img alt='' className='home-icon ' src={swiftbellogo} />
            <h2 className='home-swiftbel-brand'><img src={Brandname} alt='Brandname'/></h2>
             </>
            :
            <>
             <img alt='' className='home-icon' src={swiftbellogo} />
            <h2 className='home-swiftbel-brand'><img src={Brandname} alt='Brandname'/></h2>
             </>
}
            </div>
          </Stack>
          <Stack direction='horizontal' gap={5}>
         { isSPAuthenticated()?
          <Hamenu variant={dark} size="md" className='home-icon' onClick={()=>navigate('/business/admindashboard')} >{"  Dashboard  "}</Hamenu>
         :<Hamenu variant={dark} size="md" className='home-icon' onClick={()=>{
          trackingEvent('Join as service provider')
          showServiceprovider?setShowServiceprovider(false):setShowServiceprovider(true)}} >Join as service provider</Hamenu>
         }
          {
            showServiceprovider?
            <Dropdown.Menu show={showServiceprovider} className='servicemenu' onMouseLeave={handleServiceModalClose} >
            <Dropdownitem eventKey="1" onClick={() => {
               trackingEvent('Sign up as service provider')
              navigate('/business')}}><p className='signlogin'>Sign up</p></Dropdownitem>
            <Dropdownitem  eventKey="2" onClick={() => {
              trackingEvent('Login as service provider')
              setLoginModalShow(true)}}><p >Login</p></Dropdownitem>
          </Dropdown.Menu>:null
          }
        <div>
        <img src={header===true?blackburger:blackburger} alt='ham'  onClick={handleShow} className={header===true?'burger-icon':'burger-icon'}/>
    <Dropdown.Menu show={show} className='mainmenu' onMouseLeave={handleClose} >
      {isAuthenticated()?
          <>
          <Dropdownitem eventKey="1" ><p onClick={()=>{
            trackingEvent("Messages")
            navigate('/business/message')}} className=' messages pt-1'>Messages</p></Dropdownitem>
          <Dropdownitem eventKey="2"><p className=' items pt-1' onClick={()=>{
             trackingEvent("Bookings")
            navigate('/bookings')}}>Bookings</p></Dropdownitem>
          <Dropdown.Divider className='divider' />

          <Dropdownitem eventKey="3" ><p className=' pt-2' onClick={ ()=>navigate('/savedjobs')}>Saved jobs</p></Dropdownitem>
          <Dropdownitem eventKey="4" ><p className='items' onClick={()=>navigate('/myaccount')}>Account</p></Dropdownitem>
          </>
          :
          <>
      <Dropdownitem eventKey="1" onClick={() => {
        trackingEvent("Sign up")
        setSignUpModalShow(true)}}><p className='signlogin' >Sign up</p></Dropdownitem>
      <Dropdownitem  eventKey="2" onClick={() => {
        trackingEvent("Login")
        setSignUpModalShow(true)}}><p >Login</p></Dropdownitem>
      <Dropdown.Divider className='divider' />
      <Dropdownitem eventKey="1" onClick={() => {
        trackingEvent("Service provider sign up")
        navigate('/business')}}><p className='pt-1' > Service Provider Sign up</p></Dropdownitem>
      <Dropdownitem  eventKey="2" onClick={() => {
        trackingEvent('Service Provider Log in')
        setLoginModalShow(true)}}><p > Service Provider Log in</p></Dropdownitem>
      </>
                 }
      <Dropdown.Divider className='divider' />
      {isAuthenticated()?
      <>
            <Dropdownitem eventKey="4" ><p className='items2 pt-1'
            onClick={()=>{
              trackingEvent("Help center")
              window.open('/help/help-centre')
            }}
            >Help Center</p></Dropdownitem>
      <Dropdownitem eventKey="5" onClick={()=>{
        trackingEvent("Log out")
        handlelogout()}} ><p className=' items2 pt-1'>Logout</p></Dropdownitem>
      </>
      :
      <Dropdownitem eventKey="4"   onClick={()=>{
        trackingEvent("Help center")
        window.open('/help/help-centre')
      }} ><p className=' pt-2'>Help Center</p></Dropdownitem>
      }
    </Dropdown.Menu>
          </div>
          </Stack>
          </div>
          <hr/>
          <Head >
           <br/><br/><br/><br/><br/><br/>
           <Heading1 >Discover and book home service providers with the push of a button.</Heading1>
           <br/>
           <Heading2>  Search home service providers, compare prices, and book</Heading2>
           <br/><br/>
           <Searchbutton>
            <Search/>
           </Searchbutton>
           </Head>
           <br/>
          </HomeHeader>
         
          <HomeMobHeader fluid >
          <div className='d-flex justify-content-between' >
            <div className='mt-2'>
            <img src={hamburger} alt='ham' onClick={handleShowOffc} />
            </div>
            <div className=' mt-2 ' style={{cursor:'pointer'}} onClick={()=>navigate('/')}>
          <img src={BrandName} alt='brandname' />
            </div>
            <div></div>
            </div>
            <OffC  show={showoffc} onHide={handleCloseOffc} >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>
            <div  style={{cursor:'pointer'}} onClick={handleCloseOffc} className='offcanvas-items d-flex mt-2' >
            <img src={Brandname} alt='logo' />
            </div></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{overflowY:'scroll'}}>
        {isAuthenticated()?
          <>
          <MenuText onClick={()=>{
            trackingEvent("Messages")
            navigate('/business/message')}}>Messages</MenuText><br/>
          <MenuText onClick={()=>{
            trackingEvent("Bookings")
            navigate('/bookings')}}>Bookings</MenuText><br/>
          <MenuText onClick={()=>navigate('/myaccount')}>Account</MenuText><br/>
          <MenuText onClick={ ()=>navigate('/savedjobs')}>Saved jobs</MenuText><br/>
          </>
          :
          <>
          <MenuText onClick={() => setSignUpModalShow(true)}>Sign Up</MenuText><br/>
          <MenuText  onClick={() => setLoginModalShow(true)}>Login</MenuText><br/>
          </>
          }
          <MenuText onClick={()=>navigate('/business')}>Become a service provider</MenuText>
          <WhiteHr/>
          {isAuthenticated()?
          <MenuText onClick={()=>handlelogout()}>Log out</MenuText>
          :
          <MenuText onClick={()=>{
            window.open('/help/help-centre')
          }}>Help Center</MenuText>
          }
        </Offcanvas.Body>
      </OffC>
            <br/><br/><br/>
            <Heading1 >Discover and book home service providers with the push of a button.</Heading1>
            <br/><br/><br/><br/><br/>
           <div className='searchmobbuttondiv'>
           <Searchmobbutton variant="light" size='sm' onClick={handleShowmodal}>
            Service &nbsp; |&nbsp; &nbsp;Address &nbsp; | &nbsp; Date and time &nbsp;
            <img src={SearchIcon} alt='search' className='buttonimage' /></Searchmobbutton>
            <MobileModal show={showSearch} onHide={() => setShowSearch(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => setShowSearch(false)}>
                    <Offcanvas.Title>Search</Offcanvas.Title>
                </Offcanvas.Header>
                <MobileSearch/>
            </MobileModal>
           </div>
            </HomeMobHeader>
            <SignupModal
        signupModal={setSignUpModalShow}
        loginModal={setLoginModalShow}
        loginModalshow={loginModalShow}
        show={signUpModalShow}
        onHide={() => setSignUpModalShow(false)}
      />
        </React.Fragment>
    )
}
export default UserHeader;
const MobileModal = styled(Offcanvas)`
border-radius:15px;
background-color:#FAFAFA;
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
`

const Searchbutton=styled.div`
text-align:center;
margin-top:-15px;
font-family:Roobert-medium;
`
const HomeHeader = styled(Container)`
width: 100%;
background-image:url(${Banner});
background-size: 100%;
border-bottom:1px solid #F3F3F3;
font-family:Roobert-medium;
background-repeat:no-repeat;
.items2{
margin-bottom:-1px;
}
.divider{
margin-bottom:4px;
margin-top:-5px;
background:#F3F3F3;
background-color:#F3F3F3;
color:#F3F3F3;
}
.messages{
margin-top:8px;
}
.items{
margin-top:-8px;
}
.mainmenu{
    margin-left:-220px;
    margin-top:22px;
    background-color:White;
    border-radius:10px;
    width:280px;
    padding:10px;
}
.burger-icon{
  height:20px;
  width:25px;
  margin-right:18px;
  cursor:pointer;
}
.signlogin{
margin-top:12px;
}
.servicemenu{
    margin-left:-150px;
    margin-top:182px;
    background-color:White;
    border-radius:10px;
    width:280px;
    padding:10px;
}
.subdiv{
    color:white;
    margin-left:10px;
    height:30px;
    width:40px;
}
.home-nav{
  width: 101%;
  height: 72px;
  position: fixed;
  z-index: 1;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2.5vw;
  padding-right: 2vw;
  margin-left:-15px
}
.home-swiftbel-brand{
  font-size: 24px;
  font-weight: 500;
  margin-left:10px;
}
.burger{
    cursor:pointer;
    margin-right:18px;
}
@media (min-width: 950px) and (max-width: 1049px){
  height:560px;
}
@media (min-width: 1050px) and (max-width: 1400px){
  height:600px;
}
@media (min-width: 1401px) and (max-width: 1800px){
  height:700px;
}
@media (min-width: 1801px) and (max-width: 2300px){
  height:900px;
}
@media (min-width: 2301px) and (max-width: 2600px){
  height:1150px
}
@media (min-width: 2601px) and (max-width: 5600px){
  height:1250px
}
@media (min-width: 360px) and (max-width: 820px){
  display:none;
.home-icon{
  display: none;
  }
  .home-swiftbel-brand{
    position: absolute;
    left: 40%;
    color: #fff;
  }
  .burger{
    position: absolute;
    left: 2rem;
    cursor:pointer;
    margin-right:18px;
  }
`
const Dropdownitem=styled(Dropdown.Item)`
background-color:white !important;
background:white !important;
font-size:17px;
margin-bottom:-1px;
font-family:Roobert-medium;
`
const MenuText = styled.p`
color:#000;
font-size: 16px;
font-family:Roobert-medium;
`
const WhiteHr = styled.hr`
color:white;
`
const HomeMobHeader = styled(Container)`
width: 100%;
background-image:url(${Mobbanner});
background-size: cover;
background-repeat:no-repeat;
display:inline-block;
margin-bottom:10px;
.searchmobbuttondiv{
    text-align:center;
}
@media (min-width: 700px) and (max-width: 820px){
height:700px;
}
@media (min-width: 821px) and (max-width: 5000px){
display:none;
}
`
const OffC=styled(Offcanvas)`
width:80%;
background-color:#fff;
.offcanvas-items{
color:#000;
margin-left:10px;
height:30px;
width:40px;
}
  @media (min-width: 821px) and (max-width: 5000px){
    display:none;
  }
`
const Head = styled.div`
marginTop:'30px'
`
const Heading1 = styled.h1`
text-Align:center;
margin-top:-10px;
text-align: center;
color:white;
font-weight: 500;
font-family:Roobert-medium;
font-size: 44px;
line-height: 120%;
@media (min-width: 400px) and (max-width: 820px){
  margin-top:80px;
}
@media (min-width: 821px) and (max-width: 1200px){
  margin-top:-40px;
}
@media (min-width: 360px) and (max-width: 767px){
  font-size: 34px;
}
@media (min-width: 1600px) and (max-width: 1800px){
  margin-top:1rem;
}
@media (min-width: 1801px) and (max-width: 2400px){
  margin-top:3rem;
}
@media (min-width: 2401px) and (max-width: 6200px){
  margin-top:6rem;
  font-size:82px;
}
`
const Heading2 = styled.h4`
text-align:center;
color:white;
font-family:Roobert-medium;
font-size:24px;
@media (min-width: 1700px) and (max-width: 1800px){
  font-size:30px
}
@media (min-width: 1801px) and (max-width: 2400px){
  font-size:32px
}
@media (min-width: 2401px) and (max-width: 3200px){
  font-size:32px
}
`
const Hamenu = styled(Button)`
border-radius : 12px;
font-size:14px;
background-color:white;
background:white;
border 1px solid black;
&:hover{
  background-color:black;
background:black;
color:white;
}
`
const Searchmobbutton=styled(Button)`
border-radius:28px;
align-items:center;
border: 1px solid #D9D9D9;
font-weight: 400 ;
font-size:16px;
line-height:150%;
padding: 10px 6px 10px 15px;
letter-spacing: 0.01em;
margin-bottom:-20px;
.buttonimage{
height:35px;
width:35px;
}
`