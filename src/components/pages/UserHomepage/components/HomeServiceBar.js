import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-elastic-carousel';
import styled from 'styled-components';
import { getServices } from '../../../../store/Actions/serviceProvider.actions';

function HomeServicesBar(props) {
    const [type, setType] = useState(props?.type)
    const dispatch = useDispatch();
    const init = async () => {
        await dispatch(getServices())
    }
    useEffect(() => {
        init()
    }, [])
    const OpenedServices = [
        'Pressure Washing',
        'Moving',
        'Electricians',
        'Plumbers',
        //'Cleaning'
    ]
    const navigate = useNavigate();
    let handlesearch = async (name) => {
        console.log(name,"name")
        props?.serviceName(name)
        let decodedname = decodeURI(name)
        props.setActivePage(1)
        setType(decodedname)
        if (OpenedServices.includes(decodedname)) {
            navigate(`/${decodedname.toLowerCase().split(" ").join("")}`, { state: { name: decodedname } })
        }
        else {
         
            //alert(res.data)
            // console.log(res.data)
        }
    }
    const services = useSelector(state => state.serviceProvider.services);

    let ourservices = services?.map((x) => x.symbol)
    let serve = ourservices[0]
    const breakPoints = [
        { width: 1, itemsToShow: 3, pagination: false },
        {
            width: 550,
            itemsToShow: 5,
            pagination: false,
            showArrows: true,
        },
        {
            width: 1068,
            itemsToShow: 9,
            pagination: false,
            // showArrows: false,
            //disableArrowsOnEnd: true,
            showArrows: true,
        },
        {
            width: 1500,
            itemsToShow: 13,
            showArrows: true,
            pagination: false,
        },
    ];
    return (
        <React.Fragment>
            <Horizontal>
                <Services>
                    <Carousels onNextEnd={() => {
                        window.analytics.track("Left arrow illustration", {
                            "url": window.location?.pathname
                        });
                    }} onNextStart={() => {
                        window.analytics.track("Right arrow illustration", {
                            "url": window.location?.pathname
                        });
                    }} breakPoints={breakPoints} style={{ padding: "8px" }} className='rec'>
                        {serve?.map((x, index) => {
                            return (
                                <>
                                    <div className='img-wrapper' style={{
                                                 cursor: OpenedServices.includes(x.name) ? 'pointer' : '' }} onClick={() => {
                                                    window.analytics.track(`Homepage illustration`, {
                                                        type: `${x.name} service`
                                                    })
                                                        if (OpenedServices.includes(x.name))
                                                        { handlesearch(x.name)
                                                        }
                                                }}>
            
                                        <Serviceimg src={x.name === type?x.url:x.greyurl} alt='url' key={index} className={OpenedServices.includes(x.name) ? 'image-container' : 'serviceimg  '}
                                             style={{ cursor: OpenedServices.includes(x.name) ? 'pointer' : '' }} />
                                        <div>
                                            <p className='headText' style={{
                                                 cursor: OpenedServices.includes(x.name) ? 'pointer' : '' ,
                                                color:x.name === type?"#000":"#787373"
                                            }}>{x.name}</p>
                                            {x.name === type ? <hr className='new4' /> : null}
                                            </div>
                                        {OpenedServices.includes(x.name) ? '' :
                                        <h5 class="overlay">Coming Soon</h5>
                                        }

                                    </div>

                                </>
                            )
                        })}
                    </Carousels>

                </Services>
                <br />
            </Horizontal>
        </React.Fragment>
    )
}
export default HomeServicesBar

const Carousels=styled(Carousel)`
border:0px solid #fff;
.rec.rec-arrow {
    border-radius: 0;
    border:0px solid none;
    background:none;
    box-shadow: none;
    margin-top:-30px;
    @media (min-width: 260px) and (max-width: 820px){
        display:none;
    }
}
.rec.rec-arrow:hover {
   color:black;
   @media (min-width: 260px) and (max-width: 820px){
    display:none;
}

}
`
const Horizontal = styled.div`
white-space: nowrap;
background:#FAFAFA;
background-color:#FAFAFA;
height:102px;
display:flex;
justify-content:center;
`
const Services = styled.div`
display:flex;
width:1312px;
justify-content:center;
@media (min-width: 260px) and (max-width: 820px){
    width:100%;
    }
.overlay{
    display:none;
}
.img-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    padding: 6px 17px;
    gap: 8px;
    height:106px;
}
}
.new4 {
    border: 1px solid #000;
    margin-top:-8px;
  }
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
 }
.bottomline{
    border-bottom: 1rem solid;
}
.headText {
text-align:center;
font-family:Inter;
font-size: 14px;

}

.img-wrapper:hover  .overlay {
    display:block;
    margin-top:-7px;
    color:#787373;
    padding:6px;
    background:#F3F3F3;
    border-radius:12px;
    -webkit-filter: blur(0px);
    filter: blur(0px);
    position:absolute;
    font-family:Inter;
    font-size:10px;
    text-align:center;
    margin-left:85px;
    @media (min-width: 260px) and (max-width: 800px){
    font-size:8px;
  }
`
const Serviceimg = styled.img`
width: 32px;
height: 32px;
align-self:center;

`