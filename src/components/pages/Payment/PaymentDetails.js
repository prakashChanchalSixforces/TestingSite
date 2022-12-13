import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { verifyEmailUser } from '../../../store/Actions/Auth.action';
import { getAdminDetails } from '../../../store/Actions/Dashboard.actions';
import HeaderTop from '../../layouts/headerTop';
import Loader from '../../layouts/Loader/Loader';
import MainFooter from '../MainFooter/MainFooter';
import PaymentLeft from './PaymentLeft';
import PaymentRight from './PaymentRight';

function PaymentDetails(){
    const [det, setDet] = useState({})
    const [detdata, setDetData] = useState({})
    const [type, setType] = useState('')
    const [isEmailAvilable, setIsEmailAvlable] = useState(false);
    const [email, setEmail] = useState('')
    const [loader,setLoader]=useState(false)
    const dispatch = useDispatch()
    let locate = useLocation();
    const verifyEmail = async (emails) => {
      console.log("hiiiiiiiiienter")
      const data={
        email: emails
      }
      const res = await dispatch(verifyEmailUser(data))
      if (res.status) {
        setIsEmailAvlable(true)
      }
      console.log(res,"bombammmm")
    }
    const initilize = async () => {
      console.log(locate, "uniqueeeename")
      setLoader(true)
      if (locate?.search) {
        const valu = new URLSearchParams(window.location.search)
        const emails = valu.get('email')
        const serviceName = valu.get('serviceName')
        const res = await dispatch(getAdminDetails(locate?.search))
        await verifyEmail(emails)
        if (res.status === true) {
          setEmail(emails)
          localStorage.setItem('values', JSON.stringify(res?.data))
          localStorage.setItem('data', JSON.stringify(res?.sp))
          localStorage.setItem('type', serviceName)
        }
      }
      let details = localStorage.getItem('values')
      let data = localStorage.getItem('data')
      setType(localStorage.getItem('type'))
      setDet(JSON.parse(details))
      setDetData(JSON.parse(data))
      setLoader(false)
    }
    useEffect(() => {
      initilize()
    }, [])
return(
    <React.Fragment>
            <HeaderTop/>
    <Main>
    <Segment style={{backgroundColor:'#FAFAFA'}}>
    <br/>
  {<MainContainer fluid >
      <Maindiv>
        <Leftdiv className='p-2'>
            <PaymentLeft
            det={det}
            detdata={detdata}
            type={type}
            isEmailAvilable={isEmailAvilable}
            email={email}/>
        </Leftdiv>
        <Middlediv></Middlediv>
        <Rightdiv className='p-2'>
            <PaymentRight det={det}
            detdata={detdata}
            type={type}
            />
        </Rightdiv>
      </Maindiv>
      <MobileView>
          <div>
      <Rightdiv className='p-2'>
            <PaymentRight  det={det}
            detdata={detdata}
            type={type} />
        </Rightdiv>
        <Leftdiv className='p-2'>
            <PaymentLeft
            det={det}
            detdata={detdata}
            type={type}
            isEmailAvilable={isEmailAvilable}
            email={email} />
        </Leftdiv>
        </div>
      </MobileView>
      </MainContainer>}
      <br/>
      <br/>
    </Segment>
    </Main>
    <MainFooter/>
    </React.Fragment>
)
}
export default PaymentDetails

const Main = styled.div`
@media (min-width: 1800px) and (max-width: 2500px)
{
    padding-left:250px;
    padding-right:250px;
}
@media (min-width: 2501px) and (max-width:3000px)
{
    padding-left:350px;
    padding-right:350px;
}
@media (min-width: 3001px) and (max-width:4000px)
{
    padding-left:650px;
    padding-right:650px;
}
@media (min-width: 4001px) and (max-width:9999px)
{
    padding-left:1350px;
    padding-right:1350px;
}
@media (min-width: 260px) and (max-width: 820px){
    overflow-x:hidden;
    }
`
const MainContainer=styled(Container)`
@media (min-width: 260px) and (max-width: 600px){
    padding-left:10px;
    padding-right:0px;
    }
    @media (min-width: 601px) and (max-width: 1000px){
        padding-left:100px;
        padding-right:0px;
    }
`
const Maindiv=styled.div`
display:flex;
justify-content:center;
@media (min-width: 260px) and (max-width: 820px){
    display:none;
    }
`
const Segment=styled.div`
background-color:#FAFAFA;
padding:0px;
`
const Middlediv=styled.div`
width:30px;
`
const Leftdiv=styled.div`
width: 554px;
@media (min-width: 260px) and (max-width: 601px){
    padding-left:10px;
padding-right:0px;
width:380px;
}
@media (min-width: 1700px) and (max-width: 8000px){
    width: 734px;

}
`
const Rightdiv=styled.div`
width: 423px;
@media (min-width: 260px) and (max-width: 601px){
    padding:0px;
    padding-left:0px;
    padding-Right:0px;
    width:380px;
    }
`
const MobileView = styled.div`
background:#fff;
background-color:#fff;
justify-content:center;
margin-left:-10px;
display:flex;
align-items:center;
flex-direction:column;
.imag{
    justify-content:flex-end;
    display:flex;
}
@media (min-width: 821px) and (max-width: 10000px){
    display:none;
    }

`