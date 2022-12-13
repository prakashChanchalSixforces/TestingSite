import React, { useState, lazy, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { electricians, moving, pressurewashing, search, plumbers } from '../../../../store/Actions/User.action'
import { useDispatch, useSelector } from 'react-redux'
import HeaderTop from '../../../layouts/headerTop'
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticated } from '../../../layouts/Auth/Authentication'
import MovingSearch from '../ServiceHomePage/MovingSearch'
import BookingAndManaging from './BookingAndManaging'
import WorkWithSwiftbel from './WorkingWithSwiftbel'
import ResidentialService from './ResidentialService'
import CommercialService from './CommercialService'
import StorageService from './Storage'
import Packaging from './Packaging'
import Budget from './Budget'
import About from './About'
import List from './List'
import Servic from './Servic'
import FAQ from './FAQ'

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


function MovingServicePage() {
    const classes = useStyles();
    const finaldata = useSelector(state => state.customerReducer.finaldata);
    const searchservices = useSelector(state => state.customerReducer.searchdetails);
    const allservices = useSelector(state => state.customerReducer.service);
    let closing = localStorage.getItem('close')
    const dispatch = useDispatch()
    const location = useLocation()
    const [view, setView] = useState(false)
    const [loader, setLoader] = useState(false)
    const [couponmodal, setCouponmodal] = useState(isAuthenticated() || closing ? false : false)
    console.log(closing, couponmodal, 'closing')

    const [activePage, setActivePage] = useState(1);

    let uniquename = location.pathname.split('/');
    const servicenames = uniquename[1]
    const [searchs, setSearch] = useState(decodeURI(servicenames))

    const mql = window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
    let limit = mql === true ? 9 : 8
    console.log(mql, 'mql')
    const types = ['home', 'service', 'Pricing', 'About us', 'FAQ', 'Contact us'];
    const [active, setActive] = useState(types[2]);

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




    const BannerTop = () => {
        if (searchs === '') {
            return <MovingSearch loader={loader} setLoader={setLoader} />
        }
     
    }
    return (
        <React.Fragment>
            <script src="https://www.googleoptimize.com/optimize.js?id=OPT-KK9WKZM"></script>
            <script>
                {(
                    function gtag_report_conversion(url) {
                        var callback = function () {
                            if (typeof (url) != 'undefined') { window.location = url; }
                        };
                        window.gtag('event', 'conversion', { 'send_to': 'AW-10955203557/v9raCNSviYMYEOXH7Oco', 'event_callback': callback });
                        return false;
                    }
                )}</script>
            <Main>
                <HeaderTop
                    setActive={(item) => setActive(item)}
                />

                {BannerTop()}
                <br />
                <br />
                <ResidentialService id='home' />
                <br />
                <br />
                <CommercialService id="service" />
                <br />
                <br />
                <StorageService />
                <br />
                <br />
                <Packaging />
                <br />
                <WorkWithSwiftbel  id='Pricing' />
                <br />

                <Budget />
                <br />
                <About id='about' />
                <br />
                <List />
                <br />
                <BookingAndManaging />
                <br />
                <Servic />
                <br />
                <FAQ id='FAQ' />
            </Main>
        </React.Fragment>
    )
}

export default MovingServicePage
const Main = styled.div`
@media (min-width: 260px) and (max-width: 820px){
overflow-x: hidden;
}
@media (min-width: 821px) and (max-width: 1310px){
padding-left:30px;
padding-right:30px;
}
`
