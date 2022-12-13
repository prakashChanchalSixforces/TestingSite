import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import Appleplaystore from '../../../assets/appleplaystore.png'
import Googleplaystore from '../../../assets/googleplaystore.png'
import Handpicture from '../../../assets/hand-picture.webp'
import Handbanner from '../../../assets/hand-banner.webp'
import styled from 'styled-components';
function JoinSwiftbel(){
    let navigate=useNavigate()
return(
    <React.Fragment>
                <Playstore fluid >
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={3}>
                            <div className='left-side'>
                                <h3>Become a SwiftBel Service Provider</h3>
                                <br />
                                <div>
                                    <Button variant='light' size='lg' className='findhome' onClick={() => navigate('/business')}>Join</Button>
                                </div>
                                <br />
                                <br />
                                <h6>Download the app</h6>
                                <div className='d-flex'>
                                    <div className='stores'>
                                        <img src={Appleplaystore} alt='apple' />
                                    </div>&nbsp;&nbsp;
                                    <div className='stores'>
                                        <img src={Googleplaystore} alt='google' />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2} className='bigcol'></Col>
                        <Col sm={1} className='smallcol'></Col>

                        <Col sm={6}>
                            <br />
                            <br />
                            <img src={Handpicture} alt='hand' className='handpicture' />
                        </Col>
                    </Row>
                </Playstore>
                          <Mobplaystore fluid >
                <Card className="text-white">
                    <Card.Img src={Handbanner} alt="Card image" />
                    <Card.ImgOverlay>
                        <Card.Text className='cardtext'>
                            <Text>Become a SwiftBel Service Provider</Text>
                            <br />
                            <div className='d-flex justify-content-center joinbutton'>
                                <Button variant='light' size='lg' onClick={() => navigate('/business')}>Join</Button>
                            </div>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </Mobplaystore>
    </React.Fragment>
)
}
export default JoinSwiftbel

const Playstore = styled(Container)`
background-color:#190F0F;
.left-side{
margin-top:150px;
}
.bigcol{
    display:none;
}
.smallcol{
    display:flex;
}
.findhome{
    width: 382px;
    height: 53px;
}
h3{
    color:white;
    font-family:'Roobert-medium';
}
h6{
color: white;
}
.stores{
background-color: #190F0F;
}
@media (min-width: 801px) and (max-width: 1100px){
    .left-side{
        margin-top:100px;
        margin-bottom:100px;
    }
    .bigcol{
        display:flex;
    }
    .smallcol{
        display:none;
    }
}
@media (min-width: 260px) and (max-width: 800px){
    display:none;
}
@media (min-width: 1900px) and (max-width: 5000px){
h3{
    font-size:55px;
}
h6{
    font-size:35px;
}
img{
    width:300px;
    margin-right:15px;
}
.handpicture{
    margin-left:120px;
    width: 100%;
}
.findhome{
width:550px;
height: 93px;
font-size:35px;
}
}
`
const Mobplaystore = styled(Container)`
background-color:#190F0F;
.text-white{
 background-color: #190F0F;
}
.cardtext{
position: absolute;
bottom: 0;
text-align:center;
padding: 20px;
}
.joinbutton{
font-size:Bold;
margin-left:20px;
}
@media (min-width: 801px) and (max-width: 10000px){
    display:none;
}
`
const Text = styled.h2`
text-align:center;
`