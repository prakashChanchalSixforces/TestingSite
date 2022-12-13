import React from 'react'
import { Row, Button } from 'react-bootstrap'
import styled from 'styled-components'

function Posts(props) {
  const { post,yelpPhotos } = props

  console.log(post,yelpPhotos,"photos")
  return (
    <React.Fragment>
      <Heading>Posts</Heading>
      <Row sm={3} lg={3} xl={3}>
      {
          yelpPhotos?.photos?.map((item,index) =>
            <Image key={index} src={item} />
          )
        }
        {
          post?.map((item,index) =>
            <Image key={index} src={item.photos?.[0]} />
          )
        }
      </Row>
      <More variant='dark'>More</More>
    </React.Fragment>
  )
}
export default Posts

const Heading = styled.h1`
font-family:Roobert-medium;
font-size: 24px;
`
const Image = styled.img`
width: 255px;
height: 224px;
padding:10px;
border-radius: 15px;
@media (min-width: 200px) and (max-width:970px)
{
width: 125px;
height: 114px;
} 
`
const More = styled(Button)`
width: 205px;
height: 44px;
border-radius: 8px;
font-family:Roobert-medium;
font-size: 14px;
margin-top:10px;
`