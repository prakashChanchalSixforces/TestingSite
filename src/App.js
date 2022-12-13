import "bootstrap/dist/css/bootstrap.css"
import './App.css';
import React, {useState,Suspense, lazy} from 'react'
import Reactga from 'react-ga'
import { useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Routes,Route} from 'react-router-dom'
import ProtectedRoute from "./components/layouts/Auth/ProtectedRoute";
import UserProtectedroute from "./components/layouts/Auth/UserProtectedroute";
import CustomerAccount from "./components/pages/CustomerAccount/CustomerAccount";
import MainTrack from "./components/pages/TrackLocation/MainTrack";
import SwiftbelHome from "./components/pages/SwiftbelHome/SwiftbelHome";
const SavedJobs = lazy(() => import("./components/pages/Savedjobs/Savedjobs"));
const ServicePage = lazy(() => import("./components/pages/Services/ServicePage"));
const HomePage = lazy(() => import("./components/pages/CustomerHome/HomePage"));
const RightSearch= lazy(() => import("./components/pages/UserHomepage/RightSearch"));
const PaymentDetails= lazy(() => import("./components/pages/Payment/PaymentDetails"));
const TemplateProfile= lazy(() => import("./components/pages/CreateNewProfile/Template"));
const NewSignup= lazy(() => import("./components/pages/CreateNewProfile/NewSignup"));
const CreateNewPassword= lazy(() => import("./components/pages/CreateNewProfile/CreatePassword"));
const Booking= lazy(() => import("./components/pages/Bookings/bookings"));
const Profile= lazy(() => import("./components/pages/SpprofileCustomer/Profile"));
const SetServices= lazy(() => import("./components/pages/CreateNewProfile/SetServices"));
const MobileSearch = lazy(() => import('./components/pages/UserHomepage/MobileSearch'));
const ResetPassword = lazy(() => import('./components/pages/Auth/ResetPassword'));
const Dashboard = lazy(() => import('./components/pages/Dashboard/Dashboard'));
const Business = lazy(() => import('./components/pages/Home'));
const ServicePage1 = lazy(() => import('./components/pages/UserHomepage/ServicePage'));
const Settings = lazy(() => import('./components/pages/settings'));
const PaymentPage = lazy(() => import('./components/pages/Payment/PaymentPage'));
const AdminLogin = lazy(()=>import('./components/pages/adminSignup/index'))
const AdminSignup = lazy(()=>import('./components/pages/adminSignup/AdminSignup'))
const Messages=lazy(()=>import('./components/pages/chat/index'))
const Builder=lazy(()=>import('./components/pages/Builder'))
const MovingHomepage=lazy(()=>import('./components/pages/Services/ServiceHomePage/MovingHomepage'))
//const MovingService=lazy(()=>import('./components/pages/Services/ServiceHomePage/MovingService'))
const MovingService=lazy(()=>import('./components/pages/Services/ServiceHomePage/MovingService'))
function App() {
  const [heightProfile] = useState('100vh');
  useEffect(()=>{
  Reactga.initialize('UA-235709629-1')
  Reactga.pageview(window.location.pathname + window.location.search)
  },[])


  const loading = () => (
    <p className="animated fadeIn pt-3 text-center" ></p>
  );

  return (

    <div className="App" style={{ height: heightProfile }}>
          <script>
{  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="X54UDW2g0lhnWcXvCHFHXIcqZCCsYIyo";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.load("X54UDW2g0lhnWcXvCHFHXIcqZCCsYIyo");

  }}()}
</script>
<script>
   {(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3170623,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')}
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-10955203557"></script>

        <Suspense fallback={loading()}
      >
              <Routes>
          <Route path="/" element={<MovingHomepage />} />
          </Routes>
            </Suspense>

    </div>
  );
}
export default App;

