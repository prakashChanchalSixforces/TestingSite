import React from 'react'
import { Stack,Container, Dropdown, Offcanvas, Button} from 'react-bootstrap';
import styled from 'styled-components';
import swiftbellogo from '../../assets/swiftbellogoprofile.png'
import Profile from '../../assets/profile.png'
import Brandname from '../../assets/Brandname.svg'
import '../pages/CompanyProfile/companyprofile.css'
import { useState ,useEffect} from 'react';
import { isAuthenticated } from './Auth/Authentication';
import { useNavigate } from 'react-router-dom';
import SignupModal from './Auth/SignupModal';
import { Link } from 'react-scroll';
const HeaderTop = (props) => {
    const [header, setHeader] = useState('')
    const [show, setShow] = useState("Call us");
  const [showoffc, setShowoffc] = useState(false);
  let authenticate = isAuthenticated();
  const [signUpModalShow, setSignUpModalShow] = React.useState(props.status&&authenticate===false?props.status:false);
  const [loginModalShow, setLoginModalShow] = useState(false);


  let navigate = useNavigate();
    const {data}=props
    const listenScrollEvent = (event) => {
        if (window.scrollY < 73) {
          return setHeader('')
        } else if (window.scrollY > 70) {
          return setHeader('white')
        } 
      }


      useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
      }, []);

      let username=localStorage.getItem('userName')
    return (
      <Main>
        <HomeHeader fluid style={{ padding: '0',zIndex:1000 }}>
        <div className='home-nav' style={{background:`${header}`,backgroundColor:`${header}`,alignItems:'center',display:'flex' }}>
          <Stack direction='horizontal' gap={2} style={{cursor:'pointer'}}onClick={()=>navigate('/')} >
            <img alt='' className='home-icon' src={swiftbellogo} />
            <Text className='home-swiftbel-brand'>SwiftBelMoving</Text>
          </Stack>
        <div className='d-flex juatify-content-between mt-2'>
         <h4 style={{cursor:'pointer'}} onClick={()=>props?.setActive('home')} className='p-2'><Link activeClass="active" to="home" spy={true} smooth={true}>Home</Link>home</h4>
         <h4 style={{cursor:'pointer'}}  onClick={()=>props?.setActive('service')} className='p-2'><Link activeClass="active" to="service" spy={true} smooth={true}>service</Link></h4>
         <h4 style={{cursor:'pointer'}}  onClick={()=>props?.setActive('Pricing')} className='p-2'><Link activeClass="active" to="Pricing" spy={true} smooth={true}>Pricing</Link></h4>
         <h4 style={{cursor:'pointer'}} className='p-2'><Link activeClass="active" to="about" spy={true} smooth={true}>About us</Link></h4>
         <h4 style={{cursor:'pointer'}} className='p-2'><Link activeClass="active" to="FAQ" spy={true} smooth={true}>FAQ</Link></h4>
   
         </div>
         {/* </div>
         <div className='d-flex juatify-content-between mt-5'>
          <h4 style={{padding:'10px'}}><Link activeClass="active" to="home" spy={true} smooth={true}>Home</Link></h4>
          <h4 style={{padding:'10px'}}><Link  to="service" spy={true} smooth={true}>Service</Link></h4>
          <h4 style={{padding:'10px'}}><Link  to="Pricing" spy={true} smooth={true}>Pricing</Link></h4>
          <h4 style={{padding:'10px'}}><Link  to="about" spy={true} smooth={true}>About us</Link></h4>
          <h4 style={{padding:'10px'}}><Link  to="FAQ" spy={true} smooth={true}>FAQ</Link></h4>

         </div> */}
   <Button onMouseEnter={()=>setShow('+1 604 358 4116')} onMouseLeave={()=>setShow('Call us')}>{show}</Button>
          </div>
          </HomeHeader>
        </Main>
    )
}

export default HeaderTop;

const Text=styled.h2`
background:linear-gradient(128.86deg, #D81159 11.42%, #EB873F 72%, #FFCF23 107.53%);
color:linear-gradient(128.86deg, #D81159 11.42%, #EB873F 72%, #FFCF23 107.53%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`
const Main = styled.div`
background-color:white;
background:white;
border-bottom:1px solid #F3F3F3;
@media (min-width: 200px) and (max-width: 820px)
{
width:100%;
padding-left:10px;
padding-right:10px;
}
.home-swiftbel-brand{
  color:linear-gradient(90deg, #D81159, #EB873F,#FFCF23);
}
`
const MobHeader = styled(Container)`
display:flex;
justify-content:space-between;
height: 55px;
background: #fff;
padding-top:10px;
@media (min-width: 767px) and (max-width: 9999px){
  display:none;
}

`
const Username=styled.div`
display:flex;
border-radius:20px;
background:black;
color:white;
padding:5px;
margin-right:12px;
font-size:12px;
cursor:pointer;
padding-right:15px;
padding-left:15px;
height:30px;
.arrow{
  font-size:8px;
  margin-top:4px;
  margin-left:4px;
}
`
const HomeHeader = styled(Container)`
height: 72px;
display: flex;
justify-content: center;
background: #fff;
position: relative;

@media (min-width: 200px) and (max-width: 767px){
  display:none;
}


.home-nav{
  top: 0;
  display: flex;
  justify-content: space-between;
  width:1312px;
  padding-left:20px;
padding-right:20px;
  @media (min-width: 200px) and (max-width: 767px){
    width:100%;
  }
}


.home-icon{
  height:25px;
  width:25px;
}

@media (min-width: 200px) and (max-width: 767px){
.home-icon{
  display: none;
  }
`
const Dropdownitem=styled(Dropdown.Item)`
background-color:white !important;
background:white !important;
font-size:17px;
margin-bottom:-1px;
`
const OffC=styled(Offcanvas)`
  @media (min-width: 821px) and (max-width: 5000px){
    display:none;
  }
`
const MenuText = styled.p`
color:#000;
font-size: 16px;
font-family:Roobert-medium;
`
const WhiteHr = styled.hr`
color:white;
`