import React, { useState, useEffect } from 'react'
import { Modal, Form, Col, Button, Row, Container } from 'react-bootstrap'
import '../../../layouts/Auth/modalStyles.css'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { sendInviteToworker } from '../../../../store/Actions/Dashboard.actions';
import MobileNumber from '../../../layouts/phonenumber/MobileNumber';

const WokerInviteButton = (props) => {
    const { value } = props
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const onSentInvite = async () => {
        const data = {
            "medium": "email",
            "email": email,
            "userName": name
        }
        const res = await dispatch(sendInviteToworker(data))
        console.log(res)
        setOpen(false)

    }
    useEffect(() => {
        setOpen(value)
    }, [value])
    useEffect(() => {
        props?.onchangeModal(open)
    }, [open, props])

    return (
        <div>
            <Form.Group>
                <Multiselect onClick={() => open ? setOpen(false) : setOpen(true)}>
                    <Text2 className='mt-2'>Add new member</Text2>
                </Multiselect>
                <Modal
                    {...props}

                    dialogClassName="auth-verification-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={open}
                    onHide={() => setOpen(false)}
                >
                    <Header closeButton={() => setOpen(false)}  >
                        Add new member
                    </Header>
                    <Modal.Body>
                        <div className='signup-modal-right'>
                            <MemberForm>
                                <Container>
                                    <Row>
                                        <Col sm={11} lg={11} md={11} xs={11}>
                                            <br />
                                            <StyledLabel>Name </StyledLabel>
                                            <StyledInput
                                                type="text"
                                                placeholder="Name"
                                                name='Name'
                                                required
                                                autoComplete='off'
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                            />
                                            <br />
                                            <StyledLabel>Mobile Number </StyledLabel>
                                            <div>
                                                <MobileNumber
                                                    name='phoneinput'
                                                    international
                                                    className='li'
                                                    placeholder="Enter phone number"
                                                    //value={phoneNumber}
                                                    focusInputOnCountrySelection='true'
                                                    defaultCountry="CA"

                                                    limitMaxLength='true'
                                                />
                                            </div>
                                            <br />
                                            <StyledLabel>Email </StyledLabel>
                                            <StyledInput
                                                type="text"
                                                placeholder="Email"
                                                name='Email'
                                                required
                                                autoComplete='off'
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                            <br />
                                            <CheckContainer >
                                                <Form.Check

                                                    inline
                                                    label={"Consent"}
                                                    name={"Consent"}
                                                    type='checkbox'
                                                    value={"Consent"}
                                                    id={"Consent"}
                                                    checked={"Consent"}
                                                    onClick={"Consent"}
                                                />
                                            </CheckContainer>
                                            <br />
                                            <SelectButton
                                                className='continue'
                                                href='#'
                                                variant='dark'
                                                onClick={() => onSentInvite()}

                                            >Send invite
                                            </SelectButton>
                                        </Col>
                                    </Row>
                                </Container>
                            </MemberForm>
                        </div>
                    </Modal.Body>
                </Modal>

            </Form.Group>
        </div>

    )
}
export default WokerInviteButton;

const Header = styled(Modal.Header)
    `
font-weight: 400;
font-size: 16px;
display: flex;
letter-spacing: 0.01em;
font-family:Open Sans;
color: #787373;
justify-content:center;
text-align:center;
margin-left:10px;
margin-right:10px;
`
const MemberForm = styled.div`
width: 100%;
top: 6.25rem;
justify-content: flex-start;
display: flex;
align-items: center;
flex-direction: column;
`
const CheckContainer = styled.div`
align-items:flex-start;
margin-left:20px;
input[type='checkbox']:checked{
  background-color: #D81159;
  border: 2px solid #D81159;
  box-shadow: 0 0 1px 1px #D81159;
}
`

const Multiselect = styled.button`
height:2.5rem;
width: 160px;
background: #F3F3F3;
border: 1px solid #F1F1F1;
box-sizing: border-box;
border-radius 8px;
margin-bottom:0.5rem;

`


const SelectButton = styled(Button)`

justify-content:center;
align-self:center;
border-radius:10px;
display:flex;
margin-left:3rem;
`
const Text2 = styled.p`
color:#000 ;
font-size:14px;
margin-left: 1rem;
`
const StyledInput = styled(Form.Control)`
font-weight: 400;
margin-left:1.3rem;
border-radius: 10px;
height: 44px;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #F3F3F3;
  background: #fff;
}
@media (max-width: 530px) {
  margin-left:1.1rem;
}
`
const StyledLabel = styled(Form.Label)`
font-weight: 500;
font-size: 16px;
font-family:Roobert-medium;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.01em;
color: #190F0F;
margin-left: 1.3rem;
@media (max-width: 500px) {
  margin-left:1.1rem;
}
`