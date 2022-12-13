import React from 'react';
import styled from 'styled-components';
import Dashboardicon from '../../../assets/DASHBOARD4.png';
import accountsettings from '../../../assets/accountsettings4.png';
import notifications from '../../../assets/notifications4.png';
import managing from '../../../assets/managing4.png';
import pricing from '../../../assets/pricing4.png';
import help from '../../../assets/help4.png';
import messages from '../../../assets/messages4.png';
import pinkaccountsettings from '../../../assets/pinkaccountsettings.png';
import profilepage from '../../../assets/profilepage4.png';
import pinkprofilepage from '../../../assets/pinkprofilepage.png';
import pinknotifications from '../../../assets/pinknotifications.png';
import pinkmanaging from '../../../assets/pinkmanaging.png';
import pinkpricing from '../../../assets/pinkpricing.png';
import pinkhelp from '../../../assets/pinkhelp.png';
import pinkmessages from '../../../assets/pinkmessages.png';
import Hr from '../../../assets/hrcustom.png';
import pinkdashboard from '../../../assets/pinkdashboard.png';
import { useState } from 'react';


function DashboardMenu(props) {
    const [Active, setActive] = useState('Dashboard')
    const [profileActive, setProfileActive] = useState('Profile')
    const [manageJobActive, setManageJobActive] = useState('Upcoming jobs')
    const [accountSettingActive, setAccountSettingActive] = useState('Basic Account Details')

    const ProfileDetails = [
        {
            name: 'Profile',
            activeicon: pinkprofilepage
        },
        {
            name: 'Edit profile',
            activeicon: pinkprofilepage
        },]
    const managejob=[
        {
            name: 'Upcoming jobs',
            activeicon: pinkprofilepage
        },
        {
            name: 'Ongoing Jobs',
            activeicon: pinkprofilepage
        },
        {
            name: 'Team members',
            activeicon: pinkprofilepage
        }
    ]
    const accountSettingSubMenu=[
        {
            name: 'Basic Account Details',
            activeicon: pinkprofilepage
        },
        {
            name: 'Login and Security',
            activeicon: pinkprofilepage
        },
        {
            name: 'Business Verification',
            activeicon: pinkprofilepage
        },
        {
            name: 'Personal details',
            activeicon: pinkprofilepage
        },
        {
            name: 'Insurance verification',
            activeicon: pinkprofilepage
        }
    ]
    const Menudetails = [
        {
            icon: profilepage,
            name: 'Profile',
            activeicon: pinkprofilepage
        },
        {
            icon: messages,
            name: 'Messages',
            activeicon: pinkmessages
        },
        {
            icon: notifications,
            name: 'Notifications',
            activeicon: pinknotifications
        },
        {
            icon: Dashboardicon,
            name: 'Dashboard',
            activeicon: pinkdashboard
        },
        {
            icon: managing,
            name: 'Managing',
            activeicon: pinkmanaging
        },
        {
            icon: pricing,
            name: 'Pricing',
            activeicon: pinkpricing
        },
        {
            icon: accountsettings,
            name: 'Account Settings',
            activeicon: pinkaccountsettings
        },
        {
            icon: help,
            name: 'Help',
            activeicon: pinkhelp
        }
    ]
    console.log(Menudetails, 'menudetails')
    const handleprofile = (name) => {
        setProfileActive(name)
        props.ProfileActive(name)
    }

    const handlemanaging = (name) => {
        setManageJobActive(name)
        props.ManagingActive(name)
    }
    const handleAccountSettings = (name) => {
        setAccountSettingActive(name)
        props.AccountSettingActive(name)
    }
    const handlemenu = (name) => {
        setActive(name)
        props.activetype(name)
    }
    return (
        <React.Fragment>
            <Main>
                <Heading>Admin panel</Heading>
                <List>
                    {Menudetails?.map((item, index) =>
                        <>
                            <div className={item.name === Active ? 'd-flex mb-3 active' : 'd-flex mb-3'} key={index} onClick={() => handlemenu(item.name)}>
                                <img className='icon' src={item.name === Active ? item?.activeicon : item.icon} alt='' />
                                <p className='head'>{item.name}</p>
                            </div>
                            {Active==='Profile'&&item.name==='Profile'?
                            ProfileDetails?.map((item,index)=>
                            <div className={item.name === profileActive ? 'mb-3 profileactive' : 'mb-1'} key={index} onClick={() => handleprofile(item.name)}>
                            <p className='profileHead'>{item.name}</p>
                        </div>
                            )   :null
                        }
                         {Active==='Managing'&&item.name==='Managing'?
                            managejob?.map((item,index)=>
                            <div className={item.name === manageJobActive ? 'mb-3 profileactive' : 'mb-1'} key={index} onClick={() => handlemanaging(item.name)}>
                            <p className='profileHead'>{item.name}</p>
                        </div>
                            )   :null
                        }
                          {Active==='Account Settings'&&item.name==='Account Settings'?
                            accountSettingSubMenu?.map((item,index)=>
                            <div className={item.name === accountSettingActive ? 'mb-3 profileactive' : 'mb-1'} key={index} onClick={() => handleAccountSettings(item.name)}>
                            <p className='profileHead'>{item.name}</p>
                        </div>
                            )   :null
                        }
                            {index === 2 || index === 4 || index === 6 ?
                                <Hrdesign src={Hr} className='mb-3' />
                                : ''}
                        </>
                    )}
                </List>
            </Main>
        </React.Fragment>
    )
}
export default DashboardMenu

const Main = styled.div`
padding:3rem;
`
const Heading = styled.p`
font-size: 32px;
font-family: Roobert-medium;
font-weight: 500;
`
const List = styled.div`
margin-top:30px;
.icon{
height:18px;
width:19px;
margin-top:5px;
margin-right:15px;
cursor:pointer;
}
.head{
font-family: Inter;
font-size: 16px;
cursor:pointer;
}
.active{
    height:40px;
    border-left:2px solid #D81159;
    background:rgba(226, 79, 132, 0.08);
    background-color:rgba(226, 79, 132, 0.08);
    padding-left:20px;
    margin-left:-25px;
    padding-top:7px;
    color:#D81159;
}
.profileactive{
    height:30px;
    border-left:2px solid #D81159;
    background:rgba(226, 79, 132, 0.08);
    background-color:rgba(226, 79, 132, 0.08);
    color:#D81159;
    display:flex;
    align-self:center;
}
.profileHead{
font-family: Inter;
font-size: 16px;
cursor:pointer;
margin-left:5px;
margin-top:4px;
}
`
const Hrdesign = styled.img`
width:100%;
`