import React from 'react'
import Hr from '../../../../assets/hrcustom.png'
import { Form,Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getHouseCleaningServiceDetails } from '../../../../store/Actions/Dashboard.actions';

function CleaningPricing(){
const [saved,setSaved]=useState(false)
let cleaningserviceData = useSelector(state => state?.dashboardReducer?.gethousecleaningService);

const [values,setValues]=useState(
    {
"travelTime":cleaningserviceData?.travelTime,
"oneCleaner":cleaningserviceData?.oneCleaner,
"twoCleaner":cleaningserviceData?.twoCleaner,
"threeCleaner":cleaningserviceData?.threeCleaner,
"fourCleaner":cleaningserviceData?.fourCleaner,
"minimumOrder":cleaningserviceData?.minimumOrder
    }
)
const [errors,setErrors]=useState(
    {
    "travelTime":false,
    "oneCleaner":false,
    "twoCleaner":false,
    "threeCleaner":false,
    "fourCleaner":false,
    "minimumOrder":false
  })
  const isValid=()=>{
    if(values?.travelTime?.length===0){
        setErrors({...errors,travelTime:true})
        setTimeout(() => {
        setErrors({...errors,travelTime:false})
        }, 3000);
    return false
    }
    else if(values?.oneCleaner?.length===0){
        setErrors({...errors,'oneCleaner':true})
        setTimeout(() => {
        setErrors({...errors,'oneCleaner':false})
        }, 3000);
        return false
    }
    else if(values?.minimumOrder?.length===0){
        setErrors({...errors,'minimumOrder':true})
        setTimeout(() => {
        setErrors({...errors,'minimumOrder':false})
        }, 3000);
        return false
    }
    else if(values?.twoCleaner?.length===0){
        setErrors({...errors,'twoCleaner':true})
        setTimeout(() => {
        setErrors({...errors,'twoCleaner':false})
        }, 3000);
         return false
    }
    else if(values?.threeCleaner?.length===0){
        setErrors({...errors,'threeCleaner':true})
        setTimeout(() => {
        setErrors({...errors,'threeCleaner':false})
        }, 3000);
         return false
    }
    else if(values?.fourCleaner?.length===0){
        setErrors({...errors,'fourCleaner':true})
        setTimeout(() => {
        setErrors({...errors,'fourCleaner':false})
        }, 3000);
         return false
    }
    else return true
    }

    const handlechange=(name)=>(event,e)=>{
    let value=event.target.value
    setSaved(false)
    setValues({...values,[name]:value})
   }


let dispatch = useDispatch()
console.log(cleaningserviceData,values,'electriciandata')

   const handlesubmit=async()=>{
    if(isValid()){
    let res = await dispatch(getHouseCleaningServiceDetails(values))
   if(res?.status===true)
   {
    setSaved(true)
   }
    return res
   }
   }
return(
<React.Fragment>
<Priceboxes>
<Pricebox className='p-3'>
             <div className='d-flex justify-content-between '>
               <p className='inputque'>Travel time (per hour)</p>
               <CustomUrl type='number' value={values?.travelTime} onChange={handlechange('travelTime')} className={errors?.travelTime ? 'error':''}/>
             </div>
             <Img src={Hr} className='mt-4 mb-2'/>
             <div className='d-flex justify-content-between'>
               <p className='inputque'>Minimum order ($)</p>
               <CustomUrl type='number' value={values?.minimumOrder} onChange={handlechange('minimumOrder')} className={errors?.minimumOrder ? 'error':''}/>
             </div>

            </Pricebox>
            <Pricebox className='p-3'>
            <div className='d-flex justify-content-between'>
               <p className='inputque'>One cleaner (per hour)</p>
               <CustomUrl type='number' value={values?.oneCleaner} onChange={handlechange('oneCleaner')} className={errors?.oneCleaner? 'error':''} />
             </div>
             <Img src={Hr}/>
             <div className='d-flex justify-content-between'>
               <p className='inputque'>Two cleaner (per hour)
               </p>
               <CustomUrl type='number' value={values?.twoCleaner} onChange={handlechange('twoCleaner')} className={errors?.twoCleaner? 'error':''} />
             </div>
           </Pricebox>
           <Pricebox className='p-3'>
            <div className='d-flex justify-content-between'>
               <p className='inputque'>Three cleaner (per hour)</p>
               <CustomUrl type='number' value={values?.threeCleaner} onChange={handlechange('threeCleaner')} className={errors?.threeCleaner? 'error':''} />
             </div>
             <Img src={Hr}/>
             <div className='d-flex justify-content-between'>
               <p className='inputque'>Four cleaner (per hour)
               </p>
               <CustomUrl type='number' value={values?.fourCleaner} onChange={handlechange('fourCleaner')} className={errors?.fourCleaner? 'error':''} />
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

export default CleaningPricing

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