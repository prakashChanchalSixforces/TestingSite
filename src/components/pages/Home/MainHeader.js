import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Stack ,Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SignupModal from '../../layouts/Auth/SignupModal';
import { isAuthenticated } from '../../layouts/Auth/Authentication';
import SPBanner from '../../../assets/sphomebanner2.webp'
import SPBannermob from '../../../assets/sphomebanner1.webp'

import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../../assets/swiftbelwhitelogo.png';
import homeicon from '../../../assets/homeicon.png';
import blackburger from '../../../assets/blackburger.png';

function Mainheader(props){
    const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    if(show===false){
    setShow(true)
    }
    else {
      setShow(false)
    }
  }

  let authenticate = isAuthenticated();
  const [signUpModalShow, setSignUpModalShow] = React.useState(props.status&&authenticate===false?props.status:false);
  const [header, setHeader] = useState('')
  const [loginModalShow, setLoginModalShow] = useState(false);

const listenScrollEvent = (event) => {
  if (window.scrollY < 73) {
    return setHeader('')
  } else if (window.scrollY > 70) {
    return setHeader('white')
  } 
}
const handlelogout=()=>{
  localStorage.removeItem('token');
  localStorage.clear();
  sessionStorage.clear();
  navigate('/business')
  window.location.reload();
}
useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);
return(
    <React.Fragment>
    <HomeHeader fluid style={{ padding: '0' }}>
    <div className='home-nav' style={{background:`${header}`,backgroundColor:`${header}`}}>
          <Stack direction='horizontal' gap={2} >
            <img alt='' className='home-icon' src={homeicon} />
            <h2 className='home-swiftbel-brand mt-2'>SwiftBel</h2>
          </Stack>
          <Stack direction='horizontal' gap={5}>
            <ServiceProviderButton onClick={() => navigate('/business/createnewprofile')}>Sign up as service provider</ServiceProviderButton>
            <img alt='' className='burger-icon' src={blackburger} onClick={handleShow}/>

            {window.innerWidth>800?
            
            <Dropdown.Menu show={show} 
            className='burger'
            style={{
              marginTop:isAuthenticated()?'370px':'290px',
              }} 
              onMouseLeave={handleClose} >
                 {isAuthenticated()?
          <>
          <Dropdownitem eventKey="1" ><p>Messages</p></Dropdownitem>
          <Dropdownitem eventKey="1" ><p>Bookings</p></Dropdownitem>
          <Dropdown.Divider style={{marginBottom:'4px',marginTop:'-5px',background:'#F3F3F3',backgroundColor:'#F3F3F3',color:'#F3F3F3'}} />
          <Dropdownitem eventKey="2" onClick={() => navigate('/business/admindashboard')}><p>Dashboard</p></Dropdownitem>
          <Dropdownitem eventKey="3" ><p>Account</p></Dropdownitem>
          {/* <Dropdownitem eventKey="4" ><p>Saved Search</p></Dropdownitem> */}
          </>
          :
          <>
      <Dropdownitem eventKey="1" onClick={() => navigate('/business/createnewprofile')}><p >Sign up</p></Dropdownitem>
      <Dropdownitem  eventKey="2" onClick={() => setLoginModalShow(true)}><p >Login</p></Dropdownitem>
      </>
                 }
      <Dropdown.Divider style={{marginBottom:'4px',marginTop:'-5px',background:'#F3F3F3',backgroundColor:'#F3F3F3',color:'#F3F3F3'}} />
      {isAuthenticated()?
      <>
            <Dropdownitem eventKey="3" onClick={()=>window.open('/help/help-centre')}><p>Help Center</p></Dropdownitem>
      <Dropdownitem eventKey="4" onClick={()=>handlelogout()} ><p>Logout</p></Dropdownitem>
      </>
      :
      <Dropdownitem eventKey="4" onClick={()=>window.open('/help/help-centre')}><p >Help Center</p></Dropdownitem>
      }
    </Dropdown.Menu>
    :
    <Offcanvas show={show} onHide={handleClose} style={{width:'80%',backgroundColor:'black'}}>
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title>
            <div className='d-flex mt-2' style={{color:'white',marginLeft:'10px',height:'30px',width:'40px'}}>
            <img alt='' src={logo} />            
            </div></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {isAuthenticated()?
          <>
          <MenuText>Messages</MenuText>
          <br/>
          <MenuText>Bookings</MenuText>
          <br/>
          <MenuText>Account</MenuText>
          <br/>
          <MenuText onClick={() => navigate('/business/admindashboard')}>Dashboard</MenuText>
          <br/>
          </>
          :
          <>
          <MenuText onClick={() => navigate('/business/createnewprofile')}>Sign Up</MenuText>
          <br/>
          <MenuText  onClick={() => setLoginModalShow(true)}>Login</MenuText>
          <br/>
          </>
          }
          <MenuText>Become a service provider</MenuText>
          <WhiteHr/>
          {isAuthenticated()?
          <MenuText onClick={()=>handlelogout()}>Log out</MenuText>
          :
          <MenuText>Help</MenuText>
          } 
        </Offcanvas.Body>
      </Offcanvas>
}
          </Stack>
        </div> 
        </HomeHeader>
        <HomeHead fluid>
        <Mainset>
        <h1 className='mt-5'>Add great customers to your 
        <br/>schedule!</h1>
         <div>
         <div className='signup-btn-container'>
            <SignupButton className='mt-1' onClick={() => navigate('/business/createnewprofile')}>
              Sign up
            </SignupButton>
            </div>
          <p className='home-tagline' >Sign up to be a Service Provider</p>
          </div>
        </Mainset>
        <div>
        <Banner src={SPBanner}></Banner>
        <img alt='' src={SPBannermob} className='mobilebanner'></img>
        </div>
        </HomeHead>
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
export default Mainheader

const HomeHeader = styled(Container)`
height: 8vh;
display: flex;
justify-content: center;
background: #fff;
position: relative;
margin-bottom:40px;
@media (min-width: 200px) and (max-width: 767px){
  height:0px;
  margin-bottom:0px;
}
.burger{
background-color:white;
border-radius:10px;
width:280px;
}

.home-nav{
  width: 100%;
  height: 72px;
  position: fixed;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding-left: 2.5vw;
  padding-right: 2vw;
}

.home-swiftbel-brand{
  font-size: 28px;
  font-weight: 500;
}

.home-icon{
  height:35px;
  width:35px;
}
.burger-icon{
  height:20px;
  width:25px;
  cursor:pointer;
  
}
@media (min-width: 200px) and (max-width: 767px){
.home-icon{
  display: none;
  } 
  .burger{
    diplay:none
  }
  .home-swiftbel-brand{
    position: absolute;
    left: 38%;
    color: #000;
    top: 20px;
  }
  .burger-icon{
    position: absolute;
  left: 2rem;
  top: 30px;
  }
 
`
const HomeHead = styled(Container)`
display:flex;
justify-content:space-between;
padding:0;
h1{
    font-weight: 500;
    font-size: 44px;
    line-height: 120%;
    display: flex;
    letter-spacing: 0.01em;
    color: #000000; 
    padding-bottom: 1rem;
  }
  .home-tagline{
    font-weight: 400;
    font-size: 24px;
    line-height: 120%;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #000000;
    padding-top: 1rem;
    padding-left: 0.25rem;
    }

@media (min-width: 767px) and (max-width: 8000px){
    .mobilebanner{
      display:none
    }
  }
  @media (min-width: 200px) and (max-width: 539px){
    .mobilebanner{
      position: absolute;
    top: 20px;
    width: 150%;
    border-radius: 0px;
    object-fit: fill;
    transform: translateX(10%);
  height: 385px;
  right: 1vw;
}
    h1{
        position: absolute;
        z-index: 10;
        font-size: 24px;
        text-align: center;
        color: #190F0F;
        top: 25%;
      }
      .home-tagline{
        display: none;
      }
    
      .signup-btn-container{
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -27px;
      }
  }
  @media (min-width: 540px) and (max-width: 767px){
    .mobilebanner{
      position: absolute;
    top: 20px;
    width: 100%;
    border-radius: 0px;
    object-fit: fill;
    transform: translateX(10%);
  height: 399px;
  right: 10vw;
}
    h1{
        position: absolute;
        z-index: 10;
        font-size: 24px;
        text-align: center;
        color: #190F0F;
        top: 30%;
        margin-left:90px;
      }
      .home-tagline{
        display: none;
      }
    
      .signup-btn-container{
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -27px;
      }
  }
@media (min-width: 900px) and (max-width: 1200px){
    h1{
        font-weight: 500;
        font-size: 34px;
      }
      .home-tagline{
        font-weight: 400;
        font-size: 18px;
        padding-top: 3rem;
        }   
}
@media (min-width: 767px) and (max-width: 900px){
    h1{
        font-weight: 500;
        font-size: 25px;
      }
      .home-tagline{
        font-weight: 400;
        font-size: 18px;
        padding-top: 3rem;
        
        } 
}
@media (min-width: 1700px) and (max-width: 1800px){
    h1{
        font-weight: 500;
        font-size: 64px;
        padding-top:80px
      }
      .home-tagline{
        font-weight: 400;
        font-size: 38px;
        padding-top: 3rem;
        }   
}

@media (min-width: 1801px) and (max-width: 2400px){
    h1{
        font-weight: 500;
        font-size: 64px;
        padding-top:80px
      }
      .home-tagline{
        font-weight: 400;
        font-size: 38px;
        padding-top: 3rem;
        }
}
@media (min-width: 2401px) and (max-width: 6200px){
    h1{
        font-weight: 500;
        font-size: 84px;
        padding-top:100px
      }
      .home-tagline{
        font-weight: 400;
        font-size: 44px;
        padding-top: 3rem;
        }
}
@media (min-width: 2700px) and (max-width: 5000px){
  padding-bottom:200px;
}
`

const Mainset=styled.div`
padding-left:40px;
@media (min-width: 200px) and (max-width: 767px){
    top: 0px;
    width: 100%;
    height: 400px;
    .h1{
      text-align:center;
    }
  }
 
`
const Dropdownitem=styled(Dropdown.Item)`
background-color:white !important;
background:white !important;
.p{
  font-size:17px;
padding-top:8px;
}
`
const MenuText = styled.p`
color:white;
font-size: 14px;
`
const WhiteHr = styled.hr`
color:white;
`
const ServiceProviderButton = styled.button`
width: 198px;
height: 42px;
border-radius: 12px;
color: #fff;
font-weight: 400;
font-size: 13px;
line-height: 150%;
display: flex;
align-items: center;
justify-content: center;
letter-spacing: 0.02em;
background-color:white;
background:white;
border 1px solid black;
color:black;
&:hover{
  background-color:black;
background:black;
color:white;
}
@media (min-width: 200px) and (max-width:767px){
 display: none;
}

`

const Banner = styled.img`
position: absolute;
width: 40%;
right: 2vw;
border-radius: 20px;

@media (min-width: 200px) and (max-width: 767px){
    display:none
}
  @media (min-width: 767px) and (max-width: 992px){
    margin-top:50px;
    width:35%
  }
  
  @media (min-width: 992px) and (max-width: 1212px){
    margin-top:50px;
    width:35%
  }
  `
 
const SignupButton = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 14px 44px;
width: 420px;
height: 55px;
background: #000000;
border-radius: 50px;
color: #fff;

@media (min-width: 200px) and (max-width: 767px){
  width: 291px;
  height: 44px;
  position: absolute;
  top: 333px;
  z-index: 10;
}

@media (min-width: 1267px) and (max-width: 1491px){
width: 320px;
}
@media (min-width: 1059px) and (max-width: 1266px){
  width: 270px;
  }
@media (min-width: 901px) and (max-width: 1058px){
  width: 220px;
}
@media (min-width: 756px) and (max-width: 900px){
  width: 170px;
}
@media (min-width: 1801px) and (max-width: 2300px){
    width: 570px;
    height: 85px;
    font-size: 29px;

}
@media (min-width: 2301px) and (max-width: 6200px){
    width: 570px;
    height: 85px;
    font-size: 29px;

}
`