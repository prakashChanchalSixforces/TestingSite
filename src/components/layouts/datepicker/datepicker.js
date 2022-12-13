import React, {useState,forwardRef} from 'react';
import {Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const Datepicker = (props)=>{

  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <StyledDOBButton variant='outline-light' className="example-custom-input" onClick={onClick} ref={ref}>
      {value? value : 
      <p 
      style={{fontFamily: 'SF Pro Display', fontWeight: '400', fontSize: '16px', color: '#787373', textAlign: 'start'
    }}
    >DD-MM-YYYY</p>}
    </StyledDOBButton>
  ));


  return(
    <>
    <label htmlFor='datepicker>' >Date of Birth</label>
    <DatePicker
        selected={props.selected?props.selected:startDate}
        onChange={(date) =>{ 
          props?.onChange(date);
          setStartDate(date)}}
        customInput={<ExampleCustomInput />}
        placeholderText="Click to select a date"
        dateFormat='dd-MM-yyyy'
        isClearable
        showYearDropdown
        // scrollableMonthYearDropdown
        // minDate={new Date
        // ("02-01-1990")}
        name='datepicker'
    />
    </>
  )
}
export default Datepicker;

const StyledDOBButton = styled(Button)`
margin-top: 0.35rem;
height: 46px;
background: #F3F3F3;
border-radius: 10px;
padding: 12px 12px 12px 12px;
color: #000;

@media (min-width: 280px) and (max-width: 359px) {
  width: 12rem;
}

@media (min-width: 360px) and (max-width: 575px) {
  width: 20rem;
}

@media (min-width: 925px) and (max-width: 1298px) {
  width: 12rem;
}

@media (min-width: 1299px)  {
  width: 18rem;
}

@media (min-width: 768px) and (max-width: 924px) {
  width: 10rem;
}
@media (max-width: 575px) and (min-width: 475px){
  width: 25.5rem;
}

@media (max-width: 768px) and (min-width: 576px){
  width: 14.5rem;
}
`