import React, { useState } from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Hr from '../../../assets/hrcustom.png'
import uparrow from '../../../assets/open.png';
import downarrow from '../../../assets/close.png';
import { days, language, Homemaintainence, Repairs, TimeList,workArea } from './components/DataList'
import { getProfileDetails, updateProfile } from '../../../store/Actions/serviceProvider.actions';
import { useDispatch, useSelector } from 'react-redux';
function EditProfile() {
    const profileData = useSelector((state) => state.profileReducer)
    const { profileDetails } = profileData
    const service = [];
    profileDetails?.servicesOffered?.map((item) => {
        service.push(item)
    })
    const [languageData, setLanguageData] = useState(profileDetails?.languagesSupported || ['English'])
    const [isActiveLanguage, setIsActiveLanguage] = useState(false)
    const [serviceData, setServicesData] = useState(service?service:[])
    const [multivalues]=useState([])
    const[val,setVal]=useState(profileDetails?.placeOfService ||[])
    const [length,setLength]=useState(0);
    const dispatch = useDispatch();
    const [Bool,setBool]=useState({
        "areas":true,
        "size":false,
      })
    const [values, setValues] = useState({
        "url": '',
        "address":profileDetails?.address|| '',
        "headquater":profileDetails?.headquarterIn|| '',
        "CompanySize":profileDetails?.companySize||'',
        "aboutUs": profileDetails?.aboutUs||'',
        "founded": profileDetails?.foundedIn||''
    })
    const [dayTime, setdatTime] = useState({
    
    })

    //................Add_Language..................................//
    const addLanguage = (e) => {
        languageData.includes(e.target.value) ? setLanguageData(languageData) :
            setLanguageData([...languageData, e.target.value])
        setIsActiveLanguage(false)
    }

    //....................Add_Services...............................//
    const addServices = (item) => {
        setServicesData([...serviceData, item])
    }

    //......................Remove_Services...........................//
    const onRemoveServices = (service) => {
        const filteredList = serviceData?.filter(item => item !== service)
        setServicesData(filteredList)
    }

    //..........................if_Service_Exist........................//
    const ifExist = (exist) => {
        if (serviceData?.filter(item =>
            item === exist).length > 0
        ) {
            return true;
        }
        return false
    }

    //..............................add_Values...........................//
    const handlechange = (name) => (event, e) => {
        let value =event.target.value
        setValues({...values,[name]:value})
        console.log(values, "value")
    }
      //..............................add_Values...........................//
      const handleTimechange = (day,name) => (event, e) => {
        let value =event.target.value
        setdatTime({...dayTime,[day]:{...dayTime[day] ,[name]:value}})
        console.log(dayTime, "value")
    }

    //....................................add_Worktime.....................//
    const addWorkTime = (name, day) => (event, e) => {
            if(name==="to"){
                let value = event.target.value
        setdatTime({ ...values, [day]: {'to':value} })
            }
            if(name==="from"){
                let value = event.target.value
        setdatTime({ ...dayTime, [day]: {'from':value} })
            }
            console.log(dayTime,"time")
    }

    const handlebool=(type)=>{
        if(type==='areas'){
        setBool({...Bool,areas:!Bool.areas,size:false})
        }
        else if(type==='size'){
          setBool({...Bool,size:!Bool.size,areas:false})
        }
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
        setValues({...values,'areasToBeCleaned':multivalues})
        }

        ///...........................handle submit.................//
        const handleSave = async () => {
            const time=[
                {
                    "day": "Monday",
                    "time": dayTime.Monday
                },
                {
                    "day": "Tuesday",
                    "time": dayTime.Tuesday
                },
                {
                    "day": "Wednesday",
                    "time": dayTime.Wednesday
                },
                {
                    "day": "Thursday",
                    "time": dayTime.Thursday
                },
                {
                    "day": "Friday",
                    "time": dayTime.Friday
                },
                {
                    "day": "Saturday",
                    "time": dayTime.Saturday
                },
                {
                    "day": "Sunday",
                    "time": dayTime.Sunday
                }
            ]
            const data = {
                language: languageData,
                industry: serviceData,
                day: dayTime,
                info: values,
                workingArea: val,
                time:time
            }
            const res = await dispatch(updateProfile(data))
            const uniqueURL = localStorage.getItem('uniqueUrl')
            if (res.status === true) {
                await dispatch(getProfileDetails(uniqueURL));
                window.location.reload()

            }
            else {
                alert(
                    "Error",
                    `${res.message}`)
            }
            console.log("hello1")
        };
    return (
        <React.Fragment>
            <br />
            <br />
            <Segment>
                <p className='customhead'>Edit your custom URL</p>
                <div className='d-flex'>
                    <p className='weblink'>www.swiftbel.com/business/</p>
                    <CustomUrl type='text' placeholder="https://www.here.we.add.custom.name" onChange={handlechange('url')} />
                </div>
                <p className='note mt-1'>Note: Your custom URL must contain 3-100 letters or numbers. Please do not use spaces, symbols, or special characters.</p>
            </Segment>
            <br />
            <Segment >
                <p className='customhead'>Languages</p>
                <div className='d-flex'>
                    {
                        languageData?.map((item) =>
                            <div className='language'>{item}</div>
                        )
                    }

                </div>
                {isActiveLanguage ?
                    <Customselect onChange={(e) => addLanguage(e)} className='mt-3' >
                        {
                            language.map((item) =>
                                <option value={item}>{item}</option>
                            )
                        }
                    </Customselect> :
                    <div onClick={() => setIsActiveLanguage(true)} className='languageadd mt-2'>+</div>}
                <br />
            </Segment>
            <br />
            <Segment>
                <p className='customhead'>Services</p>
                <p className='heading'>Home maintainence</p>
                <Maintain>
                    {Homemaintainence?.map((item, index) => {
                        return (
                            <Service key={index} className={ifExist(item) ? 'active' : ''} onClick={() => { ifExist(item) ? onRemoveServices(item) : addServices(item) }} >
                                {item}
                            </Service>
                        )
                    })}
                </Maintain>
                <br />
                <p className='heading'>Repairs, renovations, moving</p>
                <Maintain>
                    {Repairs?.map((item, index) => {
                        return (
                            <Service key={index} className={ifExist(item) ? 'active' : ''} onClick={() => { ifExist(item) ? onRemoveServices(item) : addServices(item) }} >
                                {item}
                            </Service>
                        )
                    })}
                </Maintain>
                <br />
            </Segment>
            <br />
            <Segment>
                <div className='d-flex'>
                    <div className='details'>
                        <p className='customhead'>Founded</p>
                        <CustomInput type='text' value={values.founded} placeholder="Founded" onChange={handlechange('founded')} />
                    </div>
                    <div className='details'>
                        <p className='customhead'>Headquarters</p>
                        <CustomInput type='text' value={values.headquater} placeholder="Headquarters" onChange={handlechange('headquater')} />

                    </div>
                    <div className='details'>
                        <p className='customhead'>Company size</p>
                        <Customselect value={values.CompanySize} onChange={handlechange('CompanySize')}>
                            <option>select</option>
                            <option value="1-10 Employees">1-10 Employees</option>
                            <option value="11-50 Employees">11-50 Employees</option>
                            <option value="51-100 Employees">51-100 Employees</option>
                            <option value="101-1000 Employees">101-1000 Employees</option>
                            <option value="1001 or Above Employee">1001 or Above Employee</option>
                        </Customselect>
                    </div>
                </div>
                <br />
                <Companyinputs>
                    <p className='customhead'>Address</p>
                    <CustomUrl value={values.address} type='text' placeholder="Enter your address" onChange={handlechange('address')} />
                </Companyinputs>
                <br />
                <Companyinputs>
                    <p className='customhead'>Tell us about your company</p>
                    <Form.Control as="textarea"  value={values.aboutUs} rows={4} placeholder='Write a caption...' className='textarea' onChange={handlechange('aboutUs')} />
                </Companyinputs>
                <br />
            </Segment>
            <br />
            <Segment>
                <p className='customhead mb-4'>Select work date/time range</p>
                {days?.map((item, index) => {
                    return (
                        <div className='d-flex mb-4 ' key={index}>
                            <div className='details'>
                                <div className='day'>{item}</div>
                            </div>
                            <div className='details'>
                                <Customselect onChange={handleTimechange(item,'from')}>
                                    <option>From</option>
                                    {TimeList.map((item) =>
                                        <option value={item}>{item}</option>
                                    )}
                                </Customselect>
                            </div>
                            <div className='details'>
                                <Customselect onChange={handleTimechange(item,'to')}>
                                    <option>To</option>
                                    {TimeList.map((item) =>
                                        <option value={item}>{item}</option>
                                    )}
                                </Customselect>
                            </div>
                        </div>
                    )
                })}
                <Img src={Hr} />
                <br />
                <p className='customhead'>City</p>
                <Form.Group className="mb-3">
    <Details onClick={()=>handlebool('areas')} >
          <Innerdiv className='d-flex justify-content-between'>
            <div>
              <Text>Selected({length})</Text>
              </div>
              <div>
                <ImgWork src={Bool.areas===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
      </Form.Group>
                {Bool.areas===true?
      <Details className='d-flex justify-content-between mb-3 p-3'>
      <Form>
          {
              workArea.map((item)=>
              <>
              <Form.Check
              inline
              label={item}
              name={item}
              type='checkbox'
              value={item}
              id={item}
              checked={val.includes(item)}
              onClick={handlemultiselect(item)}
            />
            <br/>
            </>
              )
          }

    </Form>
        </Details>
        :''}
                <br />
                <div className='d-flex mb-4'>
                    <Custombutton variant='light'>Cancel</Custombutton>
                    <Custombutton variant='dark' onClick={()=>handleSave()}>Save</Custombutton>
                </div>
            </Segment>
            <br />
        </React.Fragment>
    )
}
export default EditProfile

const Segment = styled.div`
background: #FFFFFF;
border: 1px solid #F1F1F1;
box-shadow: 0px 4px 8px -5px rgba(0, 0, 0, 0.03);
border-radius: 8px;
padding-top:15px;
padding-left:20px;
margin-right:20px;
.customhead{
    font-family: Roobert-medium;
    font-weight: 500;
    font-size: 18px;
}
.weblink{
    padding-left:15px;
    padding-right:30px;
    padding-top:5px;
    font-family: Inter;
    font-size: 16px;
}
.note{
    color: #787373;
    font-family: Inter;
    font-size: 14px;
}
.language{
    font-family: Inter;
    width: 86px;
    height: 40px;
    background: #FAFAFA;
    border: 1px solid #F3F3F3;
    border-radius: 8px;
    padding:8px;
    font-size: 16px;
    text-align:center;
    margin-right:20px;
}
.languageadd{
color:red;
width: 40px;
height: 40px;
border-radius:50%;
background: #FAFAFA;
border: 1px solid #F3F3F3;
text-align:center;
padding:5px;
font-size: 16px;
}
.details{
margin-right:30px;
}
.day{
width: 181px;
height: 57px;
border: 1px solid #000000;
border-radius: 8px;
font-family: Inter;
font-size: 14px;
margin-top:-10px;
text-align:center;
padding-top:17px;
}
`
const CustomUrl = styled(Form.Control)`
margin-right:100px;
background: #FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 8px;
margin-top:-8px;
height: 40px;
`
const Maintain = styled.div`
display:flex;
flex-wrap:wrap;
.active{
    background: #E24F84;
    color:white;
    }
`
const Service = styled.div`
margin-right:10px;
background: #FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 8px;
padding:10px;
text-align:center;
margin-bottom:10px;
font-size: 14px;
font-family:Inter;
cursor:pointer;
`
const Customselect = styled(Form.Select)`
background: #FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 8px;
width: 164px;
&:focus {
    outline: none;
    box-shadow: 0px 0px 0px white;
    border:1px solid #190F0F;
    background: #fff;
  }
`
const CustomInput = styled(Form.Control)`
width: 164px;
margin-right:100px;
background: #FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 8px;
margin-top:-8px;
height: 40px;
`
const Companyinputs = styled.div`
margin-right:200px;
.textarea{
background: #FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 8px;
}
`
const Custombutton = styled(Button)`
margin-right:30px;
width: 205px;
height: 44px;
border: 1px solid #D0CECE;
border-radius: 8px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
`
const Img = styled.img`
width:100%;
height:1px;
margin-right:20px;
margin-left:20px;
`
const Details=styled.div`
width: 250px;
border-radius:13px;
border:1px solid lightgray;
input[type='checkbox']:checked{
  background-color: #D81159;
  border: 2px solid #D81159;
  box-shadow: 0 0 1px 1px #D81159;
}`
const Innerdiv = styled.div`
width: 250px;
padding-left:12px;
padding-right:15px;
padding-top:10px;
color:black;
font-size: 12px;
height:40px;
font-family:Inter;
`
const Text=styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
`

const ImgWork = styled.img`
height:7px;
width:11px;
margin-top:5px;
`