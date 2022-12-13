import React from 'react'
import styled from 'styled-components'
import proppic from '../../../assets/profile-pic.png'
import pinkstar from '../../../assets/pinkstar.png'
import homeicon from '../../../assets/homeicon.png';
import Yelp from '../../../assets/yelp.png'
import { Row } from 'react-bootstrap'
import moment from 'moment'
import { useState } from 'react'

function Reviews(props) {
   const [x,setX]=useState(2);
   const [showall,setShowall]=useState(false)
   const [showalltext,setShowalltext]=useState(false)
   const [numeric,setNumeric]=useState(false)

   const { review,ratings } = props
   console.log(review,"review")
   let shortreview = review?.reviews?.slice(0,x)
   const handleshowmore=()=>{
      if(showall===false){
      setShowall(true)
      setX(review?.reviews?.length)
      }
      else{
      setShowall(false)
      setX(2)
      }
   }
   const handletextshowmore=(i)=>{
   setNumeric(i)
   setShowalltext(true)
   }
   console.log(shortreview,'shortreview')
   return (
      <React.Fragment>
                        <Heading>Reviews</Heading>
                        <br/>
                        <div className='d-flex'>
                        <Star style={{width:40,height:18}} src={Yelp} className='mt-1' />
                        {new Array(ratings ?Math.floor(ratings):0)?.fill("")?.map(()=>
                         <Star src={pinkstar} className='mt-1' />
                        )}
                           <p className='rating '>({review?.total||"0"} reviews)</p>
                        </div>
                        <br/>
         <Row>

            {
               review?.reviews?.length > 0 ?
               shortreview?.map((item, index) =>
                  <Segment key={index} className='p-3'>
                     <div className='d-flex justify-content-between'>

                        <div className='d-flex'>
                           <Image src={item?.user?.image_url||proppic} />
                           <div>
                              <p className='name'>{item?.user?.name || "__"}</p>
                              <p className='date'>{moment(item?.time_created).format("DD/MM/YYYY")}</p>
                           </div>
                        </div>
                        <div className='d-flex'>
                           <Star src={pinkstar} className='mt-1' />
                           <p className='rating '>{item?.rating}</p>
                        </div>
                     </div>
                     {showalltext===true &&item?.text?.length>300 && index===numeric ? <p className='description'>{item?.text}</p>
                     :
                     item?.text?.length>300 ?
                     <p className='description'>{item?.text.slice(0,300)}<p className='showmoretext' onClick={()=>handletextshowmore(index)}>show more</p></p>
                     :
                     <p className='description'>{item?.text}</p>
                     }
                  </Segment>
               )
               :<p className='ml-3'>No Reviews</p>
            }

         </Row>
         {review?.reviews?.length > 2 ?
         <Showmore onClick={()=>handleshowmore()}>
          {showall===false?'Show more':'Show less'}
         </Showmore>
         :''}
      </React.Fragment>
   )
}
export default Reviews
const Segment = styled.div`
border-radius:13px;
width:432px;
background:white;
background-color:white;
margin-right:15px;
margin-bottom:15px;
.name{
font-family:Roobert-medium;
font-size: 18px;
}
.date{
font-size: 14px;
font-family:Roobert-medium;
color: #787373;
margin-top:-15px;
}
.rating{
color:#D81159;
}
.description{
font-size: 16px;
color: #787373;
}
.showmoretext{
color:#D81159;
cursor:pointer;
}
`
const Showmore=styled.div`
width: 192px;
height: 44px;
border: 1px solid #D0CECE;
font-size: 14px;
font-family:Roobert-medium;
border-radius: 8px;
text-align:center;
padding-top:12px;
margin-bottom:30px;
cursor:pointer;
`
const Heading = styled.h1`
font-family:Roobert-medium;
font-size: 24px;
margin-bottom:5px;
`
const Image = styled.img`
border-radius:50%;
height:48px;
width:48px;
margin-right:10px;
`
const Star = styled.img`
height:15px;
width:15px;
margin-right:5px;
`