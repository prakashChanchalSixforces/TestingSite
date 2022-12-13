import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import plusButton from '../../../../assets/plusButton.png';
import { assignedJob, getWorkerList } from '../../../../store/Actions/Dashboard.actions';

const AssignedWorkerComponent = (props) => {
    const { closemodal } = props
    const [open, setOpen] = useState(false)
    const [length, setLength] = useState(0)
    const [admin, setAdmin] = useState('')
    const [values, setValues] = useState({
    })
    const [multivalues] = useState([])

    useEffect(() => {
        setOpen(closemodal)
    }, [closemodal])
    const [val, setVal] = useState([])

    const handlemultiselect = (name, item) => (event) => {
        console.log(name, multivalues, val, event.target.id)
        if (event.target.id === name && event.target.checked === true) {
            console.log(event.target.id)
            multivalues.push(name)
            setLength(length + 1)
        }
        else if (event.target.id === name && event.target.checked === false) {
            removeElement(multivalues, name)
            setLength(length - 1)
        }
        setVal(multivalues)
        setValues({ ...values, 'typeOfStains': multivalues })
    }

    const removeElement = (arr, element) => {

        let index = -1
        for (let i in arr) {
            if (arr[i] === element) {
                index = i
                break
            }
        }
        arr.splice(index, 1)
    }
    let dispatch = useDispatch()
    useEffect(() => {
        init()
    }, [])
    const init = async () => {
        await dispatch(getWorkerList());
    }
    const { workerList } = useSelector((state) => state.dashboardReducer)
    const onSubmit = async () => {
        const selectedData = []

        val?.map((item) => {
            const filteredList = workerList?.filter(items => items?.userName === item)
            return selectedData.push(filteredList[0]?._id)
        })
        console.log(selectedData, "data")
        const details = {
            "workerId": selectedData,
            "bookingNo": props?.refrenceId,
            "serviceName": "Moving"
        }
        await dispatch(assignedJob(details))
        setOpen(false)
    }
    return (

        <React.Fragment>
            <Multiselect className='d-flex justify-content-space-around mt-1' onClick={() => open ? setOpen(false) : setOpen(true)}>
                <Arrow className='mt-2' src={plusButton} />
                <Text2 className='mt-2'>Add the worker</Text2>
            </Multiselect>
            {open === true ?
             <Form.Group className="mb-3">
                <Details >
                    <div className='d-flex justify-content-between' >
                        <div style={{ width: '50%' }} className='p-1'>
                            <p className='mt-2'>Select worker</p>
                            <hr />
                            <CheckContainer className='d-flex justify-content-between mb-3 p-3'>
                                <Form>
                                    {
                                        workerList?.map((item, index) =>
                                            <>
                                                <Form.Check
                                                    inline
                                                    label={item?.userName}
                                                    name={item?.userName}
                                                    type='checkbox'
                                                    value={item?.userName}
                                                    id={item?.userName}
                                                    checked={val.includes(item?.userName)}
                                                    onClick={handlemultiselect(item?.userName, item)}
                                                />
                                                <br />
                                            </>
                                        )
                                    }
                                </Form>
                            </CheckContainer>
                        </div>
                        <div style={{ width: '50%' }} className='p-1'>
                            <p className='mt-2'>Job manager</p>
                            <hr />
                            <CheckContainer className='d-flex justify-content-between mb-3 p-3'>
                                <Form>
                                    {
                                        multivalues.map((item, index) =>
                                            <Form.Check
                                                inline
                                                label={item}
                                                name={item}
                                                type='checkbox'
                                                value={admin}
                                                id={`${index}`}
                                                checked={admin.includes(item)}
                                                onClick={() => setAdmin(item)}
                                            />
                                        )
                                    }
                                </Form>
                            </CheckContainer>

                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='d-flex justify-contnet-between'>
                        <SelectButton
                            className='continue'
                            href='#'
                            variant='light'
                            onClick={() => setOpen(false)}
                        >Cancel
                        </SelectButton>
                        <SelectButton
                            className='continue'
                            href='#'
                            variant='dark'
                            onClick={() => onSubmit()}
                        >Save
                        </SelectButton>
                    </div>
                </Details>
                </Form.Group>
                : null}
        </React.Fragment>
    )
}
export default AssignedWorkerComponent;

const Details = styled.div`
border-radius:8px;
border:1px solid lightgray;
width:350px;
height:300px;
position:absolute;
overflow-x:scroll;
overflow-y:scroll;
background:#fff;
z-index:998;
&:after{
    background:#fff;
}`

const CheckContainer = styled.div`
align-items:flex-start;
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
const Arrow = styled.img`
width:20px;
margin-left: 0.2rem;
`
const Text2 = styled.p`
color:#D81159 ;
font-size:14px;
margin-left: 1rem;

`
const SelectButton = styled(Button)`
width:150px;
justify-content:center;
align-self:center;
margin-bottom:1rem;
border-radius:8px;
margin-left:0.5rem;
margin-right:0.5rem;
`