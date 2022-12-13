import React from 'react'
import styled from 'styled-components'
import FooterBottom from '../UserHomepage/FooterBottom'
import FooterTop from '../UserHomepage/FooterTop'

function MainFooter(){
    return(
        <Main className='d-flex justify-content-center'>
            <div>
            <FooterTop/>
            <FooterBottom/>
            </div>
        </Main>
    )
}
export default MainFooter

const Main=styled.div`
background:white;
background-color:white;
@media (min-width: 200px) and (max-width: 768px){
padding-left:30px;
}
`