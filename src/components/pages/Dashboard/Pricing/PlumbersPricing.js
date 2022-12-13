import React from 'react'
import Hr from '../../../../assets/hrcustom.png'
import { Form,Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPlumberServiceDetails } from '../../../../store/Actions/Dashboard.actions';

function PlumbersPricing(){
const [activetoggle,setActivetoggle]=useState('Yes')
const [saved,setSaved]=useState(false)
let plumbersServicedata = useSelector(state => state?.dashboardReducer?.getplumbersService);

const [values,setValues]=useState(
    {
"hourlyRate":plumbersServicedata?.hourlyRate,
"minimumOrder":plumbersServicedata?.minimumOrder,
"serviceCall":plumbersServicedata?.serviceCall,
"travelChargesPerHour":plumbersServicedata?.travelChargesPerHour
    }
)
const [errors,setErrors]=useState(
    {
    "travelChargesPerHour":false,
    "hourlyRate":false,
    "minimumOrder":false,
    "serviceCall":false,
  })
  const isValid=()=>{
    if(values?.travelChargesPerHour?.length===0){
        setErrors({...errors,travelChargesPerHour:true})
        setTimeout(() => {
        setErrors({...errors,travelChargesPerHour:false})
        }, 3000);
    return false
    }
    else if(values?.hourlyRate?.length===0){
        setErrors({...errors,'hourlyRate':true})
        setTimeout(() => {
        setErrors({...errors,'hourlyRate':false})
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
    else if(values?.serviceCall?.length===0){
        setErrors({...errors,'serviceCall':true})
        setTimeout(() => {
        setErrors({...errors,'serviceCall':false})
        }, 3000);
         return false
    }
    else return true
    }

const Yesno=['Yes','No']
    const handleyesno=(item)=>{
    setActivetoggle(item)
    }

    const handlechange=(name)=>(event,e)=>{
    let value=event.target.value
    setSaved(false)
    setValues({...values,[name]:value})
   }


let dispatch = useDispatch()

console.log(plumbersServicedata,values,'electriciandata')

   const handlesubmit=async()=>{
    if(isValid()){
    let res = await dispatch(getPlumberServiceDetails(values))
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

            </Pricebox>
            <Pricebox className='p-3'>
            <div className='d-flex justify-content-between'>
               <p className='inputque'>Minimum order ($)</p>
               <CustomUrl type='number' value={values?.minimumOrder} onChange={handlechange('minimumOrder')} className={errors?.minimumOrder? 'error':''} />
             </div>
             <Img src={Hr}/>
             <div className='d-flex justify-content-between'>
               <p className='inputque'>Service Call or First hour
               <br/>
               (excluding time of travel)
               </p>
               <CustomUrl type='number' value={values?.serviceCall} onChange={handlechange('serviceCall')} className={errors?.serviceCall? 'error':''} />
             </div>
           </Pricebox>
           <Pricebox className='p-3'>
           <div className='d-flex justify-content-between'>
               <p className='inputque'>Hourly rate after <br/>
                the first hour (per hour)</p>
               <CustomUrl type='number' value={values?.hourlyRate} onChange={handlechange('hourlyRate')} className={errors?.hourlyRate? 'error':''}/>
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

export default PlumbersPricing

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