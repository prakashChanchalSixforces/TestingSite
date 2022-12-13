import React from 'react'
import styled from 'styled-components';
import Char1 from '../../../../assets/char1.png';
import Char2 from '../../../../assets/char2.png';
import Char3 from '../../../../assets/char3.png';
import Char4 from '../../../../assets/char4.png';

function SwiftbelExperince() {
    const data=[
        {

        title:'FRAUD PROTECTION',
        subTitle:'Save money',
        image:Char1,
        description:'Say goodbye to hidden charges and protect your move from fraud with our transparent pricing and comprehensive protection plan.​',
        class:'char1 mb-4'
        },
        {
        title:'FREE CANCELLATION',
        subTitle:'Flexibility',
        image:Char2,
        description:'You have the flexibility to cancel any reservation, at no charge, up to 24 hours before the booking.',
        class:'char2 mb-4'
        },
        {
        title:'SWIFTBEL GUARANTEE',
        subTitle:'Security',
        image:Char3,
        description:'Don’t stress. If there is a problem with your home service provider, we will help solve it and can reimburse damages up to $1,000.*​',
        class:'char3 mb-4'
        },
        {
        title:'LIVE TRACKING',
        subTitle:'Peace of mind',
        image:Char4,
        description:'With live-tracking, you can see your mover’s location, travel time, and work time with the push of a button.​',
        class:'char4 mb-4'
        }
        ]
    return (
        <React.Fragment>
           <Main>
            <Head>
            <Titlecontainer>
            <Title>Five - star experience at affordable prices!</Title>
          <SubHeader>Our friendly service providers are vetted professionals who go the distance to provide a 5-star experience. They'll do the impossible to help you make your home just right.
           We’re with you all the way!​</SubHeader>
          </Titlecontainer>
            <Cardscontainer>
                {
                    data?.map((item,index)=>
                    <Segment key={index}>
                        <Imagediv className={item?.class} >
                         <img src={item?.image} className='charimg'/>
                        </Imagediv>
                        <p className='cardtitle p-3'>{item.title}</p>
                        <p className='carddescription p-3'>{item.description}</p>
                 </Segment>
                    )
                }
            </Cardscontainer>
            </Head>
            </Main>
        </React.Fragment>
    )
}

export default SwiftbelExperince


const Main = styled.div`
display:flex;
justify-content:center;
`
const Head=styled.div`
width:1312px;
padding-top:64px;
padding-bottom:64px;
padding-right:20px;
display:flex;
padding-left:20px;
padding-right:20px;
@media (min-width: 200px) and (max-width: 1311px){
    width:100%;
    padding-left:20px;
}
@media (min-width: 200px) and (max-width: 1124px)
 {
 display:inline;
 width:100%
 padding-bottom:0px;
 }
`
const Cardscontainer = styled.div`
display:flex;
flex-wrap:wrap;
.char1{
    color:#EB873F;
    background: rgba(235, 135, 63, 0.08);
    }
    .char2{
    color:#957DBD;
    background: rgba(149, 125, 189, 0.08);
    }
    .char3{
    color:#D81159;
    background: rgba(216, 17, 89, 0.05);
    }
    .char4{
    color:#7DB164;
    background: rgba(125, 177, 100, 0.08);
    }
        .cardtitle{
            font-family:Roobert-medium;
            font-weight: 500;
            font-size: 24px;
            color: #190F0F;
            margin-top:-20px;
        }
        .carddescription{
            font-family: Inter;
            font-weight: 400;
            font-size: 14px;
            color: #787373;
            margin-top:-40px;
        }
`
const Titlecontainer = styled.div`
width: 766px;
margin-right:30px;
@media (min-width: 200px) and (max-width: 1000px)
 {
 width:100%
 }
`
const Imagediv = styled.div`
display:flex;
justify-content:center;
width: 100%;
height: 128px;
border-radius:13px 13px 0px 0px;
.charimg{
width: 88px;
height: 88px;
margin-top:20px;
}
@media (min-width: 1000px) and (max-width: 1288px){
    width: 322px;
}
`

const Segment = styled.div`
border-radius:13px;
background:white;
background-color:white;
margin-bottom:15px;
margin-right:16px;
width: 412px;
padding:0px;
@media (min-width: 200px) and (max-width: 1000px)
 {
    margin-left:20px;
    margin-right:20px;
 }
@media (min-width: 1050px) and (max-width: 1288px){
    width: 322px;
}
`
const Title = styled.h2`
color:black;
font-family:Roobert-medium;
margin-bottom:2rem;
`
const SubHeader = styled.p`
color:#787373;
font-size:16px;
font-family:Inter;
margin-bottom:2rem;
`

