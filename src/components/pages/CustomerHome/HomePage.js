import React from 'react';
import styled from 'styled-components';
import UserHeader from "./UserHeader";
import HomeServices from "./HomeServices";
import JoinSwiftbel from "./JoinSwiftbel";
import Steps from "./Steps";
import { lazy , Suspense} from 'react';
import MainFooter from '../MainFooter/MainFooter';
const Vimeo= lazy(() => import("./Vimeo"));

const HomePage = () => {
  const loading = () => (
    <p className="animated fadeIn pt-3 text-center" ></p>
  );

    return (
      <Suspense fallback={loading()}>
        <React.Fragment>
        <script type="text/javascript"
        dangerouslySetInnerHTML={
            {
             __html:
             (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "cxzfflp5kc")
            }
        }
        />
         <HomeServices/>
            <UserHeader/>
            {/* <br /> */}
            {/* <HeadText>Search and compare with no commitment. Then book and see how easy it is!</HeadText>
            <br /> */}
            <Steps/>
            <Vimeo/>
            <JoinSwiftbel/>
            <br />
            <br />
           <MainFooter/>
        </React.Fragment>
        </Suspense>
    )
}
export default HomePage;
const HeadText = styled.h2`
text-align:center;
margin-top:-10px;
font-family:Roobert-medium;
@media (min-width: 1000px) and (max-width: 1250px){
    margin-top:-77px;
  }
  @media (min-width: 1251px) and (max-width: 1419px){
    margin-top:-20px;
  }
  @media (min-width: 1420px) and (max-width: 1500px){
    margin-top:-60px;
  }
  @media (min-width: 1500px) and (max-width: 1800px){
    margin-top:-10px;
  }
  @media (min-width: 1800px) and (max-width: 1899px){
    margin-top:-74px;
  }
@media (min-width: 950px) and (max-width: 1000px){
    margin-top:-137px;
  }
  @media (min-width: 2300px) and (max-width: 2400px){
    margin-top:-70px;
  }
  @media (min-width: 2600px) and (max-width: 2700px){
    margin-top:-70px;
  }
  @media (min-width: 260px) and (max-width: 1000px){
    font-size:14px;
    margin-top:10px;
    }
    @media (min-width: 1900px) and (max-width: 6000px){
        font-size:54px;
        }
`

