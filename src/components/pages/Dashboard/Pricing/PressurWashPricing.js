import React from 'react'
import { Form,Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPressureWashingServiceDetails } from '../../../../store/Actions/Dashboard.actions';

function PressurewashPricing(){
const [activetoggle,setActivetoggle]=useState('Yes')
const [saved,setSaved]=useState(false)
let pressuredata = useSelector(state => state?.dashboardReducer?.pressureWashingsService);

const [values,setValues]=useState({
"fifteenToTwoThousand":pressuredata?.fifteenToTwoThousand,
"greaterThanThirtyFive":pressuredata?.greaterThanThirtyFive,
"lessThanOneThousand":pressuredata?.lessThanOneThousand,
"minimumBooking":pressuredata?.minimumBooking,
"oneThousandToFifteen":pressuredata?.oneThousandToFifteen,
"threeThousandToThirtyFive":pressuredata?.threeThousandToThirtyFive,
"travelChargePerHour":pressuredata?.travelChargePerHour,
"twentyFiveThreeThousand":pressuredata?.twentyFiveThreeThousand,
"twoThousandToTwentyFive":pressuredata?.twoThousandToTwentyFive,
})
let dispatch = useDispatch()

const handlechange=(name)=>(event,e)=>{
let value=event.target.value
setSaved(false)
setValues({...values,[name]:value})
}

const [errors,setErrors]=useState(
    {
    "tcharge":false,
    "lessThanOneThousand":false,
    "oneThousandToFifteen":false,
    "fifteenToTwoThousand":false,
     "twoThousandToTwentyFive":false,
     "twentyFiveThreeThousand":false,
     "threeThousandToThirtyFive":false,
     "greaterThanThirtyFive":false,
     "minbook":false
  })
const isValid=()=>{
if(values?.travelChargePerHour?.length===0){
    setErrors({...errors,tcharge:true})
    setTimeout(() => {
    setErrors({...errors,tcharge:false})
    }, 3000);
return false
}
else if(values?.lessThanOneThousand?.length===0){
    setErrors({...errors,'lessThanOneThousand':true})
    setTimeout(() => {
    setErrors({...errors,'lessThanOneThousand':false})
    }, 3000);
    return false
}
else if(values?.oneThousandToFifteen?.length===0){
    setErrors({...errors,'oneThousandToFifteen':true})
    setTimeout(() => {
    setErrors({...errors,'oneThousandToFifteen':false})
    }, 3000);
    return false
}
else if(values?.fifteenToTwoThousand?.length===0){
    setErrors({...errors,'fifteenToTwoThousand':true})
    setTimeout(() => {
    setErrors({...errors,'fifteenToTwoThousand':false})
    }, 3000);
     return false
}
else if(values?.twoThousandToTwentyFive?.length===0){
    setErrors({...errors,'twoThousandToTwentyFive':true})
    setTimeout(() => {
    setErrors({...errors,'twoThousandToTwentyFive':false})
    }, 3000);
    return false
}
else if(values?.twentyFiveThreeThousand?.length===0){
    setErrors({...errors,'twentyFiveThreeThousand':true})
    setTimeout(() => {
    setErrors({...errors,'twentyFiveThreeThousand':false})
    }, 3000);
   return false
}
else if(values?.threeThousandToThirtyFive?.length===0){
    setErrors({...errors,'threeThousandToThirtyFive':true})
    setTimeout(() => {
    setErrors({...errors,'threeThousandToThirtyFive':false})
    }, 3000);
  return false
}
else if(values?.greaterThanThirtyFive?.length===0){
    setErrors({...errors,'greaterThanThirtyFive':true})
    setTimeout(() => {
    setErrors({...errors,'greaterThanThirtyFive':false})
    }, 3000);
  return false
}
else if(values?.minimumBooking?.length===0){
    setErrors({...errors,minbook:true})
    setTimeout(() => {
    setErrors({...errors,minbook:false})
    }, 3000);
return false
}
else return true
}

console.log(pressuredata,'pressuredata')
const handlesubmit=async()=>{
    if(isValid()){
    let res = await dispatch(getPressureWashingServiceDetails(values))
   if(res?.status===true)
   {
    setSaved(true)
   }
    return res
  }
   }
const Yesno=['Yes','No']
    const handleyesno=(item)=>{
    setActivetoggle(item)
    }
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
            </Pricebox>

            <Pricebox className='p-3'>
            <div className='d-flex justify-content-between  '>
               <p className='inputque'>Travel Charges
              <br/>(per hour)</p>
               <CustomUrl type='number' value={values?.travelChargePerHour} onChange={handlechange('travelChargePerHour')} className={errors?.tcharge?' error':''}/>
             </div>
           </Pricebox>

           <Pricebox className='p-3'>
            <div className='d-flex justify-content-between  '>
               <p className='inputque'>Minimum booking ($)</p>
               <CustomUrl type='number' value={values?.minimumBooking} onChange={handlechange('minimumBooking')} className={errors?.minbook?' error':''}/>
             </div>
           </Pricebox>
          </Priceboxes>
           <Priceboxes>
             <Pricebox className='p-3'>
                    <p>Approx. combined area that needs cleaning</p>
                    <br/>
             <div className='d-flex justify-content-between mb-1'>
               <p className='inputque'>{`< 1000 Sq. Ft.`}</p>
               <CustomUrl type='number' value={values?.lessThanOneThousand} onChange={handlechange('lessThanOneThousand')} className={errors?.lessThanOneThousand?' error':''} />
             </div>
             <div className='d-flex justify-content-between mb-1'>
               <p className='inputque'>1000 Sq.Ft. to 1500 Sq.Ft.</p>
               <CustomUrl type='number' value={values?.oneThousandToFifteen}  onChange={handlechange('oneThousandToFifteen')}className={errors?.oneThousandToFifteen?' error':''}/>
             </div>
             <div className='d-flex justify-content-between mb-1'>
               <p className='inputque'>1500 Sq.Ft. to 2000 Sq.Ft.</p>
               <CustomUrl type='number' value={values?.fifteenToTwoThousand} onChange={handlechange('fifteenToTwoThousand')} className={errors?.fifteenToTwoThousand?' error':''}/>
               </div>
                    </Pricebox>

                    <Pricebox className='p-3'>
                    <br/>
                        <br/>
                        <br/>
                    <div className='d-flex justify-content-between mb-1'>
               <p className='inputque'>{`2000 Sq.Ft. to 2500 Sq.Ft.`}</p>
               <CustomUrl type='number' value={values?.twoThousandToTwentyFive} onChange={handlechange('twoThousandToTwentyFive')} className={errors?.twoThousandToTwentyFive?' error':''}/>
             </div>
             <div className='d-flex justify-content-between mb-1'>
               <p className='inputque'>2500 Sq.Ft. to 3000 Sq.Ft.</p>
               <CustomUrl type='number' value={values?.twentyFiveThreeThousand} onChange={handlechange('twentyFiveThreeThousand')} className={errors?.twentyFiveThreeThousand?' error':''}/>
             </div>
             <div className='d-flex justify-content-between mb-1'>
               <p className='inputque'>3000 Sq.Ft. to 3500 Sq.Ft.</p>
               <CustomUrl type='number' value={values?.threeThousandToThirtyFive} onChange={handlechange('threeThousandToThirtyFive')} className={errors?.threeThousandToThirtyFive?' error':''} />
             </div>
                    </Pricebox>

                    <Pricebox className='p-3'>
                        <br/>
                        <br/>
                        <br/>
                    <div className='d-flex justify-content-between mb-1'>
               <p className='inputque'>{`> 3500 Sq.Ft +`}</p>
               <CustomUrl type='number' value={values?.greaterThanThirtyFive} onChange={handlechange('greaterThanThirtyFive')} className={errors?.greaterThanThirtyFive?' error':''}/>
             </div>
             </Pricebox>
             </Priceboxes>
             <br/>
             <Footer className='d-flex justify-content-between'>
              <div>
                <p className='description2'>* Travel time will be applicable for every visit </p>
                <p className='description2'>* Cost of material separately</p>
              </div>
              <div>
              <Custombutton variant='dark' onClick={()=>handlesubmit()}>{saved===true?'Saved!':'Save'}</Custombutton>
              </div>
            </Footer>
</React.Fragment>
)
}

export default PressurewashPricing
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
}
`
const Priceboxes=styled.div`
.error{
    border:2px solid red;
}
display:flex;
flex-wrap:wrap;
`
const CustomUrl=styled(Form.Control)`
background: #F3F3F3;
border: 1px solid #F3F3F3;
border-radius: 8px;
height: 40px;
width: 108px;
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
.description2{
    font-family: Inter;
    font-size: 14px;
    color: #787373;
    text-align:start;
    margin-top:-10px;
}
`