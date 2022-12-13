import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getuseraccountdetails, spResetPassword } from '../../../../store/Actions/Dashboard.actions';
function LoginandSecurity() {
  let dispatch = useDispatch();
  let userdetails = useSelector(state => state?.dashboardReducer?.useraccountdetails)
  const [values, setValues] = useState({
    "email": userdetails?.email,
    "password": "",
    "newPassword": ""
  })
  const [confirmPassword, setConfirmpassword] = useState('')
  const [error, setError] = useState('')
  const [passworderror, setPasswordError] = useState('')
  const [show, setShow] = useState(false);
  const [resetShow, setResetShow] = useState(false);
  const init = async () => {
    await dispatch(getuseraccountdetails())
  }
  useEffect(() => {
    init()
  }, [])

  const isValid = () => {
    console.log("hii")
    if (!values.password) {
      setPasswordError('enter the password')
      setTimeout(() => {
        setPasswordError('')
      }, 3000);
      return false
    }
    else if (confirmPassword !== values?.newPassword) {
      setError('Password not matching')
      setTimeout(() => {
        setError('')
      }, 3000);
      return false
    }
    else
      return true
  }
  const handlechange = (name, place) => (event, e) => {
    let value = event.target.value
    setValues({ ...values, [name]: value })
  }

  const onSubmit = async () => {
    console.log(values)
    if (isValid()) {
      const res = await dispatch(spResetPassword(values));
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
  }
  const handleShowHide = () => {
    setShow(!show);
  }
  const handleResetShowHide = () => {
    setResetShow(!resetShow);
  }
  return (
    <>
      <Maincontainer>
        <Heading>Login and Security</Heading>
        <br />
        <Form>
          <Label>Login email</Label>
          <Input
            type="text"
            placeholder='Login email'
            defaultValue={userdetails?.email}
            disabled={true}
          />
          <br />
          <Label>Login password</Label>
          <PasswordContainer className='d-flex'>
            <PasswordStyledInput
              required
              type={show ? 'text' : 'password'}
              placeholder='Login password'
              onChange={handlechange('password')}
              autoComplete='off'
              name='password'
            />
            {show
              ?
              <h7 onClick={handleShowHide}>Hide</h7>
              :
              <h7 onClick={handleShowHide}>Show</h7>
            }
          </PasswordContainer>

          {
            passworderror ?
              <p>{passworderror}</p>
              : null
          }
          <br />
          <Label>Reset password</Label>
          <PasswordContainer className='d-flex'>
            <PasswordStyledInput
              required
              type={resetShow ? 'text' : 'password'}
              placeholder='Login password'
              onChange={handlechange('newPassword')}
              autoComplete='off'
              name='password'
            />
            {resetShow
              ?
              <h7 onClick={handleResetShowHide}>Hide</h7>
              :
              <h7 onClick={handleResetShowHide}>Show</h7>
            }
          </PasswordContainer>
          <br />
          <Label>Confirm password</Label>
          <Input
            type="text"
            placeholder='Confirm password'
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          {
            error ?
              <p >{error}</p> : null
          }
          <div className="d-grid gap-2 mt-4">
            <Continue size='md' variant="dark" onClick={() => onSubmit()} >Update</Continue>
          </div>
        </Form>
      </Maincontainer>

    </>
  )
}

export default LoginandSecurity

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
h7{
  font - family: 'Open Sans';
  font-weight: 700;
  self-align:center;
  align-items:center;
  font-size: 14px;
  line-height: 120%;
  color: #190F0F;
  cursor: pointer;
  margin-right:10px;
  margin-top:10px;
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
const PasswordStyledInput = styled(Form.Control)`
         border:none;
         border-radius:8px;
          &:focus {
            outline: none;
          box-shadow: 0px 0px 0px white;
          border: 1px solid #fff;
          background: #fff;
        }
          `
const PasswordContainer = styled.div`
 border: 1px solid #DDDDDD;
border-radius:8px;
width:100%;
height: 44px;
&:focus {
  outline: none;
box-shadow: 0px 0px 0px white;
border: 1px solid #190F0F;
background: #fff;
}
`