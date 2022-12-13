import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-elastic-carousel';
import styled from 'styled-components';
import { getServices } from '../../../store/Actions/serviceProvider.actions';

function HomeServices(){
    const dispatch = useDispatch();
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
        //'Cleaning'
    ]
    const navigate = useNavigate();
    let handlesearch = async (name) => {
       let decodedname=decodeURI(name)
        if ( OpenedServices.includes(decodedname)) {
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
          itemsToShow: 6,
          pagination: false,
          showArrows: true,
        },
        {
          width: 1068,
          itemsToShow: 10,
          pagination: false,
          // showArrows: false,
          //disableArrowsOnEnd: true,
          showArrows:true,
        },
        {
          width: 1500,
          itemsToShow: 13,
          showArrows:true,
          pagination: false,
        },
      ];
return(
    <React.Fragment>
    <Horizontal>
            <Services>

            <Carousels onNextEnd={()=>{
                 window.analytics.track("Left arrow illustration",{
                    "url":window.location?.pathname
                });
            }} onNextStart={()=>{
                window.analytics.track("Right arrow illustration",{
                    "url":window.location?.pathname
                });
            }} breakPoints={breakPoints} style={{ padding: "8px" }} className='rec'>
                    {serve?.map((x, index) => {
                        return (
                            <>
                            <div className='img-wrapper'>
                                <Serviceimg  src={x.greyurl} alt='url' key={index} className={OpenedServices.includes(x.name)?'serviceimg':''}
                                onClick={() => {
                                    window.analytics.track(`Homepage illustration`,{
                                        type:`${x.name} service`
                                    })
                                    handlesearch(x.name)}} style={{ cursor:OpenedServices.includes(x.name)?'pointer':'' }} />
                                    <p className='headText'>{x.name}</p>
                                {OpenedServices.includes(x.name)?  '':<h5 class="overlay">Coming Soon</h5>}
                            </div>
                                </>
                        )
                    })}
                </Carousels>
                </Services>

            </Horizontal>
            </React.Fragment>
)
}
export default HomeServices
const Carousels=styled(Carousel)`
border:0px solid #fff;
.rec.rec-arrow {
    border-radius: 0;
    border:0px solid none;
    background:none;
    box-shadow: none;
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
height:97px;
margin-top:50px;
@media (min-width: 260px) and (max-width: 800px){
    margin-top:-10px;
    margin-bottom:30px;
  }
`
const Services = styled.div`
display:flex;
.overlay{
    display:none;
}
.img-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 106px;
    width: 88px;
    border-radius: 12px;
    padding: 26px 77px;
    gap: 8px;
}
.headText {
text-align:center;
font-family:Roobert-medium;
font-size: 14px;
color:#787373;
}
.img-wrapper:hover .serviceimg{
    -webkit-filter:  grayscale(100%) brightness(51%);

}
.img-wrapper:hover .overlay {
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


`