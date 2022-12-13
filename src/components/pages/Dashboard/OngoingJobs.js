import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getOngoingJobs } from '../../../store/Actions/Dashboard.actions';
import ManageJobs from './components/ManageJobs';
function OngoingJobs(){
    const Headings=['Service','Service Name','Date and Time','Workers Name',]
    const dispatch = useDispatch();
    const ongoingJobs = useSelector(state => state.dashboardReducer.ongoingJobs);
    const init = async () => {
        await dispatch(getOngoingJobs())
    }
    useEffect(()=>{
        init()
     },[])
    console.log(ongoingJobs,"jon")
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
    {ongoingJobs?.map((x,index)=>
    <>
    <tr style={{backgroundColor:'#fff'}}>
    <td>{x?.serviceName}</td>
    <td></td>
    <td>{x?.customer}</td>
    <td></td>
    <td>{x?.dateTime||'__'}</td>
    <td></td>
    <td>{x?.workers?.join(',' + ' ').toString()}</td>
    <td></td>
    <td><ManageJobs refrenceId={x?.referenceNo} type={"ongoingJob"} details={x}/> </td>
    <td></td>
    </tr>
    <br/>
    </>
    )}
    </Table>
    </React.Fragment> 
)
}

export default OngoingJobs

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