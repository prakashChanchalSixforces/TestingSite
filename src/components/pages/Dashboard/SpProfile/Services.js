import React from 'react'
import { Row } from 'react-bootstrap'
import styled from 'styled-components'
function Services(props) {
    const { service } = props
    return (
        <React.Fragment>
            <Heading>Services</Heading>
            <Row sm={3} lg={6} xl={6} >
            {
                service?.map((item,index) =>
                <Image key={index} src={item?.url} />
                )
            }
            </Row>
        </React.Fragment>
    )
}
export default Services

const Heading = styled.h1`
font-family:Roobert-medium;
font-size: 24px;
`

const Image = styled.img`
width: 150px;
height: 182.01px;
border-radius: 8px;
padding:7px;
@media (min-width: 200px) and (max-width:970px)
{
width:100px;
height:122px;
}
`