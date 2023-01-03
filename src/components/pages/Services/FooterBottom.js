import React from 'react'
import styled from 'styled-components'
import language from './../../../assets/language.png'
import playstore from './../../../assets/playstoregray.png'
import appstore from './../../../assets/appstoregray.png'
const FooterBottom = () => {
  return (
    <React.Fragment>
    <Main className='home-footer-bottom'>
      <div className='row' >

      <Hr />

        <div  >
          <Head className='hstack gap-2'>
            {/* <img src="./footerBottom.png" alt="" width="30" height="24" /> */}
            <span className='copyright '>
              <div className='d-flex justify-content-center'>
            <p><img  alt='' src={language} className='lang'/>&nbsp;&nbsp;English</p>&nbsp;&nbsp;&nbsp;
          <p>$ CAD</p>&nbsp;&nbsp;&nbsp;
          </div>
          <div className='innerdiv'>
          <p className='rights'>{new Date().getFullYear()} SwiftBel, Inc. - All rights reserved</p>
          </div>
            </span>
          </Head>
        </div>
       
      </div>
      <br/>
    </Main>
    </React.Fragment>

  )
}

export default FooterBottom;

const Main=styled.div`
background-color:#ff8b3d;
font-family:Inter;
background:#ff8b3d;
display:flex;
justify-content:center;
width:1512px;
@media (min-width: 1170px) and (max-width: 1360px){
  width:1170px;
}
@media (min-width: 820px) and (max-width: 1199px){
  padding-left:50px;
}
@media (min-width: 200px) and (max-width:1169px)
  {
    width:100%;
    padding-right:50px;
  }
`
const Head=styled.span`
padding-left: 1vw;
 padding-right: 1vw;
@media (min-width: 200px) and (max-width: 1000px){
 display:flex;
  justify-content:center;
  margin-top:15px;
  padding-left: 0vw;
}
.lang{
  height:15px;
  width:15px;
  margin-bottom:2px;
  font-size:16px;
}
.innerdiv{
  color:#fff;
  margin-left:15px;
}
.rights{
  font-size:12px;
  margin-top:4px;
  color:#fff;
}
.copyright{
  display:flex;
  font-family:Inter;
  margin-left:10px;
  color:#fff;
  @media (min-width: 200px) and (max-width: 767px){
    display:inline;
   }
}
`
const Head2=styled.div`
.innerdiv2{
  font-size: 16px;
  margin-right:35px;
}
@media (min-width: 200px) and (max-width: 1000px){
 margin-bottom :15px;
}
p{
  color:#787373;
  font:Inter;
}
`

const Hr = styled.hr`
background-color:lightgray;
background:lightgray;

`