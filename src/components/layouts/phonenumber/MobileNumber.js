
import React, {useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import './phonenostyles.css'

const MobileNumber = (props) => {
  const [value, setValue] = useState("");

  return (
    <div className='phoneInput'>
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

export default MobileNumber;

