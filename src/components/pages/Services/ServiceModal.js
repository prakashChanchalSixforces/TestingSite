import React from 'react'
import { Modal, Form, Button, Offcanvas } from 'react-bootstrap'
import '../../layouts/Auth/modalStyles.css'
import styled from 'styled-components';
import Close from '../../../assets/serviceclose.png'
import { useState } from 'react';
import MovingService from './MovingService';
import PressurewashingService from './PressurewashingService';
import ElectriciansService from './ElectriciansService';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PlumbersService from './PlumbersService';

const ServiceModal = (props) => {
    const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = mql.matches;
    const [activeinfo,setActiveinfo]=useState('GI')
    let location = useLocation();
    let uniquename = location.pathname.split('/');
    const servicenames = uniquename[1]
    let servicetype= props?.servicetype?.toLowerCase()?.split(' ')?.join('')
    const [searchs, setSearch] = useState(decodeURI(servicetype||servicenames))
    // const [Contbutton,setContbutton]=useState(false)
    const [index,setIndex]=useState(0)
    const handleactiveinfo=(name)=>{
    setActiveinfo(name)
    }
    const handlecontinue=()=>{
       // if(Contbutton===false){
            setActiveinfo('DTD')
        //}
    }

    useEffect(()=>{
        setSearch(decodeURI(servicetype||servicenames))
    },[servicenames,props])

    const renderservice=()=>{
    if(activeinfo==='GI'){
        if(searchs==='moving'){
            return <MovingService active={activeinfo} setActiveinfo={setActiveinfo} Servicemodal={props?.Servicemodal} setValue={(item)=>setIndex(item)} />
        }
        else if(searchs==='pressurewashing'){
            return<PressurewashingService active={activeinfo} setActiveinfo={setActiveinfo} Servicemodal={props?.Servicemodal}/>
        }
        else if(searchs==='electricians'){
            return <ElectriciansService active={activeinfo} setActiveinfo={setActiveinfo} Servicemodal={props?.Servicemodal}/>
        }
        else if(searchs==='plumbers'){
            return <PlumbersService active={activeinfo} setActiveinfo={setActiveinfo} Servicemodal={props?.Servicemodal}/>
        }
    }
    else {
        if(searchs==='moving'){
        return <MovingService active={activeinfo} setActiveinfo={setActiveinfo} Servicemodal={props?.Servicemodal} handleSubmit={props?.handleSubmit} setValue={(item)=>setIndex(item)} />
        }
        else if(searchs==='pressurewashing'){
        return <PressurewashingService active={activeinfo} setActiveinfo={setActiveinfo} Servicemodal={props?.Servicemodal}/>
        }
        else if(searchs==='electricians'){
        return <ElectriciansService active={activeinfo} setActiveinfo={setActiveinfo} Servicemodal={props?.Servicemodal}/>
        }
        else if(searchs==='plumbers'){
            return <PlumbersService active={activeinfo} setActiveinfo={setActiveinfo} Servicemodal={props?.Servicemodal}/>
            }
    }
}
    const renderitem=()=>{
        return(
            <>

            
            {!(searchs==='plumbers'||searchs==='electricians'||index===1)?
            <Head>
                <div onClick={()=>handleactiveinfo('GI')}>
                <div className={activeinfo==='GI'?'active':'nonactive'}>
                </div>
                 <p className={activeinfo==='GI'?'activetext mt-1':'nonactivetext mt-1'}>General info</p>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div onClick={()=>handleactiveinfo('DTD')}>
                <div className={activeinfo==='DTD'?'active':'nonactive'}>
                </div>
                <p className={activeinfo==='DTD'?'activetext mt-1':'nonactivetext mt-1'}>Date and time,starting address and destination</p>
                </div>
            </Head>
            :''}
             {renderservice()}
             {!(searchs==='plumbers'||searchs==='electricians'||index===1)?
            activeinfo==='GI'?
            <div className='d-flex justify-content-center'>
                    <Actions variant="outline-dark" onClick={()=>props?.Servicemodal(false)}>Cancel</Actions>
                    &nbsp;&nbsp;&nbsp;
                    <Actions variant='dark' onClick={()=>handlecontinue()}>Continue</Actions>
                </div>
             :''
            :''}
            </>
        )
    }
    return (
        <div>
            <Form.Group>
                <Modal
                    {...props}
                    dialogClassName="auth-verification-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={mobileView ? false : props?.show}
                    onHide={() =>props?.Servicemodal(false)}
                >
                    <Header
                    >
                    <p>Check availability</p>
                    <img src={Close} className='close' onClick={()=>props?.Servicemodal(false)}/>
                    </Header>
                    <Modal.Body>
                        <div className='signup-modal-right'>
                          {renderitem()}
                        </div>
                    </Modal.Body>
                </Modal>
                <MobileModal show={props?.show} onHide={() => props?.Servicemodal(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => props?.Servicemodal(false)}>
                    <Offcanvas.Title>Instant Online Estimate</Offcanvas.Title>
                </Offcanvas.Header>
                <div style={{overflow:'scroll'}}>
               {renderitem()}
                </div>
            </MobileModal>

               </Form.Group></div>
    )
}
export default ServiceModal;

const MobileModal = styled(Offcanvas)`
border-radius:15px;
background-color:#FAFAFA;
.button{
    background-color:#D81159;
    border:1px solid #D81159;
    color:#fff;
}
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
}
`

const Header = styled.div
`
display:flex;
justify-content:space-between;
margin-left:10px;
margin-right:10px;
font-family:Roobert-medium;
font-weight: 500;
font-size: 18px;
padding:12px;
.close{
    height:17px;
    width:17px;
    cursor:pointer;
}
`
const Head = styled.div`
display:flex;
justify-content:space-between;
padding-left:15px;
padding-right:30px;
font-family:Roobert-medium;
.active{
width: 225px;
height: 4px;
background: #D81159;
border-radius: 8px;
@media (min-width: 200px) and (max-width: 768px){
    width: 175px;
  }
}
.activetext{
font-size: 12px;
color: #D81159;
}
.nonactivetext{
font-size: 12px;
color: #D0CECE;
}
.nonactive{
width: 225px;
height: 4px;
background: #F3F3F3;
border-radius: 8px;
@media (min-width: 200px) and (max-width: 768px){
    width: 175px;
  }
}
`
const Actions=styled(Button)`
width: 215px;
height: 44px;
border-radius: 8px;
font-size: 14px;
font-family:Roobert-medium;
@media (min-width: 200px) and (max-width: 768px){
    width: 175px;
  }
`