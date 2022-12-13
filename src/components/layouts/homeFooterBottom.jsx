import React from 'react'
import language from '../../assets/languagewhite.png'
import playstore from '../../assets/playstorewhite.png'
import appstore from '../../assets/appstorewhite.png'
import styled from 'styled-components'

const homeFooterBottom = () => {
  return (
    <Main className='home-footer-bottom' style={{background:'#190F0F',backgroundColor:'#190F0F',color:'white'}} >
      <div className='row' >
      <Hr/>

      <div className='col-lg-7 col-md-7 col-xl-7' >
          <Head className='hstack gap-2' style={{ paddingLeft: '1vw', paddingRight: '1vw'}}>
            {/* <img src="./footerBottom.png" alt="" width="30" height="24" /> */}
           
            <span className='copyright ' style={{fontFamily:'Open Sans'}}>
              <div className='d-flex justify-content-center'>
            <p><img alt='' src={language} style={{height:'15px',width:'15px',marginBottom:'2px'}}/>&nbsp;&nbsp;English</p>&nbsp;&nbsp;&nbsp;
          <p>$ CAD</p>&nbsp;&nbsp;&nbsp; 
          </div>
          <div style={{color:'#787373'}}>
          <p style={{fontSize:'12px',marginTop:'4px'}}>{new Date().getFullYear()} SwiftBel, Inc. - All rights reserved</p>
          </div>
            </span>
          </Head>
        </div>
        <Head2 className='col-lg-5 col-md-5 col-xl-5'>
          <div className='hstack gap-5 justify-content-center' style={{paddingLeft:'4vw'}} >
          <p><img alt='' src={playstore} className='pb-1'/>&nbsp;&nbsp;PlayStore</p>
          <p><img alt='' src={appstore} className='pb-1'/>&nbsp;&nbsp;AppStore</p>
          </div>
        </Head2>
      </div>
    </Main>
  )
}

export default homeFooterBottom;

const Main=styled.div`
padding-left:8vw;
padding-right:8vw;
`
const Head=styled.span`
@media (min-width: 200px) and (max-width: 1000px){
 display:flex;
  justify-content:center;
  margin-top:15px;
}
.copyright{
  display:flex;
  @media (min-width: 200px) and (max-width: 767px){
    display:inline;
   }
}
`
const Head2=styled.div`
@media (min-width: 200px) and (max-width: 1000px){
 margin-bottom :15px;
}
p{
  color:#787373;
  font-family:'Open Sans';
}
`
const Hr = styled.hr`
background-color:white;
background:white;
margin-bottom:25px;
margin-top:35px;
@media (min-width: 200px) and (max-width: 1000px){
  display:none
}
`