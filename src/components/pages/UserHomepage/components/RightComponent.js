import { lazy } from 'react'

const MovingService = lazy(() => import('../MovingService'))
const ElectricianService = lazy(() => import('../ElectricianService'))
const PlumberService = lazy(() => import('../PlumberService'))
const HvacService = lazy(() => import('../HvacService'))
const PressureWashing = lazy(() => import('../PressureWashing'))
const GutterCleaning = lazy(() => import('../GutterCleaning'))
const CleaningService = lazy(() => import('../CleaningService'))
const RugCleaning = lazy(() => import('../RugCleaning'))
const CarpetCleaning = lazy(() => import('../CarpetCleaning'))
const WindowCleaning = lazy(() => import('../WindowCleaning'))
const TilengroutCleaning = lazy(() => import('../TilengroutCleaning'))
const RoofCleaning = lazy(() => import('../RoofCleaning'))
const Handymen = lazy(() => import('../Handymen'))
const FurnitureAssembly = lazy(() => import('../FurnitureAssembly'))
const SofaCleaning = lazy(() => import('../SofaCleaning'))
const Rightside = (props) => {
    if (props?.searchs === 'moving') {
        return <MovingService
        onHide={()=>props?.onHide(false)}
        />
    }
    else if (props?.searchs === 'electricians') {
        return <ElectricianService
        onHide={()=>props?.onHide(false)}
        />
    }
    else if (props?.searchs === 'Plumber') {
        return <PlumberService />
    }
    else if (props?.searchs === 'HVAC Technicians') {
        return <HvacService />
    }
    else if (props?.searchs === 'pressurewashing') {
        return <PressureWashing 
        onHide={()=>props?.onHide(false)}
        />
    }
    else if (props?.searchs === 'Gutter Cleaning') {
        return <GutterCleaning />
    }
    else if (props?.searchs === 'Cleaning') {
        return <CleaningService />
    }
    else if (props?.searchs === 'RugCleaning') {
        return <RugCleaning />
    }
    else if (props?.searchs === 'Carpet Cleaning') {
        return <CarpetCleaning />
    }
    else if (props?.searchs === 'Window Cleaning') {
        return <WindowCleaning />
    }
    else if (props?.searchs === 'Tile Grout') {
        return <TilengroutCleaning />
    }
    else if (props?.searchs === 'Roof Treatment') {
        return <RoofCleaning />
    }
    else if (props?.searchs === 'Furniture Assembly') {
        return <FurnitureAssembly />
    }
    else if (props?.searchs === 'Handyman') {
        return <Handymen />
    }
    else if (props?.searchs === 'Cleaning') {
        return <SofaCleaning />
    }
}

export default Rightside;