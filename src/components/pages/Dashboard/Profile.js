import React from 'react'
import styled from 'styled-components'
import EditProfile from './EditProfile'

function Profile(){
return(
    <React.Fragment>
      <Head className='d-flex'>
       <p className='tabs'>Edit profile</p>
       <p className='tabs'>Account Information(Sign Up info)</p>
       <p className='tabs'>Pricing(inputs)</p>
      </Head>
      <EditProfile/>
    </React.Fragment>
)
}
export default Profile

const Head=styled.div`
padding-top:60px;
padding-right:60px;
.tabs{
margin-right:60px;
font-family: Inter;
font-size: 16px;
cursor:pointer;
}
`