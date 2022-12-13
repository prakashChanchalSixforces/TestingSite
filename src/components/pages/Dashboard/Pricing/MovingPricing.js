import React from 'react'
import Hr from '../../../../assets/hrcustom.png'
import { Form,Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovingServiceData, getMovingServiceDetails } from '../../../../store/Actions/Dashboard.actions';

function MovingPricing(props){
const [activetoggle,setActivetoggle]=useState('Yes')
const [saved,setSaved]=useState(false)
let movingdata = useSelector(state => state?.dashboardReducer?.movingsService);
const[Hcharges,setHcharges]=useState({
"twoMoversFiveTonTruck":movingdata?.HourlyCharge?.twoMoversFiveTonTruck,
"twoMoversOneTonTruck":movingdata?.HourlyCharge?.twoMoversOneTonTruck,
"twoMoversThreeTonTruck":movingdata?.HourlyCharge?.twoMoversThreeTonTruck,
}
)
const [values,setValues]=useState(
    {
"HourlypriceforWorker":movingdata?.HourlypriceforWorker,
"minimumCharge":movingdata?.minimumCharge,
"travelChargesPerHour":movingdata?.travelChargesPerHour
    }
)
const [errors,setErrors]=useState(
    {
    "travelChargesPerHour":false,
    "HourlypriceforWorker":false,
    "minimumCharge":false,
    "twoMoversOneTonTruck":false,
     "twoMoversThreeTonTruck":false,
     "twoMoversFiveTonTruck":false,
      "errormsg":''
  })
  const isValid=()=>{
    if(values?.travelChargesPerHour?.length===0){
        setErrors({...errors,travelChargesPerHour:true})
        setTimeout(() => {
        setErrors({...errors,travelChargesPerHour:false})
        }, 3000);
    return false
    }
    else if(values?.HourlypriceforWorker?.length===0){
        setErrors({...errors,'HourlypriceforWorker':true})
        setTimeout(() => {
        setErrors({...errors,'HourlypriceforWorker':false})
        }, 3000);
        return false
    }
    else if(values?.minimumCharge?.length===0){
        setErrors({...errors,'minimumCharge':true})
        setTimeout(() => {
        setErrors({...errors,'minimumCharge':false})
        }, 3000);
        return false
    }
    else if(values?.HourlyCharge?.twoMoversOneTonTruck?.length===0){
        setErrors({...errors,'fifteenToTwoThousand':true})
        setTimeout(() => {
        setErrors({...errors,'fifteenToTwoThousand':false})
        }, 3000);
         return false
    }
    else if(values?.HourlyCharge?.twoMoversOneTonTruck<50||values?.HourlyCharge?.twoMoversOneTonTruck>250){
        setErrors({...errors,errormsg:'Hourly prices need to be between $50 and $250 per hour','fifteenToTwoThousand':true})
        setTimeout(() => {
        setErrors({...errors,errormsg:'','fifteenToTwoThousand':false})
        }, 3000);
    return false
     }
    else if(values?.HourlyCharge?.twoMoversThreeTonTruck?.length===0){
        setErrors({...errors,'twoMoversThreeTonTruck':true})
        setTimeout(() => {
        setErrors({...errors,'twoMoversThreeTonTruck':false})
        }, 3000);
        return false
    }
    else if(values?.HourlyCharge?.twoMoversThreeTonTruck<50||values?.HourlyCharge?.twoMoversThreeTonTruck>250){
        setErrors({...errors,errormsg:'Hourly prices need to be between $50 and $250 per hour','twoMoversThreeTonTruck':true})
        setTimeout(() => {
        setErrors({...errors,errormsg:'','twoMoversThreeTonTruck':false})
        }, 3000);
    return false
     }
    else if(values?.HourlyCharge?.twoMoversFiveTonTruck?.length===0){
        setErrors({...errors,'twoMoversFiveTonTruck':true})
        setTimeout(() => {
        setErrors({...errors,'twoMoversFiveTonTruck':false})
        }, 3000);
       return false
    }
    else if(values?.HourlyCharge?.twoMoversFiveTonTruck<50||values?.HourlyCharge?.twoMoversFiveTonTruck>250){
        setErrors({...errors,errormsg:'Hourly prices need to be between $50 and $250 per hour','twoMoversFiveTonTruck':true})
        setTimeout(() => {
        setErrors({...errors,errormsg:'','twoMoversFiveTonTruck':false})
        }, 3000);
    return false
     }
    else return true
    }

const Yesno=['Yes','No']
    const handleyesno=(item)=>{
    setActivetoggle(item)
    }

    const handlechange=(name)=>(event)=>{
    let value=event.target.value
    setSaved(false)
    setValues({...values,[name]:value})
   }
   const handleHcharges=(name)=>(event,e)=>{
    let value=event.target.value
    setSaved(false)
    setHcharges({...Hcharges,[name]:value})
   }

let dispatch = useDispatch();
   useEffect(()=>{
    setValues({...values,"HourlyCharge":Hcharges})
   },[Hcharges])
   const handlesubmit=async()=>{
    if(isValid()){
    let res = await dispatch(getMovingServiceDetails(values))
   if(res?.status===true)
   {
    setSaved(true)
   }
    return res
   }
   }
   console.log(movingdata,values,'movingdata')

return(
<React.Fragment>
<Priceboxes>
<Pricebox className='p-3'>
             <div className='d-flex justify-content-between '>
               <p className='inputque'>Do you charge travel time?</p>
                <Toggle className='d-flex'>
                    {Yesno?.map((item,index)=>{return(
                    <div className={activetoggle===item?'active':'normal'} onClick={()=>handleyesno(item)} key={index}>{item}</div>
                    )})}
                </Toggle>
             </div>
             <Img src={Hr} className='mt-4 mb-2'/>
             <div className='d-flex justify-content-between'>
               <p className='inputque'>Travel Charges<br/> (per hour)</p>
               <CustomUrl type='number' value={values?.travelChargesPerHour} onChange={handlechange('travelChargesPerHour')} className={errors?.travelChargesPerHour ? 'error':''}/>
             </div>
             <Img src={Hr}/>
             <div className='d-flex justify-content-between'>
               <p className='inputque'>Minimum charge ($)</p>
               <CustomUrl type='number' value={values?.minimumCharge} onChange={handlechange('minimumCharge')} className={errors?.minimumCharge? 'error':''} />
             </div>
            </Pricebox>
            <Pricebox className='p-3'>
            <div className='d-flex justify-content-between  '>
               <p className='inputque'>1-tonne truck + 2 movers
              <br/>(per hour)</p>
               <CustomUrl type='number' value={values?.HourlyCharge?.twoMoversOneTonTruck} onChange={handleHcharges('twoMoversOneTonTruck')} className={errors?.twoMoversOneTonTruck? 'error':''} />
             </div>
             <Img src={Hr}/>
             <div className='d-flex justify-content-between'>
               <p className='inputque'>3-tonne truck + 2 movers
               <br/>(per hour)</p>
               <CustomUrl type='number' value={values?.HourlyCharge?.twoMoversThreeTonTruck} onChange={handleHcharges('twoMoversThreeTonTruck')} className={errors?.twoMoversThreeTonTruck? 'error':''} />
             </div>
             <Img src={Hr}/>
             <div className='d-flex justify-content-between'>
               <p className='inputque'>5-tonne truck + 2 movers
               <br/>(per hour)</p>
               <CustomUrl type='number' value={values?.HourlyCharge?.twoMoversFiveTonTruck} onChange={handleHcharges('twoMoversFiveTonTruck')} className={errors?.twoMoversFiveTonTruck? 'error':''}/>
             </div>
           </Pricebox>
           <Pricebox className='p-3'>
           <div className='d-flex justify-content-between'>
               <p className='inputque'>Additional movers
               <br/>(per hour)</p>
               <CustomUrl type='number' value={values?.HourlypriceforWorker} onChange={handlechange('HourlypriceforWorker')} className={errors?.HourlypriceforWorker? 'error':''}/>
             </div>
            </Pricebox>
            </Priceboxes>
            <br/>
            <br/>
            <Footer className='d-flex justify-content-between'>
              <div>
                <p className='description2'>* Travel time will be applicable for every visit </p>
                <p className='description2'>* Cost of material separately</p>
              </div>
              <div>
                <p className='errormsg'>{errors?.errormsg}</p>
              </div>
              <div>
                <Custombutton variant='dark' onClick={()=>handlesubmit()}>{saved===true?'Saved!':'Save'}</Custombutton>
              </div>
            </Footer>
</React.Fragment>
)
}

export default MovingPricing

const Pricebox=styled.div`
border: 1px solid #F3F3F3;
background:white;
border-radius: 8px;
margin-right:10px;
margin-bottom:20px;
.inputque{
font-family: Inter;
font-size: 16px;
margin-right:40px;

`
const CustomUrl=styled(Form.Control)`
background: #F3F3F3;
border: 1px solid #F3F3F3;
border-radius: 8px;
height: 40px;
width: 108px;
`
const Img=styled.img`
width:100%;
height:1px;
`
const Toggle=styled.div`
width: 154px;
height: 40px;
cursor:pointer;
.active{
text-align: center;
font-family: Inter;
color:white;
background: #E24F84;
border-radius: 8px;
width: 77px;
height: 40px;
padding-top:8px;
}
.normal{
text-align: center;
font-family: Inter;
font-size: 16px;
color: #787373;
padding-top:8px;
padding-left:10px;
padding-right:10px;
}
`
const Custombutton=styled(Button)`
margin-right:30px;
width: 205px;
height: 44px;
border: 1px solid #D0CECE;
border-radius: 8px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
`
const Footer=styled.div`
display:flex;
justify-content:space-between;
.description2{
    font-family: Inter;
    font-size: 14px;
    color: #787373;
    text-align:start;
    margin-top:-10px;
}
.errormsg{
    font-family: Inter;
    font-size: 18px;
    color: red;
    text-align:start;
    margin-top:-10px;
}
`
const Priceboxes=styled.div`
display:flex;
flex-wrap:wrap;
.error{
    border:2px solid red;
    }
`