import React from "react";
import swiftbellogo from '../../../assets/swiftbellogoprofile.png';
import blackburger from '../../../assets/blackburger.png';
import Brandname from '../../../assets/Brandname.svg';
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../layouts/Auth/Authentication";
import { useState } from "react";
import SignupModal from "../../layouts/Auth/SignupModal";
import {Dropdown, Offcanvas} from 'react-bootstrap';

function HomeHeader(){
let location = useLocation();
let authenticate = isAuthenticated();
const navigate = useNavigate();
const [loginModalShow, setLoginModalShow] = useState(false);
const [showServiceprovider,setShowServiceprovider]=useState(false)
const [signUpModalShow, setSignUpModalShow] = React.useState(location?.state?.loginmodal&&authenticate===false?location?.state?.loginmodal:false);
const [show, setShow] = useState(false);
const [showoffc, setShowoffc] = useState(false);

const trackingEvent=(name)=>{
    window.analytics.track("tab",{
      "button":name,
      "url":window.location?.pathname
  });
  }
const handleServiceModalClose = () => setShowServiceprovider(false);
const handlejoinas=()=>{
trackingEvent('Join as service provider')
if(showServiceprovider){
setShowServiceprovider(false)
}
else
{
setShowServiceprovider(true)
}
}
const handleClose = () => setShow(false);
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

const spmenu=[
{
title:'Sign up',
tracking:'Sign up as service provider',
type:'signup'
},
{
title:'Login',
tracking:'Login as service provider',
type:'login'
}
]

const authenticatedmenu=[
{
title:'Messages',
tracking:'Messages',
type:'messages',
navigate:'/business/message'
},
{
title:'Bookings',
tracking:'Bookings',
type:'bookings',
navigate:'/bookings'
},
{
title:'Saved jobs',
tracking:'Saved jobs',
type:'savedjobs',
navigate:'/savedjobs'
},
{
title:'Account',
tracking:'Account',
type:'account',
navigate:'/myaccount',
divider:true
},
{
title:'Help center',
tracking:'Help center',
type:'helpcenter',
navigate:'/help/help-centre'
},
{
title:'Logout',
tracking:'Log out',
type:'logout',
}
]

const notauthenticatedmenu=[
       {
        title:'Sign up',
        tracking:'Sign up',
        type:'signup',
        },
        {
        title:'Login',
        tracking:'Login',
        type:'login',
        },
        {
        title:'Service provider sign up',
        tracking:'Service provider Sign up',
        type:'spsignup',
        navigate:'/business'
        },
        {
        title:'Service provider log in',
        tracking:'Service Provider Log in',
        type:'splogin',
        divider:true
        },
        {
        title:'Help center',
        tracking:'Help center',
        type:'helpcenter',
        navigate:'/help/help-centre'
        }
]

const handlecustomermenu=(tracking,route,type)=>{
trackingEvent(tracking)
if(route){
if(type==='helpcenter'){
window.open(route)
}
else{
navigate(route)
}
}
else if(type==='logout'){
handlelogout()
}
else if(type==='signup'||type==='login'){
setSignUpModalShow(true)
}
else if(type==='splogin'){
setLoginModalShow(true)
}
}

const handlespmenu=(tracking,type)=>{
trackingEvent(tracking)
if(type==='signup'){
navigate('/business')
}
else if(type==='login'){
setLoginModalShow(true)
}
}
return(
<>
<Main>
<Head className="d-flex justify-content-between">
<div className="d-flex">
<img alt='' className='home-icon' src={swiftbellogo} />
<h2 className='home-swiftbel-brand'><img src={Brandname} alt='Brandname'/></h2>
</div>
<div className="d-flex">
<div>
<Joinas variant='dark' onClick={()=>handlejoinas()}>Join as service provider</Joinas>
{
showServiceprovider?
<Dropdownmenu show={showServiceprovider} className='mt-4' onMouseLeave={handleServiceModalClose} >
{spmenu.map((item,index)=>{return(
<Dropdown.Item key={index} className='dropdownitem'
onClick={() => handlespmenu(item?.tracking,item?.type)}
>
{item?.title}
</Dropdown.Item>
)})}
</Dropdownmenu>
:null
}
</div>
<div>
<Burgermenu alt='' src={blackburger} onClick={handleShow}/>
<Dropdownmenu show={show} className='customermenu mt-4' onMouseLeave={handleClose} >
{isAuthenticated()?
authenticatedmenu.map((item,index)=>{return(
<>
<Dropdown.Item key={index} className='dropdownitem'
onClick={() => handlecustomermenu(item?.tracking,item?.navigate,item?.type)}
>
{item?.title}
</Dropdown.Item>
{item?.divider ?
<Dropdown.Divider className='divider' />
:''}
</>
)})
:
notauthenticatedmenu.map((item,index)=>{return(
<>
<Dropdown.Item key={index} className='dropdownitem'
onClick={() => handlecustomermenu(item?.tracking,item?.navigate,item?.type)}
>
{item?.title}
</Dropdown.Item>
{item?.divider ?
<Dropdown.Divider className='divider' />
:''}
</>
)})
}
</Dropdownmenu>
</div>
</div>
</Head>
</Main>
<MobileHeader>
<div>
<Burgermenu alt='' src={blackburger} onClick={handleShowOffc}/>
</div>
<div>
<h2 className='home-swiftbel-brand'><img src={Brandname} alt='Brandname'/></h2>
</div>
<div className="lastdiv"></div>
</MobileHeader>

<OffC show={showoffc} onHide={handleCloseOffc} >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>
            <div onClick={handleCloseOffc} className='offcanvas-items d-flex mt-2' >
            <img src={Brandname} alt='logo' />
            </div></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
        {isAuthenticated()?
authenticatedmenu.map((item,index)=>{return(
<>
<MenuText key={index} onClick={() => handlecustomermenu(item?.tracking,item?.navigate,item?.type)}>{item?.title}</MenuText><br/>
{item?.divider ?
<hr/>
:''}
</>
)})
:
notauthenticatedmenu.map((item,index)=>{return(
<>
<MenuText key={index} onClick={() => handlecustomermenu(item?.tracking,item?.navigate,item?.type)}>{item?.title}</MenuText><br/>
{item?.divider ?
<hr/>
:''}
</>
)})
}
    </Offcanvas.Body>
</OffC>
<SignupModal
signupModal={setSignUpModalShow}
loginModal={setLoginModalShow}
loginModalshow={loginModalShow}
show={signUpModalShow}
onHide={() => setSignUpModalShow(false)}
/>
</>
)
}
export default HomeHeader

const Head=styled.div`
width:1312px;
// position:fixed;
// z-index : 9999;
background:white;
Top:0;
height:80px;
padding-top:15px;
padding-bottom:27px;
padding-left:20px;
padding-right:20px;
.home-swiftbel-brand{
width: 101.66px;
height: 24px;
}
.home-icon{
width: 25.97px;
height: 26.44px;
margin-top:12px;
margin-right:8px;
}
@media (min-width: 200px) and (max-width: 1311px){
    width:100%;
     }
`
const Main = styled.div`
display:flex;
justify-content:center;
background:white;
height:80px;
.customermenu{
margin-left:-70px;
}
.dropdownitem{
background-color:white !important;
background:white !important;
}
.divider{
background:#F3F3F3;
background-color:#F3F3F3;
color:#F3F3F3;
}
@media (min-width: 200px) and (max-width: 768px){
display:none;
}
`
const MobileHeader=styled.div`
display:flex;
justify-content:space-between;
width:100%;
background:white;
height:80px;
padding:20px;
@media (min-width: 769px) and (max-width: 9999px){
display:none;
}
.lastdiv{
width:50px;
}
`

const MenuText = styled.p`
color:#000;
font-size: 16px;
font-family:Roobert-medium;
`
const OffC=styled(Offcanvas)`
width:80%;
padding-top:3px;
background-color:#fff;
.offcanvas-items{
color:#000;
}
@media (min-width: 769px) and (max-width: 9999px){
    display:none;
}
`
const Burgermenu=styled.img`
    width: 32px;
    height: 16px;
    margin-top:12px;
    cursor:pointer;
`
const Dropdownmenu=styled(Dropdown.Menu)`
border-radius:10px;
width: 212px;
font-size:16px;
font-family:Roobert-medium;
background-color:white !important;
background:white !important;
font-weight:400;
`
const Joinas=styled.button`
width: 212px;
height: 42px;
background: #190F0F;
border-radius: 8px;
border:1px solid #190F0F;
color:white;
font-family:Inter;
font-weight: 400;
font-size: 14px;
margin-right:34px;
`