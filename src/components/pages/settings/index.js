import React from 'react';
import HeaderTop from '../../layouts/headerTop';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import NotifyBox from '../../../assets/notifyBox.png'
const Settings = (props) => {

    const profileData = useSelector((state) => state.profileReducer)
    const { bannerDetails } = profileData


    return (
        <div>
            <HeaderTop data={bannerDetails} {...props} />
            <Header>No Notifications</Header>
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <NotificationImg src={NotifyBox} />
            </div>
            <Text>Time to plan your next house-care service</Text>
        </div>
    )
}

export default Settings;

const NotificationImg = styled.img`
width: 10.75rem;
height: 10.75rem;
display: flex;
align-items: center;
justify-content: center;


@media (max-width: 767px) {
    display: none;
}
@media (min-width: 768px) and (max-width:1127px ) {
    width: 17rem;
}
`
const Header = styled.h1
    `
font-weight: 600;
font-size: 2rem;
line-height: 120%;
display: flex;
align-items: center;
letter-spacing: 0.01em;
justify-content:center;
display:flex;
margin-top: 8.25rem;


`
const Text = styled.p
    `
font-weight: 300;
font-size: 1rem;
line-height: 120%;
display: flex;
align-items: center;
letter-spacing: 0.01em;
justify-content:center;
display:flex;
margin-top: 1.25rem;


`