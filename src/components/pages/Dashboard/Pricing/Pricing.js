import React from 'react'
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import help from '../../../../assets/help4.png';
import { getServices } from '../../../../store/Actions/serviceProvider.actions';
import CleaningPricing from './CleaningPricing';
import ElectriciansPricing from './ElectriciansPricing';
import MovingPricing from './MovingPricing';
import PlumbersPricing from './PlumbersPricing';
import PressurewashPricing from './PressurWashPricing';

function Pricing(){
    const [activeHome,setActiveHome]=useState('Moving')
    // const [activeRepair,setActiveRepair]=useState('Moving')
    const dispatch = useDispatch()
    const init = async () => {
        await dispatch(getServices())
    }
    useEffect(() => {
        init()
    }, [])
    const OpenedServices=[
        'Pressure Washing',
        'Moving',
        'Electricians',
        'Plumbers',
        'Cleaning'
        ]
    const services = useSelector(state => state?.serviceProvider?.services);

    let ourservices = services?.map((x) => x.data)
    let serve = ourservices[0]
    const handlehome=(item)=>{
     setActiveHome(item)
    }
    // const handlerepair=(item)=>{
    //  setActiveRepair(item)
    // }

    const Steps=[
    {
    "stepnumber":'1',
    "stepheading":'Select the service',
    "stepdescription":'From the list of services, select a service to change the price'
    },
    {
    "stepnumber":'2',
    "stepheading":'Enter pricing',
    "stepdescription":'After selecting the service, enter the prices in font of the input boxes'
    },
    {
    "stepnumber":'3',
    "stepheading":'Save',
    "stepdescription":'Click save to update your prices'
    }
   ]
   //const Homemaintainence=['Window Cleaning','Soft Wash House','Mattress Cleaning','Cleaning','Carpet Cleaning','Pressure Washing','Furniture Assembly','Sofa Cleaning','Handyman']
//    const Repairs=['Roof Treatment','Moving','Painting','Plumber','Gutter Cleaning','HVAC Technicians','Electricians']
   return(
        <React.Fragment>
            <Main>
           <Segment>
            {Steps?.map((item,index)=>{
                return(
             <div className='d-flex'>
             <div className='stepnumber'>{item?.stepnumber}</div>
             <div className='stepdescription'>
                <p className='heading'>{item?.stepheading}</p>
                {/* <p className='description'>{item?.stepdescription}</p> */}
             </div>
             </div>
                )
            })}
           </Segment>
           <br/>
           <p className='heading'><img src={help} className='icon' alt=''/>Services</p>
           <p className='description'>link here to see how pricing works</p>
           <br/>
           <p className='heading'>Home maintainence</p>
           <Maintain>
            {serve?.map((item,index)=>{
                return(
                    OpenedServices?.includes(item.name)?
                    <Service key={index} className={activeHome===item?.name?'active':''} onClick={()=>handlehome(item?.name)}>
                    {item?.name}
                    </Service>
                    :''
                )
            })}
           </Maintain>
           <br/>
           {/* <p className='heading'>Repairs, renovations, moving</p>
           <Maintain>
            {Repairs?.map((item,index)=>{
                return(
                    <Service key={index} className={activeRepair===item?'active':''} onClick={()=>handlerepair(item)}>
                    {item}
                    </Service>
                )
            })}
           </Maintain>
           <br/> */}
           <p className='heading'>{activeHome}</p>
            {activeHome==='Moving'?
            <MovingPricing />
            :
            activeHome==='Pressure Washing'?
            <PressurewashPricing/>
            :
            activeHome==='Electricians'?
            <ElectriciansPricing />
            :
            activeHome==='Plumbers'?
            <PlumbersPricing/>
            :
            activeHome==='Cleaning'?
            <CleaningPricing/>
            :
            ''}
            <br/><br/>
           </Main>
        </React.Fragment>
    )
}
export default Pricing
const Main = styled.div`
padding-top:50px;
paddin-right:50px;
.heading{
font-size: 18px;
font-family:Roobert-medium;
font-weight: 500;
text-align:start;
}
.description{
font-family: Inter;
font-size: 14px;
color: #787373;
text-align:start;
margin-top:-10px;
width:236px;
}
.icon{
    height:19px;
    width:19px;
    margin-right:10px;
    margin-top:-3px;
}
`
const Segment = styled.div`
padding-left:50px;
padding-right:130px;
padding-top:30px;
padding-bottom:30px;

background: #FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 12px;
display:flex;
justify-content:space-between;
.stepnumber{
border: 1px solid #D81159;
width: 40px;
height: 40px;
color:#D81159;
border-radius:50%;
text-align:center;
padding-top:6px;
margin-right:20px;
}
.stepdescription{
    margin-top:8px;
}
`
const Maintain=styled.div`
display:flex;
flex-wrap:wrap;
.active{
    background: #E24F84;
    color:white;
    }
`
const Service=styled.div`
margin-right:10px;
background: #FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 8px;
padding:10px;
text-align:center;
margin-bottom:10px;
font-size: 14px;
font-family:Inter;
cursor:pointer;
`
