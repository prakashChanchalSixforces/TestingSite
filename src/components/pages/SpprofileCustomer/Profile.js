import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import HeaderTop from '../../layouts/headerTop'
import MainFooter from '../MainFooter/MainFooter'
import EnterDetails from './EnterDetails'
import LeftProfile from './LeftProfile'

function Profile(){
return(
    <React.Fragment>
    <HeaderTop />
    {/* <Stress>
        <DontStress/>
        </Stress> */}
    <MainContainer>
    <Leftdiv>
        <LeftProfile/>
    </Leftdiv>
    </MainContainer>
    <br/>
   <MainFooter/>
    </React.Fragment>
)
}

export default Profile

const MainContainer=styled.div`
display:flex;
padding-left:40px;
padding-right:20px;
justify-content:center;
@media (min-width: 200px) and (max-width:727px)
{
    padding-left:20px;
    padding-right:15px;
}
`

const Leftdiv = styled.div`
width:1332px;
@media (min-width: 260px) and (max-width: 820px){
padding:0px;
padding-left:15px;
padding-right:15px;
}
@media (min-width: 200px) and (max-width:970px)
{
width:373px;
}

`