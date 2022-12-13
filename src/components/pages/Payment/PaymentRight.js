import React, { useEffect, useState } from 'react'
import Movingpayment from './Movingpayment'
import PressurewashingPayment from './PressurewashingPayment';

function PaymentRight(props){
    const {det,detdata,type}=props

 
    let Rightside =()=>{
        if(type==='Moving'){
            return <Movingpayment
            det={det}
            detdata={detdata}
            type={type}
            />
        }
        // else if(type==='Electricians'){
        //     return <ElectricianService/>
        // }
        // else if(type==='Plumbers'){
        //     return <PlumberService/>
        // }
        // else if(type==='HVAC Technicians'){
        //     return <HvacService/>
        // }
        else if(type==='Pressure Washing'){
            return <PressurewashingPayment
            det={det}
            detdata={detdata}
            type={type}
            />
        }
        else if(type==='Electricians'){
            return <PressurewashingPayment
            det={det}
            detdata={detdata}
            type={type}
            />
        }
        else if(type==='Plumbers'){
            return <PressurewashingPayment
            det={det}
            detdata={detdata}
            type={type}
            />
        }
        // else if(type==='Gutter Cleaning'){
        //     return <GutterCleaning/>
        // }
        // else if(type==='Cleaning'){
        //     return <CleaningService/>
        // }
        // else if(type==='Rug Cleaning'){
        //     return <RugCleaning/>
        // }
        // else if(type==='Carpet Cleaning'){
        //     return <CarpetCleaning/>
        // }
        // else if(type==='Window Cleaning'){
        //     return <WindowCleaning/>
        // }
    }
return(
    <React.Fragment>
        <div style={{display:'flex'}}>
<Rightside/>
</div>
    </React.Fragment>
)
}
export default PaymentRight
