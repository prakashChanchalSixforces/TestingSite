import React from 'react'
import styled from 'styled-components';
import proppic from '../../../../assets/profile-pic.png'
import quotation from '../../../../assets/quotation.png'
function ReviewPage() {
    return (
        <React.Fragment>
            <Main>
            <Segment  className='p-3'>
                     <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                           <Image src={proppic} />
                           <div>
                              <p className='name'>{"Pierre Castro"}</p>
                              <p className='nickname'>{"22nd October 2022"}</p>
                           </div>
                        </div>
                        <img src={quotation} className='quotation'/>
                     </div>
                 <p className='review'>{"Working with SwiftBel helped with a lot of the anxiety that may come with an already stressful event, moving. I was able to be connected with an amazing moving company that were vetted by SwiftBel. Truly appreciative that there is a technology like SwiftBel around to navigate the plethora of home services."}</p>
                  </Segment>
            </Main>
        </React.Fragment>
    )
}

export default ReviewPage

const Main = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top:64px;
    @media (min-width: 260px) and (max-width: 820px){
       padding-left:10px;
       margin-top:24px;
    }
    `
const Segment = styled.div`
border-radius:13px;
width:864px;
background:white;
background-color:white;
margin-right:15px;
.name{
font-family:Roobert-medium;
font-size: 18px;
}
.nickname{
font-size: 14px;
font-family:Roobert-medium;
color: #787373;
margin-top:-15px;
}
.review{
font-size: 16px;
color: #787373;
}
.quotation{
    height:36px;
    width:36px;
}
@media (min-width: 260px) and (max-width: 820px){
    width:372px;
}
`
const Image = styled.img`
border-radius:50%;
height:48px;
width:48px;
margin-right:10px;
`

