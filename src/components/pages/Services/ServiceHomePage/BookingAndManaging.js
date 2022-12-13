import React from 'react'
import styled from 'styled-components'
import moveStep1 from '../../../../assets/moveStep1.png'
import moveStep2 from '../../../../assets/moveStep2.png'
import moveStep3 from '../../../../assets/moveStep3.png'

function BookingAndManaging(props) {
  return (
    <React.Fragment>
      <Main>
        <Head>
      <Segment>
        <div >
          <Title>Four Easy Steps:</Title>
         
        </div>
        <br/>
        <Stepstyle >
        <div style={{width:'300px',marginRight:'25px'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:'55px',height:'55px',borderRadius:'55px',backgroundColor:'blue',display:'flex',justifyContent:'center',color:'#fff',alignItems:'center'}}>
              1
            </div>
            </div>
     
            <StepHeader className='mb-2' >{"Select Required Services"} </StepHeader>
            <StepSubText>
            {props?.type==="moving"?
            `Enter your pickup location and destination, select the vehicle that is right for you, and choose a day/time. It's that easy!`
            :`Choose the home service you want, enter your location, then choose a day & time. It's that easy!`
            }
            </StepSubText>
          </div>
          <div style={{width:'300px',marginRight:'25px'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:'55px',height:'55px',borderRadius:'55px',backgroundColor:'blue',display:'flex',justifyContent:'center',color:'#fff',alignItems:'center'}}>
              2
            </div>
            </div>
           
            <StepHeader className='mb-2' >Call the Care Full team </StepHeader>
            <StepSubText>
            {props?.type==="moving"?
            "Movers will arrive with the right equipment to load your stuff and secure it safely. We'll see you at the destination!":
            'our chosen service provider will meet you at your location, then get the job done the way you want.  No surprises on the bill.'
            }
            </StepSubText>
          </div>
          <div style={{width:'300px',marginRight:'25px'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:'55px',height:'55px',borderRadius:'55px',backgroundColor:'blue',display:'flex',justifyContent:'center',color:'#fff',alignItems:'center'}}>
              3
            </div>
            </div>

            <StepHeader className='mb-2' >Book Your Move </StepHeader>
            <StepSubText>
            {props?.type==="moving"?
            `We unload your items and place them right where you want them. Pay with your card, then review your experience. We'll see you next time!`
            :`Check the bill to confirm the charges. Pay with your card, then rate your service provider. They want you to be happy!​`
            }
            </StepSubText>
          </div>
          <div style={{width:'300px',marginRight:'25px'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:'55px',height:'55px',borderRadius:'55px',backgroundColor:'blue',display:'flex',justifyContent:'center',color:'#fff',alignItems:'center'}}>
              4
            </div>
            </div>

            <StepHeader className='mb-2' >Sit Back and Relax </StepHeader>
            <StepSubText>
            {props?.type==="moving"?
            `We unload your items and place them right where you want them. Pay with your card, then review your experience. We'll see you next time!`
            :`Check the bill to confirm the charges. Pay with your card, then rate your service provider. They want you to be happy!​`
            }
            </StepSubText>
          </div>
        </Stepstyle>
        <br />
      </Segment>
      </Head>
      </Main>
    </React.Fragment>
  )
}
export default BookingAndManaging;
const Main = styled.div`
display:flex;
justify-content:center;
@media (min-width: 260px) and (max-width: 1311px){
margin-left:10px;
margin-right:10px;
}
`
const Head=styled.div`
width:1112px;
padding-top:64px;
padding-bottom:64px;
padding-left:20px;
padding-right:40px;
@media (min-width: 260px) and (max-width: 1311px){
width:100%;
padding-top:24px;
padding-bottom:24px;

}
`

const Segment = styled.div`
@media (min-width: 260px) and (max-width: 820px){
padding-left:25px;
padding-right:25px;
}
@media (min-width: 360px) and (max-width: 1145px)
{
    padding:0rem;
    margin-top:30px;
}
`
const Title = styled.h2`
font-family:Roobert-medium;
margin-bottom:1rem;
font-size:44px;
font-weight: 500;
@media (min-width: 200px) and (max-width: 1145px)
 {
padding-left:20px;
padding-right:20px;

 }
`
const SubHeader = styled.p`
color:#787373;
font-size:16px;
font-family:Inter;
margin-bottom:1rem;
font-weight: 500;
@media (min-width: 200px) and (max-width: 1145px)
 {
padding-left:20px;
padding-right:20px;
 }
`
const Stepstyle = styled.div`
display:flex;
justify-content:space-between;
.mob-step-image{
  display:none;
}
.step-image{
  width:304px;
  height:304px;
  border-radius:50px;
}
@media (min-width: 360px) and (max-width: 1145px)
 {
  display: inline;
  .step-image{
    display:none
  }
  .mob-step-image{
    display:flex;
    width:101%;
    padding-left:1rem;
    padding-right:1rem;
  }
 }
`
const StepHeader = styled.h5`
font-family:Roobert-medium;
text-align:center;
@media (min-width: 1145px) and (max-width: 6000px)
{
  
    font-weight:500;
    margin-bottom:35px;
    margin-left:0px;
    font-size:23px;

}
`
const StepSubText = styled.p`
color:#787373;
font-weight: 400;
font-family:Inter;
text-align:center;
@media (min-width: 1145px) and (max-width: 6000px)
{
    margin-left:0px;
    font-size:17px;
}
`