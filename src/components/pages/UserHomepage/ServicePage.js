import React, { useState, lazy, useEffect } from 'react'
import HeaderTop from '../../layouts/headerTop'
import { Container } from 'react-bootstrap'
import LeftService from './LeftService'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { search } from '../../../store/Actions/User.action'
import { useDispatch, useSelector } from 'react-redux'
import TopBanner from './components/TopBanner'
import Arrows from '../../../assets/Arrowspink.png'
import Discount from './components/Discount'
import CouponModal from '../Coupon/CouponModal'
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import { isAuthenticated } from '../../layouts/Auth/Authentication'
import HomeServicesBar from './components/HomeServiceBar'
import MainFooter from '../MainFooter/MainFooter'
const MovingService = lazy(() => import('./MovingService'))
const ElectricianService = lazy(() => import('./ElectricianService'))
const PlumberService = lazy(() => import('./PlumberService'))
const HvacService = lazy(() => import('./HvacService'))
const PressureWashing = lazy(() => import('./PressureWashing'))
const GutterCleaning = lazy(() => import('./GutterCleaning'))
const CleaningService = lazy(() => import('./CleaningService'))
const RugCleaning = lazy(() => import('./RugCleaning'))
const CarpetCleaning = lazy(() => import('./CarpetCleaning'))
const WindowCleaning = lazy(() => import('./WindowCleaning'))
const TilengroutCleaning = lazy(() => import('./TilengroutCleaning'))
const RoofCleaning = lazy(() => import('./RoofCleaning'))
const Handymen = lazy(() => import('./Handymen'))
const FurnitureAssembly = lazy(() => import('./FurnitureAssembly'))
const SofaCleaning = lazy(() => import('./SofaCleaning'))
const useStyles = makeStyles(() => ({
    ul: {
      '& .MuiPaginationItem-root': {
         '&.Mui-selected': {
           background: 'black',
           color: 'white',
         },
      },
    },
  }));


function ServicePage() {
const classes = useStyles();
     const searchservices = useSelector(state => state.customerReducer.searchdetails);
     let closing= localStorage.getItem('close')

    const dispatch = useDispatch()
    const location = useLocation()
    const [view, setView] = useState(false)
    const [loader, setLoader] = useState(false)
    const [couponmodal, setCouponmodal] = useState(isAuthenticated() || closing? false : false)
 const [activePage, setActivePage] = useState(1);
    const [count,setCount]=useState(1)
    let uniquename = location.pathname.split('/');
    const servicenames = uniquename[1]
    const [searchs, setSearch] = useState(decodeURI(servicenames))


    // console.log(servicenames,'servicenames')
    // const searchs = decodeURI(servicenames)
    console.log(searchs, 'sherssss')
    let values = {
        placeOfService: "Vancouver",
        date: "15-Jul-2022",
        time: "11:00"
    }

    console.log('in service pagee')
    const finalnames = (x) => {
        if (x === 'moving') {
            return 'Moving'
        }
        else if (x === 'pressurewashing') {
            return 'Pressure Washing'
        }
        else if (x === 'electricians') {
            return 'Electricians'
        }
        else return 'Moving'
    }
    const init = async (page) => {
        setLoader(true)
        await dispatch(search({
            ...values
            , servicesOffered: finalnames(searchs)
        }, page, 8));
        setLoader(false)
    }


const handleChange = (event,value) => {
    setActivePage(value);
    console.log(event,value,'valuesue')
  };

    useEffect(() => {
        if(location?.state?.dontcall!==true){
        init(activePage);
    }
    },[location,searchs,activePage])
    console.log('viewww', view)
    let Rightside = () => {
        if (searchs === 'moving') {
            return <MovingService activepage={activePage} />
        }
        else if (searchs === 'electricians') {
            return <ElectricianService />
        }
        else if (searchs === 'Plumber') {
            return <PlumberService />
        }
        else if (searchs === 'HVAC Technicians') {
            return <HvacService />
        }
        else if (searchs === 'pressurewashing') {
            return <PressureWashing />
        }
        else if (searchs === 'Gutter Cleaning') {
            return <GutterCleaning />
        }
        else if (searchs === 'Cleaning') {
            return <CleaningService />
        }
        else if (searchs === 'RugCleaning') {
            return <RugCleaning />
        }
        else if (searchs === 'Carpet Cleaning') {
            return <CarpetCleaning />
        }
        else if (searchs === 'Window Cleaning') {
            return <WindowCleaning />
        }
        else if (searchs === 'Tile Grout') {
            return <TilengroutCleaning />
        }
        else if (searchs === 'Roof Treatment') {
            return <RoofCleaning />
        }
        else if (searchs === 'Furniture Assembly') {
            return <FurnitureAssembly />
        }
        else if (searchs === 'Handyman') {
            return <Handymen />
        }
        else if (searchs === 'Cleaning') {
            return <SofaCleaning />
        }
    }
    return (
        <React.Fragment>
            <script src="https://www.googleoptimize.com/optimize.js?id=OPT-KK9WKZM"></script>
            <Main >

                <Segment style={{ backgroundColor: '#FAFAFA' }}>
                    <Top className={view === true ? 'view' : ''}>
                    <Discount />
                        <HeaderTop />
                        <HomeServicesBar
                            serviceName={(name) => setSearch(decodeURI(name.toLowerCase().split(" ").join("")))}
                            type={finalnames(searchs)}
                        />
                        <TopBanner setview={setView} type={finalnames(searchs)} />
                    </Top>
                    <MainContainer fluid
                        style={{ backgroundColor: view === true ? 'grey' : '', background: view === true ? 'grey' : '' }}
                    >

                        <div className='d-flex '>
                            <Leftdiv className={view === true ? 'view p-2' : 'p-2'} >
                                <LeftService type={finalnames(searchs)} setview={setView} loader={loader}  />
                            </Leftdiv>

                            <Rightdiv className={'p-2'} onClick={() => { setView(false) }}>
                                <div>
                                    <div className='d-flex noview '>
                                        <p className='formtext'>Fill the form
                                            <br />to get started</p>
                                        <Img src={Arrows} className='arrowpink' />
                                    </div>
                                    <Rightside />
                                </div>
                            </Rightdiv>
                        </div>
                        <CouponModal
                            Couponmodal={setCouponmodal}
                            show={couponmodal}
                            onHide={() => setCouponmodal(false)}
                        />
                    </MainContainer>
               <div className='d-flex justify-content-center'>
                <Pagination
                classes={{ ul: classes.ul }}
                count={searchservices?.total_pages}
                page={activePage}
                onChange={handleChange}
                />
               </div>
                    <br />
                    <br />
                    <MainFooter/>
                </Segment>
            </Main>
        </React.Fragment>
    )
}

export default ServicePage
const Main = styled.div`
@media (min-width: 260px) and (max-width: 820px){
overflow-x: hidden;
}
`
const MainContainer = styled(Container)`
padding-left:50px;
padding-Right:50px;
@media (min-width: 260px) and (max-width: 820px){
    padding-left:0px;
    padding-Right:0px;
    }
    @media (min-width: 1800px) and (max-width: 2500px)
  {
      padding-left:250px;
      padding-right:250px;
  }
  @media (min-width: 2501px) and (max-width:3000px)
  {
      padding-left:350px;
      padding-right:350px;
  }
  @media (min-width: 3001px) and (max-width:4000px)
  {
      padding-left:750px;
      padding-right:750px;
  }
  @media (min-width: 4001px) and (max-width:9999px)
  {
      padding-left:1350px;
      padding-right:1350px;
  }
`
const Segment = styled.div`

background-color:#FAFAFA;
padding:0px;
.noview{
    padding-left:20px;
    padding-top:20px;
}
.viewright{
    animation-name:shake  ;
    animation: shake 0.4s;
    animation-iteration-count: infinite;

    @keyframes shake  {
        0% { transform: translateX(0) }
 25% { transform: translateX(5px) }
 50% { transform: translateX(-5px) }
 75% { transform: translateX(5px) }
 100% { transform: translateX(0) }
       }
    }
.view{
    -webkit-filter:  grayscale(100%) brightness(51%);
}
.mobtext{
    margin-bottom : 50px;
    @media (min-width: 767px) and (max-width: 10000px){
        display:none;
        }
}
`
const Img = styled.img`
margin-top:-25px;
margin-left:20px;
`
const Top = styled.div`
background-color:white;
background:white;
.webbanner{
    @media (min-width: 260px) and (max-width: 820px){
    display:none;
    }
}
.mobbanner{
    display:none;
    @media (min-width: 260px) and (max-width: 820px){
        display:inline;
    }

}
`
const Leftdiv = styled.div`
width:964px;
@media (min-width: 260px) and (max-width: 820px){
padding:0px;
padding-left:0px;
padding-Right:0px;
}
@media (min-width: 950px) and (max-width: 1054px){
    width:1964px;
}
  @media (min-width: 1055px) and (max-width: 1500px){
    width:1964px;
}
  @media (min-width: 1401px) and (max-width: 1800px){
    width:1964px;
}
@media (min-width:1801px) and (max-width: 5600px){
    width:1964px;
}
`
const Rightdiv = styled.div`
position: sticky;
width: 400px;
height: 90%;
top: -60px;
display: flex;
.formtext{
transform: rotate(7deg);
margin-top:-72px;
font-family: Caveat !important;
font-size: 30px;
}
.arrowpink{
    margin-top:-48px;
    margin-bottom:8px;
}
@media (min-width: 360px) and (max-width: 1115px){
display:none;
}
  @media (min-width: 1401px) and (max-width: 1800px){
    width:600px;
}
@media (min-width:1801px) and (max-width: 5600px){
    width:600px;
}
`