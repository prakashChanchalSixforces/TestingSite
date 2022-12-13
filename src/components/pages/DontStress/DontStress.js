import React from 'react'
import styled from 'styled-components'
import Info from '../../../assets/pinkhelp.png';
import  Umbrella from '../../../assets/pinkumbrella.png'
function DontStress(props){
return(
    <React.Fragment>
        <Container>
<Segment style={props?.container}>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Img src={Info}/>
Free cancellations up to 24 hours before the booking starts
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</Segment>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Segment onClick={()=>{window.open('https://www.swiftbel.com/help/money-back-guarantee')}} style={{cursor:'pointer'}}>&nbsp;&nbsp;
<Img src ={Umbrella}/><span className='guarantee'>SwiftBel $1,000 Guarantee <span className='subguarantee'>included</span></span>&nbsp;&nbsp;
</Segment>
</Container>
    </React.Fragment>
)
}
export default DontStress

const Segment=styled.div`
font-size:16px;
font-family: 'Inter';
.guarantee{
font-weight:600;
}
.subguarantee{
font-weight:400;
}
display:flex;
justify-content:center;
padding: 8px;
border-radius: 8px;
border:2px solid #787373;
@media (min-width: 260px) and (max-width: 820px){
    align-items:center;
    font-size: 12px;
    display:none;
}
`
const Container = styled.div`
display:flex;
justify-content:center;
`
const Img=styled.img`
height:20px;
width:20px;
margin-right:10px;
margin-top:2px;
`