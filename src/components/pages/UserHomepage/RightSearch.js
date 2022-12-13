import React from 'react'
import { useLocation } from 'react-router-dom'
import RightProfile from '../SpprofileCustomer/RightProfile';
import CarpetCleaning from './CarpetCleaning';
import CleaningService from './CleaningService';
import ElectricianService from './ElectricianService';
import GutterCleaning from './GutterCleaning';
import HvacService from './HvacService';
import MovingService from './MovingService';
import PlumberService from './PlumberService';
import PressureWashing from './PressureWashing';
import RugCleaning from './RugCleaning';
import WindowCleaning from './WindowCleaning';
function RightSearch(){
    let location=useLocation();
        const type = location?.state?.name
        const path = location?.state?.type
    let Rightside =()=>{
        if(type==='Moving'){
            return <MovingService/>
        }
        else if(type==='Electricians'){
            return <ElectricianService/>
        }
        else if(type==='Plumbers'){
            return <PlumberService/>
        }
        else if(type==='HVAC Technicians'){
            return <HvacService/>
        }
        else if(type==='Pressure Washing'){
            return <PressureWashing/>
        }
        else if(type==='Gutter Cleaning'){
            return <GutterCleaning/>
        }
        else if(type==='Cleaning'){
            return <CleaningService/>
        }
        else if(type==='Rug Cleaning'){
            return <RugCleaning/>
        }
        else if(type==='Carpet Cleaning'){
            return <CarpetCleaning/>
        }
        else if(type==='Window Cleaning'){
            return <WindowCleaning/>
        }
    }
    return(
        <React.Fragment>
{path==='profile' ?
<RightProfile type={'profile'}/>
:
<Rightside />
}
        </React.Fragment>
    )
}

export default RightSearch
