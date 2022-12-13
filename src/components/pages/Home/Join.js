import React from 'react'
import {Container} from 'react-bootstrap';
import joinswiftbel from '../../../assets/joinswiftbel.webp'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


function Join(props){
    let navigate = useNavigate();
    return(
      <React.Fragment>
        <Main>
         <MainContainer fluid className='d-flex justify-content-center'>
                <JoinSwiftbel>
                    <h5 >Become a SwiftBel </h5>
                    <h5 > Service Provider </h5>
                    <JoinButton onClick={()=>{props.customer===true?navigate('/business'):props.setsignup(true)}}>Join</JoinButton>
                </JoinSwiftbel>
                </MainContainer>
        </Main>
        </React.Fragment>
    )
}
export default Join

const Main =  styled.div`
padding-right:3rem;
padding-left:3rem;
@media (min-width: 360px) and (max-width: 1000px){
padding-right:0;
padding-left:0;
  }
`
const MainContainer=styled(Container)`
background-image:url(${joinswiftbel});
width:100%;
height:100%;
background-repeat:no-repeat;
border-radius:18px;
background-size:cover;
`

const JoinSwiftbel = styled.div`
width: 447.34px;
height: 196px;
background: #190F0F;
border-radius: 20px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-top:200px;
margin-bottom:300px;
h5{
    color:white;
    text-align:center;
    font-size:22px;
}
@media (min-width: 1600px) and (max-width: 6200px){ 
    margin-top:500px;
margin-bottom:600px;
width: 647.34px;
height: 296px;
  }
  @media (min-width: 360px) and (max-width: 1000px){
    border-radius: 18px;
  }
`
const JoinButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 158px;
    gap: 10px;
    width: 244px;
    height: 53px;
    background: #FFFFFF;
    border-radius: 10px;
    font-size: 16px;
    cursor:pointer;
    @media (min-width: 1600px) and (max-width: 6200px){ 
    width: 244px;
    height: 63px;
    margin-top:10px;
      }
`