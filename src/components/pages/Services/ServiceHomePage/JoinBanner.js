import React from 'react'
import MoveBanner from '../../../../assets/MB.png'
import JoinSP from '../../../../assets/JoinSP.png'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import {useNavigate } from 'react-router-dom'

function JoinBanner(){
let navigate=useNavigate();
const handlejoinas=()=>{
navigate('/business')
}

return(
<>
<Banner>
<Heading>Join as Service Provider</Heading>
<Description>With you every step of the way, our friendly movers <br />
are vetted professionals who go the distance to provide a 5-star experience. </Description>
<Joinnow variant='light' size='md' onClick={()=>handlejoinas()}>
{"Join now"}
</Joinnow>
</Banner>
</>
)
}

export default JoinBanner

const Banner = styled.div`
background-image:url(${MoveBanner});
background-size: cover;
background-repeat:no-repeat;
padding-left:100px;
padding-right:100px;
padding-top:30px;
padding-bottom:50px;
border-radius: 12px;
@media (min-width: 200px) and (max-width: 1000px)
{
background-image:url(${JoinSP});
width: 92%;
height:100%
background-size: 100%;
padding-left:16px;
padding-right:16px;
margin-left:16px;
margin-right:16px;
padding-bottom:30px;
}
`
const Heading = styled.p`
font-family:Roobert-medium;
font-size: 32px;
text-align: start;
color: #FFFFFF;
font-weight: 500;
@media (min-width: 200px) and (max-width: 1000px)
{
font-size: 24px;
}
`
const Description = styled.p`
font-family:Inter;
font-weight: 400;
font-size: 16px;
color: #F3F3F3;
text-align:start;
@media (min-width: 200px) and (max-width: 1000px)
{
font-size: 12px;
}
`
const Joinnow=styled(Button)`
width: 172px;
height: 44px;
color:black;
background: #FFFFFF;
border-radius: 8px;
font-family:Roobert-medium;
font-weight: 500;
font-size: 14px;
color: #190F0F;
margin-top:22px;
`