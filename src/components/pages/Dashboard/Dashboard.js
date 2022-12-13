import React from 'react'
import styled from 'styled-components'
import HeaderTop from '../../layouts/headerTop'
import DashboardMenu from './DashboardMenu'
import { useState } from 'react'
import Graphs from './Graphs'
import Notifications from './Notifications'
import SpProfile from './SpProfile'
import Chat from '../chat'
import EditProfile from './EditProfile'
import Pricing from './Pricing/Pricing'
import UpcomingJob from './UpcomingJob'
import TeamMembers from './TeamMembers'
import Basicaccountdetails from './AccountSettings/Basicaccountdetails'
import BusinessVerification from './AccountSettings/BusinessVerification'
import InsuranceVerification from './AccountSettings/InsuranceVerification'
import LoginandSecurity from './AccountSettings/LoginandSecurity'
import PersonalDetails from './AccountSettings/PersonalDetails'
import OngoingJobs from './OngoingJobs'
import { useEffect } from 'react'
import { getElectricianServiceData, getMovingServiceData, getPressureWashingDataServiceData,getPlumbersDataServiceData, getHouseCleaningServiceData } from '../../../store/Actions/Dashboard.actions'
import { useDispatch } from 'react-redux'
function Dashboard(props){
const [active,setActive]=useState('Dashboard')
const [profileActive, setProfileActive] = useState('Profile')
const [manageJobActive, setManageJobActive] = useState('Upcoming jobs')
const [accountSettingActive, setAccountSettingActive] = useState('Basic Account Details')

const RightSide=()=>{
let dispatch=useDispatch();
    const init = async () => {
        await dispatch(getMovingServiceData())
        await dispatch(getElectricianServiceData())
        await dispatch(getPressureWashingDataServiceData())
        await dispatch(getPlumbersDataServiceData())
        await dispatch(getHouseCleaningServiceData())
    }
    useEffect(()=>{
    init()
    },[])
if(active==='Notifications'){
    return  <Notifications/>
}
else if(active==='Dashboard'){
    return <Graphs/>
}
else if(active==='Account Settings'){
        if(accountSettingActive==='Basic Account Details')
        {
            return  <Basicaccountdetails/>
        }
        else if(accountSettingActive==='Business Verification')
        {
            return <BusinessVerification/>
        }
        else if(accountSettingActive==='Insurance verification')
        {
            return <InsuranceVerification/>
        }
        else if(accountSettingActive==='Login and Security')
        {
            return  <LoginandSecurity/>
        }
        else if(accountSettingActive==='Personal details')
        {
            return <PersonalDetails/>
        }
}
else if(active==='Pricing'){
    return  <Pricing/>
}
else if(active==='Profile')
{
    if(profileActive==='Profile')
    return <SpProfile/>

    else if(profileActive==='Edit profile')
    {
        return <EditProfile/>
    }
}
else if(active==='Managing')
{
    if(manageJobActive==='Upcoming jobs')
    return <UpcomingJob/>

    else if(manageJobActive==='Team members')
    return <TeamMembers/>

    else if(manageJobActive==='Ongoing Jobs')
    return <OngoingJobs/>

    else
    {
        return null
    }
}
else if(active==='Messages')
{
    return <Chat/>
}
else return null
}
    return(
        <React.Fragment>
            <Main>
            <HeaderTop/>
             <MainContainer>
                <Leftdiv>
                <DashboardMenu activetype={setActive} ProfileActive={setProfileActive} ManagingActive={setManageJobActive} AccountSettingActive={setAccountSettingActive}/>
                </Leftdiv>
                <Rightdiv>
                  <RightSide/>
                </Rightdiv>
                </MainContainer>
            </Main>
        </React.Fragment>
    )
}
export default Dashboard

const Main = styled.div`

`
const MainContainer=styled.div`
display:flex;
padding-right:20px;
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
@media (min-width: 200px) and (max-width:727px)
{
    padding-left:10px;
    padding-right:10px;
}
`

const Leftdiv = styled.div`
width: 380px;
background-color:white;
background:white;
height: 100%;
@media (min-width: 260px) and (max-width: 1800px)
{
left: 0;
}
`
const Rightdiv = styled.div`
width: 100%;
margin-left:20px;
`