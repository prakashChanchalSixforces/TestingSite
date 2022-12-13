import React from 'react'
import styled from 'styled-components'
import MovingForm from './Forms/MovingForm'
import  Umbrella from '../../../assets/pinkumbrella.png'
import { Button } from 'react-bootstrap'
import { isAuthenticated } from '../../layouts/Auth/Authentication'
import { useNavigate } from 'react-router-dom'
import PressureForm from './Forms/PressureForm'
import ElectricianForm from './Forms/ElectricianForm'
import PlumberForm from './Forms/PlumberForm'

function EnterDetails(props){
    let navigate=useNavigate();
    const services = props?.finalData
    const servicesOffered=props?.servicesOffered
    const handlebooknow = () => {
        !isAuthenticated() ?
          navigate(`/details`, { state: { servicename: servicesOffered, spId: services?.[0]?.spId } })
          :
          navigate(`/payment`, { state: { servicename: servicesOffered, spId: services?.[0]?.spId } })
          window.analytics.track("SP profile reserve now");
        localStorage.setItem('data', JSON.stringify(services?.[0]))
        localStorage.setItem('type', servicesOffered)
        localStorage.setItem('spId', services?.[0]?.spId)
    }

    const Renderitem=()=>{
    if(servicesOffered==='Moving')
    {
    return <MovingForm/>
    }
    else if(servicesOffered==='Pressure Washing')
    {
    return <PressureForm/>
    }
    else if(servicesOffered==='Electricians')
    {
    return <ElectricianForm/>
    }
    else if(servicesOffered==='Plumbers')
    {
    return <PlumberForm/>
    }
    }

    return(
        <Main>
        <div>
        {Renderitem()}
        </div>
        {services?.length > 0 ?
         services?.map((item,index)=>{
            return(
        <div>
        <div className='d-flex justify-content-between p-2 seconddiv'>
        <div >
        {servicesOffered==='Moving'?<>
        <p className='headings'>Hourly price </p>
        <p className='headings'>Travel time</p>
        <br className='hide'/>
        <p className='headings'>Total hours
        <br className='hide'/>
        (Includes travel time)</p>

        <p className='headings'>Total estimate</p>
        </>
        :''}
        <p className='headings mt-2'>Estimated price based on your inputs is CAD ${Math.ceil(item?.finalPrice)}</p>
        </div>
        <div >
        {servicesOffered==='Moving'?<>
        <p className='headings text-start'>${Math.ceil(item?.estimatedHourlyPrice)} per hour</p>
        <p className='headings text-start'>${Math.ceil(item?.travelCharge)} ({item?.travelTime})</p>
        <p className='headings text-start'>{item?.estimatedTime}</p>
        <p className='headings text-start'> ${Math.ceil(item?.finalPrice)}</p>
        </>
        :''}
        </div>
        </div>
        <Freecancel className='mt-1'>Free cancellations up to 24 hours before the job</Freecancel>
        <Freecancel>Your booking is protected by &nbsp;<Img src ={Umbrella}/><span className='guarantee'>SwiftBel</span>&nbsp;<span className='subguarantee'>Guarantee</span></Freecancel>
        <Actions className='seconddiv mt-3' variant='dark' onClick={()=>handlebooknow()}>Reserve now</Actions>
        </div>
         )
        })
        :''}
        </Main>
    )
}
export default EnterDetails


const Main = styled.div`
display:flex;
.hide{
    display:none;
}
.seconddiv{
margin-left:70px;
margin-top:30px;
width:570px;
}
@media (min-width: 769px) and (max-width: 1250px){
    display:inline;
    .seconddiv{
    margin-left:0px;
    margin-top:0px;
    }
    .hide{
        display:none;
    }
}
@media (min-width: 260px) and (max-width: 768px){
display:inline;
.headings{
 margin-top:5px;
}
.hide{
    display:flex;
}
.seconddiv{
    margin-left:0px;
    margin-top:0px;
    width:350px;
}
}
.headings{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    color: #787373;
    margin-top:-5px;
}
`
const Freecancel=styled.p`
font-family:Inter;
font-size: 14px;
margin-top:-8px;
margin-left:80px;
@media (min-width: 260px) and (max-width: 1250px){
    font-size: 12px;
    margin-top:-10px;
    margin-left:0px;
     }
.guarantee{
    font-weight:600;
    color:#D81159;
    }
    .subguarantee{
    font-weight:600;
    color:black;
    }
`
const Img=styled.img`
height:20px;
width:20px;
margin-right:5px;
`
const Actions = styled(Button)`
width: 556px;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
color:white;
background:#D81159;
border:1px solid #D81159;
@media (min-width: 260px) and (max-width: 969px){
   width:340px;
 }
`