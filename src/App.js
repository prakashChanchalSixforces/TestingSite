
import './App.css';
import React, {useState,Suspense, lazy} from 'react'
import Reactga from 'react-ga'
import { useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Routes,Route} from 'react-router-dom'
const MovingHomepage=lazy(()=>import('./components/pages/Services/ServiceHomePage/MovingHomepage'))

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

