import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
function WorkWithSwiftbel(props) {
    const data=[
        {
        head:"Studio / Small stuff",
        title:'$95',
        subTitle:'Save money',
        first:'1 Moving Expert',
        second:'2 Ton Moving Truck',
        third:'Fully Equipped'
        },
        {
            head:"1 to 2 Bedroom Home (Most Purchased)",
        title:'$129',
        subTitle:'Flexibility',
        first:'2 Moving Experts',
        second:'3 Ton Moving Truck',
        third:'Fully Equipped'
        },
        {
            head:"3+ Bedroom Home",
        title:'$169',
        subTitle:'Peace of mind',
        first:'3 Moving Experts',
        second:'5 Ton Moving Truck',
        third:'Fully Equipped'
        }
        ]
    return (
        <React.Fragment >
            <>

            <div >
          <Title>Flexible and Predictable Pricing</Title>
          <SubHeader>{'Simple, flexible, and predictable pricing. Choose which package is suited for you.'}</SubHeader>
        </div>
         <Main  id='Pricing'>           
            <Head>
            <Segment  className={' p-3'}>
                        <h2 style={{textAlign:'center'}}>{"Studio / Small stuff"}</h2>
                   <p  className='title'>{"$95"}</p>
                   <br/>
                   <div >
                   <br/>
                   <p className='review'>{"per hour"}</p>
                   <br/>
                   <p className='review'>{"1 Moving Expert"}</p>
                <hr/>
                <br/>
                <p className='review'>{"2 Ton Moving Truck"}</p>
               
                <hr/>
                <br/>
                <p className='review'>{"Fully Equipped"}</p>
                <hr/>
                <br/>
                <div className='d-flex justify-content-center'>
                <Actions 
    
    variant='light' >

    Get started
</Actions>
</div>
                </div>
                 </Segment>
                 <Segments  className={' p-3'}>
                        <h2 style={{textAlign:'center'}}>1 to 2 Bedroom Home <br/> (Most Purchased)</h2>
                   <p  className='title'>{"$129"}</p>
                   <br/>
                   <div >
                   <br/>
                   <p className='review'>{"per hour"}</p>
                   <br/>
                   <p className='review'>{"2 Moving Experts"}</p>
                <hr/>
                <br/>
                <p className='review'>{"3 Ton Moving Truck"}</p>
               
                <hr/>
                <br/>
                <p className='review'>{"Fully Equipped"}</p>
                <hr/>
                <br/>
                <div className='d-flex justify-content-center'>
                <Actions 
    
    variant='light' >

    Get started
</Actions>
</div>
                </div>
                 </Segments>
                 <Segment  className={' p-3'}>
                        <h2 style={{textAlign:'center'}}>{"3+ Bedroom Home"}</h2>
                   <p  className='title'>{"$169"}</p>
                   <br/>
                   <div >
                   <br/>
                   <p className='review'>{"per hour"}</p>
                   <br/>
                   <p className='review'>{"3 Moving Experts"}</p>
                <hr/>
                <br/>
                <p className='review'>{"5 Ton Moving Truck"}</p>
               
                <hr/>
                <br/>
                <p className='review'>{"Fully Equipped"}</p>
                <hr/>
                <br/>
                <div className='d-flex justify-content-center'>
                <Actions 
    
    variant='light' >

    Get started
</Actions>
</div>
                </div>
                 </Segment>
            </Head>
         </Main>
         </>
        </React.Fragment>
    )
}

export default WorkWithSwiftbel

const Main = styled.div`
display:flex;
justify-content:center;
margin-top:64px;
margin-bottom:64px;
`
const Title = styled.h2`
font-family:Roobert-medium;
margin-bottom:1rem;
text-align:center;
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
text-align:center;
font-weight: 500;
@media (min-width: 200px) and (max-width: 1145px)
 {
padding-left:20px;
padding-right:20px;
 }
`
const Actions = styled(Button)`
align-self:center;
height: 48px;
border-radius: 8px;
background-color:#fff;
border:1px solid #000;
font-size: 16px;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 820px){
    display:none;
 }
`
const Head=styled.div`
width:1070px;
background:white;
display:flex;
justify-content:space-between;
border-radius:8px;
padding-left:20px;
padding-right:20px;
filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
border-radius:12px;
@media (min-width: 260px) and (max-width: 820px){
    display: inline;
    justify-content:center;
    grid-auto-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    margin-left:20px;
    margin-right:20px;
    width:100%;
}
.borderRight{
    border-right:1px solid #787373;
}
`

const Segment = styled.div`
background:white;
background-color:white;

.title{
    margin-top:10px;
    margin-bottom:-25px;
    font-family:Roobert-medium;
    font-size: 44px;
    font-weight: 500;
    text-align:center;
    color: #787373;
}

.review{
    font-size: 16px;
font-family: 'Inter';
font-weight: 400;
color: #787373;
margin-top:-20px;
text-align:center;
}
`

const Segments = styled.div`
background:white;
background-color:white;
filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
padding-top:60px;
.title{
    margin-top:10px;
    margin-bottom:-25px;
    font-family:Roobert-medium;
    font-size: 44px;
    font-weight: 500;
    text-align:center;
    color: #787373;
}

.review{
    font-size: 16px;
font-family: 'Inter';
font-weight: 400;
color: #787373;
margin-top:-20px;
text-align:center;
}
`
