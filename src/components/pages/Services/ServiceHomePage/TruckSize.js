import React from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

function TruckSize(){
const trucktypes=[
{title:'1 Mover with a truck - $95 per hour'},
{title:'2 movers with 3 Ton truck - $129 per hour'},
{title:'3 movers with 5 ton truck - $169 per hour',recommended:true},
{title:'4 movers with 5 ton truck - $210 per hour'}
]
return(
<>
<Radios key='radio' className="mb-3">
        {trucktypes?.map((item)=>{
        return(
            <Form.Check
            className='rads'
            reverse
            label={`${item.title}${item?.recommended===true? ' (Recommended) ':''}`}
            type='radio'
          />
        )
        })}
        </Radios>
</>
)
}

export default TruckSize

const Radios=styled.div`
color:#787373;
display:flex ;
flex-wrap:wrap;
.rads{
margin-right:20px;
}
input[type='radio']:checked{
    background-color: #D81159;
    border: 2px solid #D81159;
    box-shadow: 0 0 1px 1px #D81159;
  }
`