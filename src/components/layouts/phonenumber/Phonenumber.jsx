
import React, {useState } from 'react';
import 'react-phone-number-input/style.css';
import {Row, Col } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import './phonenostyles.css'

const Phonenumber = (props) => {
  const [value, setValue] = useState("");

  return (
    <div className='phone-input-owner'>
      <Row>
      <Col lg={4} sm={4} xs={4} md={4}>
      <label htmlFor='phoneinputCountry' >Country Code</label>
      </Col>
      <Col lg={8} sm={8} xs={8} md={8}>
      <label  htmlFor='phoneinput'>Phone Number</label>
      </Col>
      </Row>
      <PhoneInput
        name='phoneinput'
        international
        placeholder="Enter phone number"
        value={props.value?props.value:value}
        focusInputOnCountrySelection='true'
        defaultCountry="CA"
        onChange={(value)=>{
          setValue(value);
        props?.onChange(value);
        }}
        limitMaxLength='true'
      />
    </div>
  )
}

export default Phonenumber;

