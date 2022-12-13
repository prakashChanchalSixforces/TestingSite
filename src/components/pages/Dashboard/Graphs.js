import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import help from '../../../assets/help.png';
import Hr from '../../../assets/hrcustom.png';
import Vr from '../../../assets/vr.png';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import GraphTable from './GraphTable';
import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { getTotalrevenue } from '../../../store/Actions/Dashboard.actions';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function Graphs(){

    const Days=['Today','Yesterday','Week','Month','Quarter','Year']
    const [activeday,setActiveday]=useState('Today')
    let dispatch=useDispatch()
    const handleday=(day)=>{
     setActiveday(day)
    }
    const init=async(activeday)=>{
await dispatch(getTotalrevenue(activeday))
    }
    useEffect(()=>{
   init(activeday)
    },[activeday])
    const Revenuedetails = useSelector(state => state?.dashboardReducer?.revenue)
 let revenuelabels= Revenuedetails?.map(x=>x.x)
 let revenuedata= Revenuedetails?.map(x=>x.y)
 let result1 = revenuelabels?.every( e  => e === 0);
 let result2 = revenuedata?.every( e  => e === 0);

  const revenue = {
    labels:revenuelabels&&result1!==true?revenuelabels:['','','','','','','','','',''],
    datasets: [
      {
      label: '',
      usePointStyle: true,
      data: revenuedata&&result2!==true?revenuedata:[0]
      ,
      background: '#D81159',
      backgroundColor:'#D81159',
      borderColor:'#D81159',
      borderWidth: 2,
      lineTension: 0.8,
      pointRadius: 0
    }
    ],
  }
  const Bookcancel = {
    labels:['','','','','','',''],
    datasets: [
      {
      label: 'Bookings',
      usePointStyle: true,
      data: [0]
      ,
      backgroundColor: 'black',
      borderColor:'black',
      borderWidth: 2,
      lineTension: 0.8,
      pointRadius: 0
    },
    {
      label: 'cancellations',
      data: [0],
      borderColor:'#D81159',
      backgroundColor: '#D81159',
        borderWidth: 2,
        lineTension: 0.8,
        pointRadius: 0
    }
    ],

}

const jobstoday = {
    labels:['','','','','','',''],
    datasets: [
    {
    label: 'Jobs that are done',
    usePointStyle: true,
    data: [0]
    ,
    backgroundColor: '#D81159',
    borderColor:'#D81159',
    borderWidth: 2,
    lineTension: 0.8,
    pointRadius: 0
  }
  ],
}

const insuranceclaims = {
  labels:['','','','','','',''],
  datasets: [
    {
    label: 'Insurance claims',
    usePointStyle: true,
    data: [0]
    ,
    backgroundColor: '#EB873F',
    borderColor:'#EB873F',
    borderWidth: 2,
    lineTension: 0.8,
    pointRadius: 0
  }
  ],
}

  const options = {
    scales: { y: { display: false },x:{
        grid:{
            drawTicks:false
        }
    } },
    plugins: {
      legend: {
          align:'end',
          position:'top',
        labels: {
          usePointStyle: false,
          boxWidth: 0,
        }
      }
    },
    responsive:true,
    maintainAspectRatio:false,
  }
  const smallgraphoptions = {
    scales: { y: { display: false },x:{
        grid:{
            drawTicks:false
        }
    } },
    plugins: {
      legend: {
          align:'start',
          position:'bottom',
          datalabels: {
            display: false
          },
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        }  ,
      },
    },
    responsive:true,
    maintainAspectRatio:false,
  }
    return(
        <React.Fragment>
         <Main>
          <div className='d-flex justify-content-between'>
            <div className='active d-flex'>
              <p>{`<`}</p> &nbsp;&nbsp; <p> {activeday} </p> &nbsp;&nbsp;<p>{`>`}</p>
            </div>
            <div className='d-flex'>
                {Days?.map((item,index)=>{
                            return(
            <div className={activeday===item?'activeday':'days'} onClick={()=>handleday(item)}>
             <p  key={index}>{item}</p>
             </div>
                            )
                })}
            </div>
          </div>
          <br/>

          <Segment>
            <div>
            <div className='d-flex justify-content-between'>
          <div className='d-flex'><img src={help} className='info' alt='info'/>&nbsp;&nbsp;<h1 className='revenuehead'>Total number of Revenue</h1></div>
          <div className='d-flex'><p className='dot'>.</p>&nbsp;<h1 className='graphhead'>Renevue number</h1></div>
          </div>
          <div className='d-flex mt-3'><h1 className='number'>0</h1>&nbsp;<h1 className='day'>Today</h1></div>

          <div className='revenue'>
          <Line options={options} data={revenue}  />
          </div>
          </div>
          <Hrdesign src={Hr} className='mb-3'/>
          <div className='d-flex'>
           <div className='subgraphs'>
           <div className='d-flex'><img src={help} className='info' alt='info'/>&nbsp;&nbsp;<h1 className='subhead'>Number of cancellations and bookings</h1></div>
           <div className='d-flex mt-3'><h1 className='number'>0</h1>&nbsp;<h1 className='day'>Today</h1></div>
           <div className='revenue'>
          <Line options={smallgraphoptions} data={Bookcancel}  />
          </div>
           </div>
           <div className='subgraphs'>
            <Vrdesign src={Vr}/>
           </div>
           <div className='subgraphs'>
           <div className='d-flex'><img src={help} className='info' alt='info'/>&nbsp;&nbsp;<h1 className='subhead'>Jobs that are done today</h1></div>
           <div className='d-flex mt-3'><h1 className='number'>0</h1>&nbsp;<h1 className='day'>Today</h1></div>
           <div className='revenue'>
          <Line options={smallgraphoptions} data={jobstoday}  />
          </div>
           </div>
           <div className='subgraphs'>
            <Vrdesign src={Vr}/>
           </div>
           <div className='subgraphs'>
           <div className='d-flex'><img src={help} className='info' alt='info'/>&nbsp;&nbsp;<h1 className='subhead'>Insurance claims</h1></div>
           <div className='d-flex mt-3'><h1 className='number'>0</h1>&nbsp;<h1 className='day'>Today</h1></div>
           <div className='revenue'>
          <Line options={smallgraphoptions} data={insuranceclaims}  />
          </div>
           </div>
          </div>

          <br/>
          <br/>
{/* <GraphTable/> */}
<br/>
          </Segment>
         </Main>
        </React.Fragment>
    )
}
export default Graphs

const Main = styled.div`
padding-top:60px;
padding-right:60px;
position : absolute;
.active{
    font-family:Inter;
    color:#787373;
}
.days{
    margin-right:30px;
    color:#787373;
    font-family:Roobert-medium;
    font-size: 14px;
    cursor:pointer;
}
.activeday{
background-color:#D81159;
background:#D81159
text-align:center;
border-radius:4px;
color:white;
width: 77px;
height: 32px;
margin-right:30px;
text-align:center;
font-family:Roobert-medium;
font-size: 14px;
padding-top:6px;
margin-top:-8px;
cursor:pointer;
}
`
const Segment=styled.div`
background-color:white;
background:white;
border: 1px solid #F3F3F3;
border-radius: 8px;
padding:20px;
.revenue{
height:150px;
width: 100%;
}

.dot{
width: 8px;
height: 8px;
background: #D81159;
border-radius:50%;
margin-top:4px;
}
.revenuehead{
font-size: 18px;
font-family:Roobert-medium;
font-weight: 500;
}
.subhead{
font-size: 14px;
font-family:Inter;
font-weight: 500;
margin-top:5px;
}
.info{
height:14px;
width:14px;
margin-top:5px;
}
.number{
font-weight: 600;
font-size: 24px;
font-family:Roobert-medium;
}
.day{
font-size: 12px;
font-family:Inter;
color: #D0CECE;
margin-top:9px;
}
.graphhead{
color: #787373;
font-size: 12px;
font-family:Roobert-medium;
}
.subgraphs{
    margin-right:30px;
}
`
const Hrdesign=styled.img`
width:100%;
height:2px;
`
const Vrdesign=styled.img`
height:100%;
width:1px;
`