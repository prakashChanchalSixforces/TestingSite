import React from 'react'
import styled from 'styled-components'
import { Container, Row } from 'react-bootstrap'
import './styles.css'
function NewCardShimmer() {

    const saved = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <React.Fragment>
                    {
                        saved?.map((item, index) =>

                            <Profile key={index}>

                                <Segment >

                                    <ProfileBanner sm={5} >
                                            <Coverpic className='box' style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
                                            <Profilepic className='box' />
                                    </ProfileBanner>
                                    <Content>
                                        <div className='d-flex justify-content-between'>
                                                <BusinessName className='box' />
                                                <ViewProfile className='box'/>
                                        </div>
                                            <Like className='box'/>
                                            <StartingPrice className='box'/>
                                            <div className='d-flex'>
                                            <Buttons className='box'/>
                                            <Buttons className='box'/>
                                            </div>
                                    </Content>
                                </Segment>
                            </Profile>

                        )
                    }
        </React.Fragment>
    )
}
export default NewCardShimmer;


const ProfileBanner = styled.div`
width:100%;
display:flex;
margin-bottom:35px;

`
const Profile = styled(Container)`
display:flex;
width:637px;
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
     width:380px;
margin-bottom:0px;
padding-top:0px;
padding-left:0px;
padding-bottom:0px;
margin-bottom:30px;
padding-right:0px;
        }



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
const Coverpic = styled.div`
cursor:pointer;
width:637px;
object-fit:cover;
height:105px;
    @media (min-width: 260px) and (max-width: 767px){
        width:375px;
   margin-bottom:0px;
   padding-top:0px;
   padding-left:0px;
   padding-bottom:0px;
   margin-bottom:30px;
   padding-right:0px;
           }
           @media (min-width: 1110px) and (max-width: 1380px){
            width:430px;
            }
`
const Profilepic = styled.div`
position:absolute;
margin-top:55px;
cursor:pointer;
margin-bottom:60px;
border-radius:100px;
background-color:#F3F3F3;
margin-left:10px;
width:72px;
height:72px;
border:5px solid white;
`

const BusinessName=styled.div`
width:96px;
height: 20px;
align-self:center;
border:4px;

`
const ViewProfile=styled.div`
width:78px;
height: 20px;
align-self:center;
border:4px;
margin-right:30px;

`
const Like=styled.div`
margin-top:20px;
width:196px;
height:20px;
margin-right:30px;
border:4px;

`
const StartingPrice=styled.div`

margin-top:15px;
    width:70%;
    height:30px;
    border:4px;
    margin-left:70px;
    display:flex;
    justify-content:center;
    align-self:center;
`
const Buttons=styled.div`
margin-top:10px;
margin-bottom:20px;
    width:45%;
    height:45px;
    border:4px;
    margin-left:10px;
    display:flex;
    justify-content:center;
`



