import React, { useState, lazy, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {electricians, moving, pressurewashing, search,plumbers } from '../../../store/Actions/User.action'
import { useDispatch ,useSelector} from 'react-redux'
import Discount from '../UserHomepage/components/Discount'
import HeaderTop from '../../layouts/headerTop'
import FooterTop from '../UserHomepage/FooterTop'
import FooterBottom from '../UserHomepage/FooterBottom'
import LeftService from './LeftService'
import CouponModal from '../Coupon/CouponModal'
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import { isAuthenticated } from '../../layouts/Auth/Authentication'
import HomeServicesBar from '../UserHomepage/components/HomeServiceBar'
import MovingSearch from './SearchBanners/MovingSearch'
import ElectriciansSearch from './SearchBanners/ElectriciansSearch'
import PressureSearch from './SearchBanners/PressureSearch'
import PlumbersSearch from './SearchBanners/PlumbersSearch'
import MainFooter from '../MainFooter/MainFooter'

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
   const finaldata = useSelector(state => state.customerReducer.finaldata);
    const searchservices = useSelector(state => state.customerReducer.searchdetails);
    const allservices = useSelector(state => state.customerReducer.service);
let closing= localStorage.getItem('close')
    const dispatch = useDispatch()
    const location = useLocation()
    const [view, setView] = useState(false)
    const [loader, setLoader] = useState(false)
    const [couponmodal, setCouponmodal] = useState(isAuthenticated()||closing ? false : false)
    console.log(closing,couponmodal,'closing')

 const [activePage, setActivePage] = useState(1);

    let uniquename = location.pathname.split('/');
    const servicenames = uniquename[1]
    const [searchs, setSearch] = useState(decodeURI(servicenames))

    const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
    let limit = mql===true? 9 :8
console.log(mql,'mql')
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
        else if (x === 'plumbers') {
            return 'Plumbers'
        }
        else if (x === 'cleaning') {
            return 'Cleaning'
        }
        else return 'Moving'
    }
    const init = async (page) => {
        setLoader(true)
        await dispatch(search({
            ...values
            , servicesOffered: finalnames(searchs)
        }, page, limit));
        setLoader(false)
    }


const handleChange = (event,value) => {
    setActivePage(value);
    console.log(event,value,'valuesue')
  };

  console.log(allservices,'allservices')
  const spInit=async()=>{
    setLoader(true)
    if(searchs==='moving'){
    await dispatch(moving({
    "typeofHouse":finaldata?.typeofHouse,
    "approxSizeInSqFt":finaldata?.approxSizeInSqFt,
    "fromAddress":finaldata?.fromAddress,
    "numberOfRooms":finaldata?.numberOfRooms,
    "date":finaldata?.date,
    "time":finaldata?.time,
    "toAddress":finaldata?.toAddress
    }
    ,activePage , limit));
    }

    else if(searchs==='pressurewashing'){
    await dispatch(pressurewashing({
    "areasToBeCleaned":finaldata?.areasToBeCleaned,
    "approxSizeInSqFt":finaldata?.approxSizeInSqFt,
    "address":finaldata?.address,
    "date":finaldata?.date,
    "time":finaldata?.time,
    }
    ,activePage , limit));
    }
    else if(searchs==='electricians'){
        await dispatch(electricians({
        "estimatedHourOfWork":finaldata?.estimatedHourOfWork,
        "address":finaldata?.address,
        "date":finaldata?.date,
        "time":finaldata?.time,
        }
        ,activePage , limit));
    }
    else if(searchs==='plumbers'){
        await dispatch(plumbers({
        "estimatedHourOfWork":finaldata?.estimatedHourOfWork,
        "address":finaldata?.address,
        "date":finaldata?.date,
        "time":finaldata?.time,
        }
        ,activePage , limit));
    }
    setLoader(false)
}
    useEffect(() => {
        if (location?.state?.dontcall !== true) {
            if(finaldata?.serviceName===finalnames(searchs)&&activePage){
            spInit()
            }
            else{
            init(activePage);
            }
        }
    }, [location, searchs,activePage])

    const BannerTop=()=>{
     if(searchs==='moving'){
        return <MovingSearch loader={loader} setLoader={setLoader} />
     }
     else if(searchs==='pressurewashing'){
        return <PressureSearch loader={loader} setLoader={setLoader} />
     }
     else if(searchs==='electricians'){
        return <ElectriciansSearch loader={loader} setLoader={setLoader} />
     }
     else if(searchs==='plumbers'){
        return <PlumbersSearch loader={loader} setLoader={setLoader} />
     }
    }
    return (
        <React.Fragment>
            <script src="https://www.googleoptimize.com/optimize.js?id=OPT-KK9WKZM"></script>
            <script>
                {(
                    function gtag_report_conversion(url) {
                    var callback = function ()
                    {
                    if (typeof(url) != 'undefined') { window.location = url; }
                    };
                    window.gtag('event', 'conversion', { 'send_to': 'AW-10955203557/v9raCNSviYMYEOXH7Oco', 'event_callback': callback });
                    return false;
                    }
                )}</script>
            <Main >

                <Segment style={{ backgroundColor: '#FAFAFA' }}>
                    <Top className={view === true ? 'view' : ''}>
                    <Discount />
                        <HeaderTop />
                        <HomeServicesBar
                            serviceName={(name) => setSearch(decodeURI(name.toLowerCase().split(" ").join("")))}
                            type={finalnames(searchs)}
                            setActivePage={setActivePage}
                        />
                        <div className='d-flex justify-content-center'>
                        {BannerTop()}
                        </div>
                    </Top>
                    <MainContainer fluid
                        style={{ backgroundColor: view === true ? 'grey' : '', background: view === true ? 'grey' : '' }}
                    >

                            <Leftdiv className={view === true ? 'view p-2' : 'p-2'} >
                                <LeftService type={finalnames(searchs)} setview={setView} loader={loader} />
                            </Leftdiv>

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
@media (min-width: 260px) and (max-width: 820px){
padding:0px;
padding-left:0px;
padding-Right:0px;
}
`
