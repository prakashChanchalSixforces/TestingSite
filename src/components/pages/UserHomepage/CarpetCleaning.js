import React, { useState } from 'react'
import { Button, Container,FloatingLabel,Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { TimeList } from '../CompanyProfile/component/TimeList';
import { carpetcleaning} from '../../../store/Actions/User.action';
import { ToastContainer, toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-toastify/dist/ReactToastify.css';
import Hrimg from '../../../assets/hr.svg'
import moment from 'moment';
import Openarrow from '../../../assets/open.png'
import Closearrow from '../../../assets/close.png'
import infoLogo from '../../../assets/infologo.png'
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../UserHomepage/Calendar.css'

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

function CarpetCleaning(){
    const dispatch = useDispatch();
    const [setSmoke]=useState('')
    const [setPets]=useState('')
    const [length,setLength]=useState(0)
    const [open,setOpen]=useState(false)
    const [datecalendar,setDatecalendar]=useState(false);

const [values,setValues]=useState({
})
const [multivalues]=useState([])
const[val,setVal]=useState([])
const handlechange=(name)=>(event)=>{
let value= name === 'numberOfRooms' ? parseInt(event.target.value):name==='date'?moment(event).format('LL'):event.target.value
if(name==='date'){
  setDatecalendar(false)
}
setValues({...values,[name]:value})
}

const isValid=()=>{

if(!(values.address&&values.address.length>0)){
    toast.error('Please enter your address')
    return false
}
else if(!(values.typeOfStains)){
    toast.error('Please select type of stains')
    return false
}
else if(!(values.approxSqFtOfHouse&&values.approxSqFtOfHouse.length>0)){
    toast.error('Please select approx size of house')
    return false
}
else if(!(values.numberOfRooms||values.numberOfRooms===isNaN)){
    toast.error('Please select number of rooms')
    return false
}
else if(!(values.smokersInHouse&&values.smokersInHouse.length>0)){
    toast.error('Please select smokers in house')
    return false
}
else if(!(values.anyPets&&values.anyPets.length>0)){
    toast.error('Please select pets in house')
    return false
}

else
return true
}

const handleOpen=()=>{
    if(open===true){
        setOpen(false)
    }
    else
    setOpen(true)
}
const handleSubmit = async()=>{
    let res
    if(isValid()){
     res = await dispatch(carpetcleaning(values,1,10));
     if(res.status===false){
        toast.error(res.message);
     }
     else if(res.status===true&&res.message!=='Success'){
        toast.info(res.message);
     }
    }
}
let onPlaceSelected = (place) => {
    const address = place.formatted_address
    setValues({...values,'address':address})
}
const handledate=()=>{
  if(datecalendar===false){
    setDatecalendar(true)
  }
  else
  setDatecalendar(false)

}
const smoking=['Yes','No']
const pet = ['Yes','No']
const handlesmoke=(x)=>{
    setSmoke(x)
    setValues({...values,'smokersInHouse':x})
}
const handlepets=(y)=>{
    setPets(y)
    setValues({...values,'anyPets':y})
}
function removeElement(arr,element){
    let index=-1
    for(let i in arr){
        if(arr[i]===element){
           index=i
           break
        }
    }
    arr.splice(index,1)
}

const handlemultiselect=(name)=>(event)=>{
if(event.target.id===name&&event.target.checked===true){
multivalues.push(name)
setLength(length+1)
}
else if(event.target.id===name&&event.target.checked===false){
removeElement(multivalues,name)
setLength(length-1)
}
setVal(multivalues)
setValues({...values,'typeOfStains':multivalues})
}



console.log(values,'values')
return(
  <React.Fragment>

    <MainContainer>
        <ToastContainer/>
    <Form>
    <ServiceHeader>
        Tell us about your cleaning
        </ServiceHeader>
    <Details className='d-flex justify-content-start'>
            <div
            style={{
              paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'
              }}>
                Service
                <Text>Carpet cleaning</Text>
                </div>
        </Details>
        <Details className='justify-content-start'>
        <div style={{paddingLeft:'12px',paddingTop:'10px',color:'black',fontSize:'14px',fontWeight:'500',fontFamily:'Roobert-medium'}}>
        Destination
        <Place
              apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
              types={['address', '(cities)', '(regions)']}
              options={{types: ["geocode", "establishment"],
            }}
            placeholder='Address'
            onPlaceSelected={onPlaceSelected}
            defaultValue={values?.address?values?.address:''}
            className="form-control form-control-default"
            />
            </div>
            </Details>
            <div className='d-flex mt-3' style={{borderRadius:'13px',border:'1px solid #F3F3F3'}}>
    <Dates onClick={()=>handledate()} >
        Date
        <h6 style={{fontFamily:'Open Sans'}}>
          {values?.date?values?.date:'Select date'}</h6>
        </Dates>
<FloatingLabel
controlId="floatingInput"
label="Time"

>

<Time aria-label="Floating label select example" onChange={handlechange('time')}>
<option>{values?.time?values?.time:'Select Time'}</option>
{TimeList.map((item,index) =>{
return(
<option value={item}>{item}</option>
)
})}

</Time>
</FloatingLabel>
</div>
{datecalendar === true ?
<CalendarStyle className='p-3 d-flex justify-content-center'>
<Calendar className='react-calendar' onChange={handlechange('date')}
minDate={new window.Date()}
/>
</CalendarStyle>
:''}
        <img src={Hrimg} alt='hr' className='mb-3 mt-3'/>
        <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label>Number of rugs to be cleaned</Label>} >
      <Sel aria-label="Floating label select example"
     onChange={handlechange('numberOfRooms')}
      >
      <option value="">Enter number of rooms to be cleaned</option>
      <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <Form.Group className="mb-3">
    <Dropdwn controlId="floatingSelect" label={<Label >Approx. sq.ft of your house</Label>} >
      <Sel aria-label="Floating label select example"
      onChange={handlechange('approxSqFtOfHouse')}
      >
      <option value="">Approx. sq.ft. of house </option>
        <option value={`Up to 600 Sq.Ft.`}>{`Up to 600 Sq.Ft.`}</option>
        <option value={`600 Sq.Ft. - 1000 Sq.Ft.`}>{`600 Sq.Ft. - 1000 Sq.Ft.`} </option>
        <option value={`1000 Sq.Ft. - 1250 Sq.Ft.`}>{`1000 Sq.Ft. - 1250 Sq.Ft.`}</option>
        <option value={`1250 Sq.Ft. - 1500 Sq.Ft.`}>{`1250 Sq.Ft. - 1500 Sq.Ft.`} </option>
        <option value={`1500 Sq.Ft. - 1750 Sq.Ft.`}>{`1500 Sq.Ft. - 1750 Sq.Ft.`}</option>
        <option value={`1750 Sq.Ft. - 2000 Sq.Ft.`}>{`1750 Sq.Ft. - 2000 Sq.Ft.`}</option>
        <option value={`2000 Sq.Ft. - 2250 Sq.Ft.`}>{`2000 Sq.Ft. - 2250 Sq.Ft.`}</option>
        <option value={`2250 Sq.Ft. - 2500 Sq.Ft.`}>{`2250 Sq.Ft. - 2500 Sq.Ft.`} </option>
        <option value={`2500 Sq.Ft. - 2750 Sq.Ft.`}>{`2500 Sq.Ft. - 2750 Sq.Ft.`}</option>
        <option value={`2750 Sq.Ft. - 3000 Sq.Ft.`}>{`2750 Sq.Ft. - 3000 Sq.Ft.`}</option>
      </Sel>
    </Dropdwn>
      </Form.Group>
      <Multiselect className='d-flex justify-content-between p-2' onClick={()=>handleOpen()}>
        <Info>
            <Smallfont>Are there any stains? Select all that apply</Smallfont>
            <Text2>Selected({length})</Text2>
        </Info>
        <div>     {open===true?
                <Arrow src={Openarrow} />
                :
                <Arrow src={Closearrow} />
        }
                </div>
      </Multiselect>
      {open===true?
      <Details className='d-flex justify-content-between p-3'>
      <Form>
          <Form.Check
            inline
            label="Food stains"
            name="Food stains"
            type='checkbox'
            value="Food stains"
            id="Food stains"
            checked={val.includes('Food stains')}
            onClick={handlemultiselect('Food stains')}
          />
          <br/>
          <Form.Check
            inline
            label="Drink stains"
            name="Drink stains"
            type='checkbox'
            value="Drink stains"
            checked={val.includes('Drink stains')}
            onClick={handlemultiselect('Drink stains')}
            id="Drink stains"
          />
          <br/>
          <Form.Check
            inline
            label="Pet stains"
            name="Pet stains"
            type='checkbox'
            value="Pet stains"
            checked={val.includes('Pet stains')}
            onClick={handlemultiselect('Pet stains')}
            id="Pet stains"
          />
           <br/>
          <Form.Check
            inline
            label="Oil / grease stains"
            name="Oil / grease stains"
            type='checkbox'
            value="Oil / grease stains"
            checked={val.includes('Oil / grease stains')}
            onClick={handlemultiselect('Oil / grease stains')}
            id="Oil / grease stains"
          />
           <br/>
          <Form.Check
            inline
            label="General Cleaning"
            name="General Cleaning"
            type='checkbox'
            value="General Cleaning"
            checked={val.includes('General Cleaning')}
            onClick={handlemultiselect('General Cleaning')}
            id="General Cleaning"
          />
    </Form>
        </Details>
        :''}
      <Details className='d-flex justify-content-between p-2'>
            <Info>
              <Smallfont>Are there any smokers in the house?</Smallfont>
                <div className='d-flex justify-content-start mb-2'>
                    {smoking.map((x,index)=>{return(
                    <>
                 <Yesno size='md' variant={values?.smokersInHouse===x?'dark':'outline-dark'} onClick={()=>handlesmoke(x)} >{x}</Yesno> &nbsp;&nbsp;
                 </>
                    )})}
                </div>
                </Info>
                <div>
                <img src={infoLogo} alt='info' />
                </div>
      </Details>
      <Details className='d-flex justify-content-between p-2'>
            <Info>
              <Smallfont>Are there any pets in the house?</Smallfont>
                <div className='d-flex justify-content-start mb-2'>
                {pet.map((y,index)=>{return(
                    <>
                 <Yesno size='md' variant={values?.anyPets===y?'dark':'outline-dark'} onClick={()=>handlepets(y)} >{y}</Yesno> &nbsp;&nbsp;
                 </>
                    )})}
                </div>
                </Info>
                <div>
                <img src={infoLogo} alt='info' />
                </div>
      </Details>
      <hr/>
      <Search>
      <Continue size='md' variant="dark"
      onClick={()=>handleSubmit()}
      >Search</Continue>
      </Search>
          </Form>
    </MainContainer>
    <br/>
    <br/>
    </React.Fragment>

)
}

export default CarpetCleaning

const MainContainer=styled(Container)`
border-radius:18px;
border:1px solid #F3F3F3;
padding:20px;
background-color:#FFFFFF;
`
const Arrow=styled.img`
width:12px;
`
const Label=styled.h6`
color:	#000000 !important;
`
const Text=styled.p`
color:black ;
font-size:18px;
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
`
const Yesno = styled(Button)`
padding-left:20px;
padding-right:20px;
`
const Search=styled.p`
display:flex;
justify-content:center;
`
const Sel=styled(Form.Select)`
color:gray;
border-radius:13px;
font-family:Open Sans;
.placeholder {
  font-family: Open Sans;
}
`
const Text2=styled.p`
color:#787373 ;
margin-top:-15px;
font-size:14px;
`
const Details=styled.div`
border-radius:13px;
border:1px solid lightgray;
margin-bottom:15px
`
const Multiselect=styled.div`
border-radius:13px;
border:1px solid lightgray;
margin-bottom:10px
`
const Continue=styled(Button)`
background-color:black;
border:1px solid white;
border-radius:10px;
width: 360px
`
const Place=styled(Autocomplete)`
height:40px;
border-radius:15px;
border-width:0px;
margin-left:-12px;
margin-top:-8px;
&::placeholder {
  font-family: Open Sans;
}
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:0px solid #190F0F;
  background: #fff;
}
`
const Info=styled.div`
padding-left:2px;
padding-top:2px
`
const Smallfont=styled.p`
font-size:13px;
`
const Dropdwn=styled(FloatingLabel)`
color:black
`
const ServiceHeader=styled.p`
color:black ;
font-size:18px;
font-family: 'Roobert-medium';
font-style: normal;
font-weight: 500;
margin-left:1px;
`
const Dates=styled.div`
width:12rem;
margin-right:-25px;
border-radius:13px;
border:1px solid lightgray;
padding-left:6px;
padding-top:6px;
height:58px;
font-size:14px;
color:gray;
@media (min-width: 360px) and (max-width: 1399px){
  width:11rem;
}
`
const Time=styled(Form.Select)`
color:gray;
border-radius:13px;
font-family:Open Sans;
width:12rem;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:1px solid #190F0F;
  background: #fff;
}
@media (min-width: 360px) and (max-width: 1399px){
  width:11rem;
}
`

const CalendarStyle=styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
margin-top:10px;
`