import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MovingService from '../UserHomepage/MovingService'
import { isAuthenticated } from '../../layouts/Auth/Authentication';
import PressureWashing from '../UserHomepage/PressureWashing';
import ElectricianService from '../UserHomepage/ElectricianService';
import PlumberService from '../UserHomepage/PlumberService';
function RightProfile(props) {
    const profileData = useSelector((state) => state.profileReducer)
    const services = useSelector(state => state.customerReducer.service);
    const { profileDetails } = profileData
    const [finalData, setFinalData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        setFinalData(services?.filter(x => x.uniqueUrl === profileDetails?.uniqueUrl))
    }, [services,profileDetails?.uniqueUrl])

    let servicesoffered=profileData?.profileresponse?.data?.servicesOffered
    const handlebooknow = () => {
        window.analytics.track("SP profile customer form reserve now");
        !isAuthenticated() ?
            navigate(`/details`, { state: { servicename: servicesoffered?.includes('Pressure Washing')?'Pressure Washing':servicesoffered?.includes('Electricians')?'Electricians':servicesoffered?.includes('Plumbers')?'Plumbers':"Moving", spId: finalData?.[0]?.spId } })
            :
            navigate(`/payment`, { state: { servicename: servicesoffered?.includes('Pressure Washing')?'Pressure Washing':servicesoffered?.includes('Electricians')?'Electricians':servicesoffered?.includes('Plumbers')?'Plumbers':"Moving",spId: finalData?.[0]?.spId } })
        localStorage.setItem('type', servicesoffered?.includes('Pressure Washing')?'Pressure Washing':servicesoffered?.includes('Electricians')?'Electricians':servicesoffered?.includes('Plumbers')?'Plumbers':"Moving")
        localStorage.setItem('spId', finalData?.[0]?.spId)
        localStorage.setItem('data', JSON.stringify(finalData?.[0]))

    }

    return (
        <React.Fragment>
            {servicesoffered?.includes('Pressure Washing')?
            <PressureWashing
            profileData={finalData?.[0]}
            type={'profile'}
            reserveNow={() => handlebooknow()}
            serviceprovider={profileDetails?.uniqueUrl}
            />
            :
            servicesoffered?.includes('Electricians')?
            <ElectricianService
            profileData={finalData?.[0]}
            type={'profile'}
            reserveNow={() => handlebooknow()}
            serviceprovider={profileDetails?.uniqueUrl}
            />
            :
            servicesoffered?.includes('Plumbers')?
            <PlumberService
            profileData={finalData?.[0]}
            type={'profile'}
            reserveNow={() => handlebooknow()}
            serviceprovider={profileDetails?.uniqueUrl}
            />
             :
            <MovingService
                profileData={finalData?.[0]}
                type={'profile'}
                reserveNow={() => handlebooknow()}
                serviceprovider={profileDetails?.uniqueUrl}
            />
    }

</React.Fragment>
    )
}
export default RightProfile