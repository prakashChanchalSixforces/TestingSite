import React from 'react';
import {Modal,ModalBody } from 'react-bootstrap';
import styled from 'styled-components';
import FadingCircles from './Motion-Rose.gif'
const Loader=(props)=>{


    return(
     
        <LoaderContainer>
                <img className='img' src={FadingCircles} alt='loading.....'/>
        </LoaderContainer>
    
    )
}
export default Loader;

const LoaderContainer=styled.div`
width:100%;
height:500px;
display:flex;
justify-content:center;
align-items:center;


.img{
    height:100px;
    width:100px;
    align-self:center;
}
`