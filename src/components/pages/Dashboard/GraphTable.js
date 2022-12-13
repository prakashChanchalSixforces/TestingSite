import React from 'react';
import styled from 'styled-components';

function GraphTable(){
    const Headings=['Client Name','Confirmation #','Service','Travel time',' Job hours','Approx. payout','Workers assigned']
return(
<React.Fragment>
<Table>
  <tr className='head'>
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
  <tr>
    <td>Jacom Marson</td>
    <td></td>
    <td>5584836</td>
    <td></td>
    <td>House Cleaning</td>
    <td></td>
    <td>66min</td>
    <td></td>
    <td>8h</td>
    <td></td>
    <td>256$</td>
    <td></td>
    <td>
    <br/>
    Oliver Stound
    <br/>
    Oliver Stound
    <br/>
    Oliver Stound
    <br/>
    Oliver Stound
    </td>
  </tr>
  <tr>
    <td>Jacom Marson</td>
    <td></td>
    <td>5584836</td>
    <td></td>
    <td>House Cleaning</td>
    <td></td>
    <td>66min</td>
    <td></td>
    <td>8h</td>
    <td></td>
    <td>256$</td>
    <td></td>
    <td>
    <br/>Oliver Stound
    <br/>
    Oliver Stound
    <br/>
    Oliver Stound
    <br/>
    Oliver Stound</td>
  </tr>
</Table>
</React.Fragment>
)
}
export default GraphTable

const Table = styled.table`
border-collapse: collapse;
  width: 100%;
text-align:center;
.divider{
font-weight:300;
line-height: 235%;
}
  tr:nth-child(odd){background-color: #FAFAFA;}
  th:first-child{
    border-radius:10px 0 0 0px;
  }

  th:last-child{
    border-radius:0 10px 0px 0;
  }
  th {
    padding-top: 14px;
    padding-bottom: 14px;
    background-color: black;
    color: white;
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