import React from 'react';
import HomeFooterBottom from '../../layouts/homeFooterBottom';
import HomeFooter from '../../layouts/homeFooter'
import WhySwiftbel from './WhySwiftbel';
import DigitalIdentity from './DigitalIdentity';
import HomeMain from './HomeMain';
import { useLocation } from 'react-router-dom';
import Mainheader from './MainHeader';

const Home = () => {
   let location=useLocation()
    return (
        <React.Fragment>
        <div style={{overflowX:'hidden', overflowY: 'hidden'}}>
           <Mainheader status={location?.state?.loginmodal}/> 
             <WhySwiftbel/>
              <DigitalIdentity/>
             <HomeMain/>
             <br/>
             <HomeFooter/>    
            <HomeFooterBottom/>
        </div>
        </React.Fragment>
    )
}

export default Home;