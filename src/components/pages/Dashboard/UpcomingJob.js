import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUpcomingJobs } from '../../../store/Actions/Dashboard.actions';
import AssignedWorkerComponent from './components/AssignedWorkerComponent';
import ManageJobs from './components/ManageJobs';
function UpcomingJob(){
    const Headings=['Service','Client’s Name','Date and Time','Estimated Price',]
    const dispatch = useDispatch();
    const upcomingjobs = useSelector(state => state.dashboardReducer.upcomingjobs);
    const init = async () => {
        await dispatch(getUpcomingJobs())
    }
    useEffect(()=>{
        init()
     },[])
    
return(
    <React.Fragment>
<Table>
  <tr className='head' style={{borderBottomWidth:1,borderColor:'#D0CECE'}}>
  {Headings.map((item,index)=>{
        return(
            <>
    <th>{item}</th>
    {index!==Headings?.length-1?
    <th className='divider'>|</th>
    :''}
    </>
    )})}
    </tr>
    <br/>
    {upcomingjobs?.map((x,index)=>
    <tr style={{backgroundColor:'#fff'}}>
    <td>{x?.service}</td>
    <td></td>
    <td>{x?.clientName}</td>
    <td></td>
    <td>{x?.dateTime}</td>
    <td></td>
    <td>${x?.estimatedPrice}</td>
    <td></td>
    <td><AssignedWorkerComponent refrenceId={x?.referenceNo}/> </td>
    <td></td>
    <td><ManageJobs refrenceId={x?.referenceNo} type={"upcomingJob"}/> </td>
    <td></td>
    </tr>
    )}
    </Table>
    </React.Fragment> 
)
}

export default UpcomingJob

const Table = styled.table`

border-collapse: collapse;
  width: 100%;
text-align:center;
.divider{
font-weight:300;
line-height: 235%;
}
  tr:nth-child(odd){bottom-width:1px solid #F3F3F3;}
  th:first-child{
    border-radius:10px 0 0 0px;
  }

  th:last-child{
    border-radius:0 10px 0px 0;
  }
  th {
    padding-top: 14px;
    padding-bottom: 14px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  }
  td{
    font-family: Inter;
font-style: normal;
font-weight: 400;
font-size: 14px;
  }
`