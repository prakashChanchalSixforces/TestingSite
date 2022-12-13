import React, { useEffect } from 'react'
import styled from 'styled-components'
import Moving1 from '../../../assets/graybackground.jpg'
import heart from '../../../assets/whitefav.png'
import pinkheart from '../../../assets/pinkfav.png'
import dots from '../../../assets/3dot.png'
import propic from '../../../assets/graybackground.jpg'
import { Button, Tooltip, OverlayTrigger, Offcanvas } from 'react-bootstrap'
import { useState } from 'react'
import Languages from './Languages'
import Posts from './Posts'
import Services from './Services'
import Reviews from './Reviews'
import About from './About'
import { useDispatch, useSelector } from 'react-redux'
import Yelp from '../../../assets/yelp.png'
import Rating from '../../../assets/rating.png'
import { getProfileDetails } from '../../../store/Actions/serviceProvider.actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../layouts/Auth/Authentication'
import infoLogo from '../../../assets/infologo.png'
import ShareProfile from '../UserHomepage/components/ShareProfile'
import { addfavourite } from '../../../store/Actions/User.action'
import SignupModal from '../../layouts/Auth/SignupModal'
import CallBackModal from '../UserHomepage/components/CallBackModal'
import callback from '../../../assets/callback.png';
import axios from 'axios'
import EnterDetails from './EnterDetails'
import ServiceModal from '../Services/ServiceModal'
// const Tab = styled.li`
//   font-size: 14px;
//   font-family: 'Inter';
//   padding: 7px 0px;
//   cursor: pointer;
//   opacity: 0.6;
//   background: transparent;
//   border: 0;
//   outline: 0;
//   margin-right:70px;
//   color:#787373;
//   @media (min-width: 200px) and (max-width:970px)
// {
// margin-right:25px;
// padding: 3px 0px;
// font-size: 13px;
// }
//   ${({ active }) =>
//     active &&
//     `
//   color:black;
//   border-bottom: 3px solid black;
//   opacity: 1;
// `}
// `;
// const ButtonGroup = styled.ul`
//   display: flex;
//   width:100%;
//   border-bottom: 1px solid #F3F3F3;
//   list-style: none;
//   text-align:start;
// `;

function LeftProfile(props) {
  const types = [ 'Posts', 'Reviews','About', 'Languages',, 'Services',];
  const [active, setActive] = useState(types[0]);
  const services = useSelector(state => state.customerReducer.service);
  const [finalData, setFinalData] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [serviceName, setServiceName] = useState('')
  const [menu, setMenu] = useState(false)
  const profileData = useSelector((state) => state.profileReducer)
  const { profileDetails, servicesPhoto, profileresponse } = profileData
  const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false)
  const [yelpReview, setYelpReview] = useState([])
  const [yelpPhotos, setYelphotos] = useState({})
  const [servicemodal, setServiceModal] = useState(false)
  const dispatch = useDispatch();
  let location = useLocation();
  let uniquename = location.pathname.split('/');
  const uniqueURL = uniquename[2]

useEffect(() => {
    init();
}, [])

  let navigate = useNavigate();

  const handlewebbooking = () => {
    window.analytics.track("SP book online",
      { Sp_name: profileDetails?.businessName });
      setServiceModal(true)
  }

  const getReviews = async (phone) => {
    const data = await axios
      .get(
        `${'https://serene-shore-18290.herokuapp.com/'}https://api.yelp.com/v3/businesses/search/phone?phone=${phone}`,
        {
          headers: {
            Authorization: `Bearer -sE0q9rnSyQLZ1jhdXguYtOqMcnNJd0NQaz_XNCjCzWL5AM_ddpqvQ38jYOXdsGQ5icBPZ8OvFwKOnyVinipDTNW_Jxnnb_8Zfb1PTb_5o4cA2lM4d90HiX6i-AFY3Yx`,
          }
        },
      )

      .then(async json => {
        await axios
          .get(
        `${'https://serene-shore-18290.herokuapp.com/'}https://api.yelp.com/v3/businesses/${json.data?.businesses[0]?.alias}/reviews`,
            {
              headers: {
                Authorization: `Bearer -sE0q9rnSyQLZ1jhdXguYtOqMcnNJd0NQaz_XNCjCzWL5AM_ddpqvQ38jYOXdsGQ5icBPZ8OvFwKOnyVinipDTNW_Jxnnb_8Zfb1PTb_5o4cA2lM4d90HiX6i-AFY3Yx`,
              }
            },
          )

          .then(async json => {
            if (json.data.total > 0) {
              setYelpReview(json.data)
            }
          })
          .catch(err => {
            console.log(err);
          });
          await axios
          .get(
        `${'https://serene-shore-18290.herokuapp.com/'}https://api.yelp.com/v3/businesses/${json.data?.businesses[0]?.alias}`,
            {
              headers: {
                Authorization: `Bearer -sE0q9rnSyQLZ1jhdXguYtOqMcnNJd0NQaz_XNCjCzWL5AM_ddpqvQ38jYOXdsGQ5icBPZ8OvFwKOnyVinipDTNW_Jxnnb_8Zfb1PTb_5o4cA2lM4d90HiX6i-AFY3Yx`,
              }
            },
          )

          .then(json => {
              setYelphotos(json.data)
          })
          .catch(err => {
            console.log(err);
          });

      })
      .catch(err => {
        console.log(err);
      });
  }
  const init = async () => {
    const res = await dispatch(getProfileDetails(uniqueURL));
    await getReviews(res.phone);
  }
  const handleclick = (type) => {
    setActive(type)
  }
  useEffect(() => {
    if (services) {
      setFinalData(services?.filter(x => x.uniqueUrl === profileDetails?.uniqueUrl))
    }
  }, [services, profileDetails?.uniqueUrl])

  let pressureincluded = profileresponse?.data?.servicesOffered.includes('Pressure Washing')
  let electricincluded = profileresponse?.data?.servicesOffered.includes('Electricians')
  let plumberincluded = profileresponse?.data?.servicesOffered.includes('Plumbers')
  let movingincluded=profileresponse?.data?.servicesOffered.includes('Moving')

  const servicesoffered=()=>{
  if(movingincluded){
  return 'Moving'
  }
  else if(pressureincluded){
    return 'Pressure Washing'
  }
  else if(electricincluded){
    return 'Electricians'
  }
  else if (plumberincluded){
    return 'Plumbers'
  }
  else return ''
  }

  const handlebooknow = () => {
    !isAuthenticated() ?
      navigate(`/details`, { state: { servicename: servicesoffered(), spId: finalData?.[0]?.spId } })
      :
      navigate(`/payment`, { state: { servicename: servicesoffered(), spId: finalData?.[0]?.spId } })
      window.analytics.track("SP profile reserve now");
    localStorage.setItem('type', servicesoffered())
    localStorage.setItem('spId', finalData?.[0]?.spId)
    localStorage.setItem('data', JSON.stringify(finalData?.[0]))

  }
  const renderTooltip = props => (
    <TooltipButton className="in" id="tooltip-top" styleName="tooltip" style={{ backgroundColor: 'white', color: 'black' }} {...props}>
      <p style={{ fontSize: '12px', marginBottom: 0 }}>One ton truck with 2 movers</p></TooltipButton>
  );
  const handlefavourite = async (id) => {
    if (!isAuthenticated()) {
      setSignUpModalShow(true)
    }
    else {
      let res = await dispatch(addfavourite({ "serviceProviderId": id }))
      if (res.status === true) {
        init()
      }

      return res
    }
  }
  const handleMenu = () => {
    if (menu === false) {
      setMenu(true)
    }
    else {
      setMenu(false)
    }
  }
  const handlemenuitems = () => {
    setIsShowModal(true)
    setMenu(false)
  }


  return (
    <React.Fragment>
      <Main>
        <div style={{position:'relative'}}>
          <Banner src={profileDetails?.bannerImage || Moving1} />
          <Propic src={profileDetails?.logoImage || propic} />
          <Favourites className='d-flex'>
            <img alt='' onClick={() => handlefavourite(profileDetails?.userId)} src={profileresponse?.fav === true ? pinkheart : heart} className='heart' />
            &nbsp;&nbsp;<div className='d-inline'>
            <Fav variant='light' onClick={() => handleMenu()}>
            <img alt='' src={dots} className='dots' />
            </Fav>
            </div>
          </Favourites>
        </div>

        {/* <Headings> */}
        <Headings>
          <Headings>
          <div>
            <Title>{profileDetails?.businessName || "--"}</Title>
          </div>
          <div className='d-flex mt-2'>
                <Yelpimg src={Yelp}/>
              <p className='d-flex'><Ratingimg src={Rating} />{profileDetails?.rating || "0"}</p>
            </div>
          </Headings>
            <Headings>
            <div className='mt-1'>
             <p className='pricetext d-flex mt-1'>{finalData?.length > 0 && pressureincluded ?
                // '* this kind of Job is paid hourly'
                ''
                :
                finalData?.length > 0 ?
                  `Estimated price is CAD $ ${finalData[0]?.finalPrice}`
                  :
                  pressureincluded || electricincluded ||plumberincluded ?
                    //  '* this kind of Job is paid hourly'
                    ''
                    :
                    <p className='pricetext2'>Starting at <span className='CADtext'>CAD $ {profileresponse?.alreadyPriceGivenBySp?.HourlyCharge?.twoMoversOneTonTruck || '0'} per hour</span></p>
                    } &nbsp;&nbsp;
                {!finalData?.length > 0 && movingincluded ? <OverlayTrigger placement='top' overlay={renderTooltip}>
                  <Infologoimg>
                    <img src={infoLogo} alt='infologo' />
                  </Infologoimg>
                </OverlayTrigger>
                  : ''}
              </p>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;
              <Availability>
              {finalData?.length > 0 ?
                <Reserve
                  onClick={() => handlebooknow()}
                  variant='dark'
                >
                  {`Reserve now CAD $ ${pressureincluded ? Math.ceil(finalData[0]?.finalPrice):
                    plumberincluded || electricincluded? Math.ceil(finalData[0]?.hourlyRate):
                    Math.ceil(finalData[0]?.estimatedHourlyPrice)} per hour`}
                </Reserve>
                :
                <>
                  <Book style={{ backgroundColor: finalData?.length > 0 ? '#D81159' : '#000' }} variant='dark' className='webbook' onClick={() => handlewebbooking()}>
                    Book Online
                  </Book>
                  <Book style={{ backgroundColor: finalData?.length > 0 ? '#D81159' : '#000' }} variant='dark' className='mobbook'
                    onClick={() => handlewebbooking()}>
                    Book Online
                  </Book>
                </>
              }
            </Availability>
          </Headings>
        </Headings>
        <Headings>
          <div >
          </div>
          <div className='d-flex justify-content-between'>

            <div></div>
            </div>
        </Headings>
        <Headings >
          <Headings>
             <Availability>
              <CallBack variant="outline-dark" size='md' onClick={() => {
                setServiceName(profileDetails?.businessName)
                setOpen(true)
              }}>
                <div>
                  <img className='img' src={callback} />
                  Request a call back
                </div>
              </CallBack>
            </Availability>
          </Headings>
            <div>

            </div>
        </Headings>
        <ShareProfile
          show={isShowModal}
          data={profileDetails}
          onHide={() => setIsShowModal(false)}
        />
        {menu === true ?
          <Menuitems>
            <p onClick={() => handlemenuitems()} className='menutext'>Share profile</p>
            {/* <p> Report this page</p> */}
          </Menuitems>
          : ''}
        {/* <br />
        <br /> */}
        {/* <ButtonGroup>
          <div style={{ marginLeft: '-30px', display: 'flex' }}>
            {types.map(type => (
              profileDetails?.post?.length|| yelpPhotos?.photos?.length === 0 && type === 'Posts' ? null :
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
        <br /> */}
    <EnterDetails finalData={finalData} servicesOffered={servicesoffered()}/>
    <br/>
        <div>
          <div id="About" className='mt-1'>
            <About
              data={profileDetails}
            />
          </div>
          <hr />
          <div id="Posts" className='mt-3' >
          {profileDetails?.post?.length||yelpPhotos?.photos?.length > 0 ?
              <>
                <Posts
                  post={profileDetails?.post}
                  yelpPhotos={ yelpPhotos}
                />
                <br/>
                <br/>
                <hr />
              </>:null}
          </div>
          <div id="Services" className='mt-5'>
            <Services
              service={servicesPhoto}
            />
          </div>
          <br />
          <hr />
          <div id="Languages" >
            <Languages
              data={profileDetails?.languagesSupported}
            />
          </div>

          <br />
          <hr />
          <div id="Reviews" className='mt-5'>
            <Reviews
              review={yelpReview}
              ratings={yelpPhotos?.rating}
            />
          </div>

        </div>
      </Main>
      <Footer>
        <p className='startingprice d-flex'>{finalData?.length > 0 && pressureincluded ?
          // '* this kind of Job is paid hourly'
          ''
          :
          finalData?.length > 0 ?
            `Estimated price is CAD $ ${finalData[0]?.finalPrice}`
            :
            pressureincluded ?
              //  '* this kind of Job is paid hourly'
              ''
              : `Starting at $ ${profileresponse?.alreadyPriceGivenBySp?.HourlyCharge?.twoMoversOneTonTruck || '0'} per hour`} &nbsp;
          {!finalData?.length > 0 && movingincluded ?
            <OverlayTrigger placement='top' overlay={renderTooltip}>
              <Infologoimg>
                <img src={infoLogo} alt='infologo' />
              </Infologoimg>
            </OverlayTrigger>
            : ''}
        </p>
        <Book style={{ backgroundColor: finalData?.length > 0 ? '#D81159' : '#000' }} className='bottonfooter' variant="outline-dark" size='md' onClick={() => finalData?.length > 0 ? handlebooknow() : setServiceModal(true)} >
          {finalData?.length > 0 ? `Reserve now CAD $ ${pressureincluded ? Math.ceil(finalData[0]?.finalPrice) : Math.ceil(finalData[0]?.estimatedHourlyPrice)} per hour` : 'Book Online'}
        </Book>
      </Footer>
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
                 <ServiceModal
                     Servicemodal={setServiceModal}
                     show={servicemodal}
                     onHide={() => setServiceModal(false)}
                     servicetype={servicesoffered()}
                />
    </React.Fragment>
  )
}
export default LeftProfile

const Yelpimg = styled.img`
height:24px;
margin-left:20px;
@media (min-width: 260px) and (max-width: 967px){
  margin-left:0px;
}
`
const Infologoimg=styled.div`
margin-top:5px;
@media (min-width: 260px) and (max-width: 967px){
  margin-top:0px;
}
`
const Ratingimg=styled.img`
height:20px;
width:20px;
margin-right:4px;
margin-left:15px;
`
const Favourites=styled.div`
position:relative;
margin-top:-230px;
margin-right:20px;
float:right;
display:flex;
justify-content: end;
@media (min-width: 200px) and (max-width:970px)
{
  margin-top:-140px;
  margin-right:0px;

}
`
const Main = styled.div`
padding-right:32px;
.pricetext2{
  color:#787373;
  font-size: 16px;
  font-family: 'Inter';
}
@media (min-width: 200px) and (max-width:970px)
{
  margin-right:0px;
  padding-right:0px;
}
.dots{
  padding-top:10px;
  }
  .heart{
  margin-top:3px;
  height:40px;
  width:40px;
  }
`
const Availability = styled.div`
display:flex;
@media (min-width: 200px) and (max-width:970px)
{
display:inline;
}
.pricetext{
  color:#787373;
  font-size: 16px;
  margin-left:10px;
  margin-top:10px;
  font-family: 'Inter';
  display:flex;
}
`
const Menuitems = styled.div`
float:right;
width: 310px;
background: #FFFFFF;
border-radius: 8px;
box-shadow: 0px 0px 22px rgba(120, 115, 115, 0.16);
border: 1px solid #F3F3F3;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-family: 'Inter';
padding-top:14px;
font-size: 14px;
.menutext{
  cursor:pointer;
}
`
const Footer = styled.div`
display:flex;
position: fixed;
flex-direction:column;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
bottom: 0;
height:110px;
background-color:#fff;
width:100%;
justify-content:center;
margin-left:-38px;
padding-left:33px;
width:200%;
.bottonfooter{
    background-color:#D81159;
    border-color:#D81159;
    color:#fff;
}
.startingprice{
  font-family: 'Inter';
  font-size: 15px;
  color: #787373;
  margin-bottom:-1px;
}
@media (min-width: 746px) and (max-width: 10000px){
    display:none;
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
const Headings = styled.div`
display:flex;
justify-content:space-between;
.CADtext{
color:black;
font-size:24px;
}
@media (min-width: 200px) and (max-width:970px)
{
display:inline;
.CADtext{
  color:black;
  font-size:20px;
  }
}
.mobbook{
display:none;
@media (min-width: 200px) and (max-width:970px)
{
display:inline;
margin-top:-30px;
margin-left:-15px;
}
}
.webbook{
    display:inline;
    @media (min-width: 200px) and (max-width:970px)
    {
    display:none;
    }
    }
`
const Banner = styled.img`
width:100%;
height: 240px;
object-fit:cover;
border-radius: 0px 0em 8px 11em;
position:relative;
@media (min-width: 200px) and (max-width:970px)
{
border-radius: 0px 0px 8px 3em;
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
const Book = styled(Button)`
width: 192px;
height: 40px;
border-radius: 8px;
margin:3px;
font-size: 14px;
@media (min-width: 200px) and (max-width:970px)
{
width: 290px;
margin-right:20px;
}
`
const Reserve = styled(Button)`
width: 252px;
height: 40px;
border-radius: 8px;
margin:3px;
font-size: 14px;
background-color:#D81159;
background:#D81159;
border:1px solid #D81159;
@media (min-width: 200px) and (max-width:970px)
{
width: 290px;
margin-right:20px;
margin-left:-15px;
}
`
const Fav = styled(Button)`
border: 1px solid #F3F3F3;
border-radius: 8px;
width: 40px;
height: 40px;
background: #FFFFFF;
margin:3px;
display:flex;
justify-content:center;
@media (min-width: 200px) and (max-width:970px)
{
margin-right:20px;
}
`
const CallBack = styled(Button)`
width: 192px;
height: 40px;
border-radius: 8px;
margin:3px;
font: Roobert-medium;
font-weight: 500;
font-size: 14px;
@media (min-width: 200px) and (max-width:970px)
{
width: 290px;
margin-right:20px;
}

.img{
    width: 15px;
height: 15px;
margin-right:5px;
}

`
