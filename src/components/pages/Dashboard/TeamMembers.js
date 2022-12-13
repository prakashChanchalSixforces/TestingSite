import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import WokerInviteButton from './components/WokerInviteButton';
import { Row } from 'react-bootstrap';
import closebuttn from '../../../assets/closeBtn.png'
import { getWorkerList } from '../../../store/Actions/Dashboard.actions';
import Profile from '../../../assets/profile.png'


const TeamMembers = () => {
    const { workerList } = useSelector((state) => state.dashboardReducer)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        init()
    }, [])
    const init = async () => {
        await dispatch(getWorkerList());
    }

    return (

        <div className='main-invitewokrer-content' >
            <InviteContainer className='d-flex justify-content-between align-items-center p-2'>
                <Text className='mt-2'> Team: {workerList?.length || 0} Members</Text>
                <WokerInviteButton
                    value={open}
                    onchangeModal={(item) => setOpen(item)}
                />
            </InviteContainer>
            <Row>
                <MainContainer className='row'>
                    {workerList.length > 0 ?
                        workerList.map((item) =>
                            <Main>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex justify-content-start profile'>
                                        <img className='mt-1 img' alt='' src={workerList?.profilePhoto || Profile} />
                                        <div>
                                            <Text >{item.userName}</Text>
                                            <Text2 >@{item.userName}</Text2>
                                        </div>
                                    </div>
                                    <Arrow className='mt-2' src={closebuttn} />
                                </div>
                                <div>
                                    <Text className='mt-1'>{item?.mobileno || "___"}</Text>
                                    <Text >{item.email}</Text>
                                </div>
                            </Main>
                        )
                        :
                        <Main>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex justify-content-start profile'>
                                <img className='mt-1 img' alt='' src={workerList?.profilePhoto || Profile} />
                                <div>
                                    <Text >{'Name'}</Text>
                                    <Text2 >@{'NickName'}</Text2>
                                </div>
                            </div>
                            <Arrow className='mt-2' src={closebuttn} />
                        </div>
                        <div>
                            <Text className='mt-1'>{ "Mobile no"}</Text>
                            <Text >{'Email'}</Text>
                        </div>
                    </Main>
                    }
                </MainContainer>
            </Row>
        </div>
    )
}

export default TeamMembers;

const Main = styled.div`
width:320px;
 align-items:center;
 background-color:white;
 border-radius:8px;
 margin-bottom:20px;
 padding:15px;
 margin-left:20px;
 .img{
    height:20px;
     width:20px; 
     margin-right:10px; 
 }
`

const InviteContainer = styled.div`
margin-right:2rem;
margin-left:1rem;
`
const MainContainer = styled.div`
margin-right:2rem;

`
const Text = styled.p`
font-family: Inter;
font-size: 14px;
color: #000000;
`
const Text2 = styled.p`
font-family: Inter;
font-size: 12px;
color: #D0CECE;
margin-top:-20px;
`
const Arrow = styled.img`
width:10px;
height:10px;
margin-left: 0.3rem;
align-items:center;
`



