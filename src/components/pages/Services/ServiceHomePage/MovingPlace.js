import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import LocalMoving from '../../../../assets/localMoving.png'
import LongDistanceMove from '../../../../assets/longDistanceMove.png'
import coorprateMove from '../../../../assets/coorprateMove.png'
import styled from 'styled-components';
const time=4500
function MovingPlace() {
    const [index, setIndex] = useState(0);
    const handlebutton=()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'smooth',
            });
    }
    const MoveArray = [
     'Local Move', 'Long Distance Move', 'Corporate Move'
    ]
    const MoveImg = [
        {img:LocalMoving,text:'Enjoy the ease of moving with SwiftBel. In just few simple steps book a moving company with movers and a truck to move all your items into your new place.​'}, 
        {img:LongDistanceMove,text:'At SwiftBel, we take the stress and hassle out of the moving process by handling all the logistics for you. Simply provide us with your moving details and we will take care of the rest.​'},
         {img:coorprateMove,text:'Moving a business can be a complex and challenging process, but our team at SwiftBel is here to make it as smooth and stress-free as possible.'}
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                return prevIndex + 1 < MoveArray.length ? prevIndex + 1 : 0;
            });
        }, time);

        return () => clearInterval(interval);
    });
    return (
        <React.Fragment>
            <Main>
                <Head>
            <Movingplace>
                <p className='text1'>One place for all your moving your different needs!</p>
                <div className='d-flex'>
                    {MoveArray.map((item, indexs) =>
                        <MovingButton className={index===indexs?'button':''} onClick={()=>setIndex(indexs)} variant={index === indexs ? "dark" : "light"} size='md'>
                            {item}
                        </MovingButton>
                    )}
                </div>
                <MovingBanner>
                    <div   className='d-flex   p-1'>
                        <div className='firstdiv'>
                            <h3 >{MoveArray[index]}</h3>
                            <p >{MoveImg[index].text}</p>
                            <br />
                            <div >
                                <HomeSpButton variant='outline-dark' size='md' onClick={()=>handlebutton()}>Get an estimate</HomeSpButton>
                            </div>
                            <br />
                            <br />
                        </div>
                        <HandImage src={MoveImg[index].img} alt='hand' />
                    </div>
                </MovingBanner>
            </Movingplace>
            </Head>
            </Main>
            <br/>
        </React.Fragment>
    )
}
export default MovingPlace;
const Main = styled.div`
display:flex;
justify-content:center;
margin-top:64px;
@media (min-width: 260px) and (max-width: 820px){
    margin-top:10px;
}
.firstdiv{
margin-top:45px;
}
`
const Head=styled.div`
width:1312px;
padding-left:20px;
padding-right:20px;
@media (min-width: 260px) and (max-width: 820px){
    width:100%;
    padding-left:0px;
padding-right:0px;
}
`

const Movingplace = styled.div`
padding-top:35px;
padding-bottom:30px;
.button{
    background-color:#D81159;
    border:1px solid #D81159;
    color:#fff;
}
@media (min-width: 260px) and (max-width: 820px){
    flex-wrap:wrap;
    justify-content:center;
padding-left:25px;
padding-right:25px;
}
.text1{
font-family:Roobert-medium;
font-weight: 500;
font-size: 40px;
color: #190F0F;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 21px;
    }
}
.left-side{
    margin-top:40px;
}
h3{
    margin-top:30px;
    font-size:24px;
}
p{
    font-family: Inter;
font-style: normal;
font-weight: 400;
font-size: 16px;
color: #787373;
}
`

const MovingBanner = styled.div`
display:flex;
justify-content:space-between;
background:#FFFFFF;
background-color:#fff;
border:1px solid #FAFAFA;
border-radius:10px;
padding-left:25px;
padding-right:25px;


`
const HandImage = styled.img`
Width: 466.39px;
Height:320px;
@media (min-width: 1000px) and (max-width: 1399px){
    height:231px;
    }
@media (min-width: 260px) and (max-width: 820px){
    display:none;
 }
`
const HomeSpButton = styled(Button)`
width:222px;
height:44px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 16px;
margin-bottom:1rem;
border:1px solid #000;
border-radius:8px;
`
const MovingButton = styled(Button)`
width:222px;
height:44px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 16px;
margin-right:13px;
margin-bottom:1rem;
color:#787373;
border:1px solid #787373;
border:1px solid #000;
border-radius:8px;
@media (min-width: 260px) and (max-width: 820px){
    font-size: 10px;
 }
`