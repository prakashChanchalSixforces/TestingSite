import React from 'react'
import styled from 'styled-components'
import HeaderTop from '../../layouts/headerTop'
import pinkheart from '../../../assets/pinkheart.png'
import Share from '../../../assets/share.png'
import ShareProfile from '../UserHomepage/components/ShareProfile';
import { Container,Row,Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedjobs } from '../../../store/Actions/Dashboard.actions'
import { useState } from 'react';
import MainFooter from '../MainFooter/MainFooter'
function SavedJobs(){
    const [share, setShare] = useState(false)
    const [data, setData] = useState('')
    let dispatch = useDispatch()
    const init = async () => {
        await  dispatch(getSavedjobs())
    }

    useEffect(() => {
        init();
    }, [])
    const viewprofileclick = (uniqueUrl) => {
        window.open(`/business/${uniqueUrl}`, { state: { uniqueUrl: uniqueUrl, customer: true } })
    }
    const saved = useSelector(state => state?.customerReducer?.savedjobs);
return(
    <React.Fragment>
 <HeaderTop/>
    <Main>
    <Heading>Saved Jobs</Heading>
    <div className='d-flex' style={{flexWrap: 'wrap'}}>
        {saved?.length>0?
        saved?.map((item,index)=>
    <Profile key={index}>
                <Segment >
                    <ProfileBanner sm={5} >
                        <Coverpic style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} src={item?.bannerImage} onClick={() => viewprofileclick(item?.uniqueUrl)}/>
                        <Profilepic src={item?.logoImage} onClick={() => viewprofileclick(item?.uniqueUrl)}/>
                        <Fav variant='light'><img alt='' src={pinkheart} className='heart' /></Fav>
                        <ShareButton variant='light' onClick={() => {
                            setShare(true)
                            setData(item)
                        }}><img alt='' src={Share} className='heart' /></ShareButton>

                    </ProfileBanner>
                    <Content>
                        <div className='d-flex justify-content-between'>
                            <Businessline>{item?.businessName}</Businessline>
                            <ViewProfile onClick={() => viewprofileclick(item?.uniqueUrl)} >View profile</ViewProfile>
                        </div>
                        <Subtitle className='d-flex '>
                            <div className='description'>
                                <p className='d-flex text '><p className='num'>{item?.rating||"0"}</p>&nbsp; Rating</p>
                            </div>
                            <div className='description'>
                                <p className='d-flex text'><p className='num'>{item?.moves||"0"}</p>&nbsp;Moves</p>
                            </div>
                            <div className='description'>
                                <p className='d-flex text'><p className='num'>{item?.review?.length||"0"}</p>&nbsp; Reviews</p>
                            </div>
                        </Subtitle>
                    </Content>
            </Segment>
            </Profile>
        )
    :'No saved jobs'}

    </div>
    </Main>
    <div style={{position: saved?.length>3?'':'absolute',bottom: 0,width: '100%', height: '90px'}}>
    <MainFooter/>
   </div>
   <ShareProfile
                show={share}
                data={data}
                onHide={() => setShare(false)}
            />
    </React.Fragment>
)
}
export default SavedJobs

const Heading = styled.p`
font-family:Roobert-medium;
font-size: 36px;
width:200px;
.nobook{
font-size: 22px;
}
`
const Main = styled.div`
padding-left:3rem;
padding-right:3rem;
padding-top:3rem;
@media (min-width: 1800px) and (max-width: 2500px)
{
    padding-left:250px;
    padding-right:250px;
}
@media (min-width: 2501px) and (max-width:3000px)
{
    padding-left:350px;
    padding-right:350px;
}
@media (min-width: 3001px) and (max-width:4000px)
{
    padding-left:650px;
    padding-right:650px;
}
@media (min-width: 4001px) and (max-width:9999px)
{
    padding-left:1350px;
    padding-right:1350px;
}
@media (min-width: 260px) and (max-width:767px)
{
    padding-left:1rem;
    padding-right:1rem;
}
`
const ProfileBanner = styled.div`
display:flex;
margin-bottom:35px;

`

const Subtitle = styled.div`
font-size: 14px;
font:Inter;
margin-bottom:-15px;
@media (min-width: 200px) and (max-width:970px)
{
font-size: 14px;
}
.num{
color:black;
font-weight: 400;
}
.text{
color:#787373;
font-weight: 400;
font-size: 16px;
}
.description{
    margin-right:15px;
}
`
const Profile = styled(Container)`
display:flex;
width:442px;
border: 1px solid #F3F3F3;
border-radius:12px;
background-color:#FFFFFF;
padding-top:0px;
padding-left:0px;
padding-bottom:0px;
margin-bottom:30px;
padding-right:0px;
@media (min-width: 1110px) and (max-width: 1380px){
    width:430px;
    }
@media (min-width: 100px) and (max-width: 1000px){
.desk{
    display:none;
    }
    .mob{
    display:flex;
    justify-content:center;
    }
}
@media (min-width: 1001px) and (max-width: 10000px){
    .mob{
    display:none;
    }
    .desk{
    display:inline;
    }
    }
    @media (min-width: 260px) and (max-width: 767px){
     width:440px;
margin-bottom:0px;
padding-top:0px;
padding-left:0px;
padding-bottom:0px;
margin-bottom:30px;
padding-right:0px;
        }



`

const ViewProfile = styled.p`
color:#190F0F;
text-align:center;
cursor:pointer;
font-family:Roobert-medium;
font-weight: 500;
font-size: 14px;
letter-spacing: 0.02em;
margin-right:30px;

`
const Segment = styled(Row)`
@media (min-width: 260px) and (max-width: 767px){
    padding:0px;
    border-outline:none;

    }
`
const Content = styled.div`
margin-right:20px;
margin-left:20px;
`

const Businessline = styled.h2`
font-weight: 600;
font-size: 24px;
font-family:Roobert-medium;
line-height: 100%;
letter-spacing: 0.02em;
@media (min-width: 260px) and (max-width: 767px){
   text-align:center;
            }
`
const Coverpic = styled.img`
cursor:pointer;
width:100%;
object-fit:cover;
height:120px;
`
const Profilepic = styled.img`
position:absolute;
margin-top:70px;
cursor:pointer;
margin-bottom:60px;
border-radius:100px;
margin-left:10px;
width:72px;
height:72px;
border:5px solid white;
`

const Fav = styled(Button)`
position:absolute;
margin-left:330px;
margin-top:10px;
border: 1px solid #F3F3F3;
border-radius: 8px;
width: 40px;
height: 40px;
background: #FFFFFF;
display:flex;
justify-content:center;
.heart{
padding-top:5px;
}
@media (min-width: 260px) and (max-width: 767px){
    margin-left:245px;
}
@media (min-width: 1110px) and (max-width: 1380px){
    margin-left:300px;
}
`
const ShareButton = styled(Button)`
position:absolute;
margin-left:380px;
margin-top:10px;
border: 1px solid #F3F3F3;
border-radius: 8px;
width: 40px;
height: 40px;
background: #FFFFFF;
display:flex;
justify-content:center;
.dots{
padding-top:10px;
}
@media (min-width: 260px) and (max-width: 767px){
    margin-left:295px;
}
@media (min-width: 1110px) and (max-width: 1380px){
    margin-left:350px;
}
`


