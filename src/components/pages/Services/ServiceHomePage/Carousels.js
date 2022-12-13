import React from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import proppic from '../../../../assets/profile-pic.png'
import Yelp from '../../../../assets/yelp.png'
import Rating from '../../../../assets/rating.png'
import JoinBanner from './JoinBanner';

const review = [
  {
    name: 'Barry M',
    review: "We had to move the contents of my mother-in-law's home after her passing. She was located in a rural area on Vancouver Island. Erick and Victor were..."
  },
  {
    name: "Alison Rasberry",
    review: "I had a very very positive experience with Lions Gate Moving last weekend. After many bad movers experiences before that in my life. This was the best by far. I was moving within the city from a one-bedroom sunken basement suite to an apartment building and was given a very reasonable quote of three movers (so it would be fast and efficient)."
  },
  {
    name: "Brittany Barker",
    review: "Collected a bunch of quotes from different moving companies and went with Scott and Steven @Lions Gate Moving because of the initial conversation and reasonable quote. Friendly, communicative, small moving business. Showed up on time, with all the supplies and moved all my stuff without incident or damage!"
  },
  {
    name: "Michelle Chand",
    review: " I used this moving company in late december with a lot snow on the ground. Alice accommodated my move after I required a few changes just few days before the move date. The movers were friendly, efficient, professional and worked great as a team 👏 I would highly recommend this company to anyone requiring moving services.date=8 October"
  },
  {
    name: "Agnes Kot",
    review: " I cannot say enough about how hardworking and positive the crew were when moving me. I was really having a stressful time with having to downsize and move after many years at my previous home. From the moment they came through the door the members of the crew reassured me and told me not to worry and that they were there to take care of me. They took very good care of me and of my mountain of belongings."
  },

]
function CrousalPage() {
  var settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1
        }
      }
    ]
  };
  return (
    <React.Fragment>
      <Main>
        <Head>
      <Mainset>
        <ReviewTitle>Customer feedback</ReviewTitle>
        <Carousels infinite focusOnSelect initialSlide={true} {...settings}>
          {
            review.map((item) =>
              <div>
                <Segment className='p-3'>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                      <Image src={proppic} />
                      <div>
                        <p className='name'>{item.name}</p>
                        <p className='nickname'>{"22nd October 2022"}</p>
                      </div>
                    </div>
                    <div className='d-flex'>
                    <Yelpimg src={Yelp}/>
                    <p className='d-flex'><Ratingimg src={Rating}  />{item?.rating || "5"}</p>
                    </div>
                  </div>
                  <h3 className='review'>{item.review}</h3>
                </Segment>
              </div>
            )
          }
        </Carousels>
        <br />
        <br />
        <br />
        <br />
        <JoinBanner/>
      </Mainset>
      </Head>
      </Main>
    </React.Fragment>
  )
}
export default CrousalPage;
const Main = styled.div`
display:flex;
justify-content:center;
background:white;
@media (min-width: 260px) and (max-width: 1311px){
  margin-left:10px;
  margin-right:10px;
  }
`
const Head=styled.div`
width:1312px;
padding-top:64px;
padding-bottom:64px;
background:white;
padding-left:20px;
padding-right:20px;
@media (min-width: 260px) and (max-width: 1311px){
width:100%;
padding-top:10px;
padding-left:0px;
padding-right:0px;
}
`
const Carousels = styled(Slider)`
.slick-center .slide-h3{
  color: #FFF;
}
.slider{
  width: 600px;
  height:150px;
  margin: 20px auto;
  text-align: center;
}
.slide-h3{
  margin: 10% 0 10% 0;
  padding: 40% 20%;
  background: #F3F3F3;
}
.slider div{
  margin-right: 5px;
}
.slick-slide{
  opacity: .6;
}
.slick-center{
  display: block;
  max-width: 10% !important;
  max-height:20% !important;
  opacity: 1;
}
.slick-dots li button:before {
  color:  #D81159;
}
`
const Mainset = styled.div`
margin-top:-28px;
padding-bottom:30px;
@media (min-width: 260px) and (max-width: 820px){
padding-left:25px;
padding-right:25px;
}
@media (min-width: 360px) and (max-width: 1145px)
{
    background-color: white;
    padding:0rem;
    margin-top:30px;
}
`
const ReviewTitle = styled.h2`
color:black;
font-family:Roobert-medium;
margin-bottom:2rem;
padding-top:20px;
@media (min-width: 200px) and (max-width: 1145px)
 {
    margin-left:20px;
 }
`
const Segment = styled.div`
border-radius:13px;
width:488px;
background:white;
background-color:white;
margin-left:-250px;
.name{
font-family:Roobert-medium;
font-size: 18px;
}
.nickname{
font-size: 14px;
font-family:Roobert-medium;
color: #787373;
margin-top:-15px;
}
.review{
font-size: 16px;
color: #787373;
font-family:Inter;
}
.quotation{
    height:36px;
    width:36px;
}
@media (min-width: 260px) and (max-width: 820px){
  width:350px;
    margin-left:0px;
}
`
const Image = styled.img`
border-radius:50%;
height:48px;
width:48px;
margin-right:10px;
`
const Yelpimg = styled.img`
height:24px;
margin-left:10px;
`
const Ratingimg=styled.img`
height:20px;
width:20px;
margin-right:4px;
margin-left:7px;
`