import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import tray from '../../../../assets/tray.png';
import { getuseraccountdetails, insurenceVerification } from '../../../../store/Actions/Dashboard.actions';
import { useDispatch, useSelector } from 'react-redux';

function InsuranceVerification() {
    const [fileName, setFileName] = useState('');
    const [imageUrl, setImageUrl] = useState([]);
    const [error, setError] = useState('');
    let userdetails = useSelector(state => state?.dashboardReducer?.useraccountdetails)
    let dispatch = useDispatch();
    const handleFileSelected = (e) => {
        const files = Array.from(e.target.files)
        setFileName(files[0].name);
        const fileURL = URL.createObjectURL(files[0])
        setImageUrl(fileURL)
    }
    const [values, setValues] = useState({
        "GLC":userdetails?.GLC
    })

    const init = async () => {
        await dispatch(getuseraccountdetails())
        const val=userdetails?.insuranceExp.split('-')
        console.log(val,"vallll")
        setValues({ ...values, "DD": val[0], "MM": val[1] ,"YYYY":val[2] })
      }
      useEffect(() => {
        init()
      }, [])
      console.log(values,"vavavava")
    const handlechange = (name, place) => (event, e) => {
        let value = event.target.value
        setValues({ ...values, [name]: value })
    }

    const onSubmit = async () => {
        const details = {
            "GLC": values?.Coverage,
            "insuranceExp": `${values?.DD}-${values?.MM}-${values?.YYYY}`,
            "insurancePhoto": imageUrl
        }
        console.log(values)
        const res = await dispatch(insurenceVerification(details));
        if (res.status) {
            window.location.reload()
        }
        else {
            setError(res?.message)
            setTimeout(() => {
                setError('')
            }, 5000);
        }

    }
    return (
        <>
            <Maincontainer>
                <Heading>Insurance verification</Heading>
                <br />
                <Form>
                    <Label >General Liability Coverage</Label>
                    <Input
                        type="text"
                        placeholder='General Liability Coverage'
                        onChange={handlechange('Coverage')}
                        defaultValue={values?.GLC}
                    />
                    <br />
                    <Label >Expiry date</Label>
                    <div className='d-flex'>
                        <div>
                            <Input
                                type="text"
                                placeholder='DD'
                                onChange={handlechange('DD')}
                                type='number'
                                maxLength="2"
                                defaultValue={values?.DD}
                            />
                        </div>
                        &nbsp;&nbsp;
                        <div>
                            <Input
                                type="text"
                                placeholder='MM'
                                onChange={handlechange('MM')}
                                type='number'
                                maxLength="2"
                                defaultValue={values?.MM}
                            />
                        </div>
                        &nbsp;&nbsp;
                        <div>
                            <Input
                                type="text"
                                placeholder='YYYY'
                                onChange={handlechange('YYYY')}
                                type='number'
                                maxLength="4"
                                defaultValue={values?.YYYY}
                            />
                        </div>

                    </div>
                    <Label className='mt-4'>Place to upload the document  </Label >
                    <StyledDocUploadInput
                        name='docupload'
                        type='file'
                        id='file'
                        accept="image/*"
                        onChange={handleFileSelected}
                    />

                    <StyledDocUploadLabel for='file'>
                        {fileName
                            ?
                            <p style={{ color: '#398AFF', marginTop: '12px', fontWeight: '400', fontSize: '16px', lineHeight: '150%' }}>{fileName}</p>
                            :
                            <span><DocUploadLogo src={tray} className='docuploadlogo' />&nbsp;&nbsp;&nbsp;&nbsp;Click here to upload</span>}
                    </StyledDocUploadLabel>

                </Form>
                {
                    error ?
                        <p >{error}</p> : null
                }
                <div className="d-grid gap-2 mt-4">
                    <Continue size='md' variant="dark" onClick={() => onSubmit()}>Edit</Continue>
                </div>
            </Maincontainer>
        </>
    )
}

export default InsuranceVerification

const Heading = styled.h1`
font-weight: 500;
font-size: 24px;
text-align:start;
`
const Maincontainer = styled.div`
padding-left:250px;
padding-right:450px;
margin-top:40px;
p{
    font-size:14px;
    font-family:Roobert-medium;
    font-weight: 500;
    color:#D81159;
    margin-left:5px;
    }
`
const Input = styled(Form.Control)`
border-radius:8px;
`
const Continue = styled(Button)`
background-color:black;
border:1px solid white;
border-radius:10px;
`
const Label = styled(Form.Label)`
font-size:14px;
`

const StyledDocUploadInput = styled.input`
display: none;
`
const StyledDocUploadLabel = styled.label`
height: 50px;
left: 0px;
top: 27px;
background: #Fff;
border: 2px dashed #D0CECE;
box-sizing: border-box;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;

@media (min-width: 360px) and (max-width: 767px) {
    width: 22rem;
}
@media (min-width: 768px) and (max-width: 1248px) {
    width: 25rem;
}
`
const DocUploadLogo = styled.img`
width: 1.5rem;
height: 1.5rem;
`
