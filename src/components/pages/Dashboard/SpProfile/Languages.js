import React from 'react'
import styled from 'styled-components'

function Languages(props) {
   const { data } = props
   console.log(data, "data")
   return (
      <React.Fragment>
         <Heading>Languages</Heading>
         <div className='d-flex mt-4'>
            {
               data?.map((item,index) =>
                  <Lang key={index}>
                     {item}
                  </Lang>
               )
            }
         </div>
      </React.Fragment>
   )
}
export default Languages

const Lang = styled.div`
width: 112px;
height: 45px;
border:2px solid #D0CECE;
margin-right:10px;
text-align:center;
padding-top:10px;
font-size: 14px;
font-family:Inter;
border-radius: 8px;
`
const Heading = styled.h1`
font-family:Roobert-medium;
font-size: 24px;
margin-bottom:5px;
`