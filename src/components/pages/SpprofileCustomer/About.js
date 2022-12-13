import React from 'react'
import styled from 'styled-components'
import Map from '../../layouts/googlemap/profileMap';
function About(props){
    const {data}=props
    return(
        <React.Fragment>
        <Segment>
               <Heading>About</Heading>
       <Flexdiv className='mt-4'>
        <Flexdiv>
         <Details>
         <div>
          <h1 className='head'>Founded</h1>
           <p className='text'>{data?.foundedIn||"__"}</p>
          </div>
          <div>
          <h1 className='head'>Company size</h1>
           <p className='text'>{data?.companySize||"__"}</p>
          </div>
         </Details>
        </Flexdiv>
        <div className='mr-3'>
        <h1 className='head'>About Us</h1>
        <p className='text'>{
            data?.aboutUs||"__"
        }
           </p>
        </div>
       </Flexdiv>
       <hr/>
       <Heading >Area served</Heading>
       <br/>
       <MapContainer
    >
       <Map
        google={props.google}
        center={{ lat: data?.location?.lat||0, lng:data?.location?.lng||0}}
        zoom={11}
        Circle={true}
       />
       </MapContainer>
       <br/>
       {/* </Flexdiv> */}

        </Segment>
        </React.Fragment>
    )
}
export default About

const Heading = styled.h1`
font-family:Roobert-medium;
font-size: 24px;
margin-bottom:5px;
`
const Details=styled.div`
margin-right:80px;
width:130px;
`
const Flexdiv=styled.div`
display:flex;
@media (min-width: 200px) and (max-width:970px)
{
display:inline;
}
`

const Segment=styled.div`
.head{
font-size: 18px;
font-family:Roobert-medium;
}
.text{
font:Inter;
font-size: 16px;
color: #787373;
@media (min-width: 200px) and (max-width:970px)
{
 .head{
    font-size: 12px;
    }
}
}
`

const MapContainer=styled.div`
border-radius: 8px;
overflow:hidden;
-moz-border-radius: 8px;
-webkit-border-radius:  8px;
`